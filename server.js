//loading necessary modules (express, http)
 var express = require('express'); //define variable express, import express package
 var httpModule = require('http');
 var bodyParser = require('body-parser');
 const MongoClient = require('mongodb').MongoClient;

 var postTable = "posts";

 //create an express app, express is a function
 var app = express();
 //express will be the server for http object created
 var http = httpModule.Server(app);
 //Tells app that any assets (images, logos, etc.) will be found in a folder called assets
  app.use(express.static('assets'));

  app.use(bodyParser.urlencoded({extended: true}));

  app.set('view engine', 'ejs');


//  app.get('/mainpage', (req, res)=>{
//    res.sendFile(__dirname + '/mainpage.html');
//  });

  app.get('/', (req, res) => {
    res.sendFile(__dirname + '/mainpage.html');
    console.log('got a GET request');
  });




  // Load the module
  var modelTools = require('./models/dataTools.js');

  // Set the view engine of the express app to ejs
  app.set('view engine', 'ejs');

  // Respond to GET request for target '/team'
  var members;
  app.get('/team', (req, res) => {
    modelTools.readJsonFile('./models/data.json', (text) => {
      members = text;
      // data is specified in the team.ejs file and replaced with
      // members.participants
       res.render('team.ejs', {data: members.participants});
     });
   });

  app.get('/managePosts', (req, res)=>{
    // obtain data from movies into cursor object
  var cursor = db.collection(postTable).find();
  // console.log(cursor);  // This has too much info
  // convert to an array to extract the movie data
  updateIds();
  cursor.toArray(function (err, results) {
    if (err)
      return console.log(err);

    // Render index.ejs
    res.render('mainpage.ejs', {posts: results});
    console.log(results)
  });
});

app.post('/addPost', (req, res) => {
  console.log("got POST request");
  console.log(req.body);
  db.collection(postTable).save(req.body, (err, result) => {
    if (err)
      return console.log(err);
    console.log('saved to database');
    updateIds();
    res.redirect('/managePosts');
  });
});

 app.post('/people', (req, res) => {

 })

 var db;
// The ids of current entries in the database are keep in array ids.
var ids = new Array();

var port = process.env.PORT || 3000; // || = or
MongoClient.connect('mongodb://gsavini:mlab814@ds023495.mlab.com:23495/classicswebsite',
(err, database) => {
if (err)
return console.log(err);

db = database;

updateIds((result)=>{
    console.log(result);
  });

  updateIds((result)=>{
      console.log(result);
    });

http.listen( port, function () {
  console.log('Listening on localhost ' + port);
});
});

function updateIds(callback) {
var cursor = db.collection(postTable).find();
cursor.toArray(function (err, results) {
  if (err)
  return console.log(err);
  ids = [];
  for (var i = 0; i < results.length; i++) {
    ids.push(results[i]._id);
  }
  if (typeof callback != 'undefined')
    callback(ids);
});
}
