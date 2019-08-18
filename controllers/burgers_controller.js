var express = require("express");
var router = express.Router();


var burger = require("../models/burger.js");

//create router and export it at the end of the file

//render html with database table data
router.get("/", function(req, res) {
    burger.all(function(data) {
      var tableObject = {
        burgers: data
      };
console.log(tableObject);
      res.render("index", tableObject);
    });
  });


//post new rows in our burger data
router.post("/api/burgers", function(req, res) {
    burger.create(["burger_name", "devoured"], 
    [req.body.burger_name, req.body.devoured],
    function(result) {
        // Send back the ID of the new row
        res.json({ id: result.insertId });
    });
  });

//change rows data
  router.put("/api/burgers/:id", function(req, res) {
    var condition = "id = " + req.params.id;
  
    console.log("condition", condition);
  
    burger.update({
      burger_name: req.body.burger_name,  
      devoured: req.body.devoured
    }, condition, function(result) {
        // If no rows were changed, 
        //then the ID must not exist, so 404 status 
      if (result.changedRows == 0) {
        return res.status(404).end();
        //else ID must exist so 200 (ok status)
      } else {
        res.status(200).end();
      }
    });
  });
  
//   router.delete("/api/burgers/:id", function(req, res) {
//     var condition = "id = " + req.params.id;
  
//     cat.delete(condition, function(result) {
//       if (result.affectedRows == 0) {
//         // If no rows were changed, then the ID must not exist,
//         // so 404
//         return res.status(404).end();
//          //else ID must exist so 200 (ok status)
//       } else {
//         res.status(200).end();
//       }
//     });
//   });
  
  // Export routes for server.js to use.
  module.exports = router;