// jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static("public"));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res) {
  var firstName = req.body.fName;
  var lastName = req.body.lName;
  var email = req.body.email;
  // console.log(firstName, lastName, email);

  var data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
      merge_fields: {
        FNAME: firstName,
        LNAME: lastName,
        }
      }
    ]
    };

var jsonData = JSON.stringify(data);
console.log(jsonData);

  var options = {
    url: 'https://us4.api.mailchimp.com/3.0/lists/d85069f493',
    method: "POST",
    headers :{
      "Authorization": "JJellema aee302d68eb0d2d20985a7b046b43c42-us4"
    },
    body: jsonData
  };

  request (options, function(error, response, body){
    if(error) {
      console.log(error);
      res.sendFile(__dirname + "/failure.html");
    } else {
      console.log(response.statusCode);
      if (response.statusCode == 200) {
        res.sendFile(__dirname + "/success.html");
      } else {
        res.sendFile(__dirname + "/failure.html");
      }
    }
  });
});

app.post("/failure", function(req, res) {
  res.redirect("/");
});

app.post("/success", function(req, res) {
  res.redirect("/");
});

app.listen(process.env.PORT || 3000, function() {
  console.log("server is running at port 3000");
});
