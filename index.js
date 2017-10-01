const express = require('express');
const router = express.Router();
const app = express();
const mongoose = require('mongoose');
const config = require('./config/database');
const path = require('path');
const authentication = require('./routes/authentication')(router);
const bodyParser = require('body-parser');
const cors = require('cors');


mongoose.Promise = global.Promise;

mongoose.connect(config.uri, (err)=>{
    if(err){
        console.log('Could not connect to database');
    }else{
        console.log("Connected to database " + config.db);
    }
});

app.use(cors({
    origin: 'http://localhost:3000'
}));
// provide static directory for front end
app.use(bodyParser.urlencoded({extended: false}))
//parse application/json
app.use(bodyParser.json());
app.use(express.static(__dirname + '/client/dist'))
app.use('/authentication', authentication)

app.get('*', (req, res)=>{
    res.sendFile(path.join(__dirname + '/client/dist/index.html'));
  });
  
  app.listen(4200, ()=>{
      console.log('Listining to port 4200')
  });