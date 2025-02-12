class RoomService {
    constructor(db) {
        this.client = db.sequelize;
        this.Room = db.Room;
        this.User = db.User;
        this.Hotel = db.Hotel;
        this.Reservation = db.Reservation;
    }

    // Retrieve all rooms with associated users and hotel data
    async get() {
        return this.Room.findAll({
            include: [
                {
                    model: this.User,
                    through: {
                        attributes: ['StartDate', 'EndDate']
                    }
                },
                {
                    model: this.Hotel
                }
            ]
        });
    }

    // Retrieve rooms for a specific hotel with associated users and hotel data
    async getHotelRooms(hotelId) {
        return this.Room.findAll({
            where: {
                HotelId: hotelId
            },
            include: [
                {
                    model: this.User,
                    through: {
                        attributes: ['StartDate', 'EndDate']
                    }
                },
                {
                    model: this.Hotel
                }
            ]
        });
    }

    // Rent a room for a user
    async rentARoom(userId, roomId, startDate, endDate) {
        await this.Reservation.create({
            UserId: userId,
            RoomId: roomId,
            StartDate: startDate,
            EndDate: endDate
        });
    }
}

module.exports = RoomService;

