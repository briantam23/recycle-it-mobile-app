const conn = require('./conn');
const bcrypt = require('bcrypt');
const saltEncryption = 10;

const User = conn.define('users', {
  id: {
    type: conn.Sequelize.UUID,
    defaultValue: conn.Sequelize.UUIDV4,
    primaryKey: true,
  },
  email: {
    type: conn.Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      isEmail: true,
    }
  },
  password: {
    type: conn.Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    }
  },
  zipCode: {
    type: conn.Sequelize.STRING,
    validate: {
      len: {
        args: [5],
        msg: 'Invalid Zip Code',
      },
      is: ['^[0-9]*$', 'g']
    },
  },
  username: {
    type: conn.Sequelize.STRING,
    validate: {
      is: ['^[a-z0-9]+$', 'gi'],
    }
  },
});

User.beforeCreate(user => (
  bcrypt
    .hash(user.password, saltEncryption)
    .then(hash => { user.password = hash })
    .catch(e => { throw new Error(e) })
));

module.exports = User;
