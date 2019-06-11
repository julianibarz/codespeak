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
  createSocket
} from './socket.js';

$(function() {
  var term = createTerminal();
  var speech = createSpeechRecognition(term);
  var socket = createSocket(term);
  createAuthentification(socket);
});