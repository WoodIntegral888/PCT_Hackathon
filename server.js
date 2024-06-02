const { response } = require('express');
const express = require('express');
const session = require('express-session');
let app = express();
app.use(express.json());

//Database variables
let mongo = require('mongodb');
const MongoStore = require('connect-mongo');
let MongoClient = mongo.MongoClient;
let db;

app.use(session({
    secret:"cookiesecret",
    resave:true,
    saveUninitialized:true,
    cookie: {
    },
    store: MongoStore.create({
        mongoUrl: 'mongodb://localhost/marineDatabase',
        autoRemove: 'native'
    }) 
}))
app.use(express.static('views'));



app.get('/', function(req, res){
    res.status(200).render("index");
})

app.get('/updateMonitoring', function(req,res){
    console.log(req)
    db.collection("reports").find().toArray(function(err, result){
        console.log(result)
        res.status(200).send(result);
    })
})


app.post('/postReport', function(req,res){
    req.on('data', (data)=>{
        let reqInfo = JSON.parse(data);
        console.log(reqInfo)
        db.collection("reports").insertOne(reqInfo), function(err,result){
            if(err) throw err;
        }
        res.status(200).send(true)
    })
})



// Initialize database connection
MongoClient.connect("mongodb://127.0.0.1:27017/", {useNewUrlParser: true }, function(err, client) {
  if(err) throw err;
	
  //Get the project database
  db = client.db('marineDatabase');

  // Start server once Mongo is initialized
  app.listen(3000);
  console.log("Listening on port 3000");
});
