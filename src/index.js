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
  var socket = createSocket();
  var speech = createSpeechRecognition(socket);
  var term = createTerminal(socket);
  createAuthentification(socket);
  connectSocketToTerminal(socket, term);
});