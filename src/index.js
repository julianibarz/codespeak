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

$(function() {
  var term = createTerminal();
  var speech = createSpeechRecognition(term);
  createAuthentification();
});