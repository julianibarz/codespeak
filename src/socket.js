import io from 'socket.io-client';

export function createSocket(backend) {
  var socket = io.connect(backend, {secure: true});
  return socket;
}

export function connectSocketToTerminal(socket, term) {
  socket.on('connect', function() {
    term.write('\r\n*** Connected to backend***\r\n');

    // Browser -> Backend
    term.on('data', function(data) {
      socket.emit('term_data', data);
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