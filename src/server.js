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
const path = require('path');
const fs = require('fs');
const staticFile = require('connect-static-file');

const ASSET_DIR = '..';

app.use('/xterm', express.static(path.join(__dirname, ASSET_DIR, "node_modules/xterm/dist/")));
app.use('/codespeak.js', staticFile(__dirname + ASSET_DIR + '/codespeak.js'));
app.use('/index.css', staticFile(__dirname + ASSET_DIR + '/index.css'));

app.get('/', (req, res) => {
  res.sendFile(ASSET_DIR + '/index.html' , { root : __dirname});
});

// Listen to the App Engine-specified port, or 8080 otherwise
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});
// [END app]

module.exports = app;
