const MongoClient = require("mongodb").MongoClient;
const { Query } = require("mongoose");
const fs = require("fs")

const uri = "mongodb://127.0.0.1:27017"; // Connection setups for Mongodb installed on local machine
const client = new MongoClient(uri);

MongoClient.connect(uri, function(err, db) {
  if (err) throw err;
  var dbo = db.db("Items"); // Selected Items database, inside it counts and master inputs are imported into collections
  //var query = {locationCode: "D-117"};
  dbo.collection("counts").find({}).project({"completedCounts.contents.barcode":1, "completedCounts.contents.amount":1, _id:0}).toArray(function(err, result) {  //Here I am selecting only barcode and amount field, nested inside document
                                                                                                           
    if (err) throw err;
    console.log(result);
    fs.writeFile("result.txt", JSON.stringify(result).replace(/]|[[]/g, ''), err => {
      if (err) throw err;
      console.log('File successfully written to disk');
 })
    db.close();
  });
});