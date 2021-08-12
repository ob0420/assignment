var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://127.0.0.1:27017";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("Items");
  dbo.collection('counts').aggregate([ // For this report I wanted to join specific fields from two collections
                                       // by using aggregate function. Its also not giving exact output that I want, still working on it.
    { $lookup:  
       {
         from: 'master',
         localField: 'barcode',
         foreignField: 'barcode', 
         as: 'details'
       }
     }
    ]).toArray(function(err, res) {
    if (err) throw err;
    console.log(JSON.stringify(res));
    db.close();
  });
});