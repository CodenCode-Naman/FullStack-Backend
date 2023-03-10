const CustomError = require('../utils/customError.utils');
const dataService = require('../services/data.services');

const getContent = async (req, res) => {
    try {
        const content = await dataService.getContent();
        res.status(200).json(content);
    } catch ( err ) {
        if(err instanceof CustomError) {
            res.status(err.statusCode).json({message: err.message});
        } else {
            res.status(500).json({message: err.message});
        }
    }
};

const contentEntry = async (req, res) => {
    try {
        const content = await dataService.contentEntry(req.params.id);
        res.status(200).json(content);
    } catch ( err ) {
        if(err instanceof CustomError) {
            res.status(err.statusCode).json({message: err.message});
        } else {
            res.status(500).json({message: err.message});
        }
    }
};

const createContentEntry = async (req, res) => {
    try {
        const content = await dataService.createContentEntry(req.params.id, req.body);
        res.status(201).json(content);
    } catch ( err ) {
        if(err instanceof CustomError) {
            res.status(err.statusCode).json({message: err.message});
        } else {
            res.status(500).json({message: err.message});
        }
    }
};

const createContent = async (req, res) => {
    try {
        const content = await dataService.createContent(req.body.contentTypeName, req.body.contentTypeFeilds);
        res.status(201).json(content);
    } catch ( err ) {
        if(err instanceof CustomError) {
            res.status(err.statusCode).json({message: err.message});
        } else {
            res.status(500).json({message: err.message});
        }
    }
};

const deleteContent = async (req, res) => {
    try {
        const content = await dataService.deleteContent(req.params.id, req.params.feildId);
        res.status(200).json(content);
    } catch ( err ) {
        if(err instanceof CustomError) {
            res.status(err.statusCode).json({message: err.message});
        } else {
            res.status(500).json({message: err.message});
        }
    }
};

const updateContent = async (req, res) => {
    try {
        const content = await dataService.updateContent(req.params.id, req.params.feildId, req.body);
        res.status(200).json(content);
    } catch ( err ) {
        if(err instanceof CustomError) {
            res.status(err.statusCode).json({message: err.message});
        } else {
            res.status(500).json({message: err.message});
        }
    }
};

const updateContentType = async (req, res) => {
    try {
        const content = await dataService.updateContentType(req.params.id, req.params.feildId, req.body);
        res.status(200).json(content);
    } catch ( err ) {
        if(err instanceof CustomError) {
            res.status(err.statusCode).json({message: err.message});
        } else {
            res.status(500).json({message: err.message});
        }
    }
};

const deleteContentType = async (req, res) => {
    try {
        const content = await dataService.deleteContentType(req.params.id);
        res.status(200).json(content);
    } catch ( err ) {
        if(err instanceof CustomError) {
            res.status(err.statusCode).json({message: err.message});
        } else {
            res.status(500).json({message: err.message});
        }
    }
};

const getContentFeilds = async (req, res) => {
    try {
        const content = await dataService.getContentFeilds(req.params.id);
        res.status(200).json(content);
    } catch ( err ) {
        if(err instanceof CustomError) {
            res.status(err.statusCode).json({message: err.message});
        } else {
            res.status(500).json({message: err.message});
        }
    }
};

module.exports = {
    getContent,
    contentEntry,
    createContentEntry,
    createContent,
    deleteContent,
    updateContent,
    updateContentType,
    deleteContentType,
    getContentFeilds
};