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
  var speech = createSpeechRecognition(term);
  var socket = createSocket();
  var term = createTerminal(socket);
  createAuthentification(socket);
  connectSocketToTerminal(socket, term);
});