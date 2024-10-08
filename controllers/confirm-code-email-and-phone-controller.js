import ApiError from "../exceptions/api-error.js";
import MailService from "../service/mail-service.js";
import ConfirmCodeEmailAndPhoneService from "../service/confirm-code-email-and-phone-service.js";
import UsersExtranet from "../models/users-extranet-model.js";

class ConfirmCodeEmailAndPhoneController {
    async sendCodeForEmail(req, res, next) {
        try {
            const userId = req.params.userId;

            // Проверка наличия userId в запросе
            if (!userId) {
                return res.status(400).json({error: "Некорректные данные"});
            }

            // Поиск пользователя по userId
            const result = await UsersExtranet.findOne({where: {id: userId}});

            // Проверка наличия результата поиска
            if (!result) {
                return res.status(404).json({error: "Пользователь не найден"});
            }

            // Генерация и отправка кода для подтверждения на email
            const data = await ConfirmCodeEmailAndPhoneService.sendCodeForEmail(userId);
            const resultMail = await MailService.sendConfirmPhoneCodeMail(result.email, data.dataValues.activationCodeEmail);

            // Проверка успешной отправки письма
            if (!resultMail) {
                return res.status(500).json({error: "Ошибка при отправке письма на почту"});
            }

            console.log("resultMail", resultMail);
            res.json(data);
        } catch (error) {
            next(error);
        }
    }

    async confirmCodeForEmail(req, res, next) {
        try {
            const userId = req.params.userId
            const {code} = req.body
            if (!userId && !code) {
                return new ApiError.BadRequest("Некорректные данные")
            }
            const data = await ConfirmCodeEmailAndPhoneService.confirmCodeForEmail(userId, code)
            res.json(data)
        } catch (error) {
            next(error);
        }
    }

//Код при восстановлении пароля
    async sendCodeRestorePassword(req, res, next) {
        try {
            const {email,code} = req.body
            if (!email && !code) {
                return new ApiError.BadRequest("Некорректные данные")
            }
            const data = await ConfirmCodeEmailAndPhoneService.sendCodeRestorePassword(email, code)
            res.json(data)
        } catch (error) {
            next(error);
        }
    }

    async confirmRestorePasswordCodeForEmail(req, res, next) {
        try {
            const {email, verification} = req.body
            if (!email) {
                return new ApiError.BadRequest("Некорректные данные")
            }
            // Генерация и отправка кода для подтверждения на email
            const data = await ConfirmCodeEmailAndPhoneService.confirmRestorePasswordCodeForEmail(email)
            console.log("data result: ",data.data.dataValues.activationCodeEmail);
            //Отправка письма для двукратной верификации
            if(verification) {
                const resultMail = await MailService.sendConfirmEmailCodeMail(email, data.data.dataValues.activationCodeEmail);
                // Проверка успешной отправки письма
                if (!resultMail) {
                    return res.status(500).json({error: "Ошибка при отправке письма на почту"});
                }
            } else {
                const resultMail = await MailService.sendRestorePasswordEmailCodeMail(email, data.data.dataValues.activationCodeEmail);
                // Проверка успешной отправки письма
                if (!resultMail) {
                    return res.status(500).json({error: "Ошибка при отправке письма на почту"});
                }
            }



            const resData = {
                success: data.success,
                message: data.message
            }
            res.json(resData)
        } catch (error) {
            next(error);
        }
    }

    async sendCodeForPhone(req, res, next) {
        try {
            const userId = req.params.userId
            if (!userId) {
                return new ApiError.BadRequest("Некорректные данные")
            }
            const result = await UsersExtranet.findOne({where: {id: userId}});
            const data = await ConfirmCodeEmailAndPhoneService.sendCodeForPhone(userId)
            await MailService.sendConfirmPhoneCodeMail(result.email, data.dataValues.codeConfirmForPhone)
            res.json(data)
        } catch (error) {
            next(error);
        }
    }

}

export default new ConfirmCodeEmailAndPhoneController()