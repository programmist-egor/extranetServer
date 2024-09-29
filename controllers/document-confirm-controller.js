import ApiError from "../exceptions/api-error.js";
import DocumentConfirmService from "../service/document-confirm-service.js";


class DocumentConfirmController {
    async getDocumentConfirm(req, res, next) {
        try {
            const data = await DocumentConfirmService.getDocumentConfirm()
            res.json(data)
        } catch (error) {
            next(error);
        }
    }
    async getDocumentConfirmById(req, res, next) {
        try {
            const hotelId = req.params.hotelId
            const data = await DocumentConfirmService.getDocumentConfirmById(hotelId)
            res.json(data)
        } catch (error) {
            next(error);
        }
    }
    async getDocumentConfirmByUserId(req, res, next) {
        try {
            const userId = req.params.userId
            const data = await DocumentConfirmService.getDocumentConfirmByUserId(userId)
            res.json(data)
        } catch (error) {
            next(error);
        }
    }
    async createDocumentConfirm(req, res, next) {
        try {
            const {documentInfo} = req.body;
            console.log("documentInfo",documentInfo);
            if (!documentInfo) {
                return new ApiError.BadRequest("Некорректные данные")
            }
            const data = await DocumentConfirmService.createDocumentConfirm(documentInfo)
            res.json(data)
        } catch (error) {
            next(error);
        }
    }
    async updateDocumentConfirm(req, res, next) {
        try {
            const hotelId = req.params.hotelId
            const {documentInfo} = req.body;
            if (!hotelId && !documentInfo) {
                return new ApiError.BadRequest("Некорректные данные")
            }
           const data = await DocumentConfirmService.updateDocumentConfirm(hotelId, documentInfo)
            res.json(data)
        } catch (error) {
            next(error);
        }
    }
    async deleteDocumentConfirm(req, res, next) {
        try {
            const idDoc = req.params.idDoc
            if (!idDoc) {
                return new ApiError.BadRequest("Некорректные данные")
            }
            const data = await DocumentConfirmService.deleteDocumentConfirm(idDoc)
            res.json(data)
        } catch (error) {
            next(error);
        }
    }

}

export default new DocumentConfirmController()