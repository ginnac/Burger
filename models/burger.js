//require orm
var orm = require("../config/orm.js");

//create code that will call the ORM fucntions using specific input for the ORM

var burger = {
    all: function(callback) {
      orm.all("burgers", function(res) {
        callback(res);
      });
    },
    // cols and vals are arrays.
    create: function(cols, vals, callback) {
      orm.create("burgers", cols, vals, function(res) {
        callback(res);
      });
    },
    update: function(objColVals, condition, callback) {
      orm.update("burgers", objColVals, condition, function(res) {
        callback(res);
      });
    },
    // delete: function(condition, callback) {
    //   orm.delete("burgers", condition, function(res) {
    //     callback(res);
    //   });
    // }
  };
  
 
//export at the end
  module.exports = burger;

