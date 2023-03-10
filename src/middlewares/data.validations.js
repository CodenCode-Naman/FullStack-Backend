const {dataVallidation} = require('../schemas/data.schemas');

const validateData = (req, res, next) => {
    const {id, feildId} = req.params;
    const {error} = dataVallidation.validate({id});
    if(error) {
        return res.status(400).json({message: error.message});
    }
    if(feildId) {
        const {error} = dataVallidation.validate({id: feildId});
        if(error) {
            return res.status(400).json({message: error.message});
        }
    }
    next();
};

module.exports = validateData;