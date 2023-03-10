const express = require('express');
const dataRoutes = express.Router();
const dataController = require('../controllers/data.controllers');
const {validateData} = require('../middlewares/data.validations');

dataRoutes.route('/contentType').get(dataController.getContent).post(dataController.createContent);
dataRoutes.route('/contentType/:id').get(validateData, dataController.contentEntry).post(validateData, dataController.createContentEntry).put(validateData, dataController.updateContentType).delete(validateData, dataController.deleteContent);
dataRoutes.route('/contentType/:id/:feildId').delete(validateData, dataController.deleteContent).put(validateData, dataController.updateContent);
dataRoutes.route('/contentType/:id/fields').get(validateData, dataController.getContentFeilds);

module.exports = dataRoutes;