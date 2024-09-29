import BookingExtranet from "../models/booking-extranet-model.js";
import ApiError from "../exceptions/api-error.js";
import NumberExtranet from "../models/numbers-model.js";
import UsersYooking from "../models/users-yooking-model.js";
import UsersCorp from "../models/users-corp-model.js";


class BookingService {
    async getAllBooking() {
        const data = await BookingExtranet.findAll();
        console.log("ALL DATA BOOKING",data);
        if (!data || data.length === 0) {
            throw new ApiError.BadRequest("Нет такой брони");
        }
        return data;
    }
    async getAllBookingByObject(hotelId) {
        const data = await BookingExtranet.findAll({where: {hotelId: hotelId}})
        if (!data) {
            throw new ApiError.BadRequest("Нет такой брони")
        }
        return data
    }
    async getBooking(id) {
        const data = await BookingExtranet.findOne({where: {id: id}})
        if (!data) {
            throw new ApiError.BadRequest("Нет такой брони")
        }
        return data
    }
    async createBooking(numberId, data, dataNumber) {
        try {
            await BookingExtranet.create(data);
            await NumberExtranet.update(dataNumber, {where: {id: numberId}});
              console.log("Бронирование успешно создано");
            return true
        } catch (error) {
            return console.error("Ошибка при создании бронирования:", error);
            // Дополнительные действия при возникновении ошибки, например, логирование или уведомление пользователя
        }
    }

    async updateBooking(id, data, numberId, dataNumber, dataUser, userId, type) {
        try {
            await NumberExtranet.update(dataNumber, { where: { id: numberId } });
            if(type === "Корпоративный") {
                await UsersCorp.update(dataUser, {where: {id: userId}});
            } else {
                await UsersYooking.update(dataUser, {where: {id: userId}});
            }

            console.log("Бронирование успешно обновлено");
            return await BookingExtranet.update(data, { where: { id: id } });
        } catch (error) {
            console.error("Ошибка при обновлении бронирования:", error);
            // Дополнительные действия при возникновении ошибки, например, логирование или уведомление пользователя
            return false; // Возвращаем false при ошибке
        }
    }
    async deleteBooking(id, dataNumber, numberId, dataUser, userId) {
        console.log("DATA DELETE BOOKING SERVICES: ", id, dataNumber, numberId, dataUser, userId)
        await BookingExtranet.destroy( { where: { id: id } });
        await NumberExtranet.update(dataNumber, {where: {id: numberId}});
        await UsersYooking.update(dataUser, {where: {id: userId}});
    }
}

export default new BookingService()