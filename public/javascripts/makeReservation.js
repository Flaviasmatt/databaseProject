async function makeReservation(userId, roomId, url) {
    let startDate = prompt("Por favor, forneça a data de início no formato YYYY-MM-DD HH:MM:SS");
    let endDate = prompt("Por favor, forneça a data de término no formato YYYY-MM-DD HH:MM:SS");

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            UserId: userId,
            RoomId: roomId,
            StartDate: startDate,
            EndDate: endDate
        })
    });

    const resData = 'Reserva feita';
    location.reload(); // Atualiza a página após a reserva
    return resData;
}
