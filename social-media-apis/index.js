
const express = require("express");
const db = require('./database.js');

const app = express();

function logger(req, re, next) {
// console.log("In logger middleware");
next();
}

app.use(logger);

app.use(express.json());

// Add headers before the routes are defined
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.post("/login", async (req, res) => {
    // res.setHeader('Access-Control-Allow-Origin','*');
    // res.setHeader('Access-Control-Allow-Headers','X-Requested-With,Content-Type');
    // res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    console.log(req.body.username);
    console.log(req.body.password);    

    let response = await db.login(req.body.username, req.body.password);
    console.log("Login post function called at the server");
    res.send({response});
});

app.post("/signup", async (req, res) => {
    console.log(req.body.username);
    console.log(req.body.password);    

    let response = await db.signup(req.body.username, req.body.password);
    console.log("signup post function called at the server");
    res.send({response});
});

app.post("/createpost", async (req, res) => {
    console.log(req.body.title);
    console.log(req.body.description);    

    let response = await db.createpost(req.body.title, req.body.description);
    console.log("create post function called at the server");
    res.send({response});
});

app.get("/getposts", async (req, res) => {
    // console.log(req.body.title);
    // console.log(req.body.description);    

    let response = await db.getposts();
    console.log("get posts function called at the server");
    res.send({response});
});

app.post("/sendmessage", async (req, res) => {
    console.log(req.body.from);
    console.log(req.body.message);    
    console.log(req.body.to);

    let response = await db.sendmessage(req.body.from, req.body.to , req.body.message);
    console.log("send message function called at the server");
    res.send({response});
});


app.get("/getmessages", async (req, res) => {
    // console.log(req.body.title);
    // console.log(req.body.description);    

    let response = await db.getmessages();
    console.log("get messages function called at the server");
    res.send({response});
});

//   app.post("/check", (request,response) => {
//     response.header("Access-Control-Allow-Origin", "*");
//     console.log("check get called");
//     console.log(request.body.name);
//     console.log(request.body.email);

//     users.find({}, function (err, projects1) {
//       if (err) {
//         console.warn(err);
//       } else {
//         let b = false;
//         console.warn(projects1);
    
//         projects1.forEach((element, index, array) => {
//           console.log(element.name); 
//           console.log(element.email); 
//           if( element.name == request.body.name && element.email == request.body.email)
//           {
//             b = true;
//           }
//       });
//         console.warn("response sent");
//         console.warn(b);
//         response.send(b);
//       }
//     });

//   //response.send(projects);
//   } );

app.listen(3000, () => {
console.log("Server started: Listening at port 3000");
});
