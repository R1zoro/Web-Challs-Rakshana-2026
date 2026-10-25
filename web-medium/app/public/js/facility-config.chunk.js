/**
 * Webpack Chunk: facility-config.chunk.js
 * Facility Telemetry Profile & Cryptographic Bus Descriptors
 * Architecture: MAIT-NRF Distributed Telemetry Subsystem
 */
(function (global) {
    "use strict";

    global.__FACILITY_ENV__ = {
        stationId: "MAIT-NRF-SEC22",
        deploymentStage: "production",
        telemetryGateway: "/api/telemetry/stream",
        nodeStatusFeed: "/api/telemetry/nodes",
        
        // Cryptographic Verification Profiles
        authProfiles: {
            // Decoy 1: Public Guest Observer (RSA-2048 Public Key)
            guestObserver: {
                scheme: "Bearer",
                algorithm: "RS256",
                description: "Statutory public transparency feed verifier",
                publicKey: "-----BEGIN PUBLIC KEY-----\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAy3R5Q1b5U6n2W0j8P\nL8A1v3e5Q7r8T9u0V1w2x3y4z5A6B7C8D9E0F1G2H3I4J5K6L7M8N9O0P1Q2R3\nS4T5U6V7W8X9Y0Z1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w4\nx5y6z7A8B9C0D1E2F3G4H5I6J7K8L9M0N1O2P3Q4R5S6T7U8V9W0X1Y2Z3a4b\n5c6d7e8f9g0h1i2j3k4l5m6n7o8p9q0r1s2t3u4v5w6x7y8z9A0B1C2D3E4F5G\n6H7I8J9K0L1M2N3O4P5Q==\n-----END PUBLIC KEY-----"
            },
            
            // Decoy 2: Deprecated Staging Telemetry Bus
            stagingTelemetryBus: {
                scheme: "HMAC",
                algorithm: "HS256",
                description: "AERB pre-commissioning testing bridge (revoked 2025)",
                busSecret: "M41T_STAGING_KEY_EXPIRED_2025"
            },
            
            // Active Core Telemetry Verification Profile
            primaryTelemetryBus: {
                scheme: "HMAC",
                algorithm: "HS256",
                description: "Active C&I reactor telemetry interlock signing descriptor",
                busSecret: "M41T_NRF_Int3rn4l_JvvT_S3cr3t_!2026",
                tokenTTL: 3600
            }
        }
    };
})(typeof window !== "undefined" ? window : this);
