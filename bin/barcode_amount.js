const MongoClient = require("mongodb").MongoClient;
const { Query } = require("mongoose");

const uri = "mongodb://127.0.0.1:27017"; // Connection setups for Mongodb installed on local machine
const client = new MongoClient(uri);

MongoClient.connect(uri, function(err, db) {
  if (err) throw err;
  var dbo = db.db("Items"); // Selected Items database, inside it counts and master inputs are imported into collections
  //var query = {locationCode: "D-117"};
  dbo.collection("counts").find({}).project({barcode:1, amount:1, _id:0}).toArray(function(err, result) {  //Here I want to select only barcode and amount field inside nested document, 
                                                                                                           //I cant access sub fields for now, but working on it.
    if (err) throw err;
    console.log(result);
    db.close();
  });
});