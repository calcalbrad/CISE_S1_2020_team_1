var config = {
 port: 3001,
 db: "mongodb+srv://dbUser:dbUserPassword@cluster0-usdwk.mongodb.net/SEER?retryWrites=true&w=majority"

}
module.exports = config;



// const MongoClient = require('mongodb').MongoClient;
// const uri = "mongodb+srv://<username>:<password>@cluster0-usdwk.mongodb.net/test?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });
