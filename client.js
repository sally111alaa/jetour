function selectTicket(type) {
    fetch("http://YOUR_SERVER_IP:3000/queue")
        .then(res => res.json())
        .then(queue => {
            const countType = queue.filter(q => q.ticket.startsWith(type)).length;
            const ticketID = type + (countType + 1);

            const newTicket = {
                ticket: ticketID,
                type: type,
                serviceAdvisor: "Not Assigned",
                status: "Waiting",
                arrivalTime: new Date().toLocaleTimeString()
            };

            // أرسل التذكرة الجديدة للسيرفر
            fetch("http://YOUR_SERVER_IP:3000/queue", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newTicket)
            })
            .then(res => res.json())
            .then(data => {
                console.log(data.message);
                // عرض التذكرة للعميل
                document.getElementById("homeScreen").classList.add("hidden");
                document.getElementById("ticketScreen").classList.remove("hidden");
                document.getElementById("ticketInfo").innerHTML =
                    `<p><strong>Ticket:</strong> ${newTicket.ticket}</p>
                     <p><strong>Arrival Time:</strong> ${newTicket.arrivalTime}</p>`;
            });
        });
}