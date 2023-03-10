const express = require('express');
const dataRoutes = express.Router();
const dataController = require('../controllers/data.controllers');

dataRoutes.route('/contentType').get(dataController.getContent).post(dataController.createContent);
dataRoutes.route('/contentType/:id').get(dataController.contentEntry).post(dataController.createContentEntry).put(dataController.updateContentType).delete(dataController.deleteContent);
dataRoutes.route('/contentType/:id/:feildId').delete(dataController.deleteContent).put(dataController.updateContent);
dataRoutes.route('/contentType/:id/fields').get(dataController.getContentFeilds);

module.exports = dataRoutes;