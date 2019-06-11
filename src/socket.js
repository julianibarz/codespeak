import io from 'socket.io-client';

export function createSocket(term) {
  var socket = io.connect('https://nodejs-julianibarz499561.codeanyapp.com', {secure: true});
  socket.on('connect', function() {
    term.write('\r\n*** Connected to backend***\r\n');

    // Browser -> Backend
    term.on('data', function(data) {
      socket.emit('data', data);
    });

    // Backend -> Browser
    socket.on('data', function(data) {
      term.write(data);
    });

    socket.on('disconnect', function() {
      term.write('\r\n*** Disconnected from backend***\r\n');
    });
  });
  return socket;
}