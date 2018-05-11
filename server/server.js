var express = require('express');
var bodyParser = require('body-parser');
var request = require("request");
const mysql = require("mysql")


class AwsService {
  constructor() {      
      this.mysqlDB = mysql.createPool({
          connectionLimit : 10,
          host:'ethersparkuserbase.clw8hn9uuxrr.us-west-1.rds.amazonaws.com',
          port:'3306',
          user: 'cryptoTacoMaster',
          password: 'WrS2}LY)a>=RTeeS',
          database: 'Users',
      });
      this.connected = false;
  }

  connect() {
    this.mysqlDB.connect(function(err) {
      if (err) {
        this.connected = false;
        console.error('Database connection failed: ' + err.stack);
        return;
      }
      this.connected = true;
      console.log('Connected to database.');
    });
  }

  close() {
    this.connected = false;
    this.mysqlDB.end(function(err) {
      // The connection is terminated now
    });
  }
  //Example Query, values
  //"UPDATE users SET foo = ?, bar = ?, baz = ? WHERE id = ?", ['a', 'b', 'c', userId]
  executeQuery(queryString, values, successCallback, failureCallback) {
    if (!values) {
      values = [];
    }

    if( !Array.isArray(values)) {
      values = [values];
    }
   
    this.mysqlDB.getConnection((error, connection) => {    

      if (error) throw error;
      this.mysqlDB.query({
        sql: queryString,
        timeout: 40000, // 40s
      },
      values,
      function (error, results, fields) {
        // Done with this connection.
        connection.release();
        // error will be an Error if one occurred during the query
        // results will contain the results of the query
        // fields will contain information about the returned results fields (if any)
        if(failureCallback)
          failureCallback();
        
        if (error) throw error;

        
        console.log("Query Success");

        if(successCallback) {
          console.log("Calling Callback");
          successCallback();
        }
      });
    });
    

    return true;
  }

  // createTable(tableName) {
  //   const queryString = `
  //         CREATE TABLE IF NOT EXISTS ${tableName}
  //         (PRESALE_ID INT AUTO_INCREMENT NOT NULL, EMAIL VARCHAR(512) NOT NULL, PUBLIC_ETH_ADDRESS VARCHAR(512) NOT NULL,
  //         IS_DELETED BOOLEAN DEFAULT false, CREATED_AT DATETIME DEFAULT CURRENT_TIMESTAMP,UPDATED_AT DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,PRIMARY KEY (PRESALE_ID))	
  //   `;
  //   const values = "";
  //   this.executeQuery(queryString, values);
  //   return true;
  // }

}

const awsServ = new AwsService();
// Create server
var server = express();


server.use(bodyParser.urlencoded({
  extended: true
}));
server.use(bodyParser.json());

server.post('/user', function(req, res, next) {
  var user = req.body;
  if(!user || !user.email || !user.publicAddres) {
    next();
    return;
  }
  const query = `
    INSERT INTO PRESALE_FORMS (EMAIL, PUBLIC_ETH_ADDRESS) VALUES (?,?)
  `;
  
  awsServ.executeQuery(query, [user.email,user.publicAddres], () => {
    res.send({
      success: true,
      message: "Successfully added user", 
      user: user
    });
    console.log(user)
    next();
  }, () => { next();});
});


// Middleware
server.use(function (req, res, next) {
  // allow origin for demo purposes
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  server.use(bodyParser.json());
  next();
});


// Start listening
var PORT = 3001;
server.listen(PORT, function() {
  console.log('listening at %s', PORT);
});


