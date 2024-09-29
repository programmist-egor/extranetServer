import ApiError from "../exceptions/api-error.js";
import ObjectsExtranet from "../models/objects-extranet-model.js";
import CategoryNumbersExtranet from "../models/category-number-extranet-model.js";
import PhotoObjectExtranet from "../models/photo-object-extranet-model.js";
import PhotoNumberObjectExtranet from "../models/photo-number-object-model.js";
import NumberExtranet from "../models/numbers-model.js";



class ObjectService {
    async getAllObject() {
        const result = await ObjectsExtranet.findAll();
        if (result) {
            return result
        }
    }

    async getObject(hotelId) {
        const result = await ObjectsExtranet.findOne({where: {hotelId: hotelId}});
        if (result) {
            return result
        }
    }
    async getObjectByUserId(userId) {
        const result = await ObjectsExtranet.findAll({where: {userId: userId}});
        if (result) {
            return result
        }
    }
    async createObject(dataObjectSetting) {
        try {
            const newObject = await ObjectsExtranet.create(dataObjectSetting);
            return newObject;
        } catch (error) {
            console.error("Ошибка при создании объекта:", error);
            throw new Error("Ошибка при создании объекта");
        }
    }

    async updateObject(hotelId, dataObjectSetting) {
        const result = await ObjectsExtranet.update(dataObjectSetting, {where: {hotelId: hotelId}});
        if (result !== 0) {
            return {success: true, message: "Объект активирован"}
        } else {
            return {success: false, message: "Объект не активирован"}
        }
    }

    async deleteObject(hotelId) {
        await ObjectsExtranet.destroy({where: {hotelId: hotelId}});
        await CategoryNumbersExtranet.destroy({where: {hotelId: hotelId}})
        await PhotoObjectExtranet.destroy({where: {hotelId: hotelId}})
        await PhotoNumberObjectExtranet.destroy({where: {hotelId: hotelId}})
        await NumberExtranet.destroy({where: {hotelId: hotelId}})
    }

}

export default new ObjectService();