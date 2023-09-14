const pgp = require('pg-promise')();
// Database connection configuration
const dbConfig = {
    host: 'localhost',
    port: 5432,
    database: 'products-catalog',
    user: 'user',
    password: 'mysecretpassword'
};
const db = pgp(dbConfig);
db.query('select * from products_catalog').then((data: any) => {
    console.log(data)
}).catch((error: any) => {
    console.log(error)
})
