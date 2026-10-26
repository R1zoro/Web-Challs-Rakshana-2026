/**
 * Webpack Production Bundle: facility-config.chunk.js
 * Facility: MAIT Nuclear Research Facility (MAIT-NRF)
 * Division: Control & Instrumentation Directorate (C&I)
 * Build Target: Production / Nuclear Standard IEC 61508 / ISO 19443
 */
(function (global) {
    "use strict";

    global.__FACILITY_ENV__ = {
        stationId: "MAIT-NRF-SEC22",
        deploymentStage: "production",
        telemetryGateway: "/api/telemetry/stream",
        nodeStatusFeed: "/api/telemetry/nodes",
        liveTelemetryApi: "/api/v1/telemetry/live",
        diagnosticsDispatcher: "/api/v1/reactor/thermal-hydraulics",

        subsystems: {
            pirtn: {
                name: "Perimeter Ionizing Radiation Tracking Network",
                channels: 16,
                samplingRateHz: 10,
                baselineNormalUsv: 0.12,
                alarmThresholdUsv: 0.25,
                evacuationThresholdUsv: 1.50,
                detectors: [
                    { id: "GM-01", sector: "North Gate", model: "LND-712-AERB", calibrationOffset: 0.002, busChannel: "CH-01" },
                    { id: "GM-02", sector: "Cooling Tower East", model: "LND-712-AERB", calibrationOffset: -0.001, busChannel: "CH-02" },
                    { id: "GM-03", sector: "Reactor Dome Drywell", model: "LND-7313-HP", calibrationOffset: 0.015, busChannel: "CH-03" },
                    { id: "GM-04", sector: "Spent Fuel Bay 3", model: "LND-712-AERB", calibrationOffset: 0.004, busChannel: "CH-04" },
                    { id: "GM-05", sector: "Turbine Auxiliary Line", model: "LND-712-AERB", calibrationOffset: 0.001, busChannel: "CH-05" },
                    { id: "GM-06", sector: "Rohini Campus South Gate", model: "LND-712-AERB", calibrationOffset: -0.002, busChannel: "CH-06" },
                    { id: "GM-07", sector: "Ventilation Stack Filter Bay", model: "LND-7313-HP", calibrationOffset: 0.008, busChannel: "CH-07" },
                    { id: "GM-08", sector: "Heavy Water Storage Yard", model: "LND-712-AERB", calibrationOffset: 0.003, busChannel: "CH-08" },
                    { id: "GM-09", sector: "Primary Heat Exchanger Pit", model: "LND-7313-HP", calibrationOffset: 0.012, busChannel: "CH-09" },
                    { id: "GM-10", sector: "Emergency Diesel Generator Block", model: "LND-712-AERB", calibrationOffset: 0.001, busChannel: "CH-10" }
                ]
            },
            thermalHydraulics: {
                primaryCoolantLoop: {
                    fluid: "Heavy Water (D2O)",
                    designPressureBar: 160.0,
                    operatingPressureBar: 139.4,
                    nominalFlowRateKgS: 412.5,
                    inletTempC: 288.4,
                    outletTempC: 342.1,
                    recirculationPumpVibrationMmS: 1.8
                },
                secondarySteamLoop: {
                    fluid: "Demineralized Light Water (H2O)",
                    designPressureBar: 75.0,
                    operatingPressureBar: 68.2,
                    steamQuality: 0.998,
                    condenserVacuumKPa: -92.4
                }
            },
            safetyInterlocks: {
                scramSystem: {
                    type: "Fast Pneumatic Injection + Gravity Fallback",
                    rodsTotal: 16,
                    dropTimeSeconds: 1.14,
                    actuationBus: "SIS-PNEUMATIC-0x7F",
                    holdRelay: "CV201-LATCH-0x44"
                },
                containmentIsolation: {
                    innerSeals: "Double EPDM Inflatable O-Ring",
                    outerSeals: "Mechanical Bellows Lock",
                    ventilationRecircRatePmh: 12000,
                    charcoalAdsorberEfficiency: 0.9995
                }
            }
        },

        telemetryBusConfig: {
            transport: "WSS/HTTPS",
            reconnectBackoffMs: [500, 1000, 2000, 5000, 10000],
            heartbeatIntervalMs: 15000,
            packetFormat: "IEC-60870-5-104",
            bufferDepthFrames: 256
        },

        authProfiles: {
            guestObserver: {
                scheme: "Bearer",
                algorithm: "RS256",
                description: "Statutory public transparency feed verifier",
                keyType: "RSA-2048",
                publicKey: "-----BEGIN PUBLIC KEY-----\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAy3R5Q1b5U6n2W0j8P\nL8A1v3e5Q7r8T9u0V1w2x3y4z5A6B7C8D9E0F1G2H3I4J5K6L7M8N9O0P1Q2R3\nS4T5U6V7W8X9Y0Z1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w4\nx5y6z7A8B9C0D1E2F3G4H5I6J7K8L9M0N1O2P3Q4R5S6T7U8V9W0X1Y2Z3a4b\n5c6d7e8f9g0h1i2j3k4l5m6n7o8p9q0r1s2t3u4v5w6x7y8z9A0B1C2D3E4F5G\n6H7I8J9K0L1M2N3O4P5Q==\n-----END PUBLIC KEY-----"
            },
            stagingTelemetryBus: {
                scheme: "HMAC",
                algorithm: "HS256",
                description: "AERB pre-commissioning testing bridge",
                busSecret: "M41T_STAGING_KEY_EXPIRED_2025"
            },
            primaryTelemetryBus: {
                scheme: "HMAC",
                algorithm: "HS256",
                description: "Active C&I reactor telemetry interlock signing descriptor",
                authMode: "DYNAMIC_HANDSHAKE_REQUIRED",
                endpoint: "/api/v1/simulation/adjust"
            },
            modbusRtuBridge: {
                scheme: "CRC16-IBM",
                baudRate: 115200,
                parity: "EVEN",
                dataBits: 8,
                stopBits: 1,
                commPort: "/dev/ttyS0",
                hwHandshake: true
            },
            opcUaTelemetryEndpoint: {
                endpointUrl: "opc.tcp://10.0.5.18:4840/MAIT-NRF/Server",
                securityMode: "SignAndEncrypt",
                securityPolicy: "Basic256Sha256",
                certThumbprint: "A4:8F:C1:20:99:34:B8:21:40:55:01:8A:2F:C9:88:12"
            }
        },

        modbusRegistersMap: {
            "40001": { tag: "PHT_INLET_TEMP", unit: "°C", scale: 0.1, access: "RO" },
            "40002": { tag: "PHT_OUTLET_TEMP", unit: "°C", scale: 0.1, access: "RO" },
            "40003": { tag: "PHT_COOLANT_PRESSURE", unit: "bar", scale: 0.01, access: "RO" },
            "40004": { tag: "THERMAL_POWER_MWTH", unit: "MWth", scale: 0.01, access: "RO" },
            "40005": { tag: "NEUTRON_FLUX_PCT", unit: "%", scale: 0.01, access: "RO" },
            "40006": { tag: "MODERATOR_TEMP_C", unit: "°C", scale: 0.1, access: "RO" },
            "40007": { tag: "MODERATOR_LEVEL_PCT", unit: "%", scale: 0.1, access: "RO" },
            "40008": { tag: "BORON_INJECTION_RATE", unit: "L/min", scale: 0.1, access: "RW" },
            "40009": { tag: "ROD_BANK_A_INSERTION", unit: "%", scale: 0.1, access: "RO" },
            "40010": { tag: "ROD_BANK_B_INSERTION", unit: "%", scale: 0.1, access: "RO" },
            "40011": { tag: "SCRAM_VALVE_CV201", unit: "ENUM", scale: 1, access: "RW" },
            "40012": { tag: "CONTAINMENT_VACUUM_KPA", unit: "kPa", scale: 0.1, access: "RO" }
        },

        weatherStationTelemetry: {
            stationId: "MET-MAIT-ROHINI",
            sensors: {
                anemometer: { windSpeedKmh: 14.2, windDirectionDeg: 65, status: "OK" },
                barometer: { atmosphericPressureHpa: 1013.25, status: "OK" },
                hygrometer: { relativeHumidityPct: 62.0, status: "OK" },
                thermometer: { ambientTempC: 28.4, status: "OK" }
            },
            plumeDispersionParameters: {
                stabilityCategory: "Pasquill-D",
                dispersionModel: "Gaussian Puff v3.1",
                roughnessLengthM: 0.85
            }
        }
    };
})(typeof window !== "undefined" ? window : this);
