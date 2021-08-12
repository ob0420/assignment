const MongoClient = require("mongodb").MongoClient;
const { Query } = require("mongoose");

const uri = "mongodb://127.0.0.1:27017";
const client = new MongoClient(uri);

MongoClient.connect(uri, function(err, db) {
  if (err) throw err;
  var dbo = db.db("Items");
  dbo.collection("counts").find({}).project({locationCode:1, barcode:1, amount:1, _id:0}).toArray(function(err, result) { // Here also wanted to get only locationCode, barcode and amount fields.
                                                                                                                          // I can access outer fields, but for sub fields inside looking for solution, I am sure it must not be hard.
    if (err) throw err;
    console.log(result);
    db.close();
  });
});
