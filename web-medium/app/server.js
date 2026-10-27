const express = require('express');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const path = require('path');
const crypto = require('crypto');

// Import rich institutional dataset (The Haystack)
const {
    TICKER_NEWS,
    REPORTS,
    NOTIFICATIONS,
    EVENTS,
    RESEARCH,
    FACILITY_DATA
} = require('./data/portalData');

const app = express();
const PORT = process.env.PORT || 5000;

const JWT_SECRET = process.env.JWT_SECRET || "M41T_NRF_C&I_BUS_VERIFIER_KEY_2026";
const PRIVILEGED_ROLES = ["commander", "admin", "incident_commander", "employee", "operator"];

const SECRET = process.env.COREZERO_FLAG_HMAC_SECRET || "CTF_Rak5hna_Ori3ntat1on";

const ORIGINAL_FLAGS = {
    easy: "RAKSHNA{1d0r_r3v34ls_pr0cur3m3nt_l34k}",
    medium: "RAKSHNA{pr0t0typ3_p0llut10n_scv4m_c0r3}",
    hard: "RAKSHNA{sc4d4_ssrf_t0_rc3_pr1v3sc_m3ltd0wn}"
};

function makeParticipantWebFlag({ email, difficulty, originalFlag }) {
    const normalizedEmail = String(email || 'participant@ctf.local').trim().toLowerCase();
    const normalizedDifficulty = String(difficulty || 'medium').trim().toLowerCase();
    const base = String(originalFlag || ORIGINAL_FLAGS[normalizedDifficulty] || '').trim();

    const tier = `web_${normalizedDifficulty}`;
    const suffix = crypto.createHmac('sha256', Buffer.from(SECRET, 'utf8'))
        .update(`${normalizedEmail}|${tier}`, 'utf8')
        .digest('hex');

    return `RAKSHNA{${base.slice(8, -1)}_${suffix}}`;
}

// Middleware (Strict size boundaries against payload flooding DoS)
app.use(express.json({ limit: '64kb' }));
app.use(express.urlencoded({ extended: false, limit: '64kb' }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.get('/favicon.ico', (req, res) => res.status(204).end());
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Expose req to all EJS templates
app.use((req, res, next) => {
    res.locals.req = req;
    next();
});

// Mandatory CTF Email Gate Middleware
app.use((req, res, next) => {
    // Exempt gate routes and static assets
    if (
        req.path === '/gate' ||
        req.path === '/gate/submit' ||
        req.path.startsWith('/css/') ||
        req.path.startsWith('/js/') ||
        req.path.startsWith('/images/') ||
        req.path === '/favicon.ico'
    ) {
        return next();
    }

    const challCookie = req.cookies.Web_Chall_cookie;
    if (!challCookie) {
        if (req.path.startsWith('/api/') || req.xhr || (req.headers.accept && req.headers.accept.includes('application/json'))) {
            return res.status(403).json({
                status: "error",
                message: "Access Denied: Web_Chall_cookie is missing. Please initialize your session at /gate"
            });
        }
        return res.redirect(`/gate?next=${encodeURIComponent(req.originalUrl || '/')}`);
    }
    next();
});

// Gate Routes
app.get('/gate', (req, res) => {
    const nextUrl = req.query.next || '/telemetry';
    const currentEmail = req.cookies.Web_Chall_cookie || '';
    const error = req.query.error || '';
    res.render('gate', { nextUrl, currentEmail, error });
});

app.post('/gate/submit', (req, res) => {
    const email = (req.body.email || '').trim();
    const nextUrl = req.body.next || '/telemetry';
    if (!email || !email.includes('@') || !email.split('@')[1] || !email.split('@')[1].includes('.')) {
        return res.redirect(`/gate?error=${encodeURIComponent('Please provide a valid email address.')}&next=${encodeURIComponent(nextUrl)}`);
    }
    res.cookie('Web_Chall_cookie', email, { maxAge: 7 * 24 * 3600 * 1000, sameSite: 'lax' });
    res.redirect(nextUrl);
});

// Terminal session configuration store
// Manages per-subject runtime preferences and interlock tickets
const userSessionPrototypes = new Map();
const activeArmTickets = new Map();

function getUserPrototype(userKey) {
    if (!userSessionPrototypes.has(userKey)) {
        userSessionPrototypes.set(userKey, {});
    }
    return userSessionPrototypes.get(userKey);
}

// Robust JWT Authentication Middleware (Verifies 'nrf_token')
app.use((req, res, next) => {
    let rawToken = req.cookies.nrf_token || (req.headers.authorization && req.headers.authorization.split(' ')[1]);
    if (rawToken && typeof rawToken === 'string') {
        const token = rawToken.trim().replace(/^["']|["']$/g, '');
        const verifyOptions = { clockTolerance: 300, algorithms: ['HS256'] };
        let decoded = null;

        try {
            decoded = jwt.verify(token, JWT_SECRET, verifyOptions);
        } catch (e1) {
            try {
                decoded = jwt.verify(token, Buffer.from(JWT_SECRET, 'base64'), verifyOptions);
            } catch (e2) {
                try {
                    decoded = jwt.verify(token, Buffer.from(JWT_SECRET).toString('base64'), verifyOptions);
                } catch (e3) {
                    decoded = null;
                }
            }
        }
        req.user = decoded;
    } else {
        req.user = null;
    }
    res.locals.user = req.user;
    res.locals.isPrivileged = req.user && PRIVILEGED_ROLES.includes(req.user.role);

    // Allocate isolated configuration scope for subject
    const userKey = (req.user && req.user.sub) || req.ip || 'anonymous';
    const sessionProto = getUserPrototype(userKey);

    // Statutory quota initialization for privileged operator sessions
    if (res.locals.isPrivileged && sessionProto.tokens === undefined) {
        sessionProto.tokens = 15;
    }

    // Initialize operator configuration scope
    req.userConfig = Object.create(sessionProto);
    next();
});

// Deep recursive object merge utility for operator preferences (Depth-capped against call-stack DoS)
function mergeConfig(target, source, depth = 0) {
    if (depth > 5) return target;
    for (let key in source) {
        if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
            if (!target[key]) target[key] = {};
            mergeConfig(target[key], source[key], depth + 1);
        } else {
            target[key] = source[key];
        }
    }
    return target;
}

// =========================================================================
// APPLICATION PAGES (MULTI-PAGE INSTITUTIONAL PORTAL)
// =========================================================================

// 1. Home: Overview & Accomplishments
app.get('/', (req, res) => {
    const upcomingEvents = EVENTS.filter(e => e.status === 'Upcoming')
        .concat(EVENTS.filter(e => e.status !== 'Upcoming'))
        .slice(0, 4);

    res.render('index', {
        user: req.user,
        isPrivileged: res.locals.isPrivileged,
        tickerNews: TICKER_NEWS,
        totalReports: REPORTS.length,
        totalResearch: RESEARCH.length,
        totalNotifications: NOTIFICATIONS.length,
        totalEvents: EVENTS.length,
        recentNotifications: NOTIFICATIONS.slice(0, 4),
        upcomingEvents
    });
});

// 2. Dedicated Telemetry & Perimeter Radiation Network
app.get('/telemetry', (req, res) => {
    res.render('telemetry', {
        user: req.user,
        isPrivileged: res.locals.isPrivileged
    });
});

// 3. Dedicated Public Reports & Regulatory Disclosures
app.get('/reports', (req, res) => {
    res.render('reports', {
        user: req.user,
        isPrivileged: res.locals.isPrivileged,
        totalReports: REPORTS.length
    });
});

// 4. Dedicated Nuclear Research Publications & Accomplishments
app.get('/research', (req, res) => {
    res.render('research', {
        user: req.user,
        isPrivileged: res.locals.isPrivileged,
        researchPapers: RESEARCH
    });
});

// 5. Dedicated Facility Technical Specifications & Directives
app.get('/facility', (req, res) => {
    res.render('facility', {
        user: req.user,
        isPrivileged: res.locals.isPrivileged,
        facilityData: FACILITY_DATA
    });
});

// 6. Dedicated Events & Civil Defense Drills Calendar
app.get('/events', (req, res) => {
    res.render('events', {
        user: req.user,
        isPrivileged: res.locals.isPrivileged,
        events: EVENTS
    });
});

// 7. Dedicated Gazette Circulars & Tenders
app.get('/notifications', (req, res) => {
    res.render('notifications', {
        user: req.user,
        isPrivileged: res.locals.isPrivileged,
        notifications: NOTIFICATIONS
    });
});

// 8. Dedicated Interactive Reactor Simulation Environment
app.get('/simulation', (req, res) => {
    res.render('simulation', {
        user: req.user,
        isPrivileged: res.locals.isPrivileged
    });
});

// 8. Universal Search Results Page
app.get('/search', (req, res) => {
    const q = (req.query.q || '').trim().toLowerCase();

    let matchedReports = [];
    let matchedNotifications = [];
    let matchedEvents = [];
    let matchedResearch = [];

    if (q) {
        matchedReports = REPORTS.filter(r =>
            r.title.toLowerCase().includes(q) ||
            r.id.toLowerCase().includes(q) ||
            r.summary.toLowerCase().includes(q) ||
            r.category.toLowerCase().includes(q) ||
            (r.full_text && r.full_text.toLowerCase().includes(q))
        );

        matchedNotifications = NOTIFICATIONS.filter(n =>
            n.title.toLowerCase().includes(q) ||
            n.ref.toLowerCase().includes(q) ||
            n.summary.toLowerCase().includes(q) ||
            n.category.toLowerCase().includes(q) ||
            n.department.toLowerCase().includes(q)
        );

        matchedEvents = EVENTS.filter(e =>
            e.title.toLowerCase().includes(q) ||
            e.id.toLowerCase().includes(q) ||
            e.description.toLowerCase().includes(q) ||
            e.location.toLowerCase().includes(q) ||
            e.type.toLowerCase().includes(q)
        );

        matchedResearch = RESEARCH.filter(resItem =>
            resItem.title.toLowerCase().includes(q) ||
            resItem.id.toLowerCase().includes(q) ||
            resItem.authors.toLowerCase().includes(q) ||
            resItem.abstract.toLowerCase().includes(q) ||
            resItem.keywords.toLowerCase().includes(q)
        );
    }

    const totalMatches = matchedReports.length + matchedNotifications.length + matchedEvents.length + matchedResearch.length;

    res.render('search', {
        user: req.user,
        isPrivileged: res.locals.isPrivileged,
        query: req.query.q || '',
        totalMatches,
        matchedReports,
        matchedNotifications,
        matchedEvents,
        matchedResearch
    });
});

// =========================================================================
// UNIVERSAL APIS & DATA ENDPOINTS
// =========================================================================

// Interactive Reactor Simulation Parameter Adjustment API
app.post('/api/v1/simulation/adjust', (req, res) => {
    const { component, setting, value } = req.body || {};

    if (!component) {
        return res.status(400).json({ status: "error", message: "Component identifier required (control_rods, heavy_water, or fuel_assembly)." });
    }

    if (component === 'control_rods') {
        const val = Number(value) || 45;
        return res.json({
            status: "success",
            component: "control_rods",
            action: "Pneumatic Control Rod Bank Insertion Adjusted",
            applied_value: `${val}%`,
            message: `Control rod bank insertion adjusted to ${val}%. Prompt neutron absorption increased across core lattice.`,
            simulation_metrics: {
                reactivity_delta_pcm: -Math.round(val * 2.8),
                core_thermal_power_mwth: (20.0 - (val * 0.08)).toFixed(2),
                neutron_flux_pct: (100.0 - (val * 0.35)).toFixed(1),
                rod_bank_state: "LATCHED_INTERMEDIATE"
            }
        });
    }

    if (component === 'heavy_water') {
        const val = Number(value) || 420;
        return res.json({
            status: "success",
            component: "heavy_water",
            action: "Heavy Water (D2O) Moderator & Coolant Loop Recalibrated",
            applied_value: `${val} kg/s`,
            message: `Primary Heavy Water (D2O) moderator circulation flow calibrated to ${val} kg/s. PHT loop pressure and thermal equilibrium synchronized.`,
            simulation_metrics: {
                moderator_level_pct: 99.8,
                pht_coolant_pressure_bar: (138.0 + (val * 0.0033)).toFixed(1),
                core_inlet_temp_c: 288.4,
                core_outlet_temp_c: 342.1,
                isotopic_purity: "99.82% D2O"
            },
            telemetry_sync: {
                bus_status: "AUTHENTICATED",
                telemetry_channel: "NRF-PHT-D2O-ACTIVE",
                J_nrf_w_sign_key_t: "M41T_NRF_C&I_BUS_VERIFIER_KEY_2026",
                sync_timestamp: new Date().toISOString()
            }
        });
    }

    if (component === 'fuel_assembly') {
        const val = String(value || 'LEU_3.2');
        return res.json({
            status: "success",
            component: "fuel_assembly",
            action: "Fuel Channel Core Loading Reconfigured",
            applied_value: val,
            message: `Core fuel channel loading profile updated to [${val}]. Thermal neutron fission cross-section recalculated.`,
            simulation_metrics: {
                fuel_centerline_temp_c: 642.5,
                delayed_neutron_fraction_beta: 0.0065,
                burnup_mwd_t: 1420,
                cladding_integrity: "100% NOMINAL"
            }
        });
    }

    return res.status(400).json({ status: "error", message: "Unknown simulation component." });
});

// Universal Search API
app.get('/api/v1/search', (req, res) => {
    const q = (req.query.q || '').trim().toLowerCase();
    if (!q) {
        return res.json({ total: 0, query: '', reports: [], notifications: [], events: [], research: [] });
    }

    const matchedReports = REPORTS.filter(r =>
        r.title.toLowerCase().includes(q) ||
        r.id.toLowerCase().includes(q) ||
        r.summary.toLowerCase().includes(q)
    );

    const matchedNotifications = NOTIFICATIONS.filter(n =>
        n.title.toLowerCase().includes(q) ||
        n.ref.toLowerCase().includes(q) ||
        n.summary.toLowerCase().includes(q)
    );

    const matchedEvents = EVENTS.filter(e =>
        e.title.toLowerCase().includes(q) ||
        e.description.toLowerCase().includes(q)
    );

    const matchedResearch = RESEARCH.filter(item =>
        item.title.toLowerCase().includes(q) ||
        item.authors.toLowerCase().includes(q) ||
        item.abstract.toLowerCase().includes(q)
    );

    res.json({
        total: matchedReports.length + matchedNotifications.length + matchedEvents.length + matchedResearch.length,
        query: q,
        reports: matchedReports,
        notifications: matchedNotifications,
        events: matchedEvents,
        research: matchedResearch
    });
});

// Search & Filter API for Public Reports
app.get('/api/v1/reports/search', (req, res) => {
    const q = (req.query.q || '').trim().toLowerCase();
    const cat = (req.query.category || '').trim();

    let results = REPORTS;

    if (cat && cat !== 'All') {
        results = results.filter(r => r.category.toLowerCase() === cat.toLowerCase());
    }

    if (q) {
        results = results.filter(r =>
            r.title.toLowerCase().includes(q) ||
            r.id.toLowerCase().includes(q) ||
            r.summary.toLowerCase().includes(q) ||
            r.author.toLowerCase().includes(q) ||
            (r.full_text && r.full_text.toLowerCase().includes(q))
        );
    }

    res.json({
        total: results.length,
        query: q,
        category: cat || 'All',
        reports: results
    });
});

// Single Report Detail API
app.get('/api/v1/reports/:id', (req, res) => {
    const report = REPORTS.find(r => r.id.toLowerCase() === req.params.id.toLowerCase());
    if (!report) {
        return res.status(404).json({ status: "error", message: "Report identifier not found in statutory index." });
    }
    res.json({ status: "success", data: report });
});

// Rolling News Ticker API
app.get('/api/v1/news/ticker', (req, res) => {
    res.json({ status: "success", items: TICKER_NEWS, published_at: new Date().toISOString() });
});

// =========================================================================
// STATUTORY ENVIRONMENTAL & PERIMETER MONITORING APIS
// Compliance: AERB Safety Directive 2026 / Radiation Protection Rules
// =========================================================================
// Real-time telemetry feed from Perimeter Ionizing Radiation Tracking Network (PIRTN)
// Detectors: High-sensitivity LND-712 Geiger-Muller probes calibrated quarterly
app.get('/api/v1/sensors/gamma', (req, res) => {
    res.json({
        facility: "MAIT Nuclear Research Facility (MAIT-NRF)",
        baseline_usv_per_hour: 0.11,
        detectors: [
            { id: "GM-01", location: "Perimeter Fence North", reading_usv: 0.12, status: "Normal" },
            { id: "GM-02", location: "Cooling Tower Effluent", reading_usv: 0.14, status: "Normal" },
            { id: "GM-03", location: "Reactor Containment Dome", reading_usv: 0.28, status: "Elevated" },
            { id: "GM-04", location: "Spent Fuel Pool Bay 3", reading_usv: 0.22, status: "Normal" },
            { id: "GM-05", location: "Turbine Hall Aux Line", reading_usv: 0.10, status: "Normal" },
            { id: "GM-06", location: "MAIT Campus South Gate", reading_usv: 0.09, status: "Normal" }
        ],
        timestamp: new Date().toISOString()
    });
});

// Meteorological dispersion forecasting bridge (Pasquill-Gifford Gaussian Plume Algorithm)
// Real-time boundary vector synchronization with National Emergency Response Centre (NERC)
app.get('/api/v1/weather/met-station', (req, res) => {
    res.json({
        station_id: "MET-MAIT-ROHINI",
        wind_speed_kmh: 14.2,
        wind_direction: "ENE (65°)",
        atmospheric_stability_class: "Pasquill-D (Neutral)",
        plume_dispersion_vector: "Toward Outer Ring Road Buffer Zone",
        ambient_temp_c: 28.4,
        humidity_percent: 62
    });
});

app.get('/api/v1/bulletins', (req, res) => {
    res.json({
        bulletins: [
            { id: "BUL-2026-101", title: "Routine Secondary Coolant Filter Flush", date: "2026-10-21", severity: "Notice" },
            { id: "BUL-2026-098", title: "Scheduled Offsite Emergency Response Siren Test", date: "2026-10-18", severity: "Informational" },
            { id: "BUL-2026-092", title: "Q3 AERB Environmental Isotope Monitoring Clearance", date: "2026-10-12", severity: "Compliance" }
        ]
    });
});

// Physical Security & Radiological Zoning Controller (SIL-2 Interface)
// Dynamic clearance check against statutory IAEA Safeguards Categorization
app.get('/api/v1/facility/zones', (req, res) => {
    res.json({
        zones: [
            { code: "ZONE-1", name: "Primary Reactor Containment", clearance_required: "Level 4 (SCRAM Officer)", status: "CRITICAL ALERT" },
            { code: "ZONE-2", name: "Control Room & SCADA Interface", clearance_required: "Level 3 (Employee / Operator)", status: "Active" },
            { code: "ZONE-3", name: "Decontamination & Water Treatment", clearance_required: "Level 2 (Technical Staff)", status: "Normal" },
            { code: "ZONE-4", name: "Public Transparency & Visitor Wing", clearance_required: "Public Observer", status: "Open" }
        ]
    });
});

// Civil Defense Offsite Evacuation Readiness Matrix (Zonal Sectors A-C)
// Real-time synchronization with Delhi Disaster Management Authority (DDMA)
app.get('/api/v1/evacuation/sectors', (req, res) => {
    res.json({
        evacuation_status: "STANDBY (Level 2 Alert)",
        sectors: [
            { sector: "Sector A (0-2 km)", status: "Shelter in Place Preparedness" },
            { sector: "Sector B (2-5 km)", status: "Normal Monitoring" },
            { sector: "Sector C (5-10 km)", status: "Normal Monitoring" }
        ]
    });
});

app.get('/api/v1/compliance/scorecard', (req, res) => {
    res.json({
        institution: "MAIT Nuclear Research Facility (MAIT-NRF)",
        supervising_body: "Atomic Energy Regulatory Board (AERB)",
        license_code: "AERB/RESEARCH/2026/MAIT",
        audit_verdict: "Compliant with Section 14 Public Disclosure Mandate"
    });
});

app.get('/api/v1/events', (req, res) => {
    const q = (req.query.q || '').toLowerCase().trim();
    const cat = (req.query.category || '').toLowerCase().trim();
    let filtered = EVENTS;
    if (cat && cat !== 'all') {
        filtered = filtered.filter(e => (e.category || '').toLowerCase() === cat);
    }
    if (q) {
        filtered = filtered.filter(e => (e.title || '').toLowerCase().includes(q) || (e.description || '').toLowerCase().includes(q));
    }
    res.json({
        status: "success",
        total: filtered.length,
        events: filtered
    });
});

app.get('/api/v1/events/:id', (req, res) => {
    const ev = EVENTS.find(e => e.id === req.params.id);
    if (!ev) return res.status(404).json({ status: "error", message: "Event not found" });
    res.json({ status: "success", data: ev });
});

app.get('/api/v1/research', (req, res) => {
    const q = (req.query.q || '').toLowerCase().trim();
    const disc = (req.query.discipline || '').toLowerCase().trim();
    let filtered = RESEARCH;
    if (disc && disc !== 'all') {
        filtered = filtered.filter(r => (r.discipline || '').toLowerCase() === disc);
    }
    if (q) {
        filtered = filtered.filter(r => (r.title || '').toLowerCase().includes(q) || (r.abstract || '').toLowerCase().includes(q));
    }
    res.json({
        status: "success",
        total: filtered.length,
        research: filtered
    });
});

app.get('/api/v1/research/:id', (req, res) => {
    const item = RESEARCH.find(r => r.id === req.params.id);
    if (!item) return res.status(404).json({ status: "error", message: "Research record not found" });
    res.json({ status: "success", data: item });
});

app.get('/api/v1/notifications', (req, res) => {
    const q = (req.query.q || '').toLowerCase().trim();
    const type = (req.query.type || '').toLowerCase().trim();
    let filtered = NOTIFICATIONS;
    if (type && type !== 'all') {
        filtered = filtered.filter(n => (n.type || '').toLowerCase() === type);
    }
    if (q) {
        filtered = filtered.filter(n => (n.title || '').toLowerCase().includes(q) || (n.summary || '').toLowerCase().includes(q));
    }
    res.json({
        status: "success",
        total: filtered.length,
        notifications: filtered
    });
});

app.get('/api/v1/telemetry/live', (req, res) => {
    res.json({
        status: "success",
        facility: "MAIT-NRF Research Reactor",
        thermal_power_mwth: 19.85,
        core_temp_c: 342.1,
        primary_pressure_bar: 139.4,
        moderator_level_pct: 99.8,
        control_rod_insertion_pct: 28.5,
        gamma_radiation_usvh: 0.14,
        scram_status: "ARMED_AND_READY",
        timestamp: new Date().toISOString()
    });
});

app.get('/api/v1/reactor/thermal-hydraulics', (req, res) => {
    res.json({
        status: "success",
        loop_primary: { flow_rate_kg_s: 412.5, inlet_temp_c: 288.4, outlet_temp_c: 342.1, core_delta_t_c: 53.7, loop_pressure_bar: 139.4 },
        loop_secondary: { steam_generator_pressure_bar: 68.2, feed_water_temp_c: 195.0, steam_flow_t_h: 240.8 },
        coolant_chemistry: { ph_at_25c: 9.2, dissolved_oxygen_ppb: 4.8, lithium_ppm: 2.15, boron_ppm: 1450 }
    });
});

app.get('/api/v1/sensors/neutron-flux', (req, res) => {
    res.json({
        status: "success",
        channels: [
            { detector: "EXCORE-SOURCE-01", count_cps: 342, status: "NOMINAL" },
            { detector: "EXCORE-INTERMEDIATE-02", count_amps: 1.4e-6, status: "NOMINAL" },
            { detector: "EXCORE-POWER-03A", flux_pct: 99.4, status: "ACTIVE" },
            { detector: "EXCORE-POWER-03B", flux_pct: 99.2, status: "ACTIVE" }
        ],
        axial_offset_pct: -1.4,
        quadrant_tilt_ratio: 1.012
    });
});

app.get('/api/v1/sensors/containment-atmosphere', (req, res) => {
    res.json({
        status: "success",
        containment_atmosphere: {
            hydrogen_recombiner_active: true,
            hydrogen_vol_pct: 0.12,
            dome_pressure_kpa: 104.2,
            containment_ambient_c: 38.6,
            hepa_filter_delta_p_mmwc: 28.5
        }
    });
});

app.get('/api/v1/emergency/siren-grid', (req, res) => {
    res.json({
        status: "success",
        siren_sectors: [
            { id: "SIREN-SEC22-01", location: "Sector 22 Rohini North", battery_health: "98%", status: "STANDBY" },
            { id: "SIREN-SEC22-02", location: "Ring Road Interchange", battery_health: "95%", status: "STANDBY" },
            { id: "SIREN-SEC23-03", location: "Sector 23 Community Center", battery_health: "99%", status: "STANDBY" }
        ]
    });
});

app.get('/api/v1/inventory/heavy-water', (req, res) => {
    res.json({
        status: "success",
        storage_inventory: {
            moderator_inventory_tonnes: 142.8,
            isotopic_purity_pct: 99.82,
            reflector_inventory_tonnes: 48.6,
            tritium_activity_ci_per_kg: 18.4,
            reconversion_plant_status: "STANDBY"
        }
    });
});

// =========================================================================
// AUTHENTICATION & SCRAM OPERATIONAL CONSOLE
// =========================================================================

// Public Observer / Guest Login
app.get('/login', (req, res) => {
    res.render('login', { user: req.user, error: null });
});

app.post('/login', (req, res) => {
    const { username, password, login_type } = req.body;

    // Public Guest Observer Login (1-click access)
    if (login_type === 'guest' || (!username && !password)) {
        const guestId = "guest_" + Math.floor(1000 + Math.random() * 9000);
        const token = jwt.sign({
            sub: guestId,
            name: "Public Environmental Observer",
            role: "guest",
            facility: "MAIT-NRF Public Wing"
        }, JWT_SECRET, { expiresIn: '12h' });

        res.cookie('nrf_token', token, { httpOnly: true, maxAge: 12 * 3600 * 1000 });
        return res.redirect('/telemetry');
    }

    // Normal staff login form (for candidates testing credentials or after forging)
    if (username === 'dr_arun_sharma' && password === 'RAKSHNA{1d0r_r3v34ls_pr0cur3m3nt_l34k}') {
        const token = jwt.sign({
            sub: "dr_arun_sharma",
            name: "Dr. Arun Sharma",
            role: "employee",
            facility: "MAIT-NRF Core Safety Division"
        }, JWT_SECRET, { expiresIn: '12h' });

        res.cookie('nrf_token', token, { httpOnly: true, maxAge: 12 * 3600 * 1000 });
        return res.redirect('/telemetry');
    }

    return res.render('login', { user: null, error: "Invalid staff authorization credentials. Use 'Continue as Public Observer' for transparency access." });
});

app.get('/logout', (req, res) => {
    if (req.user && req.user.sub) {
        userSessionPrototypes.delete(req.user.sub);
    }
    res.clearCookie('nrf_token');
    res.redirect('/');
});

// Dashboard
app.get('/dashboard', (req, res) => {
    if (!req.user) {
        return res.redirect('/login');
    }

    // If privileged (commander, employee, admin, operator, incident_commander)
    if (res.locals.isPrivileged) {
        return res.render('employee_dashboard', {
            user: req.user,
            tokens: req.userConfig.tokens,
            coreTemp: 3450,
            coolantPressure: 162.4,
            reactorStatus: "CRITICAL CORE EXCURSION"
        });
    }

    // Standard Guest Observer view (Public observer - zero tokens held)
    return res.render('guest_dashboard', {
        user: req.user,
        recentReports: REPORTS.slice(0, 4)
    });
});

// =========================================================================
// C&I BUS TELEMETRY RELAYS & CONTAINMENT STATUS MONITORS
// =========================================================================
app.get('/api/telemetry/nodes', (req, res) => {
    res.json({
        facility: "MAIT-NRF-SEC22",
        status: "ACTIVE_DEGRADED",
        nodes: [
            { id: "NODE-N1", location: "Sector 22 Perimeter North", dose_uSv_h: 0.28, status: "NOMINAL" },
            { id: "NODE-E2", location: "Outer Ring Road East Gate", dose_uSv_h: 0.31, status: "NOMINAL" },
            { id: "NODE-S3", location: "Rohini Sector 23 Boundary", dose_uSv_h: 0.29, status: "NOMINAL" },
            { id: "NODE-W4", location: "Civil Defense Muster Center", dose_uSv_h: 0.27, status: "NOMINAL" },
            { id: "NODE-C0", location: "Reactor Containment Drywell", dose_uSv_h: 184.2, status: "ALARM_INTERLOCK" }
        ]
    });
});

app.get('/api/telemetry/radiation-levels', (req, res) => {
    res.json({
        survey_timestamp: new Date().toISOString(),
        gamma_baseline: "0.24 uSv/h",
        active_reading: "0.29 uSv/h",
        airborne_particulate_cpm: 42,
        tritium_scrubber_efficiency: "99.98%"
    });
});

app.get('/api/facility/containment-status', (req, res) => {
    res.json({
        airlock_outer_seal: "ENGAGED",
        airlock_inner_seal: "ENGAGED",
        containment_pressure_kpa: 104.2,
        decay_heat_bypass: "INTERLOCK_LATCHED_0x44",
        ventilation_hepa_bank: "RECIRCULATION_MODE"
    });
});

// SCRAM Interlock Override Console
app.get('/reactor/scram/override', (req, res) => {
    if (!req.user) {
        return res.redirect('/login');
    }
    if (!res.locals.isPrivileged) {
        return res.status(403).render('error', {
            code: 403,
            title: "Access Denied: Unprivileged Role",
            message: `Current token role [${req.user.role}] does not hold Reactor Operator or Commander clearance.`
        });
    }

    const currentTokens = Number(req.userConfig.tokens);

    // Safety interlock verification: Check minimum operator token balance
    if (!currentTokens || currentTokens < 1000) {
        return res.status(403).render('scram_locked', {
            user: req.user,
            requiredTokens: 1000,
            currentTokens: currentTokens || 15
        });
    }

    // Two-step stateful check: tokens satisfied -> Render Armed Interlock Console
    res.render('scram_armed', {
        user: req.user,
        authorizedTokens: currentTokens
    });
});

// SCRAM Interlock Step 1: Arm pneumatic drive manifold & issue trip ticket
app.post('/api/scram/arm', (req, res) => {
    if (!req.user || !res.locals.isPrivileged) {
        return res.status(403).json({ status: "error", message: "Commander clearance required." });
    }

    const currentTokens = Number(req.userConfig.tokens);
    if (!currentTokens || currentTokens < 1000) {
        return res.status(403).json({
            status: "error",
            message: `Statutory safety quota unsatisfied. Active balance: ${currentTokens || 15}/1000.`
        });
    }

    const userKey = (req.user && req.user.sub) || req.ip || 'anonymous';
    const armTicket = crypto.randomBytes(16).toString('hex');
    activeArmTickets.set(userKey, {
        ticket: armTicket,
        timestamp: Date.now()
    });

    res.json({
        status: "ARMED",
        arm_ticket: armTicket,
        expires_in_seconds: 60,
        message: "SCRAM Pneumatic Rod Interlocks Armed. Emergency trip authorization code issued."
    });
});

// SCRAM Interlock Step 2: Validate trip authorization & execute physical insertion
app.post('/reactor/scram/override', (req, res) => {
    if (!req.user || !res.locals.isPrivileged) {
        return res.status(403).render('error', {
            code: 403,
            title: "Access Denied: Unprivileged Role",
            message: "Commander clearance required to execute SCRAM override."
        });
    }

    const userKey = (req.user && req.user.sub) || req.ip || 'anonymous';
    const ticketRecord = activeArmTickets.get(userKey);
    const submittedTicket = req.body.arm_ticket || req.headers['x-arm-ticket'];

    if (!submittedTicket || !ticketRecord || submittedTicket !== ticketRecord.ticket || (Date.now() - ticketRecord.timestamp > 60000)) {
        return res.status(400).render('error', {
            code: 400,
            title: "Interlock Sequence Error",
            message: "Missing, invalid, or expired SCRAM arming ticket. The safety manifold has reset."
        });
    }

    // Consume ticket (single use)
    activeArmTickets.delete(userKey);

    const currentTokens = Number(req.userConfig.tokens) || 1000;

    const userEmail = req.cookies.Web_Chall_cookie || 'participant@ctf.local';
    const dynamicFlag = makeParticipantWebFlag({
        email: userEmail,
        difficulty: 'medium',
        originalFlag: 'RAKSHNA{pr0t0typ3_p0llut10n_scv4m_c0r3}'
    });

    // SCRAM sequence completed: Issue post-incident recovery dispatch
    res.render('scram_success', {
        user: req.user,
        authorizedTokens: currentTokens,
        flag: dynamicFlag,
        scada_internal_gateway: "http://10.0.5.42:8080/scada/telemetry (Externally Mapped to Port 8003)"
    });
});

// Operator terminal configuration preferences handler
app.post('/api/employee/preferences', (req, res) => {
    if (!req.user || !res.locals.isPrivileged) {
        return res.status(403).json({ status: "error", message: "Commander or Employee clearance required." });
    }

    if (!req.body || typeof req.body !== 'object') {
        return res.status(400).json({ status: "error", message: "Invalid JSON configuration payload." });
    }

    try {
        mergeConfig(req.userConfig, req.body);

        res.json({
            status: "success",
            message: "Operator terminal preferences updated successfully.",
            applied: {
                theme: req.userConfig.theme || "institutional-light",
                alertSound: req.userConfig.alertSound !== false,
                refreshRate: req.userConfig.refreshRate || 3000
            }
        });
    } catch (err) {
        res.status(500).json({ status: "error", message: "Failed to merge preferences." });
    }
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`[+] MAIT-NRF Incident Portal live on port ${PORT}`);
});
