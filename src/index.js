import './index.css';
import {
  createTerminal
} from './terminal.js';
import {
  createSpeechRecognition
} from './speech.js';
import {
  createAuthentification
} from './auth.js';
import {
  createSocket, connectSocketToTerminal
} from './socket.js';

$(function() {
  var julian_backend = 'https://nodejs-julianibarz499561.codeanyapp.com';
  var tess_backend = 'https://findfunny-tcmcnamara593013.codeanyapp.com/';
  var socket = createSocket(tess_backend);
  var speech = createSpeechRecognition(socket);
  var term = createTerminal(socket);
  createAuthentification(socket);
  connectSocketToTerminal(socket, term);
});