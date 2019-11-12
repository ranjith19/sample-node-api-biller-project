const express = require('express');
const axios = require('axios');
var bodyParser = require('body-parser');
var jwt = require('json-web-token');

const app = express();
var port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.get('/', (req, res) => res.json({
  "message": 'Hello user!'
}));

app.post('/bills/fetch', function(request, response) {
  requestLogger(request);
  response.json({
    "status": 200,
    "success": true,
    "data": {
      "customer": {
        "name": "Ashok Kumar"
      },
      "billDetails": {
        "billFetchStatus": "AVAILABLE",
        "bills": [{
          "billerBillID": "12123131322",
          "generatedOn": "2019-08-01T08:28:12Z",
          "recurrence": "ONE_TIME",
          "amountExactness": "EXACT",
          "customerAccount": {
            "id": "8208021440"
          },
          "aggregates": {
            "total": {
              "displayName": "Total Outstanding",
              "amount": {
                "value": 99000
              }
            }
          }
        }]
      }
    }
  });
});

app.post('/bills/fetchReceipt', function(request, response) {
  requestLogger(request);
  response.json({
    "status": 200,
    "success": true,
    "data": {
      "billerBillID": "12123131322",
      "platformBillID": "SETU121341312121",
      "platformTransactionRefID": "TXN12121219",
      "receipt": {
        "id": getRandomString(15),
        "date": "2019-08-02T07:12:10Z"
      }
    }
  });
});


function requestLogger(request) {
  let rid = getRandomString(10);
  let body = request.body;
  let headers = request.headers;
  console.log(rid, "body", body);
  console.log(rid, "header", header);
}


function getRandomString(length) {
  var result = '';
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

function makeJwtSecret(numParts) {
  let parts = [];
  for (let i = 0; i < numParts; i++) {
    parts.push(getRandomString(6))
  }
  return parts.join("-");
}



var server = app.listen(port, function() {
  console.log('Server running at http://127.0.0.1:' + port + '/');
});
