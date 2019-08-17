var connection = require("../config/connection.js");

// The above helper function loops through and creates an array of question marks - ["?", "?", "?"] - and turns it into a string.
// ["?", "?", "?"].toString() => "?,?,?";
function printQuestionMarks(number) {
    var arr = [];  
    for (var i = 0; i < number; i++) {
      arr.push("?");
    }  
    return arr.toString();
  }
  
  // Helper function to convert object key/value pairs to SQL syntax
  function objToSql(object) {
    var arr = [];
  
    // loop through the keys and push the key/value as a string int arr
    for (var key in object) {
      var value = object[key];
      // check to skip hidden properties
      if (Object.hasOwnProperty.call(object, key)) {
        // if string with spaces, add quotations 
        if (typeof value === "string" && value.indexOf(" ") >= 0) {
          value = "'" + value + "'";
        }
        arr.push(key + "=" + value);
      }
    }
    // translate array of strings to a single comma-separated string
    return arr.toString();
  }
  
  

  // Object for all our SQL statement functions.
  //methods to use: 
    //selectAll()
    //insertOne()
    //updateOne()


  var orm = {

    //selectAll()....
    all: function(tableName, callback) {

      var queryString = "SELECT * FROM " + tableName + ";";
      //connecting to query...
      connection.query(queryString, function(err, result) {
        if (err) {
          throw err;
        }
        callback(result);
      });

    },

    //...........


    ////insertOne()
    create: function(tableName, cols, vals, callback) {

      var queryString = "INSERT INTO " + tableName;
  
      queryString += " (";
      queryString += cols.toString();
      queryString += ") ";
      queryString += "VALUES (";
      queryString += printQuestionMarks(vals.length);
      queryString += ") ";
  
      //console.log(queryString);
        //conecting to mysql query....
      connection.query(queryString, vals, function(err, result) {
        if (err) {
          throw err;
        }
  
        callback(result);
      });
    },

    //.....................................



     //updateOne()
    // An example of objColVals would be {name: panther, sleepy: true}
    update: function(tableName, objColVals, condition, callback) {
        
      var queryString = "UPDATE " + tableName;
  
      queryString += " SET ";
      queryString += objToSql(objColVals);
      queryString += " WHERE ";
      queryString += condition;
  
      console.log(queryString);
      connection.query(queryString, function(err, result) {
        if (err) {
          throw err;
        }
  
        callback(result);
      });
    }



    //....................................
  };
  
  // Export the orm object for the model (cat.js).
  module.exports = orm;