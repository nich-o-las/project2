const db = require('./models');
const faker = require('faker');

for(let i = 0; i < 20; i++){
    db.user.create({
        email: faker.internet.email(),
        password: faker.internet.password()
    });
}

