import ContractExtranet from "../models/contract-model.js";


class ContractService {
    async getDataContract() {
        const result = await ContractExtranet.findAll();
        if (result) {
            return result
        }
    }
    async getContractById(userId) {
        const result = await ContractExtranet.findOne({where: {userId: userId}});
        if (result) {
            return result
        } else {
            return null
        }
    }
    async getContractByUserId(userId) {
        try {
            const result = await ContractExtranet.findOne({ where: { userId: userId } });
            return result || null;
        } catch (error) {
            console.error(error);
            return null;
        }
    }
    async createContract(contractData) {
        try {
            const newContract = await ContractExtranet.create(contractData);
            return newContract;
        } catch (error) {
            console.error("Ошибка при создании контракта:", error);
            return null; // Возвращаем null в случае ошибки
        }
    }

    async updateContract(userId, contractData) {
        const result = await ContractExtranet.update(contractData, {where: {userId: userId}});
        return result
    }

    async deleteContract(userId) {
        const result = await ContractExtranet.destroy({where: {userId: userId}});
        return result
    }
}

export default new ContractService()