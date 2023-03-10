const db = require('../../db/models');

const dynamicTable = (tableName, fields) => {
  const tableFields = {};
  fields.forEach((field) => {
    tableFields[field] = {
      type: db.Sequelize.STRING,
    };
  });
  const tableAttributes = {
    id: {
      type: db.Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    ...tableFields,
  };
  db.sequelize.define(tableName, tableAttributes, {
    freezeTableName: true,
    timestamps: false,
  });
  db.sequelize.sync()
      .then(() => {
        console.log('Database and table synced');
      })
      .catch((err) => {
        console.log('Error in database', err);
      });
};

module.exports = {
  dynamicTable,
};