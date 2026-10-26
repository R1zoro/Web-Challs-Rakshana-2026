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

const JWT_SECRET = process.env.JWT_SECRET || "M41T_NRF_Int3rn4l_JvvT_S3cr3t_!2026";
const PRIVILEGED_ROLES = ["commander", "admin", "incident_commander", "employee", "operator"];

const FLAG_SALT = process.env.FLAG_SALT || "M41T_NRF_KAVACH_S3CR3T_SALT_992";

function generateFlag(email, challId) {
    const bases = {
        web_easy: "1d0r_r3v34ls_pr0cur3m3nt_l34k",
        web_medium: "pr0t0typ3_p0llut10n_scv4m_c0r3",
        web_hard: "sc4d4_ssrf_t0_rc3_pr1v3sc_m3ltd0wn"
    };
    const cleanEmail = (email || 'participant@ctf.local').trim().toLowerCase();
    const userHash = crypto.createHash('sha256')
        .update(`${FLAG_SALT}:${challId}:${cleanEmail}`)
        .digest('hex')
        .substring(0, 8);
    return `RAKSHNA{${bases[challId]}_${userHash}}`;
}

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
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
    const nextUrl = req.query.next || '/';
    const currentEmail = req.cookies.Web_Chall_cookie || '';
    const error = req.query.error || '';
    res.render('gate', { nextUrl, currentEmail, error });
});

app.post('/gate/submit', (req, res) => {
    const email = (req.body.email || '').trim();
    const nextUrl = req.body.next || '/';
    if (!email || !email.includes('@') || !email.split('@')[1] || !email.split('@')[1].includes('.')) {
        return res.redirect(`/gate?error=${encodeURIComponent('Please provide a valid email address.')}&next=${encodeURIComponent(nextUrl)}`);
    }
    res.cookie('Web_Chall_cookie', email, { maxAge: 7 * 24 * 3600 * 1000, sameSite: 'lax' });
    res.redirect(nextUrl);
});

// Per-user prototype isolation shield: prevents cross-contestant contamination!
// Each contestant (identified by their JWT subject) gets an isolated prototype context
const userSessionPrototypes = new Map();
const activeArmTickets = new Map();

function getUserPrototype(userKey) {
    if (!userSessionPrototypes.has(userKey)) {
        userSessionPrototypes.set(userKey, {});
    }
    return userSessionPrototypes.get(userKey);
}

// Single Source of Truth: JWT Authentication Middleware (Uses exclusively 'nrf_token')
app.use((req, res, next) => {
    const token = req.cookies.nrf_token || (req.headers.authorization && req.headers.authorization.split(' ')[1]);
    if (token) {
        try {
            const decoded = jwt.verify(token, JWT_SECRET);
            req.user = decoded;
        } catch (err) {
            try {
                // Fallback verification: in case participant signed with raw base64 string
                const rawB64 = Buffer.from(JWT_SECRET).toString('base64');
                const decodedB64 = jwt.verify(token, rawB64);
                req.user = decodedB64;
            } catch (err2) {
                req.user = null;
            }
        }
    } else {
        req.user = null;
    }
    res.locals.user = req.user;
    res.locals.isPrivileged = req.user && PRIVILEGED_ROLES.includes(req.user.role);

    // Isolate prototype per user ID (from JWT sub) or client IP
    const userKey = (req.user && req.user.sub) || req.ip || 'anonymous';
    const sessionProto = getUserPrototype(userKey);

    // Baseline tokens: privileged roles start with 15 tokens unless modified
    if (res.locals.isPrivileged && sessionProto.tokens === undefined) {
        sessionProto.tokens = 15;
    }

    // Object inherits from the user's isolated session prototype
    req.userConfig = Object.create(sessionProto);
    next();
});

// Operator configuration deep extension utility
function mergeConfig(target, source) {
    for (let key in source) {
        if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
            if (!target[key]) target[key] = {};
            mergeConfig(target[key], source[key]);
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
// ANTI-AI "HAYSTACK" DECOY APIS (Rich contextual data to flood agent loops)
// =========================================================================

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
        return res.redirect('/dashboard');
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
        return res.redirect('/dashboard');
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
// DECOY FACILITY MONITORING & DISPERSION APIS
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

    // GATE CHECK: Requires 1,000 Safety Tokens!
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

// STEP 1 of SCRAM: Arm Pneumatic Interlock & Issue One-Time Arming Ticket
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

// STEP 2 of SCRAM: Submit Armed Trip Authorization & Execute Physical Scram
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
    const dynamicFlag = generateFlag(userEmail, "web_medium");

    // SUCCESS! Core Scrammed -> Reveals Flag and Hard challenge IP
    res.render('scram_success', {
        user: req.user,
        authorizedTokens: currentTokens,
        flag: dynamicFlag,
        scada_internal_gateway: "http://10.0.5.42:8080/scada/telemetry (Externally Mapped to Port 8003)"
    });
});

// Operator Terminal Preferences Handler
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
