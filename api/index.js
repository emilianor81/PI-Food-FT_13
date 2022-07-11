
const server = require('./src/app.js');
const { conn, Diet } = require('./src/db.js');

// Syncing all the models at once.
conn.sync({ force: true }).then(() => {
  server.listen(3001, () => {
    console.log('%server listening at port: 3001 '); // eslint-disable-line no-console
    const glutenFree = Diet.create({
      name: 'Gluten Free',
      id: 1
    });
    const ketogenic = Diet.create({
      name: 'Ketogenic',
      id: 2
    });
    const vegetarian = Diet.create({
      name: 'Vegetarian',
      id: 3
    });
    const lactovegetarian = Diet.create({
      name: 'Lacto Ovo Vegetarian',
      id: 4
    });
    const ovovegetarian = Diet.create({
      name: 'Dairy Free',
      id: 5
    });
    const vegan = Diet.create({
      name: 'Vegan',
      id: 6
    });
    const pescetarian = Diet.create({
      name: 'Pescatarian',
      id: 7
    });
    const paleo = Diet.create({
      name: 'Paleolithic',
      id: 8
    });
    const primal = Diet.create({
      name: 'Primal',
      id: 9
    });
    const whole = Diet.create({
      name: 'Whole 30',
      id: 10
    });

    Promise.all([glutenFree, ketogenic, vegetarian, lactovegetarian,
      ovovegetarian, vegan, pescetarian, paleo, primal, whole])
      .then(res => console.log('Diets created'))
  });
});

