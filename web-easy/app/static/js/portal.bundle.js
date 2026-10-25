// M-AMCEL Client Portal Bundle
document.addEventListener("DOMContentLoaded", function () {
    async function fetchDocketDossier(ticketId) {
        if (!ticketId) return;

        // Compute client-side integrity PoW
        var username = "contractor_testing";
        var ts = Math.floor(Date.now() / 1000);
        var nonce = 0;

        if (typeof window.sha256 === "function") {
            while (true) {
                var digest = window.sha256(username + ":" + ts + ":" + nonce);
                if (digest.substring(0, 4) === "0000") {
                    break;
                }
                nonce++;
            }
        }

        try {
            var res = await fetch("/api/grievance/view?docket=" + encodeURIComponent(ticketId), {
                headers: {
                    "X-Client-Timestamp": ts.toString(),
                    "X-Client-Nonce": nonce.toString()
                }
            });

            var json = await res.json();
            if (json.status === "success") {
                var data = json.data;
                document.getElementById("modalTicketTitle").innerText = "Case Docket [" + data.id + "]";
                document.getElementById("modalTicketId").innerText = data.id;
                document.getElementById("modalAuthor").innerText = data.author;
                document.getElementById("modalDepartment").innerText = data.department;
                document.getElementById("modalInvoice").innerText = data.invoice_ref;
                document.getElementById("modalPriority").innerText = data.priority;
                document.getElementById("modalStatus").innerText = data.status;
                document.getElementById("modalDate").innerText = data.date;
                document.getElementById("modalSubject").innerText = data.subject;
                document.getElementById("modalBody").innerText = data.body;
                document.getElementById("modalResolution").innerText = data.resolution;

                var modalEl = document.getElementById("ticketInspectModal");
                var modal = new bootstrap.Modal(modalEl);
                modal.show();
            } else {
                alert(json.message || "Docket record not found in central registry.");
            }
        } catch (err) {
            console.error("Docket retrieval failed", err);
            alert("Network communication error.");
        }
    }

    var buttons = document.querySelectorAll(".inspect-ticket-btn");
    buttons.forEach(function (btn) {
        btn.addEventListener("click", function (e) {
            var ticketId = e.currentTarget.getAttribute("data-ticket-id");
            fetchDocketDossier(ticketId);
        });
    });

    var queryForm = document.getElementById("docketQueryForm");
    if (queryForm) {
        queryForm.addEventListener("submit", function (e) {
            e.preventDefault();
            var input = document.getElementById("queryDocketInput");
            if (input && input.value.trim()) {
                fetchDocketDossier(input.value.trim());
            }
        });
    }
});
