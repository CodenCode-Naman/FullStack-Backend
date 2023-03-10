const joi = require('joi');
const dataVallidation = joi.object({
    id: joi.number().required(),
});

module.exports = dataVallidation;