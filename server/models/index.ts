const conn = require('./conn');
const User = require('./User');
const Product = require('./Product');
const UserPoduct = conn.define('user_product', {});

Product.belongsToMany(User, { through: UserPoduct });
User.belongsToMany(Product, { through: UserPoduct });

const syncAndSeed = () => conn
  .sync({ force: true })
  .then(async () => {
    const [Stephanie, Leovanny, Brian, Bobby] = await Promise.all([
      User.create({
        email: 'stephanie@fakeemailaddress.com',
        password: 'password',
        zipCode: '10003',
        username: 'pizza'
      }),
      User.create({
        email: 'leovanny@fakeemailaddress.com',
        password: 'password',
        zipCode: '10004',
        username: 'puppy'
      }),
      User.create({
        email: 'brian@fakeemailaddress.com',
        password: 'password',
        zipCode: '10005',
        username: 'cleanair'
      }),
      User.create({
        email: 'bobby@fakeemailaddress.com',
        password: 'password',
        zipCode: '10006',
        username: 'proton'
      }),
    ]);

    const [emptyPizzaCarton, hempMilkCarton, newsPaper, lightBulb] = await Promise.all([
      Product.create({
        name: 'Empty Pizza Carton',
      }),
      Product.create({
        name: 'Hemp Milk Carton',
      }),
      Product.create({
        name: 'Newspaper',
      }),
      Product.create({
        name: 'Lightbulb',
      }),
    ])

    const joinTable = { through: UserPoduct };

    Stephanie.addProduct(emptyPizzaCarton, joinTable)
    Stephanie.addProduct(hempMilkCarton, joinTable)
    Leovanny.addProduct(newsPaper, joinTable)
    Brian.addProduct(lightBulb, joinTable)
    Brian.addProduct(emptyPizzaCarton, joinTable)
    Brian.addProduct(newsPaper, joinTable)

      .then(() => { console.log('---> DB synced and seeded <---') });
  });

module.exports = { syncAndSeed };
