import ApiError from "../exceptions/api-error.js";
import ContractService from "../service/contract-service.js";


class ContractController {
    async getDataContract(req, res, next) {
        try {
            const data = await ContractService.getDataContract()
            res.json(data)
        } catch (error) {
            next(error);
        }
    }
    async getContractById(req, res, next) {
        try {
            const userId = req.params.userId
            const data = await ContractService.getContractById(userId)
            res.json(data)
        } catch (error) {
            next(error);
        }
    }
    async getContractByUserId(req, res, next) {
        try {
            const userId = req.params.userId
            const data = await ContractService.getContractByUserId(userId)
            res.json(data)
        } catch (error) {
            next(error);
        }
    }
    async createContract(req, res, next) {
        try {
            const {contractData} = req.body;
            console.log("contractData",contractData);
            if (!contractData) {
                return new ApiError.BadRequest("Некорректные данные")
            }
            const data = await ContractService.createContract(contractData)
            res.json(data)
        } catch (error) {
            next(error);
        }
    }
    async updateContract(req, res, next) {
        try {
            const userId = req.params.userId
            const {contractData} = req.body;
            if (!userId && !contractData) {
                return new ApiError.BadRequest("Некорректные данные")
            }
           const data = await ContractService.updateContract(userId, contractData)
            res.json(data)
        } catch (error) {
            next(error);
        }
    }
    async deleteContract(req, res, next) {
        try {
            const userId = req.params.userId
            if (!userId) {
                return new ApiError.BadRequest("Некорректные данные")
            }
            const data = await ContractService.deleteContract(userId)
            res.json(data)
        } catch (error) {
            next(error);
        }
    }

}

export default new ContractController()