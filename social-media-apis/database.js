const { Client } = require('pg');
const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: '123456',
    port: 5432,
});
console.log("IN database.js");

const query = `SELECT * FROM users`;
const query2 = `CREATE TABLE users (
    name varchar(255),
    password varchar(255)
)`;

client.connect();

async function login(name, password) {
    let records = await client.query(query);
    for (let row of records.rows) {
        console.log(row);
        if (row.name == name && row.password == password){
            // res.send('Successful');
            return 'Successful';
        }
    }
    return 'Error';
    // , (err, res) =>{
    //     if (!err){
    //         for (let row of res.rows) {
    //             console.log(row);
    //             if (row.name == name && row.password == password){
    //                 // res.send('Successful');
    //                 return 'Successful';
    //             }
    //         }
    //         // res.send('Error');
    //         return 'Error';

    //         // console.log(res.rows);
    //     } else {
    //         if (err.table == undefined) {
    //             client.query(query2);
    //         }
    //         console.log("LOGIN ERROR");
    //         console.error(err);
    //     }
    // })
}

async function signup(name, password) {
    try {
        let response = await client.query( `INSERT INTO users (name, password) 
        VALUES ('${name}', '${password}')`);
        return 'Successful';
    } catch (err) {
        if (err.table == undefined) {
            client.query(query2);
        }
        console.log("signup ERROR");
        console.error(err);
    }
    
}


async function createpost(title, description) {
    try {
        let response = await client.query( `INSERT INTO posts (title, description) 
        VALUES ('${title}', '${description}')`);
        return 'Successful';
    } catch (err) {
        if (err.table == undefined) {
            client.query(`CREATE TABLE posts (
                title varchar(255),
                description varchar(255)
            )`);
        }
        console.log("createpost ERROR");
        console.error(err);
        return 'Error';
    }
    
}


async function getposts() {
    try {
        let response = await client.query( `select * from posts`);
        return response.rows;
    } catch (err) {
        console.log("getposts ERROR");
        console.error(err);
        return 'Error';
    }
    
}


async function sendmessage(from, to, message) {
    try {
        let response = await client.query( `INSERT INTO messages (fromuser, touser, message) 
        VALUES ('${from}', '${to}', '${message}')`);
        return 'Successful';
    } catch (err) {
        if (err.table == undefined) {
            client.query(`CREATE TABLE messages (
                fromuser varchar(255),
                touser varchar(255),
                message varchar(255)
            )`);
        }
        console.log("createpost ERROR");
        console.error(err);
        return 'Error';
    }
    
}


async function getmessages() {
    try {
        let response = await client.query( `select * from messages`);
        return response.rows;
    } catch (err) {
        console.log("getmessages ERROR");
        console.error(err);
        return 'Error';
    }
    
}

module.exports.login = login;
module.exports.signup = signup;
module.exports.createpost = createpost;
module.exports.getposts = getposts;
module.exports.sendmessage = sendmessage;
module.exports.getmessages = getmessages;

