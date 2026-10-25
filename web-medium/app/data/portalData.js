/**
 * MAIT-NRF Institutional Portal Data Repository
 * Regulatory Authority: Atomic Energy Regulatory Board (AERB)
 * Facility: MAIT Nuclear Research Facility, Sector 22 Rohini, New Delhi
 */

const TICKER_NEWS = [
    "AERB Statutory Circular: Environmental Radiation Monitoring Q3 Data Published for Public Review",
    "Facility Notice: Scheduled Offsite Siren Horn Testing on Sunday 10:00 AM IST in Sector 22 Rohini",
    "Environmental Survey: Perimeter Groundwater & Aerosol Radionuclide Levels Verified Nominal",
    "Civil Protection: Joint Emergency Evacuation Muster Tabletop Exercise Scheduled for Next Month",
    "Public Disclosure: Routine Secondary Cooling Valve Recalibration Concluded Under AERB Supervision",
    "Research Wing: 10 MWth Heavy Water Thermal Neutron Flux Extraction Milestone Achieved",
    "Gazette Notification: Tender Invited for Annual Calibration of Mixed-Bed Ion-Exchange Demineralizers",
    "Civil Notice: Pre-monsoon Surface Hydrological Drainage Assessment Completed by Central Water Commission"
];

const REPORTS = [
    {
        id: "REP-2026-ENV-01",
        title: "Annual Environmental Boundary Baseline Survey & Isotopic Assay",
        category: "Environmental",
        date: "2026-10-15",
        author: "Directorate of Environmental Surveillance",
        clearance: "Public Disclosure",
        summary: "Comprehensive micro-radiological screening of soil core samples, outer drain catchment runoffs, and aerosol particulates collected within a 5km radius of MAIT-NRF. Gamma spectrometry confirms radionuclide concentrations well within natural terrestrial background limits.",
        full_text: "Under the provisions of the Atomic Energy (Radiation Protection) Rules and statutory AERB guidelines, the Directorate of Environmental Surveillance conducted the comprehensive 2026 Annual Environmental Boundary Baseline Survey. Surface soil samples, ambient dust aerosol particulates captured via high-volume air samplers, and runoffs from external stormwater catchments across Sector 22 Rohini were subjected to high-purity germanium (HPGe) gamma spectrometry.\n\nAll measured isotopes, including Cs-137, I-131, and Co-60, were below the statutory minimum detectable activity (MDA < 0.02 Bq/kg). Total terrestrial gamma dose rates recorded along the 3.8 km facility boundary perimeter ranged between 0.08 µSv/h and 0.14 µSv/h, consistent with natural background radiation typical of Indo-Gangetic alluvial formations.",
        status: "Certified Nominal"
    },
    {
        id: "REP-2026-AERB-04",
        title: "Statutory Nuclear Safety Directive Compliance Audit - Q3 2026",
        category: "Compliance",
        date: "2026-10-08",
        author: "AERB Site Inspection Committee",
        clearance: "Public Disclosure",
        summary: "Statutory third-quarter oversight review examining primary containment pressure seals, backup emergency diesel generator failover timings, and emergency core cooling interlock systems.",
        full_text: "The Atomic Energy Regulatory Board Site Inspection Committee executed an unannounced statutory audit of the MAIT Nuclear Research Facility on October 7-8, 2026. The inspection assessed three critical defense-in-depth safety layers: 1) Secondary containment airlock seal decay rates under 0.15 bar negative pressure differential, 2) Emergency Diesel Generator (EDG-1 and EDG-2) auto-start sequencer failover latency (clocked at 8.4 seconds, well below the 12-second regulatory ceiling), and 3) Seismic trip accelerometer switch calibration. The facility was awarded Full Compliance under AERB/SC/G-2026.",
        status: "Fully Compliant"
    },
    {
        id: "REP-2026-HYD-08",
        title: "Perimeter Groundwater Tritium & Heavy Water Dispersion Analysis",
        category: "Environmental",
        date: "2026-09-28",
        author: "Hydrological Monitoring Wing",
        clearance: "Public Disclosure",
        summary: "Piezometric bore-well liquid scintillation assays across Sector 22 Rohini municipal recharge zones. Deuterium-to-protium ratios show zero anthropogenic migration from moderator storage vaults.",
        full_text: "Sixteen designated piezometric test borewells surrounding the facility perimeter and adjacent Delhi Jal Board sub-aquifer recharge zones were sampled for tritium (H-3) content via electrolytic enrichment liquid scintillation counting. Baseline assays indicated tritium concentrations of < 12 Bq/L, substantially below the statutory World Health Organization drinking water guideline threshold of 10,000 Bq/L. Deuterium isotopic ratios confirmed complete integrity of underground primary moderator storage vaults.",
        status: "Certified Nominal"
    },
    {
        id: "REP-2026-THM-12",
        title: "Primary Heat Transport (PHT) Pump Vibration & Cavitation Assessment",
        category: "Technical",
        date: "2026-09-14",
        author: "Mechanical Auxiliary Section",
        clearance: "Public Disclosure",
        summary: "Fast-Fourier transform (FFT) vibration spectrum logs for primary heavy water circulation pump assemblies PHT-01 through PHT-04 under 100% rated thermal load.",
        full_text: "Fast-Fourier transform (FFT) spectrum analyzers monitored horizontal, vertical, and axial acceleration profiles on bearing housings for primary circulation pumps PHT-01 through PHT-04 during 100% rated thermal output runs. Overall vibration velocity root-mean-square (RMS) remained below 1.8 mm/s against the ISO 10816-3 Class II limit of 2.8 mm/s. Impeller cavitation acoustic signatures verified absence of sub-atmospheric localized vapor bubbles.",
        status: "Verified Nominal"
    },
    {
        id: "REP-2026-EMG-03",
        title: "Sector 22 Rohini Civil Defense Perimeter Siren & Muster Readiness Drill",
        category: "Civil Defense",
        date: "2026-09-02",
        author: "Emergency Response Directorate",
        clearance: "Public Disclosure",
        summary: "Joint multi-agency civil defense drill report executed in coordination with Delhi Disaster Management Authority. Evaluated acoustic sound coverage of 130dB perimeter sirens.",
        full_text: "In collaboration with the Delhi Disaster Management Authority (DDMA), Rohini Sub-Division Civil Defense, and Delhi Police, a simulated off-site emergency evacuation muster was conducted. Five omnidirectional 130dB sirens positioned along Sector 22 and Sector 23 arterial corridors were energized for a 90-second acoustic coverage profile. Field sound meter readings confirmed auditory penetration across 98.4% of the target residential sector. Evacuation transit corridor clearance protocols satisfied National Disaster Management guidelines.",
        status: "Exercise Completed"
    },
    {
        id: "REP-2026-SEC-09",
        title: "Containment Building Negative Pressure Envelope Integrity Verification",
        category: "Compliance",
        date: "2026-08-20",
        author: "AERB Safety Assessment Division",
        clearance: "Public Disclosure",
        summary: "High-differential airlock decay measurements validating negative atmospheric pressure maintenance across the secondary containment barrier under simulated leak conditions.",
        full_text: "Periodic structural leak rate testing (PSLRT) of the double-walled reinforced concrete containment dome was carried out. Exhaust fan train HEPA pre-filters and active carbon iodine absorption beds maintained an internal negative relative atmospheric pressure of -120 Pa under full perimeter seal condition. Permissible leakage rate was measured at 0.04% containment volume per 24 hours, well within the AERB technical specification limit of 0.1%.",
        status: "Verified Compliant"
    },
    {
        id: "REP-2026-MET-15",
        title: "Atmospheric Boundary Layer Turbulence & Pasquill Plume Dispersion Run",
        category: "Environmental",
        date: "2026-08-11",
        author: "Micrometeorological Lab",
        clearance: "Public Disclosure",
        summary: "Gaussian dispersion modeling combining ultrasonic anemometer data and sonic temperature gradients from the 60m meteorological tower located adjacent to the campus perimeter.",
        full_text: "Continuous meteorological datasets gathered at 10m, 30m, and 60m elevation nodes from the MAIT micrometeorological mast were processed utilizing the RIMPUFF atmospheric dispersion engine. Pasquill stability categories fluctuated between B (unstable daytime convective) and D (neutral evening). In hypothetical accidental noble gas release simulations, the designated Outer Ring Road buffer corridor provided adequate dilution to preserve downwind public boundary doses below 0.05 mSv per annum.",
        status: "Nominal Baseline"
    },
    {
        id: "REP-2026-CAL-02",
        title: "In-Core Flux Detector (ICFD) Platinum Emitter Calibration Log",
        category: "Technical",
        date: "2026-07-29",
        author: "Instrumentation & Control Division",
        clearance: "Public Disclosure",
        summary: "Calibration curves for 24 self-powered platinum neutron detectors (SPND) positioned within the active fuel lattice, verifying prompt response linearity.",
        full_text: "Self-powered platinum and vanadium emitter detector assemblies stationed across fuel bundle lattice quadrants were benchmarked against cobalt wire activation foils. Emitter signal latency was recorded under 15 milliseconds for prompt gamma flux transients, confirming instantaneous feedback capability to the SCADA protective shutdown system during reactivity insertion transients.",
        status: "Calibrated & Sealed"
    },
    {
        id: "REP-2026-RAD-19",
        title: "Spent Fuel Bay Secondary Purification Ion-Exchange Resin Assay",
        category: "Technical",
        date: "2026-07-14",
        author: "Radiochemistry Section",
        clearance: "Public Disclosure",
        summary: "Chemical assay of mixed-bed demineralizer columns utilized for secondary pool cooling circuit purity maintenance. Chloride and sulfate ions verified < 0.05 ppm.",
        full_text: "Routine chemical and radiochemical surveillance of the 450 m³ spent fuel storage pool water demineralization circuit. Anion and cation exchange beds maintained bulk electrical conductivity at 0.12 µS/cm at 25°C. Dissolved chloride and sulfate concentrations were measured at < 0.02 ppm and < 0.03 ppm respectively, preventing stress corrosion cracking in Zircaloy fuel cladding elements.",
        status: "Within Specifications"
    },
    {
        id: "REP-2026-CIV-07",
        title: "Public Radiological Protection Awareness & Iodine Prophylaxis Reserve Audit",
        category: "Civil Defense",
        date: "2026-06-30",
        author: "Public Health Liaison Office",
        clearance: "Public Disclosure",
        summary: "Audit of potassium iodate (KIO3) tablet stockpiles maintained at regional civil healthcare dispensaries in accordance with National Disaster Management guidelines.",
        full_text: "A joint inspection with the Directorate of Health Services examined regional stockpiles of stable potassium iodate (KIO3 85 mg) tablets stored at designated primary health centers within the 16 km emergency planning zone (EPZ). Shelf-life stability testing by high-performance liquid chromatography (HPLC) confirmed 99.2% active substance retention. Total available inventory stands at 145,000 dosage units, sufficient for 100% EPZ populace coverage in event of thyroid blocking advisory.",
        status: "Stockpiles Verified"
    },
    {
        id: "REP-2026-OPS-21",
        title: "Boric Acid Emergency Injection System (BAEIS) Fast Actuation Log",
        category: "Technical",
        date: "2026-06-18",
        author: "Reactor Operations Division",
        clearance: "Public Disclosure",
        summary: "Functional pressure discharge validation of the secondary liquid poison shutdown system utilizing natural boron tracer injection into test dummy loop.",
        full_text: "High-pressure nitrogen accumulators charging the secondary shutdown liquid poison tanks were actuated during the biannual outage cycle. Injection valves EV-201 and EV-202 achieved 90% full stroke in 180 milliseconds, dispersing 400 liters of enriched boron solution across the dummy header within 1.4 seconds. Chemical sampling validated uniform cross-sectional poison concentration exceeding 2,200 ppm natural boron equivalent.",
        status: "Actuation Certified"
    },
    {
        id: "REP-2026-AERB-02",
        title: "Half-Yearly Effluent Discharge & Liquid Waste Radiological Accounting",
        category: "Compliance",
        date: "2026-06-05",
        author: "Waste Management Directorate",
        clearance: "Public Disclosure",
        summary: "Statutory environmental submission documenting cumulative liquid radioactive discharge quantities released to controlled municipal sewer junctions.",
        full_text: "Summary of low-level radioactive liquid waste discharge for the period January 1 to June 30, 2026. Prior to discharge, all retention tanks underwent secondary evaporation, delay decay, and filtration. Total gross beta activity discharged was 0.0031 GBq against the annual authorized limit of 37 GBq (0.008% of statutory quota). Total tritium discharged was 4.2 GBq against the authorized limit of 18,500 GBq (0.02% of statutory quota).",
        status: "Regulatory Cleared"
    },
    {
        id: "REP-2026-ENG-11",
        title: "Control Rod Drive Mechanism (CRDM) Drop Time Profiling",
        category: "Technical",
        date: "2026-05-22",
        author: "Nuclear Engineering Group",
        clearance: "Public Disclosure",
        summary: "Gravitational drop timings for all 16 stainless steel clad cadmium absorber rods from fully withdrawn position to 90% core insertion depth.",
        full_text: "All 16 primary shutoff control rods were dropped under de-energized electromagnetic clutch release. Optical encoder and LVDT displacement telemetry verified mean scram drop time of 1.14 seconds to 90% insertion depth, comfortably below the statutory safety requirement of 1.80 seconds. Dashpot deceleration damping functioned with zero mechanical rebound or rod bounce.",
        status: "Specifications Met"
    },
    {
        id: "REP-2026-ENV-05",
        title: "Urban Flora & Agricultural Soil Bioaccumulation Radionuclide Assay",
        category: "Environmental",
        date: "2026-05-10",
        author: "Bio-Radiological Sciences Section",
        clearance: "Public Disclosure",
        summary: "Sampling of local flora, leafy vegetables, and dairy samples from peri-urban agricultural zones surrounding outer Rohini and Alipur.",
        full_text: "Twenty-four representative samples of seasonal vegetables, grass fodder, and raw cow milk were obtained from agrarian belts within the 8km radius of MAIT-NRF. Gamma spectrum analysis detected only naturally occurring Potassium-40 (K-40) and cosmogenic Beryllium-7 (Be-7). Radiocesium (Cs-137) and Strontium-90 (Sr-90) were below detection limits (< 0.05 Bq/kg fresh weight), confirming zero food chain contamination.",
        status: "Certified Nominal"
    },
    {
        id: "REP-2026-SEC-04",
        title: "Physical Perimeter Access Control & Biometric Boundary Security Audit",
        category: "Compliance",
        date: "2026-04-29",
        author: "Security & Safeguards Group",
        clearance: "Public Disclosure",
        summary: "Biannual audit of smart card badges, vehicle portal radiation gate monitors, and microwave boundary intrusion detection fences.",
        full_text: "Physical boundary intrusion detection systems (PIDS) comprising taut-wire sensors, infrared barriers, and Doppler microwave monitors along the 4.2 km campus security perimeter were tested against 100 simulated breach scenarios. Detection probability reached 99.1% with zero false negative incidents. Vehicle radiological gateway monitors successfully alarmed on unshielded 10 kBq Co-60 test calibration check sources.",
        status: "Audit Verified"
    },
    {
        id: "REP-2026-THM-07",
        title: "Secondary Cooling Loop Heat Exchanger Tube Eddy Current Inspection",
        category: "Technical",
        date: "2026-04-14",
        author: "Non-Destructive Testing (NDT) Lab",
        clearance: "Public Disclosure",
        summary: "Multi-frequency eddy current examination of 1,280 titanium condenser tubes in heat exchangers HX-01 and HX-02.",
        full_text: "Differential bobbin coil eddy current testing was performed on 100% of the titanium tubing in secondary cooling heat exchangers HX-01 and HX-02. Zero wall loss exceeding 15% was observed (plugging threshold: 40%). Fretting wear at baffle plate intersections was measured below 0.08 mm. The heat exchangers are approved for unrestricted continuous thermal operations through 2028.",
        status: "NDT Cleared"
    },
    {
        id: "REP-2026-CIV-03",
        title: "Off-Site Public Warning System Telemetry & GSM Broadcast Testing",
        category: "Civil Defense",
        date: "2026-03-31",
        author: "Emergency Communication Wing",
        clearance: "Public Disclosure",
        summary: "Integration test of cell broadcast emergency alerting and digital VHF telemetry linkages connecting the facility to Rohini District Emergency Operation Centre.",
        full_text: "High-priority cell broadcast geo-fencing signals were transmitted in test sandbox mode over cellular networks operating in the North-West Delhi telecom circle. Latency between simulated SCRAM alert initiation and receipt of emergency broadcast message across 100 test devices averaged 4.6 seconds. VHF/UHF tactical radio repeaters on Ridge Hill and Rohini Sector 14 remained 100% operational on backup solar storage.",
        status: "Telemetry Validated"
    },
    {
        id: "REP-2026-MET-08",
        title: "Pre-Monsoon Extreme Meteorological & Flood Inundation Safeguards",
        category: "Environmental",
        date: "2026-03-18",
        author: "Civil Engineering Section",
        clearance: "Public Disclosure",
        summary: "Assessment of facility storm drains, perimeter retention bunds, and submersible sump dewatering pumps against 100-year Delhi rainfall models.",
        full_text: "A hydrologic survey evaluated campus drainage under maximum probable precipitation (MPP) of 240 mm in 24 hours. The main reactor building plinth is positioned at elevation +218.4 m MSL, 2.6 meters above the highest historical flood level of the Najafgarh-Rohini supplementary drain. Automated submersible sump pumps P-701 through P-704 were load-tested at 450 m³/h pumping capacity.",
        status: "Defense Cleared"
    },
    {
        id: "REP-2026-CAL-01",
        title: "Area Gamma Radiation Monitor (AGM) Annual Ionization Chamber Calibration",
        category: "Technical",
        date: "2026-03-02",
        author: "Radiological Safety Division",
        clearance: "Public Disclosure",
        summary: "NIST-traceable Caesium-137 collimated beam calibration of 38 fixed area gamma detectors across reactor hall, spent fuel pool, and radiochemistry bays.",
        full_text: "Thirty-eight pressurized ionization chamber detectors and GM tube stations were calibrated across six radiation exposure levels ranging from 0.05 µSv/h to 10 mSv/h using a certified 370 GBq Cs-137 calibration source at the BARC-accredited secondary standards dosimetry laboratory. Linearity coefficients exceeded 0.998 with zero instrument drift exceeding 3.5% over 12 months.",
        status: "Certified & Tagged"
    },
    {
        id: "REP-2026-AERB-01",
        title: "Annual Collective Occupational Radiation Exposure Accounting - FY 2025-26",
        category: "Compliance",
        date: "2026-02-15",
        author: "Health Physics Unit",
        clearance: "Public Disclosure",
        summary: "Analysis of thermo-luminescent dosimeter (TLD) badges and electronic personal dosimeters (EPD) worn by 184 designated radiation workers.",
        full_text: "During the 2025-26 fiscal year, cumulative collective radiation dose incurred across all 184 radiation workers at MAIT-NRF was 18.4 person-mSv. Maximum individual annual dose received was 2.8 mSv (recorded by a primary coolant maintenance technician), which is only 14% of the statutory AERB individual limit of 20 mSv/year. Zero radiological contamination incidents or internal intakes were recorded by whole-body counting.",
        status: "ALARA Compliant"
    },
    {
        id: "REP-2026-THM-03",
        title: "Heavy Water Moderator Purification Circuit Resins Re-bedding Report",
        category: "Technical",
        date: "2026-02-01",
        author: "Radiochemistry Section",
        clearance: "Public Disclosure",
        summary: "Deuterated ion-exchange resin column replacement and heavy water isotopic purity analysis showing 99.82 wt% D2O.",
        full_text: "Deuterated nuclear grade mixed-bed ion exchange resins in purification column MOD-IX-01 were replaced under closed helium blanket conditions to prevent isotopic degradation from atmospheric humidity. Mass spectrometry of the bulk moderator inventory verified heavy water isotopic purity of 99.82 wt% D2O, with boron and cadmium parasitic neutron poisons below 0.01 ppm.",
        status: "Rebedding Complete"
    },
    {
        id: "REP-2026-SEC-01",
        title: "Cyber Security & SCADA Air-Gap Perimeter Audit - Q1 2026",
        category: "Compliance",
        date: "2026-01-22",
        author: "Information Security Section",
        clearance: "Public Disclosure",
        summary: "Physical and logical air-gap integrity verification separating the internal SCADA reactor control network from the public transparency web portal.",
        full_text: "In accordance with AERB Safety Guide on Computer Based Systems of Nuclear Facilities (AERB/SG/D-25), an independent red-team security assessment validated the unidirectional data diode link connecting the reactor instrumentation LAN to the demilitarized zone (DMZ). All operational control circuits remain completely air-gapped from public network interfaces.",
        status: "Air-Gap Certified"
    },
    {
        id: "REP-2026-ENV-18",
        title: "Winter Boundary Micro-Meteorological Inversion & Plume Diffusion Study",
        category: "Environmental",
        date: "2026-01-10",
        author: "Micrometeorological Lab",
        clearance: "Public Disclosure",
        summary: "Acoustic SODAR and sonic anemometer profiling of surface temperature inversions typical of Delhi winter conditions.",
        full_text: "Low-level thermal inversions occurring between 22:00 IST and 08:00 IST during December and January were profiled. Ground-based radiation inversion layers frequently capped nocturnal boundary layer heights at 120-180 meters. Stack emission modeling confirmed that the 75-meter high ventilation stack breaches shallow nocturnal inversions, ensuring elevated plume dispersal above the ground inversion ceiling.",
        status: "Study Completed"
    },
    {
        id: "REP-2025-AERB-12",
        title: "Comprehensive Decennial Reactor Safety Re-authorization Submission",
        category: "Compliance",
        date: "2025-12-18",
        author: "Safety Analysis Group",
        clearance: "Public Disclosure",
        summary: "Probabilistic Safety Assessment (PSA Level 1 & 2) and deterministic transient analysis submitted for 10-year operating license renewal.",
        full_text: "Submission to the AERB Advisory Committee for Nuclear Safety (ACNS). Comprehensive Probabilistic Safety Assessment (PSA Level 1) estimated the Core Damage Frequency (CDF) at 1.4 × 10⁻⁶ per reactor-year, significantly superior to international research reactor safety benchmarks. Deterministic analyses for design-basis accidents (DBA) demonstrated peak clad temperatures remaining below 650°C during loss-of-flow transients.",
        status: "License Renewed"
    },
    {
        id: "REP-2025-OPS-33",
        title: "Emergency Power Supply Diesel Generator 72-Hour Continuous Run Test",
        category: "Technical",
        date: "2025-11-28",
        author: "Electrical Engineering Division",
        clearance: "Public Disclosure",
        summary: "Full electrical load testing of 1,250 kVA Caterpillar backup diesel generators under simulated total station blackout (SBO).",
        full_text: "Emergency Diesel Generators EDG-1 and EDG-2 were subjected to a 72-hour continuous endurance run at 100% rated electrical load (1,250 kVA each) utilizing resistive load banks. Lube oil temperatures, fuel injector pump pressure profiles, and voltage regulation remained within ± 1.2% of nominal 415V 50Hz standards. Fuel day-tank gravity feeds and bulk fuel storage reserves (25,000 liters) confirmed uninterrupted 7-day autonomous operation.",
        status: "Pass - Full Load"
    },
    {
        id: "REP-2025-CIV-14",
        title: "Multi-Agency Nuclear Hospital Triage & Decontamination Facility Exercise",
        category: "Civil Defense",
        date: "2025-11-12",
        author: "Radiation Medicine Unit",
        clearance: "Public Disclosure",
        summary: "Tabletop and field decontamination drill conducted at Dr. BSA Hospital, Rohini, for managing simulated radiation burn casualties.",
        full_text: "A simulated mass radiological casualty triage drill was conducted in coordination with the Department of Atomic Energy Medical Division and Dr. BSA Hospital Rohini. Medical personnel practiced alpha/beta whole-body surveying, chemical chelation therapy protocols (Ca-DTPA administration for internal actinide deposition), and surgical decontamination of contaminated wounds under Class 10,000 positive pressure cleanroom surgical suites.",
        status: "Drill Completed"
    },
    {
        id: "REP-2025-HYD-04",
        title: "Sector 22 Soil Permeability & Hydraulic Vadose Zone Sorption Profiling",
        category: "Environmental",
        date: "2025-10-30",
        author: "Hydrological Monitoring Wing",
        clearance: "Public Disclosure",
        summary: "Distribution coefficient (Kd) measurements for Caesium and Strontium across sandy silt lithological horizons down to 40 meters depth.",
        full_text: "Core borehole drilling across three azimuths around the containment perimeter established the distribution coefficient (Kd) of unsaturated alluvial silts. Caesium sorption coefficients averaged 480 mL/g, and Strontium averaged 85 mL/g. Hydraulic conductivities verified low advective migration velocities (0.004 m/day), providing significant natural geological retention barriers in the hypothetical event of subsurface liquid pipe breach.",
        status: "Baseline Established"
    },
    {
        id: "REP-2025-ENG-08",
        title: "Containment Isolation Butterfly Valve Fast-Closing Actuator Overhaul",
        category: "Technical",
        date: "2025-10-14",
        author: "Mechanical Auxiliary Section",
        clearance: "Public Disclosure",
        summary: "Pneumatic piston seal replacements and stroke velocity timing on 600mm containment ventilation isolation valves CV-101 and CV-102.",
        full_text: "Dual pneumatic spring-return isolation valves on the ventilation intake and exhaust penetrations were overhauled with Viton-GLT elastomer seatings. On simulated high-radiation signal from the stack monitors, closure time was clocked at 0.85 seconds, far exceeding the 2.5-second technical specification criteria. Bubble leak testing with soapy helium under 0.5 bar pressure revealed zero discernible boundary leaks.",
        status: "Certified & Tagged"
    },
    {
        id: "REP-2025-RAD-11",
        title: "Neutron Beam Hall Stray Dose Rate Mapping During 100% Thermal Power",
        category: "Technical",
        date: "2025-09-29",
        author: "Health Physics Unit",
        clearance: "Public Disclosure",
        summary: "Thermal and epithermal neutron flux mapping around experimental radial beam ports 1 through 6 using helium-3 rem-counters.",
        full_text: "Comprehensive radiological survey of the research reactor beam hall was conducted at full 10 MWth thermal power with all six beam shutters open. Stray fast and thermal neutron dose rates at the exterior face of the heavy barite concrete biological shield were below 0.8 µSv/h. Gamma field levels at experimental sample stations were below 1.2 µSv/h, confirming complete radiation safety for research academic users.",
        status: "Nominal Baseline"
    },
    {
        id: "REP-2025-AERB-09",
        title: "Periodic Review of Technical Specifications for Facility Operation (TSFO)",
        category: "Compliance",
        date: "2025-09-15",
        author: "AERB Site Inspection Committee",
        clearance: "Public Disclosure",
        summary: "Revision and formal gazetting of Limiting Conditions for Operation (LCO) covering reactor pool temperature, coolant flow, and reactivity limits.",
        full_text: "The revised Technical Specifications for Facility Operation (TSFO Amendment 4) received formal assent from the Atomic Energy Regulatory Board. The amendments tighten primary coolant inlet temperature limits from 42°C to 38°C during peak summer months and mandate redundant ultrasonic flow meter cross-checks on primary cooling loops before rod withdrawal authorization is enabled.",
        status: "Gazetted & Enforced"
    },
    {
        id: "REP-2025-ENV-14",
        title: "Rainwater Harvesting Pit Radiological & Heavy Metal Chemical Screening",
        category: "Environmental",
        date: "2025-08-25",
        author: "Directorate of Environmental Surveillance",
        clearance: "Public Disclosure",
        summary: "Assay of four high-capacity recharge wells collecting rooftop runoff from academic and administrative blocks.",
        full_text: "Rooftop runoff collection cisterns and storm injection wells across the MAIT campus were analyzed post-monsoon. Inductively Coupled Plasma Mass Spectrometry (ICP-MS) and liquid scintillation counting revealed lead, arsenic, and cadmium levels below standard BIS 10500 drinking water norms. Gross alpha and beta counts were negligible (< 0.01 Bq/L), confirming safe aquifer replenishment.",
        status: "Certified Pure"
    },
    {
        id: "REP-2025-CIV-09",
        title: "Perimeter Public Address & Outdoor Megaphone Array Acoustic Mapping",
        category: "Civil Defense",
        date: "2025-08-04",
        author: "Emergency Communication Wing",
        clearance: "Public Disclosure",
        summary: "Sound propagation analysis for 36 digital high-output outdoor loudspeakers installed along public perimeter thoroughfares.",
        full_text: "Acoustic decibel readings taken across residential sectors 21, 22, and 24 during controlled voice test announcements showed an average signal-to-noise ratio of +18 dB above urban ambient traffic noise. The automated dual-language (Hindi and English) emergency announcement controller was certified for immediate activation from the Incident Commander console.",
        status: "Operational"
    },
    {
        id: "REP-2025-OPS-17",
        title: "Sub-critical Reactivity Margin & Shutdown Margin (SDM) Verification",
        category: "Technical",
        date: "2025-07-20",
        author: "Reactor Physics Section",
        clearance: "Public Disclosure",
        summary: "Inverse count rate ratio (1/M) approach curves during fuel re-shuffling and fresh core assembly reload.",
        full_text: "Following core reload with four fresh LEU-19.75% fuel clusters, the Shutdown Margin (SDM) was experimentally verified with the most reactive control rod fully withdrawn and stuck. The measured SDM was -3.42% delta-k/k, comfortably exceeding the statutory minimum requirement of -1.50% delta-k/k under standard cold shutdown conditions.",
        status: "Verified Safe"
    },
    {
        id: "REP-2025-AERB-06",
        title: "Occupational Fire Safety & Automatic Halon Alternative System Audit",
        category: "Compliance",
        date: "2025-07-01",
        author: "Industrial Safety Section",
        clearance: "Public Disclosure",
        summary: "Inspection of clean-agent Novec 1230 fire suppression cylinders protecting the reactor main control room and cable spreading rooms.",
        full_text: "The annual fire protection audit inspected 48 gaseous fire suppression zones across the reactor building, electrical switchyard, and auxiliary control vaults. All Novec 1230 high-pressure storage cylinders demonstrated correct nitrogen super-pressurization (25 bar). Smoke aspirating VESDA early-warning laser detectors achieved detection thresholds of 0.015% obscuration per meter.",
        status: "Certified Compliant"
    },
    {
        id: "REP-2025-THM-01",
        title: "Demineralized Water Make-up Plant Reverse Osmosis Membrane Integrity",
        category: "Technical",
        date: "2025-06-15",
        author: "Water Chemistry Division",
        clearance: "Public Disclosure",
        summary: "Salt rejection and permeate flux benchmarking for the 20 m³/h double-pass reverse osmosis (RO) and electro-deionization (EDI) train.",
        full_text: "The water makeup plant supplying high-purity water to the primary pool and secondary cooling circuits was evaluated. Salt rejection on polyamide thin-film composite membranes stood at 99.4%. Total dissolved solids (TDS) in product permeate remained below 0.2 ppm, ensuring prolonged operational lifetime of nuclear-grade polishing resin beds.",
        status: "Within Limits"
    },
    {
        id: "REP-2025-SEC-02",
        title: "Radiation Emergency Response Force (RERF) Annual Tactical Readiness",
        category: "Civil Defense",
        date: "2025-05-30",
        author: "Emergency Response Directorate",
        clearance: "Public Disclosure",
        summary: "Rapid-response tactical deployment drill evaluating Hazmat Level-A encapsulated suit donning and containment perimeter isolation.",
        full_text: "The dedicated on-site Radiation Emergency Response Force (RERF) conducted a full tactical mobilization exercise under simulated primary line rupture conditions. Response teams donned positive-pressure SCBA Level-A encapsulating suits in 2 minutes 45 seconds, executed perimeter radiological cordoning within 6 minutes, and deployed portable mobile air sampling carts at designated fence outposts.",
        status: "Readiness Validated"
    },
    {
        id: "REP-2025-ENV-09",
        title: "Biological Shield Barite Concrete Gamma Attenuation Factor Testing",
        category: "Technical",
        date: "2025-05-12",
        author: "Civil Engineering Section",
        clearance: "Public Disclosure",
        summary: "Gamma transmission measurements across 2.2-meter thick high-density barite concrete walls surrounding the reactor pool tank.",
        full_text: "High-density barite concrete (density 3.55 g/cm³) comprising the main biological shield was inspected via transmission radiography using an intense 1.85 TBq Co-60 industrial source. Measured linear attenuation coefficients (mu) were 0.28 cm⁻¹, exactly matching theoretical design tolerances. Ultrasonic pulse velocity measurements verified zero internal micro-voids or honeycombing.",
        status: "Structural Integrity Sound"
    },
    {
        id: "REP-2025-CAL-04",
        title: "Effluent Stack Monitor Beta/Noble Gas Scintillation Channel Overhaul",
        category: "Technical",
        date: "2025-04-25",
        author: "Instrumentation & Control Division",
        clearance: "Public Disclosure",
        summary: "PMT detector replacements and Kr-85 gas calibration of the isokinetic main exhaust stack radiometer.",
        full_text: "The isokinetic sampling manifold located at the 45-meter level of the main exhaust stack was inspected. Photomultiplier tubes (PMT) on plastic scintillation beta detectors were replaced and recalibrated using NIST-traceable Krypton-85 gas standards. Isokinetic flow regulation maintained nozzle suction velocities within 4% of stack duct velocity across all ventilation fan speeds.",
        status: "Calibrated & Sealed"
    },
    {
        id: "REP-2025-AERB-03",
        title: "Biannual Toxic Gas Release & Chemical Hazardous Storage Review",
        category: "Compliance",
        date: "2025-04-05",
        author: "AERB Site Inspection Committee",
        clearance: "Public Disclosure",
        summary: "Verification of chlorine gas neutralizing scrubbers and liquefied nitrogen cryogenic storage safety envelopes.",
        full_text: "Storage installations containing liquid nitrogen, anhydrous ammonia for water chemistry conditioning, and sodium hypochlorite were audited under Chemical Hazards Rules. Automatic scrubbers equipped with dual caustic soda circulation pumps neutralized simulated 500 ppm chlorine leaks to undetectable levels at the exhaust stack in less than 40 seconds.",
        status: "Certified Safe"
    },
    {
        id: "REP-2025-MET-03",
        title: "Severe Weather Ultrasonic Anemometer Vector Accuracy Benchmarking",
        category: "Environmental",
        date: "2025-03-20",
        author: "Micrometeorological Lab",
        clearance: "Public Disclosure",
        summary: "Comparison of 3D sonic anemometer readings against Delhi Safdarjung Meteorological Observatory reference stations.",
        full_text: "Three-dimensional ultrasonic anemometers mounted on the MAIT micrometeorological mast underwent simultaneous benchmark comparisons against Indian Meteorological Department (IMD) Safdarjung standards. Wind velocity correlation stood at r = 0.982, and azimuth directional accuracy was within ± 1.5 degrees, confirming high precision for downstream public dispersion modeling.",
        status: "Verified Nominal"
    },
    {
        id: "REP-2025-OPS-09",
        title: "Reactor Pool Thermal Stratification & Convective Natural Circulation Run",
        category: "Technical",
        date: "2025-03-01",
        author: "Reactor Operations Division",
        clearance: "Public Disclosure",
        summary: "Coolant pump trip test validating transition from forced circulation to passive natural convection decay heat removal.",
        full_text: "At 100% rated thermal output, primary coolant circulation pumps were tripped to simulate complete loss of forced cooling. Natural convection circulation flap valves swung open smoothly under gravity. Peak pool temperature stabilized at 54°C after 6 hours, confirming passive decay heat removal capability without any active operator intervention.",
        status: "Passive Safety Validated"
    },
    {
        id: "REP-2025-SEC-03",
        title: "Annual Safeguards Material Balance & Nuclear Fuel Inventory Accounting",
        category: "Compliance",
        date: "2025-02-14",
        author: "Security & Safeguards Group",
        clearance: "Public Disclosure",
        summary: "Physical inventory taking (PIT) and non-destructive assay of all low-enriched uranium fuel bundles in the presence of AERB inspectors.",
        full_text: "Physical Inventory Taking (PIT) of all LEU fuel assemblies in the active core lattice, spent fuel cooling bays, and fresh fuel storage vault was executed. High-resolution gamma spectrometry and Cerenkov radiation viewing devices confirmed 100% fuel assembly serial number matching and seal integrity. Material Unaccounted For (MUF) was verified as zero grams.",
        status: "Safeguards Cleared"
    },
    {
        id: "REP-2025-CIV-02",
        title: "Regional Blood Bank & Radiation Cytogenetic Biodosimetry Capability Review",
        category: "Civil Defense",
        date: "2025-01-28",
        author: "Public Health Liaison Office",
        clearance: "Public Disclosure",
        summary: "Evaluation of dicentric chromosome assay capabilities at designated tertiary medical centers for triage dosimetry.",
        full_text: "A coordination audit with the Institute of Nuclear Medicine and Allied Sciences (INMAS) reviewed regional cytogenetic biodosimetry preparedness. Automated dicentric chromosome score analysis systems can process 300 blood samples within 48 hours to provide definitive biological dose estimates (0.1 Gy to 5.0 Gy) in the event of an off-site radiation incident.",
        status: "Protocol Established"
    },
    {
        id: "REP-2025-THM-05",
        title: "Emergency Core Makeup Tank (ECMT) Gravity Feed Flow Rate Testing",
        category: "Technical",
        date: "2025-01-12",
        author: "Mechanical Auxiliary Section",
        clearance: "Public Disclosure",
        summary: "Full discharge flow benchmarking of the 60,000-liter overhead emergency gravity supply reservoir into the reactor pool header.",
        full_text: "The elevated Emergency Core Makeup Tank (ECMT), positioned 18 meters above the reactor core datum, was discharge-tested via pneumatic dump valve actuation. Gravity flow delivered 145 liters per second of demineralized light water into the core plenum, sustaining adequate core submergence and preventing fuel uncover for a minimum of 72 hours under design-basis LOCA conditions.",
        status: "Pass - Full Delivery"
    },
    {
        id: "REP-2024-AERB-10",
        title: "Biannual Review of Quality Assurance Program for Reactor Operations (QAPRO)",
        category: "Compliance",
        date: "2024-12-20",
        author: "AERB Site Inspection Committee",
        clearance: "Public Disclosure",
        summary: "Audit of maintenance logs, non-conformance reports, and personnel qualification records against AERB Code of Practice on Quality Assurance.",
        full_text: "Quality Assurance oversight reviewed 420 corrective work orders and 18 engineering modification proposals processed during 2024. All technical alterations to safety-related class 1E instrumentation adhered strictly to AERB Code of Practice (AERB/SC/QA). All certified operators successfully completed annual simulator requalification examinations.",
        status: "Full Compliance"
    }
];

const NOTIFICATIONS = [
    {
        id: "NOTIF-2026-45",
        ref: "AERB/DIR/2026/OCT-45",
        title: "Statutory Environmental Radiation Monitoring Q3 Data Published for Public Review",
        date: "2026-10-22",
        category: "Regulatory Gazette",
        department: "Directorate of Radiation Safety & AERB Cell",
        summary: "The quarterly compilation of gamma absorption rates, soil assay records, and hydrological sampling for the period July-September 2026 has been published on the public disclosure index in accordance with Section 14 mandates.",
        status: "Published"
    },
    {
        id: "NOTIF-2026-44",
        ref: "MAIT/ADM/2026/S-882",
        title: "Facility Notice: Scheduled Offsite Siren Horn Testing in Sector 22 Rohini",
        date: "2026-10-20",
        category: "Public Notice",
        department: "Emergency Response Directorate",
        summary: "Notice to residents of Sector 22, Rohini: Scheduled bi-weekly testing of 130dB perimeter sirens will be conducted on Sunday at 10:00 AM IST for 90 seconds. Citizens are advised this is routine acoustic verification and no civil action is needed.",
        status: "Active"
    },
    {
        id: "NOTIF-2026-43",
        ref: "MAIT/ENG/2026/T-104",
        title: "Tender Notice: Supply of Nuclear Grade Mixed-Bed Ion Exchange Resins (D2O Grade)",
        date: "2026-10-18",
        category: "Procurement",
        department: "Central Stores & Materials Wing",
        summary: "E-tenders are invited from AERB-registered manufacturers for the procurement of 2,400 liters of pre-deuterated mixed-bed ion exchange resin beads for secondary moderator purification columns.",
        status: "Open"
    },
    {
        id: "NOTIF-2026-42",
        ref: "AERB/COMP/2026/V-91",
        title: "Statutory Compliance: Secondary Cooling Valve Recalibration Concluded",
        date: "2026-10-14",
        category: "Compliance",
        department: "Mechanical Auxiliary Section",
        summary: "Quarterly stroke timing and acoustic emission verification on pneumatic fail-safe valves CV-201 through CV-204 completed under direct AERB resident engineer supervision.",
        status: "Completed"
    },
    {
        id: "NOTIF-2026-41",
        ref: "MAIT/RES/2026/CIR-19",
        title: "Research Call: Beam Time Proposals for High-Flux Neutron Powder Diffractometer (ND-01)",
        date: "2026-10-10",
        category: "Academic",
        department: "Neutron Beam Research Facility (NBRF)",
        summary: "Proposals are invited from faculty and doctoral scholars of recognized Indian universities and national laboratories for academic beam time allocations during Winter Cycle 2026.",
        status: "Open"
    },
    {
        id: "NOTIF-2026-40",
        ref: "MAIT/SEC/2026/O-302",
        title: "Perimeter Security Advisory: RFID Smart Gate Calibration at North Gate 1",
        date: "2026-10-06",
        category: "Security",
        department: "Security & Safeguards Group",
        summary: "All personnel and visiting academic researchers are informed that vehicular radiation gate monitors and UHF RFID gantries at North Gate 1 will undergo recalibration between 14:00 and 18:00 IST.",
        status: "Active"
    },
    {
        id: "NOTIF-2026-39",
        ref: "AERB/RAD/2026/G-82",
        title: "Gazette Notification: Environmental Boundary Radionuclide Limits for NCR Facilities",
        date: "2026-10-01",
        category: "Regulatory Gazette",
        department: "Atomic Energy Regulatory Board",
        summary: "Notification of revised administrative baseline limits for public dose constraints at the boundary of research and isotope production facilities situated within urban metropolitan perimeters.",
        status: "Enacted"
    },
    {
        id: "NOTIF-2026-38",
        ref: "MAIT/CIV/2026/DM-14",
        title: "Joint Civil Defense Muster Tabletop Exercise: Coordination Meeting Notice",
        date: "2026-09-26",
        category: "Civil Defense",
        department: "Emergency Response Directorate",
        summary: "Notice convening a joint preparatory coordination session with Rohini Sub-Division Disaster Management Authority, Delhi Fire Services, and regional police leadership.",
        status: "Concluded"
    },
    {
        id: "NOTIF-2026-37",
        ref: "MAIT/MED/2026/RAD-55",
        title: "Medical Wing: Medical Radioisotope Molybdenum-99 Extraction Schedule",
        date: "2026-09-21",
        category: "Radiopharmaceuticals",
        department: "Radiochemistry Section",
        summary: "Irradiated LEU foil target dissolution and chromatographic separation of 150 Curie batch of medical fission Mo-99 scheduled for supply to regional cancer imaging institutions.",
        status: "Completed"
    },
    {
        id: "NOTIF-2026-36",
        ref: "MAIT/ENG/2026/T-098",
        title: "Tender Notice: Annual Maintenance Contract for 60m Micrometeorological Tower Sensors",
        date: "2026-09-17",
        category: "Procurement",
        department: "Micrometeorological Lab",
        summary: "Sealed bids invited for calibration, bearing replacement, and data acquisition telemetry servicing for 3D sonic anemometers and hygrometers on the 60m met tower.",
        status: "Closed"
    },
    {
        id: "NOTIF-2026-35",
        ref: "AERB/DIR/2026/SEP-22",
        title: "Statutory Directive: Fire Suppression Agent Replacement in Switchgear Rooms",
        date: "2026-09-12",
        category: "Regulatory Gazette",
        department: "Industrial Safety Section",
        summary: "Directing all nuclear facilities to complete phased replacement of legacy halocarbon storage vessels with clean fluorinated ketone (Novec 1230) gas flooding equipment.",
        status: "Mandatory"
    },
    {
        id: "NOTIF-2026-34",
        ref: "MAIT/ENV/2026/B-112",
        title: "Environmental Circular: Pre-Monsoon Deep Aquifer Piezometric Borewell Sampling",
        date: "2026-09-08",
        category: "Environmental",
        department: "Hydrological Monitoring Wing",
        summary: "Field technicians will carry out isotopic water sampling across outer Rohini monitoring wells from September 10 to September 15. Local community cooperation is appreciated.",
        status: "Completed"
    },
    {
        id: "NOTIF-2026-33",
        ref: "MAIT/OPS/2026/CR-04",
        title: "Reactor Outage Notice: 48-Hour Scheduled Cold Shutdown for Cadmium Absorber Inspection",
        date: "2026-09-01",
        category: "Operations",
        department: "Reactor Operations Division",
        summary: "Reactor operations will transition to cold sub-critical standby for 48 hours commencing Friday 22:00 IST for statutory optical alignment of control rod guides.",
        status: "Completed"
    },
    {
        id: "NOTIF-2026-32",
        ref: "MAIT/ADM/2026/CIR-88",
        title: "Administrative Order: Radiation Worker Annual Medical Fitness Examinations",
        date: "2026-08-27",
        category: "Administrative",
        department: "Occupational Health Centre",
        summary: "All Class-A radiation workers are directed to report to the Occupational Health Centre for mandatory complete blood count (CBC), peripheral smear, and ophthalmological lens examinations.",
        status: "Active"
    },
    {
        id: "NOTIF-2026-31",
        ref: "AERB/LIC/2026/AM-03",
        title: "Public Disclosure: TSFO Amendment Gazetted Regarding Secondary Coolant Flows",
        date: "2026-08-20",
        category: "Regulatory Gazette",
        department: "Atomic Energy Regulatory Board",
        summary: "Public notification confirming official gazetting of amended Technical Specifications for Facility Operations, mandating triple-redundant flow sensors.",
        status: "Gazetted"
    },
    {
        id: "NOTIF-2026-30",
        ref: "MAIT/ENG/2026/T-091",
        title: "Tender Notice: Supply and Installation of High-Purity Germanium (HPGe) Gamma Detector",
        date: "2026-08-15",
        category: "Procurement",
        department: "Radiological Safety Division",
        summary: "Bids invited for a 50% relative efficiency p-type coaxial HPGe detector with integrated electrically cooled cryostat for low-background environmental soil assays.",
        status: "Under Evaluation"
    },
    {
        id: "NOTIF-2026-29",
        ref: "MAIT/SEC/2026/AD-12",
        title: "Security Directive: Prohibition of Unregistered Wireless Transceivers Within Zone-1",
        date: "2026-08-10",
        category: "Security",
        department: "Security & Safeguards Group",
        summary: "Notice re-emphasizing strict air-gap compliance. No unauthorized Bluetooth, Wi-Fi, or cellular devices may be carried across Zone-1 airlock perimeter checkpoints.",
        status: "Strictly Enforced"
    },
    {
        id: "NOTIF-2026-28",
        ref: "MAIT/CIV/2026/PUB-05",
        title: "Community Outreach: Open House on Nuclear Energy & Radiation Safety for School Students",
        date: "2026-08-04",
        category: "Public Notice",
        department: "Public Health Liaison Office",
        summary: "In celebration of National Science Day, MAIT-NRF will host senior secondary school science students from North-West Delhi for interactive laboratory demonstrations and radiation awareness talks.",
        status: "Completed"
    },
    {
        id: "NOTIF-2026-27",
        ref: "AERB/SAF/2026/B-15",
        title: "Safety Bulletin: Lessons Learned From Global Research Reactor Unplanned Scram Incidents",
        date: "2026-07-28",
        category: "Safety Bulletin",
        department: "Safety Analysis Group",
        summary: "Technical circular disseminating operational experience feedback and preventative maintenance guidelines concerning electromagnetic scram clutch coil thermal fatigue.",
        status: "Circulated"
    },
    {
        id: "NOTIF-2026-26",
        ref: "MAIT/RES/2026/SEM-08",
        title: "Symposium Notice: National Workshop on Advanced Thorium Fuel Cycles in Research Reactors",
        date: "2026-07-22",
        category: "Academic",
        department: "Theoretical Physics Division",
        summary: "Call for delegates and technical papers for the three-day national symposium on thorium oxide (ThO2) blanket neutronic optimization scheduled at MAIT Auditorium.",
        status: "Upcoming"
    },
    {
        id: "NOTIF-2026-25",
        ref: "MAIT/ENG/2026/T-084",
        title: "Tender Notice: Structural Epoxy Painting of Secondary Containment Outer Dome Surface",
        date: "2026-07-16",
        category: "Procurement",
        department: "Civil Engineering Section",
        summary: "Tenders invited for surface preparation, anti-carbonation sealing, and radiation-resistant aliphatic polyurethane protective coatings across 4,200 sq.m of external concrete dome.",
        status: "Awarded"
    },
    {
        id: "NOTIF-2026-24",
        ref: "AERB/DIR/2026/JUL-09",
        title: "Statutory Order: Quarterly Calibration Validation of Self-Powered Platinum Flux Detectors",
        date: "2026-07-10",
        category: "Regulatory Gazette",
        department: "Instrumentation & Control Division",
        summary: "Verification directive mandating simultaneous foil activation comparisons for prompt-response in-core SPND sensors prior to initiating high-power fuel burnup cycles.",
        status: "Enforced"
    },
    {
        id: "NOTIF-2026-23",
        ref: "MAIT/ENV/2026/W-84",
        title: "Environmental Notice: Stormwater Discharge Sump Clearance and Sediment Filtration",
        date: "2026-07-03",
        category: "Environmental",
        department: "Directorate of Environmental Surveillance",
        summary: "Pre-monsoon desludging and gamma radiometric scanning of sediment catchments at campus perimeter outfall valves completed with zero radioactive anomalies detected.",
        status: "Completed"
    },
    {
        id: "NOTIF-2026-22",
        ref: "MAIT/OPS/2026/EDG-02",
        title: "Operational Notification: Biannual Full-Load Run of 1250 kVA Standby Diesel Generators",
        date: "2026-06-25",
        category: "Operations",
        department: "Electrical Engineering Division",
        summary: "Notice to campus occupants: Emergency Diesel Generators EDG-1 and EDG-2 will undergo scheduled 4-hour full electrical load testing on Thursday between 10:00 and 14:00 IST.",
        status: "Completed"
    },
    {
        id: "NOTIF-2026-21",
        ref: "MAIT/ADM/2026/VAC-09",
        title: "Recruitment Advertisement: Scientific Officer / Technical Officers in Health Physics",
        date: "2026-06-18",
        category: "Administrative",
        department: "Human Resources Wing",
        summary: "Applications invited from qualified postgraduates in Radiological Physics / Nuclear Engineering for regular appointment in Health Physics and Environmental Surveillance divisions.",
        status: "Closed"
    },
    {
        id: "NOTIF-2026-20",
        ref: "AERB/AUD/2026/H-44",
        title: "Gazette Notification: Half-Yearly Radiological Waste Inventory Disclosure Released",
        date: "2026-06-12",
        category: "Regulatory Gazette",
        department: "Waste Management Directorate",
        summary: "The formal statutory gazette certifying cumulative liquid and gaseous releases for H1-2026 is hereby published for public scrutiny as required under environmental protection statutes.",
        status: "Published"
    },
    {
        id: "NOTIF-2026-19",
        ref: "MAIT/CIV/2026/KIO-03",
        title: "Public Health Notification: Potassium Iodate Prophylaxis Stock Replenishment",
        date: "2026-06-05",
        category: "Civil Defense",
        department: "Public Health Liaison Office",
        summary: "Fresh batch of 50,000 units of KIO3 85 mg tablets dispatched to designated Delhi Government dispensaries in Rohini, Pitampura, and Badli for civil defense reserves.",
        status: "Dispatched"
    },
    {
        id: "NOTIF-2026-18",
        ref: "MAIT/ENG/2026/T-078",
        title: "Tender Notice: Supply of Class 1E Radiation-Hardened Coaxial Instrumentation Cables",
        date: "2026-05-28",
        category: "Procurement",
        department: "Central Stores & Materials Wing",
        summary: "Tenders invited for 15,000 meters of mineral-insulated cross-linked polyethylene (XLPE) flame-retardant low-smoke instrumentation cable rated for 200 kGy cumulative gamma dose.",
        status: "Awarded"
    },
    {
        id: "NOTIF-2026-17",
        ref: "AERB/DIR/2026/MAY-14",
        title: "Statutory Directive: Automated Sump Pump Redundancy in Auxiliary Reactor Basements",
        date: "2026-05-20",
        category: "Regulatory Gazette",
        department: "Atomic Energy Regulatory Board",
        summary: "Directive mandating dual float-switch actuation and independent power bus failover for all dewatering sumps located beneath the +210 m MSL datum.",
        status: "Complied"
    },
    {
        id: "NOTIF-2026-16",
        ref: "MAIT/RES/2026/PUB-12",
        title: "Research Achievement: First Extraction of Iodine-131 via Dry Distillation Apparatus",
        date: "2026-05-14",
        category: "Radiopharmaceuticals",
        department: "Radiochemistry Section",
        summary: "MAIT-NRF successfully commissioned an automated hot-cell dry distillation unit, producing pharmaceutical-grade I-131 solution with > 99.9% radionuclidic purity.",
        status: "Milestone"
    },
    {
        id: "NOTIF-2026-15",
        ref: "MAIT/SEC/2026/CIR-14",
        title: "Security Order: Annual Renewal of Contractor Biometric Gate Credentials",
        date: "2026-05-08",
        category: "Security",
        department: "Security & Safeguards Group",
        summary: "All outsourced civil, maintenance, and canteen contractor badges will expire on May 31. Re-verification with police clearance certificate is mandatory.",
        status: "Active"
    },
    {
        id: "NOTIF-2026-14",
        ref: "MAIT/ENV/2026/R-48",
        title: "Environmental Survey: Regional Ground Flora Radionuclide Baseline Report Published",
        date: "2026-04-30",
        category: "Environmental",
        department: "Bio-Radiological Sciences Section",
        summary: "Final report on bioaccumulation indices for seasonal crops and soil horizons across Rohini sub-divisions published. All isotopic concentrations certified at natural terrestrial levels.",
        status: "Published"
    },
    {
        id: "NOTIF-2026-13",
        ref: "AERB/SAF/2026/CIR-07",
        title: "Safety Advisory: Seismic Sensor Triaxial Accelerometer Recalibration Guidelines",
        date: "2026-04-22",
        category: "Safety Bulletin",
        department: "Nuclear Engineering Group",
        summary: "Technical guidance on periodic tilt-table verification and low-frequency sensitivity benchmarking for strong-motion seismic scram switches.",
        status: "Enacted"
    },
    {
        id: "NOTIF-2026-12",
        ref: "MAIT/CIV/2026/VHF-02",
        title: "Civil Defense Notice: Digital VHF Tactical Emergency Repeater Network Commissioned",
        date: "2026-04-15",
        category: "Civil Defense",
        department: "Emergency Communication Wing",
        summary: "A high-power solar-backed VHF digital trunking radio repeater has been successfully commissioned on Sector 14 water tower, providing resilient off-site communication links.",
        status: "Operational"
    },
    {
        id: "NOTIF-2026-11",
        ref: "MAIT/ENG/2026/T-062",
        title: "Tender Notice: Procurement of Titanium Condenser Tubes for Secondary Heat Exchanger",
        date: "2026-04-08",
        category: "Procurement",
        department: "Central Stores & Materials Wing",
        summary: "E-tenders invited for supply of 600 seamless Grade-2 titanium heat exchanger tubes (25.4 mm OD, 1.2 mm wall thickness, 6.0 m length) conforming to ASTM B338.",
        status: "Closed"
    },
    {
        id: "NOTIF-2026-10",
        ref: "MAIT/OPS/2026/AL-08",
        title: "Operations Bulletin: Coolant Demineralizer Resin Column MOD-IX-01 Rebedded",
        date: "2026-03-30",
        category: "Operations",
        department: "Water Chemistry Division",
        summary: "Heavy water purification circuit column MOD-IX-01 successfully re-bedded and leak-tested. Bulk conductivity restored to 0.11 µS/cm.",
        status: "Completed"
    },
    {
        id: "NOTIF-2026-09",
        ref: "AERB/DIR/2026/MAR-04",
        title: "Statutory Directive: Annual Collective Dose Target (ALARA) Ceiling for FY 2026-27",
        date: "2026-03-24",
        category: "Regulatory Gazette",
        department: "Health Physics Unit",
        summary: "AERB mandates an annual collective dose budget of 25.0 person-mSv for MAIT-NRF operations for the financial year 2026-27. Rigorous ALARA reviews required for all planned outages.",
        status: "Mandatory"
    },
    {
        id: "NOTIF-2026-08",
        ref: "MAIT/RES/2026/CONF-02",
        title: "Academic Notice: Joint Seminar on Computational Neutronics with IIT Delhi",
        date: "2026-03-16",
        category: "Academic",
        department: "Theoretical Physics Division",
        summary: "A two-day joint colloquium on deterministic transport codes (DRAGON / DONJON) and Monte Carlo burnup analysis will be held at MAIT Seminar Hall on April 10-11.",
        status: "Registration Open"
    },
    {
        id: "NOTIF-2026-07",
        ref: "MAIT/SEC/2026/N-09",
        title: "Security Notice: Routine Upgradation of CCTV Perimeter Surveillance Analytics",
        date: "2026-03-10",
        category: "Security",
        department: "Security & Safeguards Group",
        summary: "Deployment of high-definition thermal imaging cameras and perimeter fence vibration analytics completed across Western security sector.",
        status: "Operational"
    },
    {
        id: "NOTIF-2026-06",
        ref: "MAIT/CIV/2026/PUB-02",
        title: "Public Health Bulletin: Drinking Water Well Isotopic Screening Results for Q1-2026",
        date: "2026-03-02",
        category: "Public Notice",
        department: "Hydrological Monitoring Wing",
        summary: "Liquid scintillation results for public water wells in Sector 22, 23, and Mangolpuri show zero synthetic radionuclides. Tritium levels remain identical to natural rain background.",
        status: "Published"
    },
    {
        id: "NOTIF-2026-05",
        ref: "MAIT/ENG/2026/T-045",
        title: "Tender Notice: Annual Calibration of NIST-Traceable Health Physics Radiation Survey Meters",
        date: "2026-02-22",
        category: "Procurement",
        department: "Radiological Safety Division",
        summary: "Proposals invited from BARC-recognized calibration laboratories for gamma and neutron survey meter batch calibration covering 45 handheld instruments.",
        status: "Awarded"
    },
    {
        id: "NOTIF-2026-04",
        ref: "AERB/COMP/2026/J-11",
        title: "Statutory Submission: 2025 Comprehensive Annual Nuclear Safety Summary Cleared",
        date: "2026-02-14",
        category: "Compliance",
        department: "Atomic Energy Regulatory Board",
        summary: "AERB has officially acknowledged and accepted the Annual Safety Performance Assessment Report of MAIT Nuclear Research Facility for the calendar year 2025.",
        status: "Approved"
    },
    {
        id: "NOTIF-2026-03",
        ref: "MAIT/OPS/2026/OR-02",
        title: "Operations Circular: Revision of Emergency Operating Procedures (EOP Amendment 7)",
        date: "2026-02-05",
        category: "Operations",
        department: "Reactor Operations Division",
        summary: "Updated symptom-based emergency operating procedures (EOP) incorporating revised secondary depressurization thresholds distributed to all licensed control room engineers.",
        status: "Enacted"
    },
    {
        id: "NOTIF-2026-02",
        ref: "MAIT/ADM/2026/HOL-01",
        title: "Administrative Circular: List of Closed and Restricted Holidays for Calendar Year 2026",
        date: "2026-01-15",
        category: "Administrative",
        department: "Human Resources Wing",
        summary: "Publishing the schedule of gazetted national holidays and facility operational shift rotations for engineering and safety personnel during 2026.",
        status: "Published"
    },
    {
        id: "NOTIF-2026-01",
        ref: "AERB/DIR/2026/JAN-01",
        title: "Statutory Circular: National Radiation Safety Week Observance - Guidelines",
        date: "2026-01-02",
        category: "Regulatory Gazette",
        department: "Atomic Energy Regulatory Board",
        summary: "Directing all licensed nuclear installations in the country to conduct refresher training, public engagement exhibitions, and ALARA reviews during National Radiation Safety Week.",
        status: "Completed"
    }
];

const EVENTS = [
    {
        id: "EVT-2026-10",
        title: "Sector 22 Rohini Off-Site Civil Defense Sirens & Tabletop Muster Drill",
        type: "Civil Defense Drill",
        date: "2026-11-15",
        time: "10:00 - 13:00 IST",
        location: "Emergency Operations Centre, Rohini Sub-Division",
        status: "Upcoming",
        description: "Joint emergency evacuation tabletop drill involving Delhi Police, Delhi Disaster Management Authority, Civil Defense Volunteers, and MAIT-NRF Emergency Response Team.",
        participants: "DDMA, Delhi Police, Fire Services, Health Services (180 personnel)",
        mandate: "AERB Emergency Preparedness Code Section 7.2"
    },
    {
        id: "EVT-2026-09",
        title: "AERB Statutory Annual Regulatory Site Oversight & Physical Audit",
        type: "Regulatory Audit",
        date: "2026-11-04",
        time: "09:30 - 17:30 IST",
        location: "Reactor Hall & Safety Control Centre",
        status: "Upcoming",
        description: "Annual multi-disciplinary inspection led by senior AERB regulatory inspectors reviewing containment airlock leak rates, reactor trip interlocks, and fuel storage pools.",
        participants: "AERB Senior Regulatory Delegation & MAIT Safety Committee",
        mandate: "Atomic Energy Act 1962 Statutory Oversight"
    },
    {
        id: "EVT-2026-08",
        title: "National Symposium on Advanced Thorium Fuel Cycles in Research Reactors",
        type: "Academic Symposium",
        date: "2026-10-28",
        time: "09:00 - 18:00 IST",
        location: "MAIT Main Auditorium & Seminar Complex",
        status: "Upcoming",
        description: "Three-day scientific symposium bringing together nuclear engineers, physicists, and researchers from BARC, IGCAR, IIT Delhi, and MAIT to discuss thorium utilization.",
        participants: "Over 250 registered delegates from national research laboratories",
        mandate: "Department of Atomic Energy Academic Outreach"
    },
    {
        id: "EVT-2026-07",
        title: "Scheduled Bi-Weekly Off-Site Perimeter Siren Acoustic Verification",
        type: "Civil Defense Drill",
        date: "2026-10-20",
        time: "10:00 IST (90 Seconds)",
        location: "Five Sector 22 & 23 High-Mast Siren Stations",
        status: "Completed",
        description: "Routine scheduled sounding of perimeter civil protection sirens to benchmark acoustic sound level decibel spread across nearby residential quadrants.",
        participants: "Emergency Communication Wing & Rohini Traffic Police",
        mandate: "Civil Protection Operational Directive"
    },
    {
        id: "EVT-2026-06",
        title: "IAEA Safeguards Verification & Spent Fuel Inventory Verification Visit",
        type: "International Inspection",
        date: "2026-10-02",
        time: "09:00 - 16:30 IST",
        location: "Spent Fuel Bay & Fresh Fuel Vault",
        status: "Completed",
        description: "Biannual physical inventory verification and digital Cerenkov viewing device (DCVD) inspection by International Atomic Energy Agency safeguards inspectors.",
        participants: "IAEA Safeguards Division Inspectors & DAE Liaison Officers",
        mandate: "INFCIRC/433 Safeguards Agreement"
    },
    {
        id: "EVT-2026-05",
        title: "Mass Casualty Radiological Triage & Decontamination Simulation",
        type: "Civil Defense Drill",
        date: "2026-09-18",
        time: "11:00 - 15:30 IST",
        location: "Dr. BSA Hospital & Sector 22 Emergency Triage Bay",
        status: "Completed",
        description: "Field mobilization exercise simulating decontamination, alpha/beta probe screening, and emergency surgical stabilization of contaminated casualties.",
        participants: "Delhi Health Services, INMAS, DAE Radiation Medicine Centre (75 doctors/paramedics)",
        mandate: "National Disaster Management Authority (NDMA) Protocol"
    },
    {
        id: "EVT-2026-04",
        title: "Primary Coolant Flow Trip & Natural Convection Simulation Test",
        type: "Operational Test",
        date: "2026-09-02",
        time: "22:00 - 04:00 IST",
        location: "Reactor Main Control Room",
        status: "Completed",
        description: "Controlled trip of forced circulation pumps under cold zero power conditions to evaluate natural thermosiphon convection flow inception.",
        participants: "Licensed Reactor Operators, Safety Analysis Group",
        mandate: "Technical Specifications Section 4.3"
    },
    {
        id: "EVT-2026-03",
        title: "Community Radiological Safety Awareness Workshop for Resident Welfare Associations",
        type: "Public Outreach",
        date: "2026-08-22",
        time: "15:00 - 18:00 IST",
        location: "Sector 22 Rohini Community Centre",
        status: "Completed",
        description: "Interactive session addressing local community queries regarding environmental background radiation, groundwater monitoring, and emergency response.",
        participants: "Presidents and representatives of 24 Rohini RWAs and local schools",
        mandate: "AERB Public Transparency Charter"
    },
    {
        id: "EVT-2026-02",
        title: "Emergency Diesel Generator 24-Hour Autonomous Full-Load Run",
        type: "Operational Test",
        date: "2026-08-08",
        time: "08:00 - 08:00 IST (Next Day)",
        location: "Emergency Power Switchyard",
        status: "Completed",
        description: "Endurance run of 1,250 kVA Caterpillar diesel generators at 100% rated capacity simulating complete grid collapse.",
        participants: "Electrical Engineering Division & Heavy Power Maintenance Wing",
        mandate: "Station Blackout (SBO) Rule Compliance"
    },
    {
        id: "EVT-2026-01",
        title: "Class 1E Instrumentation Recalibration & Control Rod Drop Profiling",
        type: "Operational Test",
        date: "2026-07-20",
        time: "09:00 - 18:00 IST",
        location: "Reactor Hall & Core Lattice Datum",
        status: "Completed",
        description: "Optical encoder drop timing measurement for all 16 shutdown absorber rods and recalibration of platinum flux emitters.",
        participants: "Instrumentation & Control Division, Nuclear Engineering Group",
        mandate: "Biannual Technical Specification Milestone"
    },
    {
        id: "EVT-2025-12",
        title: "Full-Scale Off-Site Nuclear Emergency Exercise (Delhi-NCR)",
        type: "Civil Defense Drill",
        date: "2025-12-10",
        time: "06:00 - 16:00 IST",
        location: "16-km Emergency Planning Zone (EPZ) North-West Delhi",
        status: "Completed",
        description: "Triennial statutory full-scale emergency drill simulating plant accident, plume atmospheric projection, simulated traffic evacuation cordons, and public distribution of stable iodine.",
        participants: "Over 800 personnel from NDRF, DDMA, Police, Army Medical Corps, DAE Crisis Management Group",
        mandate: "National Crisis Management Committee Directive"
    },
    {
        id: "EVT-2025-11",
        title: "BARC-MAIT Joint Colloquium on Radioisotope Production for Cancer Therapy",
        type: "Academic Symposium",
        date: "2025-11-20",
        time: "10:00 - 17:00 IST",
        location: "MAIT Conference Hall",
        status: "Completed",
        description: "Scientific exchange focused on high-specific-activity Lutetium-177 and Actinium-225 synthesis in research reactor neutron thermal traps.",
        participants: "BARC Radiopharmaceuticals Division, AIIMS Oncology Faculty",
        mandate: "National Healthcare Technology Program"
    },
    {
        id: "EVT-2025-10",
        title: "National Disaster Response Force (NDRF) 8th Battalion Familiarization Tour",
        type: "Civil Defense Drill",
        date: "2025-11-05",
        time: "10:00 - 14:00 IST",
        location: "Containment Airlock & Emergency Decontamination Bays",
        status: "Completed",
        description: "Familiarization walkthrough and equipment compatibility check for NDRF Hazmat CBRN emergency responders.",
        participants: "60 officers and rescuers of the 8th Battalion NDRF (Ghaziabad)",
        mandate: "Standard Operating Procedure CBRN-2025"
    },
    {
        id: "EVT-2025-09",
        title: "Secondary Containment Negative Pressure Structural Leakage Rate Test",
        type: "Regulatory Audit",
        date: "2025-10-18",
        time: "20:00 - 08:00 IST",
        location: "Containment Building",
        status: "Completed",
        description: "12-hour high-precision micro-manometer pressure decay measurement under simulated post-accident internal pressure differential.",
        participants: "AERB Site Inspection Team & Civil Structural Division",
        mandate: "AERB Safety Standard AERB/SS/CSE-3"
    },
    {
        id: "EVT-2025-08",
        title: "Public School Science Exhibition: Atoms for Peace & Clean Energy",
        type: "Public Outreach",
        date: "2025-10-02",
        time: "10:00 - 16:00 IST",
        location: "MAIT Campus Exhibition Ground",
        status: "Completed",
        description: "Interactive public science pavilion featuring working scale models of heavy water reactors, cloud chambers demonstrating alpha tracks, and Geiger counter workshops.",
        participants: "1,200 visiting students and educators from 18 North Delhi schools",
        mandate: "Public Scientific Awareness Mission"
    },
    {
        id: "EVT-2025-07",
        title: "Subsurface Vadose Zone Groundwater Piezometer Drilling and Core Sampling",
        type: "Environmental Survey",
        date: "2025-09-12",
        time: "08:30 - 17:00 IST",
        location: "Perimeter Buffer Zone North & East Sectors",
        status: "Completed",
        description: "Installation of six new deep automated piezometer loggers equipped with real-time electrical conductivity and tritium telemetry transmitters.",
        participants: "Central Ground Water Board (CGWB) & Hydrological Monitoring Wing",
        mandate: "Environmental Clearance Condition 4(b)"
    },
    {
        id: "EVT-2025-06",
        title: "Biannual Chemical Hazmat & Chlorine Neutralizing Scrubber Exercise",
        type: "Industrial Safety",
        date: "2025-08-25",
        time: "14:00 - 16:30 IST",
        location: "Water Treatment Plant Chemical Storage Yard",
        status: "Completed",
        description: "Emergency drill simulating pressurized chlorine cylinder gasket rupture and automated caustic scrubber cascade activation.",
        participants: "Industrial Safety Division & Campus Fire Station",
        mandate: "Manufacture, Storage and Import of Hazardous Chemical Rules"
    },
    {
        id: "EVT-2025-05",
        title: "Workshop on Monte Carlo Codes (OpenMC / MCNP6) in Research Reactor Physics",
        type: "Academic Symposium",
        date: "2025-08-10",
        time: "09:30 - 17:30 IST",
        location: "High-Performance Computing Centre, MAIT",
        status: "Completed",
        description: "Hands-on computational training workshop on stochastic neutron transport simulations and full-core fuel depletion modeling.",
        participants: "45 doctoral students and junior scientists",
        mandate: "Nuclear Computational Capacity Building"
    },
    {
        id: "EVT-2025-04",
        title: "Physical Boundary Microwave Intrusion System Red-Team Evaluation",
        type: "Security Exercise",
        date: "2025-07-15",
        time: "22:00 - 03:00 IST",
        location: "Perimeter Security Fence 3.8 km Track",
        status: "Completed",
        description: "Unannounced red-team breach simulation validating response time of Quick Reaction Teams (QRT) upon taut-wire and infrared fence trigger.",
        participants: "Central Industrial Security Force (CISF) & MAIT Security Directorate",
        mandate: "Physical Protection of Nuclear Material Guidelines"
    },
    {
        id: "EVT-2025-03",
        title: "Decennial Nuclear Operating License Renewal Hearing - Public Session",
        type: "Regulatory Hearing",
        date: "2025-06-28",
        time: "11:00 - 16:00 IST",
        location: "AERB Conference Center / Hybrid Webcast",
        status: "Completed",
        description: "Formal statutory public hearing reviewing ten years of environmental records, occupational dose trends, and probabilistic safety assessments.",
        participants: "AERB Board Members, External Technical Advisory Committee, Public Representatives",
        mandate: "Atomic Energy Licensing Regulations"
    },
    {
        id: "EVT-2025-02",
        title: "Emergency Core Makeup Tank (ECMT) Gravity Dump Valve Full Discharge Test",
        type: "Operational Test",
        date: "2025-05-18",
        time: "09:00 - 13:00 IST",
        location: "Emergency Reservoir Tower",
        status: "Completed",
        description: "Hydrostatic delivery benchmarking of 60,000-liter overhead emergency gravity cooling tank into reactor pool dummy plenum.",
        participants: "Mechanical Auxiliary Section, Safety Analysis Group",
        mandate: "Periodic Surveillance Program Item 2.4"
    },
    {
        id: "EVT-2025-01",
        title: "National Radiation Safety Refresher Training for Technical Staff",
        type: "Staff Training",
        date: "2025-04-12",
        time: "09:00 - 17:00 IST",
        location: "MAIT Radiation Training Hall",
        status: "Completed",
        description: "Annual mandatory certification in radiation physics, contamination control, ALARA optimization, and decontamination protocols.",
        participants: "120 technical officers, operators, and maintenance technicians",
        mandate: "AERB Personnel Qualification Code"
    },
    {
        id: "EVT-2024-11",
        title: "Heavy Water Moderator System Helium Blanket Purge & Re-pressurization",
        type: "Operational Test",
        date: "2024-11-14",
        time: "08:00 - 18:00 IST",
        location: "Moderator Room & Recombination Vault",
        status: "Completed",
        description: "Catalytic recombiner efficiency test for radiolytic deuterium-oxygen gas mixtures under inert helium cover atmosphere.",
        participants: "Radiochemistry Section, Operations Division",
        mandate: "Recombiner Operating Protocol"
    },
    {
        id: "EVT-2024-09",
        title: "High-Flux Cold Neutron Guide Hall Cryogenic Refrigeration Commissioning",
        type: "Research Milestone",
        date: "2024-09-30",
        time: "11:00 - 15:00 IST",
        location: "Cryogenic Cold Source Hall",
        status: "Completed",
        description: "Commissioning of 20K liquid hydrogen/deuterium cold moderator cell designed to enhance long-wavelength sub-thermal neutron flux.",
        participants: "MAIT Experimental Physics Group, Inter-University Accelerator Centre",
        mandate: "National Science Infrastructure Initiative"
    },
    {
        id: "EVT-2024-06",
        title: "Public Environmental Forum: Decade of Environmental Radiometry at MAIT-NRF",
        type: "Public Outreach",
        date: "2024-06-15",
        time: "10:30 - 14:30 IST",
        location: "Rohini District Auditorium",
        status: "Completed",
        description: "Release of 10-year consolidated environmental radiometry atlas showing stable natural background levels and zero public dose excess since reactor inception.",
        participants: "Environmental scientists, university faculty, journalists, local citizens",
        mandate: "AERB Transparency Mandate"
    }
];

const RESEARCH = [
    {
        id: "RES-2026-01",
        title: "Thermal Neutron Flux Peaking in Low-Enriched Uranium Fuel Clusters Moderated by High-Purity D2O",
        authors: "Dr. Arun Sharma, Dr. V. K. Nambiar, K. R. Ramanathan",
        division: "Reactor Physics & Theoretical Analysis Section",
        date: "2026-09-15",
        journal: "Journal of Nuclear Science & Engineering (India), Vol. 48, pp. 112-128",
        abstract: "A comprehensive deterministic and stochastic computational analysis of thermal neutron flux profiles across 19-element cylindrical LEU (19.75% U-235) fuel bundles submerged in a 99.82 wt% heavy water moderator matrix. Monte Carlo depletion simulations using OpenMC benchmarked against in-core platinum self-powered neutron detector outputs demonstrate a radial thermal flux peak of 2.4 × 10¹⁴ n/cm²·s at the central flux trap, enabling high-yield radioisotope synthesis with minimal localized power peaking factors.",
        keywords: "Thermal Neutron Flux, Heavy Water Moderator, LEU Fuel, Flux Trap, SPND Calibration"
    },
    {
        id: "RES-2026-02",
        title: "Optimization of Carrier-Free Lutetium-177 Production via Direct (n,gamma) Irradiation of Ytterbium-176 Targets",
        authors: "Dr. Sunita Deshmukh, P. K. Banerjee, Dr. Arun Sharma",
        division: "Radiopharmaceuticals & Isotope Synthesis Division",
        date: "2026-08-20",
        journal: "Annals of Radiopharmaceutical Chemistry, Vol. 33, Art. 1044",
        abstract: "Production parameters for high-specific-activity non-carrier-added Lutetium-177 (Lu-177) utilizing enriched Yb-176 targets were investigated in the hydraulic rabbit irradiation facility of the MAIT research reactor. Target dissolution followed by dual-column extraction chromatography using LN-resin achieved Lu/Yb separation factors exceeding 10⁶. Radionuclidic purity was certified at > 99.98% with Lu-177m isomer contamination < 0.015%, satisfying strict European and Indian Pharmacopoeia standards for targeted peptide receptor radionuclide therapy (PRRT).",
        keywords: "Lutetium-177, PRRT Oncology, Radioisotope Separation, Target Dissolution, Hydraulic Rabbit"
    },
    {
        id: "RES-2026-03",
        title: "Fast-Neutron Damage Cross-Sections and Void Swelling Kinetics in Modified 316L Stainless Steel Cladding",
        authors: "T. S. Venkataraman, M. Gupta, Dr. H. C. Pathak",
        division: "Materials Science & Post-Irradiation Examination Lab",
        date: "2026-07-12",
        journal: "Journal of Nuclear Materials & Structural Integrity, Vol. 512, pp. 84-97",
        abstract: "Thin-foil specimens of titanium-stabilized austenitic stainless steel (316L-Ti) were irradiated up to 12 displacements per atom (dpa) in the fast neutron flux channel of MAIT-NRF at temperatures between 380°C and 550°C. Transmission electron microscopy (TEM) and positron annihilation spectroscopy revealed that fine coherent TiC precipitate dispersions effectively act as interstitial-vacancy recombination centers, suppressing frank loop growth and void swelling below 0.15% volumetric expansion.",
        keywords: "Void Swelling, 316L Stainless Steel, Fast Neutron Damage, TEM Microscopy, Displacements Per Atom"
    },
    {
        id: "RES-2026-04",
        title: "Passive Decay Heat Removal via Natural Convection in Open-Pool Type Research Reactors: Experimental Validation",
        authors: "K. R. Ramanathan, Dr. Arun Sharma, S. Bhattacharya",
        division: "Thermal Hydraulics & Auxiliary Safety Division",
        date: "2026-06-18",
        journal: "Nuclear Engineering & Design, Vol. 388, pp. 201-215",
        abstract: "Full-scale experimental measurements of transient thermal-hydraulic natural convection were conducted following simultaneous pump coast-down from 10 MWth thermal power. Temperature stratification within the 12-meter deep reactor pool was monitored using an array of 48 calibrated platinum resistance thermometers (PT-100). Flap valve actuation occurred at 0.42 seconds post-trip. Convective buoyant plumes established stable upward flow through the core matrix within 12 seconds, maintaining peak fuel clad temperatures 32°C below nucleate boiling inception.",
        keywords: "Passive Safety, Natural Convection, Decay Heat Removal, Flap Valves, Pool Stratification"
    },
    {
        id: "RES-2026-05",
        title: "Synthesis of High-Purity Fission Molybdenum-99 from Low-Enriched Uranium Metallic Foils",
        authors: "Dr. Sunita Deshmukh, R. C. Mathur, Dr. V. K. Nambiar",
        division: "Radiopharmaceuticals & Isotope Synthesis Division",
        date: "2026-05-25",
        journal: "Indian Journal of Applied Radiation Isotopes, Vol. 62, pp. 45-58",
        abstract: "Demonstration of a modified alkaline digestion and alumina column adsorption process for extracting fission Mo-99 from irradiated annular LEU metallic foils. Fission product decontamination factors for iodine, ruthenium, and alpha-emitting actinides exceeded 10⁵. Overall Mo-99 recovery yield averaged 88.5% at end of chemical processing, yielding sterile Technetium-99m generator eluates compliant with nuclear cardiology diagnostic criteria.",
        keywords: "Molybdenum-99, Technetium-99m, LEU Foil Targets, Alkaline Dissolution, Radiopharmacy"
    },
    {
        id: "RES-2026-06",
        title: "Sub-Thermal Cold Neutron Extraction Using a 20K Supercritical Hydrogen Moderator Cell",
        authors: "Dr. H. C. Pathak, T. S. Venkataraman, E. Sridharan",
        division: "Neutron Beam Research Facility (NBRF)",
        date: "2026-04-10",
        journal: "Review of Scientific Instruments, Vol. 97, Art. 043102",
        abstract: "A cryogenic moderator vessel containing 1.8 liters of supercritical hydrogen maintained at 20 Kelvin was installed adjacent to the reactor core reflector boundary. Cold neutron flux gain factors of 14.8 were achieved at wavelengths lambda > 4.5 Angstroms compared to ambient moderator emission. High-resolution small-angle neutron scattering (SANS) and reflectometry instruments downstream demonstrate unprecedented signal-to-noise ratios for biological macromolecule structure determination.",
        keywords: "Cold Neutrons, Cryogenic Moderator, SANS, Supercritical Hydrogen, Neutron Guides"
    },
    {
        id: "RES-2026-07",
        title: "Development of Unscented Kalman Filter for Real-Time Reactivity Tracking from In-Core Neutron Detectors",
        authors: "Dr. Arun Sharma, P. K. Banerjee",
        division: "Instrumentation & Control Division",
        date: "2026-03-14",
        journal: "IEEE Transactions on Nuclear Science, Vol. 73, Issue 3, pp. 410-422",
        abstract: "An advanced state-estimation algorithm using an Unscented Kalman Filter (UKF) based on point reactor kinetics equations with six delayed neutron precursor groups was developed for digital reactivity computers. Field validation during control rod bank withdrawal demonstrated real-time reactivity tracking within ± 1.5 pcm accuracy, even in the presence of 5% Gaussian detector signal noise and sudden temperature feedback transients.",
        keywords: "Reactivity Tracking, Kalman Filter, Point Reactor Kinetics, Control Rod Dynamics, SCADA"
    },
    {
        id: "RES-2026-08",
        title: "Thorium-232 Breeding Ratios in Peripheral Blanket Bundles: Neutronic Modeling vs Activation Wire Measurements",
        authors: "Dr. V. K. Nambiar, Dr. Arun Sharma, M. Gupta",
        division: "Reactor Physics & Theoretical Analysis Section",
        date: "2026-02-18",
        journal: "Pramana - Journal of Physics, Vol. 98, pp. 67-81",
        abstract: "Thorium dioxide (ThO2) test pins positioned in the outer radial heavy water reflector of MAIT-NRF were irradiated for 45 effective full-power days. Protactinium-233 (Pa-233) production was measured by 312 keV gamma spectrometry using calibrated HPGe detectors following chemical dissolution. The measured Th-232(n,gamma) capture cross-section averaged over the epithermal spectrum showed excellent agreement (< 3.2% divergence) with ENDF/B-VIII.0 cross-section libraries.",
        keywords: "Thorium Breeding, Pa-233 Capture, Activation Analysis, HPGe Spectrometry, ENDF Libraries"
    },
    {
        id: "RES-2026-09",
        title: "Aerosol Deposition Velocities and Scavenging Coefficients for Iodine Vapor in High-Humidity Containment Atmospheres",
        authors: "S. Bhattacharya, Dr. Sunita Deshmukh",
        division: "Environmental Surveillance & Aerosol Lab",
        date: "2026-01-20",
        journal: "Atmospheric Environment & Radiation Protection, Vol. 119, pp. 132-145",
        abstract: "Experimental determination of dry and wet deposition velocities of elemental iodine (I2) and methyl iodide (CH3I) in a 25 m³ aerosol test chamber simulating containment conditions during loss-of-coolant accidents. Deposition velocity of I2 onto epoxy-coated concrete surfaces was measured at 0.12 cm/s at 85% relative humidity. Containment dousing water spray droplets achieved iodine scavenging half-lives of 4.2 minutes.",
        keywords: "Iodine Aerosols, Deposition Velocity, Containment Dousing, Methyl Iodide, LOCA"
    },
    {
        id: "RES-2025-10",
        title: "Micro-Radiological Assay of Tritium in Urban Indo-Gangetic Groundwaters via Electrolytic Enrichment",
        authors: "R. C. Mathur, Dr. Sunita Deshmukh",
        division: "Hydrological Monitoring Wing",
        date: "2025-11-15",
        journal: "Journal of Environmental Radioactivity, Vol. 238, Art. 106720",
        abstract: "Methodological validation of a multi-stage Peltier-cooled electrolytic enrichment system paired with ultra-low-background liquid scintillation counting (Quantulus 1220). The system achieves a minimum detectable activity (MDA) of 0.8 Bq/L for environmental water samples, enabling definitive discrimination between natural cosmogenic tritium and any hypothetical localized industrial or nuclear facility releases.",
        keywords: "Tritium Assay, Liquid Scintillation, Electrolytic Enrichment, Groundwater Hydrology"
    },
    {
        id: "RES-2025-11",
        title: "Neutron Radiography and Tomography of Multi-Phase Flow Inside Opaque Metal Heat Pipes",
        authors: "E. Sridharan, Dr. H. C. Pathak, T. S. Venkataraman",
        division: "Neutron Beam Research Facility (NBRF)",
        date: "2025-09-22",
        journal: "Applied Radiation and Isotopes, Vol. 176, pp. 109-121",
        abstract: "Thermal neutron imaging utilizing a high-efficiency 200 µm ⁶LiF/ZnS scintillator screen and sCMOS camera was applied to visualize two-phase liquid-vapor interfaces of water and sodium inside thick-walled Inconel heat pipes. Dynamic attenuation tomography resolved liquid film thickness variations with spatial resolution of 65 micrometers at 30 frames per second, providing crucial benchmark data for computational fluid dynamics models.",
        keywords: "Neutron Radiography, Two-Phase Flow, Tomography, Scintillator Screens, Heat Pipes"
    },
    {
        id: "RES-2025-12",
        title: "Probabilistic Safety Assessment (PSA Level 1) of Internal Fire and Seismic Initiators at MAIT-NRF",
        authors: "Dr. Arun Sharma, K. R. Ramanathan",
        division: "Safety Analysis Group",
        date: "2025-07-30",
        journal: "Reliability Engineering & System Safety, Vol. 214, Art. 107750",
        abstract: "A detailed Level 1 PSA model developed using RiskSpectrum software evaluated 142 event trees and 380 fault trees covering internal fires, flooding, and Safe Shutdown Earthquakes (SSE 0.2g). The overall core damage frequency (CDF) was calculated as 1.42 × 10⁻⁶ per reactor-year. Sensitivity analysis identified emergency diesel generator failover reliability as the most dominant risk reduction worth (RRW = 4.12) component.",
        keywords: "PSA Level 1, Core Damage Frequency, Event Trees, Fault Trees, Seismic Risk"
    },
    {
        id: "RES-2025-13",
        title: "Synthesis and Characterization of Novel Titanate Ceramic Forms for Long-Term Actinide Immobilization",
        authors: "M. Gupta, Dr. Sunita Deshmukh",
        division: "Materials Science & Post-Irradiation Examination Lab",
        date: "2025-05-18",
        journal: "Journal of the American Ceramic Society, Vol. 108, pp. 2940-2956",
        abstract: "Synroc-derivative titanate ceramics (hollandite, perovskite, and zirconolite) were synthesized via alkoxide precursor sol-gel routes to evaluate leach resistance for high-level alpha-bearing actinide waste. Normalized 28-day Soxhlet leach rates for americium and curium simulant neodymium were below 10⁻⁴ g/m²·day at 90°C, proving outstanding long-term chemical durability for deep geological repository disposal.",
        keywords: "Actinide Immobilization, Synroc, Titanate Ceramics, Leach Rates, Sol-Gel"
    },
    {
        id: "RES-2025-14",
        title: "Evaluation of Gamma-Neutron Mixed Field Dosimetry in High-Flux Medical Beam Ports",
        authors: "Dr. V. K. Nambiar, P. K. Banerjee",
        division: "Health Physics Unit",
        date: "2025-03-10",
        journal: "Radiation Protection Dosimetry, Vol. 195, pp. 188-199",
        abstract: "Paired ionization chambers (tissue-equivalent plastic flushed with methane-based tissue gas, paired with graphite chamber flushed with CO2) were deployed to deconvolute fast neutron and gamma dose fractions at the thermal epithermal beam port designed for Boron Neutron Capture Therapy (BNCT). Fast neutron kerma was quantified within 4% precision, validating treatment planning beam purity requirements.",
        keywords: "Mixed Field Dosimetry, BNCT, Paired Ion Chambers, Tissue Equivalent Plastic, Kerma"
    },
    {
        id: "RES-2025-15",
        title: "Ultrasonic Anemometry and Atmospheric Turbulence Structure Over Urban Heterogeneous Terrains in North Delhi",
        authors: "S. Bhattacharya, R. C. Mathur",
        division: "Micrometeorological Lab",
        date: "2025-01-14",
        journal: "Boundary-Layer Meteorology, Vol. 182, pp. 311-332",
        abstract: "Multi-year sonic anemometer data recorded at heights of 10m, 30m, and 60m were analyzed to derive aerodynamic roughness length (z0 = 0.82 m) and zero-plane displacement height (d = 4.5 m) for suburban Delhi. Monin-Obukhov similarity functions evaluated under convective and stable regimes showed enhanced turbulent kinetic energy dissipation compared to rural flat terrains, accelerating downwind plume dilution.",
        keywords: "Atmospheric Turbulence, Sonic Anemometer, Roughness Length, Urban Dispersion, Plume Dilution"
    },
    {
        id: "RES-2024-16",
        title: "Development of High-Sensitivity Plastic Scintillation Detectors for In-Line Liquid Effluent Monitoring",
        authors: "P. K. Banerjee, Dr. Sunita Deshmukh",
        division: "Instrumentation & Control Division",
        date: "2024-11-28",
        journal: "Nuclear Instruments and Methods in Physics Research Section A, Vol. 1060, Art. 169012",
        abstract: "A flow-through scintillation detector cell utilizing thin 0.5 mm BC-400 plastic scintillator sheets wrapped around quartz glass tubes was developed for real-time gross beta monitoring in discharge pipelines. The system demonstrated counting efficiency of 42% for Sr-90/Y-90 and achieved continuous lower limit of detection of 0.04 Bq/mL under 10 L/min dynamic liquid flow rates.",
        keywords: "Plastic Scintillator, Liquid Effluents, Beta Detection, Real-time Monitoring, Radiation Safety"
    },
    {
        id: "RES-2024-17",
        title: "Deterministic Analysis of Positive Void Reactivity Feedback Suppression in Advanced Heavy Water Lattices",
        authors: "Dr. Arun Sharma, Dr. V. K. Nambiar",
        division: "Reactor Physics & Theoretical Analysis Section",
        date: "2024-08-16",
        journal: "Annals of Nuclear Energy, Vol. 192, Art. 109980",
        abstract: "Fuel bundle lattice design variations incorporating central burnable dysprosium-doped absorber pins were modeled in WIMS-D/5B. Calculations confirm that spectral hardening resulting from simulated coolant boiling produces a net negative void reactivity coefficient of -1.8 mk at all burnup stages, completely eliminating the positive void coefficient vulnerability inherent in early heavy water designs.",
        keywords: "Void Reactivity, Heavy Water Lattices, Dysprosium Absorbers, WIMS-D, Reactivity Feedback"
    },
    {
        id: "RES-2024-18",
        title: "Experimental Benchmark of Digital Cerenkov Viewing Device (DCVD) for Research Reactor Spent Fuel Verification",
        authors: "Dr. V. K. Nambiar, E. Sridharan",
        division: "Security & Safeguards Group",
        date: "2024-04-20",
        journal: "INMM Annual Proceedings on Nuclear Materials Management, Vol. 65, pp. 412-424",
        abstract: "Digital ultraviolet Cerenkov glow imaging was evaluated for verifying irradiated fuel assemblies with cooling times ranging from 6 months to 15 years. Ultraviolet filtered CCD cameras resolved single fuel bundle pin pitch luminescence even under 5 meters of clear shielding water, establishing quantitative criteria for non-destructive safeguards inventory verification.",
        keywords: "Cerenkov Viewing, DCVD, Spent Fuel Verification, Safeguards, Ultraviolet Imaging"
    }
];

const FACILITY_DATA = {
    general: {
        name: "MAIT Nuclear Research Facility (MAIT-NRF)",
        mandate: "National Strategic Research, Isotope Production & Public Radiation Surveillance",
        supervising_authority: "Atomic Energy Regulatory Board (AERB), Government of India",
        site_location: "PSP Area, Plot No. 1, Sector 22, Rohini, New Delhi - 110086",
        operating_license: "AERB/RESEARCH/2026/MAIT (Valid through Dec 2035)",
        commissioning_year: "2016",
        capital_outlay: "₹482.50 Crores (Initial Outlay) + ₹86.20 Crores (Safety Modernization Phase II)",
        campus_area: "42.5 Acres (Exclusion Zone: 1.6 km radius; Emergency Planning Zone: 16 km)"
    },
    reactor_specs: {
        reactor_type: "Heavy Water Moderated, Light Water Cooled Open-Pool Research Reactor",
        rated_thermal_power: "10 MWth (Megawatts Thermal)",
        peak_thermal_flux: "2.4 × 10¹⁴ n/cm²·s (Central Flux Trap)",
        peak_fast_flux: "1.1 × 10¹⁴ n/cm²·s (In-Core Thimble)",
        fuel_composition: "Low Enriched Uranium (LEU) 19.75% U-235 in U3Si2-Al Dispersion Matrix",
        fuel_assembly_type: "19-Element Concentric Cylindrical Bundles with Zircaloy-4 Cladding",
        number_of_fuel_assemblies: "24 Active Bundles + 4 Beryllium Reflector Assemblies",
        moderator_inventory: "14,500 kg High-Purity Deuterium Oxide (99.82 wt% D2O)",
        core_coolant: "Demineralized Light Water (Forced Upward Circulation @ 1,200 m³/h)",
        reactor_pool_dimensions: "12.0m Depth × 6.5m Width × 8.0m Length (450 m³ Demineralized Water Shield)"
    },
    safety_systems: {
        primary_shutdown: "16 Cadmium Absorber Shutoff Rods (Drop time < 1.20s via electromagnetic de-energization)",
        secondary_shutdown: "High-Pressure Boric Acid Emergency Injection System (BAEIS) (400L @ 2,200 ppm Boron)",
        containment: "Double-walled prestressed concrete containment with negative pressure ventilation (-120 Pa)",
        emergency_cooling: "Overhead 60,000L Emergency Core Makeup Tank (ECMT) (72-hour passive gravity feed)",
        decay_heat_removal: "Automated buoyant flap valves enabling natural convection thermosiphon loop",
        emergency_power: "Dual 1,250 kVA Caterpillar Diesel Generators (Auto-start latency: 8.4 seconds)"
    },
    safety_directives: [
        {
            code: "AERB/DIR/2026/14",
            title: "Limiting Safety System Setting (LSSS) for Primary Core Temperature",
            requirement: "Immediate automated scram actuation if primary pool coolant outlet exceeds 46.5°C or delta-T exceeds 12.0°C."
        },
        {
            code: "AERB/DIR/2026/19",
            title: "Sub-Critical Shutdown Margin (SDM) Verification",
            requirement: "Reactor core must maintain minimum shutdown margin of -1.50% delta-k/k with the highest worth control rod fully withdrawn."
        },
        {
            code: "AERB/DIR/2025/08",
            title: "Public Boundary Gamma Absorption Limit",
            requirement: "Annual boundary radiological dose to any public individual shall not exceed 0.10 mSv/year (100 µSv/year)."
        },
        {
            code: "AERB/DIR/2025/22",
            title: "Cyber Security & SCADA Physical Air-Gap Enforcement",
            requirement: "All core scram trip circuits, control rod clutches, and cooling pump actuators must remain 100% physically isolated from external networks via certified hardware air-gaps."
        }
    ],
    budget_breakdown: [
        { head: "Reactor Operation & Primary Fuel Cycles", allocation_inr_cr: "34.50", percentage: "32.4%" },
        { head: "Environmental Surveillance & Public Radiometry", allocation_inr_cr: "18.20", percentage: "17.1%" },
        { head: "Civil Defense Preparedness & Offsite Siren Network", allocation_inr_cr: "14.80", percentage: "13.9%" },
        { head: "Radiopharmaceutical Synthesis & Cancer Isotope Supply", allocation_inr_cr: "22.40", percentage: "21.0%" },
        { head: "Physical Perimeter Protection & Cyber Air-Gap Audits", allocation_inr_cr: "16.60", percentage: "15.6%" }
    ]
};

module.exports = {
    TICKER_NEWS,
    REPORTS,
    NOTIFICATIONS,
    EVENTS,
    RESEARCH,
    FACILITY_DATA
};
