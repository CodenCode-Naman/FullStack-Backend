'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class contentList extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
        contentList.belongsTo(models.content, {
            foreignKey: 'contentId',
            onDelete: 'CASCADE',
        });
    }
  }
  contentList.init({
    contentName: DataTypes.STRING,
    contentId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'contentList',
  });
  return contentList;
};