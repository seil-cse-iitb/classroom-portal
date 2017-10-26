var express = require('express');
var router = express.Router();
var User = require('../models/User');
var jwt_mid = require('express-jwt');
var secret = require('../config').secret;
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');
var config = require('../config');
var request = require('request');

router.post('/provider',function(req,res){
   var tokenUrl = config.ldap.token_endpoint;
    var userUrl = 'https://gymkhana.iitb.ac.in/sso/user/api/user/?fields=email,roll_number,username';

  var params = {
     grant_type: 'authorization_code',
     code: req.body.code,
     redirect_uri: req.body.redirectUri
   };
   var headers = {
     Authorization: 'Basic ' + new Buffer(req.body.clientId + ':' + config.ldap.client_secret).toString('base64')
   };
   request.post(tokenUrl,{json:true,form:params,headers:headers}, function(err,response,body){
    if (body.error) {
      return res.status(400).send({ message: body.error_description });
    }
// /    body = JSON.parse(body)
    console.log(body)
    request.get(userUrl, {json:true,headers:{'Authorization': 'Bearer '+ body.access_token}},function(err,response, user){
        console.log(user)
        // if user is found and password is right
        // create a token
        var token = jwt.sign({
          data: user
        }, secret, { expiresIn: body.expires_in + 's' });

        // return the information including token as JSON
        res.send({
          message: 'Enjoy your token!',
          token: token
        });
    })
   });

});






 // app.post('/auth/spotify', function(req, res) {
 //   var tokenUrl = 'https://accounts.spotify.com/api/token';
 //   var userUrl = 'https://api.spotify.com/v1/me';

 //   var params = {
 //     grant_type: 'authorization_code',
 //     code: req.body.code,
 //     redirect_uri: req.body.redirectUri
 //   };

 //   var headers = {
 //     Authorization: 'Basic ' + new Buffer(req.body.clientId + ':' + config.SPOTIFY_SECRET).toString('base64')
 //   };

 //   request.post(tokenUrl, { json: true, form: params, headers: headers }, function(err, response, body) {
 //     if (body.error) {
 //       return res.status(400).send({ message: body.error_description });
 //     }

 //     request.get(userUrl, {json: true, headers: {Authorization: 'Bearer ' + body.access_token} }, function(err, response, profile){
 //       // Step 3a. Link user accounts.
 //       if (req.header('Authorization')) {
 //         User.findOne({ spotify: profile.id }, function(err, existingUser) {
 //           if (existingUser) {
 //             return res.status(409).send({ message: 'There is already a Spotify account that belongs to you' });
 //           }
 //           var token = req.header('Authorization').split(' ')[1];
 //           var payload = jwt.decode(token, config.TOKEN_SECRET);
 //           User.findById(payload.sub, function(err, user) {
 //             if (!user) {
 //               return res.status(400).send({ message: 'User not found' });
 //             }
 //             user.spotify = profile.id;
 //             user.email = user.email || profile.email;
 //             user.picture = profile.images.length > 0 ? profile.images[0].url : '';
 //             user.displayName = user.displayName || profile.displayName || profile.id;

 //             user.save(function() {
 //               var token = createJWT(user);
 //               res.send({ token: token });
 //             });
 //           });
 //         });
 //       } else {
 //         // Step 3b. Create a new user account or return an existing one.
 //         User.findOne({ spotify: profile.id }, function(err, existingUser) {
 //           if (existingUser) {
 //             return res.send({ token: createJWT(existingUser) });
 //           }
 //           var user = new User();
 //           user.spotify = profile.id;
 //           user.email = profile.email;
 //           user.picture = profile.images.length > 0 ? profile.images[0].url : '';
 //           user.displayName = profile.displayName || profile.id;

 //           user.save(function(err) {
 //             var token = createJWT(user);
 //             res.send({ token: token });
 //           });
 //         });
 //       }
 //     });
 //   });
 // });





router.post('/authenticate', function(req, res) {

  // find the user
  User.findOne({username : req.body.username}, function(err, user) {
    if( err || !user){
      res.status(401);
      res.json({ message: 'Authentication failed. User not found.' });
    } 
    else{            
      // check if password matches
      if (!bcrypt.compareSync(req.body.password, user.password)) {
        res.status(401);
        res.json({ message: 'Authentication failed. Wrong password.' });
      } 
      else{
        // if user is found and password is right
        // create a token
        var token = jwt.sign({
          data: user
        }, secret, { expiresIn: '24h' });

        // return the information including token as JSON
        res.send({
          message: 'Enjoy your token!',
          token: token
        });
      } 
    }
  });

});
router.get('/verify',jwt_mid({secret: secret}),function(req,res,next){
    res.send(req.user)
});

module.exports = router;