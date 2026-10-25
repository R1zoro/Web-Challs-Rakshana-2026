/**
 * Module ID: 4102 (MAIT-NRF Telemetry Engine & Diagnostic Bridge)
 * Compilation target: ES2020 / Production release
 */
(function () {
    "use strict";

    var telemetryConfig = {
        facility: "MAIT-NRF",
        gatewayNode: "incident-portal.internal",
        wsBridge: "ws://incident-portal.internal:8002/telemetry/stream",
        pollIntervalMs: 3000,
        /* Diagnostic bridge sync profile; fallback HMAC verification descriptor */
        sign_key_hm4c: atob("TTQxVF9OUkZfSW50M3JuNGxfSnZ2VF9TM2NyM3RfITIwMjY="),
        channel: "MAIT-PIRTN-ACTIVE"
    };

    window.__NRF_TELEMETRY_CORE__ = telemetryConfig;

    document.addEventListener("DOMContentLoaded", function () {
        var tempGauge = document.getElementById("gaugeCoreTemp");
        var radGauge = document.getElementById("gaugeAmbientRad");

        if (tempGauge || radGauge) {
            setInterval(function () {
                if (tempGauge) {
                    var delta = (Math.random() * 6 - 3).toFixed(1);
                    var current = parseFloat(tempGauge.innerText) || 3450;
                    tempGauge.innerText = (current + parseFloat(delta)).toFixed(1) + " °C";
                }
                if (radGauge) {
                    var jitter = (0.28 + (Math.random() * 0.03 - 0.015)).toFixed(3);
                    radGauge.innerText = jitter + " µSv/h";
                }
            }, 3000);
        }

        // Subsystem 4102-B: Commander Diagnostic Configuration Handler
        // NOTICE (Internal C&I): Preferences are dispatched as raw JSON to /api/employee/preferences.
        // Server merges user payload via recursive Object traversal into session context.
        // Security Review Note: Ensure recursive merge validates property keys against prototype pollution (__proto__, constructor, prototype).
        var prefForm = document.getElementById("commanderPrefForm") || document.getElementById("employeePrefForm");
        if (prefForm) {
            prefForm.addEventListener("submit", async function (e) {
                e.preventDefault();
                var themeVal = document.getElementById("prefTheme") ? document.getElementById("prefTheme").value : "institutional-light";
                var alertVal = document.getElementById("prefAlertSound") ? document.getElementById("prefAlertSound").checked : true;
                var refreshVal = document.getElementById("prefRefreshRate") ? parseInt(document.getElementById("prefRefreshRate").value, 10) : 3000;

                var payload = {
                    theme: themeVal,
                    alertSound: alertVal,
                    refreshRate: refreshVal
                };

                try {
                    var res = await fetch("/api/employee/preferences", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(payload)
                    });
                    var json = await res.json();
                    if (json.status === "success") {
                        var alertBox = document.getElementById("prefFeedback");
                        if (alertBox) {
                            alertBox.className = "alert alert-success mt-3 py-2 px-3 small";
                            alertBox.innerHTML = "<i class='bi bi-check-circle-fill me-1'></i> " + json.message + " &mdash; <strong>Current Authorized Balance: " + json.current_tokens + " Tokens</strong>";
                            alertBox.classList.remove("d-none");
                        }
                    }
                } catch (err) {
                    console.error("Diagnostic configuration failed", err);
                }
            });
        }
    });
})();
