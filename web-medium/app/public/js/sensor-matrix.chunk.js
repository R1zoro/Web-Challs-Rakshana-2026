/**
 * Webpack Production Bundle: sensor-matrix.chunk.js
 * Module: PIRTN Sensor Array Matrix & Radiological Calculations
 * AERB Standard Safety Code SS-2024
 */
(function (global) {
    "use strict";

    function SensorMatrixProcessor(config) {
        this.config = config || {};
        this.sampleBuffer = [];
        this.bufferCapacity = 120;
    }

    SensorMatrixProcessor.prototype.pushSample = function (detectorId, uSvReading) {
        var entry = {
            id: detectorId,
            val: uSvReading,
            ts: Date.now()
        };
        this.sampleBuffer.push(entry);
        if (this.sampleBuffer.length > this.bufferCapacity) {
            this.sampleBuffer.shift();
        }
        return this.computeRollingMean(detectorId);
    };

    SensorMatrixProcessor.prototype.computeRollingMean = function (detectorId) {
        var matching = this.sampleBuffer.filter(function (s) { return s.id === detectorId; });
        if (matching.length === 0) return 0;
        var sum = matching.reduce(function (acc, s) { return acc + s.val; }, 0);
        return (sum / matching.length).toFixed(3);
    };

    SensorMatrixProcessor.prototype.assessDoseEquivalent = function (gammaUsvH, hoursExposure) {
        var dose = (parseFloat(gammaUsvH) || 0) * (parseFloat(hoursExposure) || 1);
        return {
            totalDoseUsv: dose.toFixed(2),
            aerbPermissiblePct: ((dose / 20000) * 100).toFixed(4),
            classification: dose > 1000 ? "HIGH_DOSE_ZONE" : dose > 100 ? "CONTROLLED_ZONE" : "NORMAL_BACKGROUND"
        };
    };

    SensorMatrixProcessor.prototype.computePlumeDispersion = function (sourceRateBq, windSpeedMs, stabilityClass) {
        var sigmaConstants = {
            "Pasquill-A": { a: 0.22, b: 0.20 },
            "Pasquill-B": { a: 0.16, b: 0.12 },
            "Pasquill-C": { a: 0.11, b: 0.08 },
            "Pasquill-D": { a: 0.08, b: 0.06 },
            "Pasquill-E": { a: 0.06, b: 0.04 }
        };
        var coeff = sigmaConstants[stabilityClass] || sigmaConstants["Pasquill-D"];
        return {
            groundLevelConcentrationBqM3: (sourceRateBq / (Math.PI * (windSpeedMs || 1) * coeff.a * coeff.b)).toExponential(3),
            bufferClearanceDistanceKm: 2.4,
            sectorEvacuationTrigger: false
        };
    };

    global.SensorMatrixProcessor = SensorMatrixProcessor;
    global.__PIRTN_PROCESSOR__ = new SensorMatrixProcessor();
})(typeof window !== "undefined" ? window : this);
