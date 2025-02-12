async function addHotel() {
    let name = prompt("Provide the new hotel's name");
    let hotelLocation = prompt("Provide the new hotel's location");

    if (!name || !hotelLocation) {
        alert("Both name and location are required!");
        return;
    }

    await fetch('/hotels', {
        method: "POST",
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify({
            Name: name,
            Location: hotelLocation,
        }),
    })
    .then((response) => {
        if (response.ok) {
            alert("Created a new hotel");
            location.reload();
            return Promise.resolve(response);
        }
        return Promise.reject(response);
    })
    .catch((response) => {
        alert(response.statusText);
    });
}

