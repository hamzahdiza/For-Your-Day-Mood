const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Entertainment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Entertainment.init(
    {
      title: DataTypes.TEXT,
      author: DataTypes.STRING,
      published_date: DataTypes.STRING,
      published_date_precision: DataTypes.STRING,
      link: DataTypes.STRING,
      clean_url: DataTypes.TEXT,
      excerpt: DataTypes.STRING,
      summary: DataTypes.TEXT,
      rights: DataTypes.STRING,
      rank: DataTypes.STRING,
      topic: DataTypes.STRING,
      country: DataTypes.STRING,
      language: DataTypes.STRING,
      authors: DataTypes.STRING,
      media: DataTypes.TEXT,
      is_opinion: DataTypes.BOOLEAN,
      twitter_account: DataTypes.STRING,
      _score: DataTypes.INTEGER,
      aaa: DataTypes.STRING,
      aa_ida: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Entertainment",
    }
  );

  return Entertainment;
};
