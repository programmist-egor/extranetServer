import BookingService from "../service/booking-service.js";
import ApiError from "../exceptions/api-error.js";


class BookingController {
    async getAllBooking(req, res, next) {
        try {
            const data = await BookingService.getAllBooking()
            res.json(data)
        } catch (error) {
            next(error);
        }
    }
    async getAllBookingByObject(req, res, next) {
        try {
            const hotelId = req.params.hotelId
            if (!hotelId) {
                return new ApiError.BadRequest("Некорректные данные")
            }
            const data = await BookingService.getAllBookingByObject(hotelId)
            res.json(data)
        } catch (error) {
            next(error);
        }
    }
    async getBooking(req, res, next) {
        try {
            const id = req.params.id
            const data = await BookingService.getBooking(id)
            res.json(data)
        } catch (error) {
            next(error);
        }
    }
    async createBooking(req, res, next) {
        try {
            const {numberId, data, dataNumber} = req.body;
            if (!numberId && !data && !dataNumber) {
                return new ApiError.BadRequest("Некорректные данные")
            }
          const result =  await BookingService.createBooking( numberId, data, dataNumber)
            res.json(result)
        } catch (error) {
            next(error);
        }
    }
    async updateBooking(req, res, next) {
        try {
            const id = req.params.id
            const {numberId, data, dataNumber, dataUser, userId, type} = req.body;
            if (!id && !data && !numberId && !dataNumber && !dataUser && !userId && !type) {
                return new ApiError.BadRequest("Некорректные данные")
            }
           const res = await BookingService.updateBooking(id, data, numberId, dataNumber, dataUser, userId, type)
            res.json(res)
        } catch (error) {
            next(error);
        }
    }

    async deleteBooking(req, res, next) {
        try {
            const id = req.params.id
            const {numberId, dataNumber, dataUser, userId} = req.body;
            console.log("DATA DELETE BOOKING CONTROLLER: ", id, dataNumber, numberId, dataUser, userId)
            if (!id && !numberId && !dataNumber && !dataUser && !userId) {
                return new ApiError.BadRequest("Некорректные данные")
            }
            const res =  await BookingService.deleteBooking(id, dataNumber, numberId, dataUser, userId)
            res.json(res)
        } catch (error) {
            next(error);
        }
    }

}

export default new BookingController()