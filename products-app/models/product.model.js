module.exports = (sequelize, Sequelize) => {
    const Product = sequelize.define("product", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      title: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      sell_price: {
        type: Sequelize.DECIMAL(20, 2)
      },
      discount_price: {
        type: Sequelize.DECIMAL(20, 2)
      },
      part_number: {
        type: Sequelize.INTEGER
      },
      image_url: {
        type: Sequelize.STRING
      }
    });
  
    return Product;
  };