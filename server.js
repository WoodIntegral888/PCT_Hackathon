const express = require('express');
let app = express();
app.use(express.json());

//Database variables
let mongo = require('mongodb');
let MongoClient = mongo.MongoClient;
let db;

//use the views 
app.use(express.static('views'));


//get the homepage
app.get('/', function(req, res){
    res.status(200).render("index");
})

//update the monitoring page
app.get('/updateMonitoring', function(req,res){
    console.log(req)
    //send a query
    db.collection("reports").find().toArray(function(err, result){
        console.log(result)
        res.status(200).send(result);
    })
})

//post a report
app.post('/postReport', function(req,res){
    //once receive the data, act upon it
    req.on('data', (data)=>{
        let reqInfo = JSON.parse(data);
        console.log(reqInfo)
        //add the report to the database
        db.collection("reports").insertOne(reqInfo), function(err,result){
            if(err) throw err;
        }
        //send okay status back to client side
        res.status(200).send(true)
    })
})



// Init database connection
MongoClient.connect("mongodb://127.0.0.1:27017/", {useNewUrlParser: true }, function(err, client) {
  if(err) throw err;
	
  //Get the project database
  db = client.db('marineDatabase');

  // Start server after Mongo is initialized
  app.listen(3000);
  console.log("Listening on port 3000");
});
