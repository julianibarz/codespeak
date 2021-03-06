/**
 * Copyright 2018, Google, Inc.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

// [START app]
const express = require('express');
const app = express();
const staticFile = require('connect-static-file');
const ssh = require('./ssh.js');

// Redirect http to https.
app.enable('trust proxy');
app.use(function(req, res, next) {
  if (req.header('x-forwarded-proto') !== 'https' || !req.secure) {
    res.redirect("https://" + req.headers.host + req.url);
  } else {
    return next();
  }
});
app.use(express.json());

// Serve static content.
app.get('/index-bundle.js', staticFile(__dirname + '/index-bundle.js'));
app.get('/styles.css', staticFile(__dirname + '/styles.css'));
app.get('/', staticFile(__dirname + '/index.html'));

// Listen to the App Engine-specified port, or 8080 otherwise
const PORT = process.env.PORT || 8080;
ssh.createServerWithSockets(app, PORT);
// [END app]

module.exports = app;