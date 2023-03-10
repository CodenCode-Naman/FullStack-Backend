const CustomError = require('../utils/customError.utils');
const {dynamicTable} = require('../utils/dynamicTable.utils');
const db = require('../../db/models');

const getContent = async() =>  {
    const content = await db.contents.findAll();
    return content;
}

const contentEntry = async(id) => {
    const contentTable = await db.contentLists.findOne( {
        where: {
            contentId: id,
        },
    });
    const dynamicTable = db.sequelize.model(contentTable.contentName);
    const content = await dynamicTable.findAll();
    return content;
}

const createContentEntry = async(contentId, content) => {
    const contentTable = await db.contentLists.findOne( {
        where: {
            contentId: contentId,
        },
    });
    const dynamicTable = db.sequelize.model(contentTable.contentName);
    const contentEntry = await dynamicTable.create(content);
    return contentEntry;
}

const createContent = async(contentTypeName, contentTypeFeilds) => {
    const contentTypePresent = await db.contents.findOne( {
        where: {
            contentTypeName: contentTypeName,
        },
    });
    if(contentTypePresent) {
        throw new CustomError(400, 'Content Type Already Present');
    }
    const content = await db.contents.create({
        contentTypeName: contentTypeName,
    });
    const contentTable = await db.contentLists.create({
        contentName: `Table_${content.id}`,
        contentId: content.id,
    });
    const contentTypeFeildsTrim = contentTypeFeilds.map((field) => field.trim());
    const contentTypeFeildsLowerCaseTrim = contentTypeFeildsTrim.map((field) => field.toLowerCase());
    const contentTypeFeildsUnique = [...new Set(contentTypeFeildsLowerCaseTrim)];
    dynamicTable(contentTable.contentName, contentTypeFeildsUnique);
    return content;
}

const deleteContent = async(contentId, feildId) => {
    const contentTable = await db.contentLists.findOne( {
        where: {
            contentId: contentId,
        },
    });
    const dynamicTable = db.sequelize.model(contentTable.contentName);
    const content = await dynamicTable.destroy({
        where: {
            id: feildId,
        },
    });
    if(!content) {
        throw new CustomError(404, 'Content Not Found');
    }
    return {message: 'Content Deleted Successfully'};
}

const deleteContentype = async(id) => {
    const content = await db.contents.destroy({
        where: {
            id: id,
        },
    });
    if(!content) {
        throw new CustomError(404, 'Content Type Not Found');
    }
    const contentTable = await db.contentLists.findOne( {
        where: {
            contentId: id,
        },
    });
    const dynamicTable = db.sequelize.model(contentTable.contentName);
    await dynamicTable.drop();
    await contentTable.destroy();
    await content.destroy();

    return {message: 'Content Type Deleted Successfully'};
}

const getContentFeilds = async(id) => {
    const contentTable = await db.contentLists.findOne( {
        where: {
            contentId: id,
        },
    });
    const dynamicTable = db.sequelize.model(contentTable.contentName);
    let tableAttributes = dynamicTable.rawAttributes;
    tableAttributes = Object.keys(tableAttributes);
    tableAttributes = tableAttributes.filter((attribute) => attribute !== 'id' && attribute !== 'createdAt' && attribute !== 'updatedAt');
    return tableAttributes;
}

const updateContent = async(contentId, feildId, content) => {
    const contentTable = await db.contentLists.findOne( {
        where: {
            contentId: contentId,
        },
    });
    const dynamicTable = db.sequelize.model(contentTable.contentName);
    const contentEntry = await dynamicTable.update(content, {
        where: {
            id: feildId,
        },
    });
    if(!contentEntry[0]) {
        throw new CustomError(404, 'Content Not Found');
    }
    return {message: 'Content Updated Successfully'};
}

const updateContentType = async (id, contentTypeName, contentTypeFeilds, activity) => {
    const content = await db.contents.findOne({
        where: {
            id: id,
        },
    });
    if(!content) {
        throw new CustomError(404, 'Content Type Not Found');
    }
    if(contentTypeName) {
        content.contentTypeName = contentTypeName;
    }
    if(contentTypeFeilds) {
        const contentTable = await db.contentLists.findOne( {
            where: {
                contentId: id,
            },
        });
        const dynamicTable = db.sequelize.model(contentTable.contentName);
        const contentTypeFeildsTrim = contentTypeFeilds.map((field) => field.trim());
        const contentTypeFeildsLowerCaseTrim = contentTypeFeildsTrim.map((field) => field.toLowerCase());
        const contentTypeFeildsUnique = [...new Set(contentTypeFeildsLowerCaseTrim)];
        if (activity === 'add') {
            let tableAttributes = Object.keys(dynamicTable.rawAttributes);
            tableAttributes = tableAttributes.filter((attribute) => attribute !== 'id' );
            tableAttributes = [...tableAttributes, ...contentTypeFeildsUnique];
            dynamicTable(contentTable.contentName, tableAttributes);
            await db.sequelize.sync({alter: true});
        } else if (activity === 'remove') {
            let tableAttributes = Object.keys(dynamicTable.rawAttributes);
            if(tableAttributes.length === 1) {
                throw new CustomError(400, 'Cannot Remove All Feilds');
            }
            contentTypeFeildsUnique.forEach((feild) => {
                if(!tableAttributes.includes(feild)) {
                    throw new CustomError(400, 'Feild Not Present');
                }
            });
            tableAttributes = tableAttributes.filter((attribute) => attribute !== 'id' );
            tableAttributes = tableAttributes.filter((attribute) => !contentTypeFeildsUnique.includes(attribute));
            dynamicTable(contentTable.contentName, tableAttributes);
            await db.sequelize.sync({alter: true});
        }
    }
    await content.save();
    return {message: 'Content Type Updated Successfully'};
};


module.exports = {
    getContent,
    createContent,
    deleteContentype,
    getContentFeilds,
    updateContentType,
    contentEntry,
    createContentEntry,
    deleteContent,
    updateContent,
}











