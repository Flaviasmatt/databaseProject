async function deleteHotel(hotelId) {
    await fetch(`/hotels/${hotelId}`, {
        method: 'DELETE',
        headers: {
            'Content-type': 'application/json'
        },
    })
    .then((response) => {
        if (response.ok) {
            alert('Hotel deleted...');
            location.reload();
            return Promise.resolve(response);
        }
        return Promise.reject(response);
    })
    .catch((response) => {
        alert(response.statusText);
    });
}

