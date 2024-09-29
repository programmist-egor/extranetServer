import RouterExp from "express";
import {authMiddleware} from "../middlewares/auth-middleware.js";
import ObjectController from "../controllers/object-controller.js";
import PhotosObjectController from "../controllers/photos-object-controller.js";
import UserExtranetController from "../controllers/user-extranet-controller.js";
import ContractController from "../controllers/contract-controller.js";
import NumberController from "../controllers/number-controller.js";
import PhotosNumberController from "../controllers/photos-number-controller.js";
import CategoryController from "../controllers/category-controller.js";
import DocumentConfirmController from "../controllers/document-confirm-controller.js";
import BookingController from "../controllers/booking-controller.js";
import UserYookingController from "../controllers/user-yooking-controller.js";
import RestorePasswordController from "../controllers/restore-password-controller.js";
import ConfirmCodeEmailAndPhoneController from "../controllers/confirm-code-email-and-phone-controller.js";
import ChatSupportController from "../controllers/chat-support-controller.js";
const Router = RouterExp.Router
const mainRoute = new Router()


//USERS YOOKING
mainRoute.get("/user/yooking", authMiddleware, UserYookingController.getAllUsersYooking)
mainRoute.get("/user/get_by_id/:userId", authMiddleware, UserYookingController.getUserYooking)
mainRoute.get("/user/get/corp/:userId", authMiddleware, UserYookingController.getUserIdYookingCorp)
mainRoute.post("/user/get/user", authMiddleware,UserYookingController.getUserEmailYooking)
mainRoute.put("/user/yooking/:userId", authMiddleware, UserYookingController.updateUserYooking)
mainRoute.put("/user/yooking/code/:userId", authMiddleware, UserYookingController.generateCode)
mainRoute.delete("/user/yooking/:userId", authMiddleware, UserYookingController.deleteUserYooking)
//CONFIRM EMAIL AND PHONE
mainRoute.put("/code/email/:userId",  ConfirmCodeEmailAndPhoneController.sendCodeForEmail)
mainRoute.post("/code/email/confirm/:userId",  ConfirmCodeEmailAndPhoneController.confirmCodeForEmail)
mainRoute.post("/code/email/restore",  ConfirmCodeEmailAndPhoneController.confirmRestorePasswordCodeForEmail)
mainRoute.post("/code/email/codeRestore",  ConfirmCodeEmailAndPhoneController.sendCodeRestorePassword)
mainRoute.put("/code/phone/:userId",  ConfirmCodeEmailAndPhoneController.sendCodeForPhone)
//RESTORE PASSWORD
mainRoute.post("/code/restorePassword",  RestorePasswordController.sendRestorePassword)
//USERS EXTRANET
mainRoute.get("/user/extranet", authMiddleware, UserExtranetController.getAllUsersExtranet)
mainRoute.get("/user/extranet/:userId", authMiddleware, UserExtranetController.getUserExtranet)
mainRoute.put("/user/extranet/:userId", authMiddleware, UserExtranetController.updateUserExtranet)
mainRoute.put("/user/extranet/code/:userId", authMiddleware, UserExtranetController.generateCode)
mainRoute.delete("/user/extranet/:userId", authMiddleware, UserExtranetController.deleteUserExtranet)
//NUMBER
mainRoute.get('/numbers/:hotelId', authMiddleware, NumberController.getAllNumbers);
mainRoute.get('/number_one/:numberId', authMiddleware, NumberController.getNumberById);
mainRoute.post('/numbers', authMiddleware, NumberController.createNumber);
mainRoute.put('/numbers/:numberId', authMiddleware, NumberController.updateNumber);
mainRoute.post('/numbers/:numberId', authMiddleware, NumberController.deleteNumberById);
mainRoute.delete('/numbers/:id', authMiddleware, NumberController.deleteNumbersByLastCategory);
mainRoute.delete('/numbers/:categoryId', authMiddleware, NumberController.deleteAllNumbersByCategory);
mainRoute.delete('/numbers/:hotelId', authMiddleware, NumberController.deleteAllNumberByObject);
//OBJECT
mainRoute.get("/objects", authMiddleware, ObjectController.getAllObject)
mainRoute.get("/object/:hotelId", authMiddleware, ObjectController.getObject)
mainRoute.get("/objects/:userId", authMiddleware, ObjectController.getObjectByUserId)
mainRoute.post("/object", authMiddleware, ObjectController.createObject)
mainRoute.put("/object/:hotelId", authMiddleware, ObjectController.updateObject)
mainRoute.delete("/object/:hotelId", authMiddleware, ObjectController.deleteObject)
//OBJECT PHOTOS
mainRoute.get("/object/photos/:hotelId", authMiddleware, PhotosObjectController.getAllPhotosObject);
mainRoute.post('/object/photos', authMiddleware, PhotosObjectController.createPhotoObject);
mainRoute.delete('/object/photo/:idImg', authMiddleware, PhotosObjectController.deletePhotoObject);
mainRoute.delete('/object/photos/:hotelId', authMiddleware, PhotosObjectController.deleteAllPhotosObject);
//NUMBER PHOTOS
mainRoute.get('/numbers/photos/:categoryId', authMiddleware, PhotosNumberController.getAllPhotosCategoryNumber);
mainRoute.get('/number/photos/:numberId', authMiddleware, PhotosNumberController.getAllPhotosNumber);
mainRoute.post('/number/photos', authMiddleware, PhotosNumberController.createNumberPhotos);
mainRoute.delete('/number/photo/:idImg', authMiddleware, PhotosNumberController.deleteNumberPhoto);
mainRoute.delete('/number/photos/:numberId', authMiddleware, PhotosNumberController.deleteAllNumberPhotos);
mainRoute.delete('/number/photos/:categoryId', authMiddleware, PhotosNumberController.deleteAllCategoryNumberPhotos);
mainRoute.delete('/number/photos/:hotelId', authMiddleware, PhotosNumberController.deleteAllObjectNumberPhotos);
//CONTRACT
mainRoute.get('/', authMiddleware, ContractController.getDataContract);
mainRoute.get('/:userId', authMiddleware, ContractController.getContractById);
mainRoute.get('/contract/:userId', authMiddleware, ContractController.getContractByUserId);
mainRoute.post('/', authMiddleware, ContractController.createContract);
mainRoute.put('/:userId', authMiddleware, ContractController.updateContract);
mainRoute.delete('/:userId', authMiddleware, ContractController.deleteContract);
//DOCUMENT CONFIRM
mainRoute.get('/contract/document_confirm', authMiddleware, DocumentConfirmController.getDocumentConfirm);
mainRoute.get('/contract/object/document_confirm/:hotelId', authMiddleware, DocumentConfirmController.getDocumentConfirmById);
mainRoute.get('/contract/document_confirm/:userId', authMiddleware, DocumentConfirmController.getDocumentConfirmByUserId);
mainRoute.post('/contract/document_confirm', authMiddleware, DocumentConfirmController.createDocumentConfirm);
mainRoute.put('/contract/document_confirm/:hotelId', authMiddleware, DocumentConfirmController.updateDocumentConfirm);
mainRoute.delete('/contract/document_confirm/:idDoc', authMiddleware, DocumentConfirmController.deleteDocumentConfirm);
//CATEGORY
mainRoute.get('/categories/:hotelId', authMiddleware, CategoryController.getAllCategoryNumber);
mainRoute.get('/category/:categoryId', authMiddleware, CategoryController.getOneCategoryNumber);
mainRoute.post('/category', authMiddleware, CategoryController.createCategoryNumber);
mainRoute.put('/category/sale/:categoryId', authMiddleware, CategoryController.updateCategory);
mainRoute.put('/add__del/:categoryId', authMiddleware, CategoryController.updateCategoryNumber);
mainRoute.put('/category/:categoryLimitId', authMiddleware, CategoryController.updateCategoryNumberLimit);
mainRoute.delete('/category/:categoryId', authMiddleware, CategoryController.deleteCategoryNumber);
mainRoute.delete('/categories/:hotelId', authMiddleware, CategoryController.deleteAllCategoryNumber);
//CHAT SUPPORT
mainRoute.get('/chat/msg/:userId', authMiddleware,ChatSupportController.getMsgUser);
mainRoute.get('/chat', authMiddleware,ChatSupportController.getAllUsers);
mainRoute.put('/chat/:userId', authMiddleware, ChatSupportController.saveMessage);
mainRoute.put('/chat/viewMsg/:userId', authMiddleware, ChatSupportController.viewMessage);
mainRoute.post('/chat/add', authMiddleware, ChatSupportController.newDialogue);
mainRoute.post('/chat/delete/:userId', authMiddleware, ChatSupportController.deleteDialogue);
//BOOKING
mainRoute.get('/', authMiddleware, BookingController.getAllBooking);
mainRoute.get('/bookings/by_object/:hotelId', authMiddleware, BookingController.getAllBookingByObject);
mainRoute.get('/booking/:id', authMiddleware, BookingController.getBooking);
mainRoute.post('/booking', authMiddleware, BookingController.createBooking);
mainRoute.put('/booking/:id', authMiddleware, BookingController.updateBooking);
mainRoute.post('/booking/delete/:id', authMiddleware, BookingController.deleteBooking);
export default mainRoute;