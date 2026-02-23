function selectTicket(type) {

    const today = new Date().toISOString().split("T")[0];
    const storageKey = "queue_" + today;

    let queue = JSON.parse(localStorage.getItem(storageKey)) || [];

    
    const countType = queue.filter(q => q.ticket.startsWith(type)).length;
    const ticketID = type + (countType + 1); // A1, B2 ...

    const newTicket = {
        ticket: ticketID,
        Type: type,
        serviceAdvisor: "Not Assigned",
        status: "Waiting",
        time: new Date().toLocaleTimeString()
    };

    queue.push(newTicket);
    localStorage.setItem(storageKey, JSON.stringify(queue));

    
    document.getElementById("homeScreen").classList.add("hidden");
    document.getElementById("ticketScreen").classList.remove("hidden");

    document.getElementById("ticketInfo").innerHTML =
        `<p><strong>Ticket:</strong> ${newTicket.ticket}</p>
         <p><strong>Arrival Time:</strong> ${newTicket.time}</p>`;
}

function goHome() {
    document.getElementById("ticketScreen").classList.add("hidden");
    document.getElementById("homeScreen").classList.remove("hidden");
}