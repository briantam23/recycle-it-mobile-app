const conn = require('./conn');

const Product = conn.define('products', {
  name: {
    type: conn.Sequelize.STRING,
  },
  recyclable: {
    type: conn.Sequelize.ENUM(
      'yes',
      'no',
      'special',
      'unknown',
    ),
    defaultValue: 'unknown',
  },
  catParent: {
    type: conn.Sequelize.ENUM(
      'paper',
      'plastic',
      'glass',
      'electronics',
      'other',
      'automotive',
      'batteries',
      'construction',
      'garden',
      'hazardous',
      'household',
      'metals',
      'paint',
      'unknown',
    ),
    defaultValue: 'unknown',
  },
  catChild: {
    type: conn.Sequelize.ENUM(
      'unknown'),
    defaultValue: 'unknown',
  },
});

module.exports = Product;
