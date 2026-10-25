// M-AMCEL Client Portal Bundle
document.addEventListener("DOMContentLoaded", function () {
    var buttons = document.querySelectorAll(".inspect-ticket-btn");

    buttons.forEach(function (btn) {
        btn.addEventListener("click", async function (e) {
            var ticketId = e.currentTarget.getAttribute("data-ticket-id");
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
                var res = await fetch("/api/grievance/view?id=" + encodeURIComponent(ticketId), {
                    headers: {
                        "X-Client-Timestamp": ts.toString(),
                        "X-Client-Nonce": nonce.toString()
                    }
                });

                var json = await res.json();
                if (json.status === "success") {
                    var data = json.data;
                    document.getElementById("modalTicketTitle").innerText = "Grievance Report [CASE-#" + data.id + "]";
                    document.getElementById("modalTicketId").innerText = "#" + data.id;
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
                    alert(json.message || "Unable to retrieve report dossier.");
                }
            } catch (err) {
                console.error("Grievance retrieval failed", err);
                alert("Network communication error.");
            }
        });
    });
});
