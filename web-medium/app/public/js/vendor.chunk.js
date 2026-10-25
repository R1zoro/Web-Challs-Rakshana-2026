/**
 * Vendor chunk: UI Helpers & Form Serialization v2.9.4
 * Build: production-optim-linux64
 */
!function(){"use strict";window.NRF_Helpers={serializeForm:function(e){var t={},n=new FormData(e);return n.forEach((function(e,n){t[n]=e})),t},formatMicroSieverts:function(e){return parseFloat(e).toFixed(3)+" µSv/h"},pingDiagnosticHeartbeat:function(){return{status:"ok",epoch:Date.now()}}}}();
