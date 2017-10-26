var mongoose = require('mongoose')
var mqtt = require('mqtt')
var http = require('http')

var request = require('request');

var options = {
  url: 'https://gymkhana.iitb.ac.in/sso/user/api/user/?fields=email,roll_number,username',
  headers: {
    'Authorization': 'Bearer UeAKLSMj0N0r6WszPhDxdp0n3WFSSV'
  }
};

function callback(error, response, body) {
  if (!error && response.statusCode == 200) {
    var info = JSON.parse(body);
    console.log(info)
  }
}

request(options, callback);