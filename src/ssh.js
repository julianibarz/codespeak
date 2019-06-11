const {OAuth2Client} = require('google-auth-library');
const { Client } = require('ssh2');

export function createServerWithSockets(app, port) {
  var server = app.listen(port, () => {
    console.log(`Server listening on port ${port}...`);
  });
  var io = require('socket.io')(server);
  io.on('connection', function(socket) {
    socket.on('authentify', function(id_token) {
      const {OAuth2Client} = require('google-auth-library');
      const CLIENT_ID = '507622407892-07bkbhrdrb8qi6sn5ncqafmkehnaja19.apps.googleusercontent.com';
      const client = new OAuth2Client(CLIENT_ID);
      async function verify() {
        const ticket = await client.verifyIdToken({
            idToken: id_token,
            audience: CLIENT_ID,
        });
        const payload = ticket.getPayload();
        const user_id = payload.sub;
        if (user_id == '103747622700379269791') {
          connectSSH(socket);
        } else {
          console.log('This is not me.');
        }
      }
      verify().catch(console.error);
    });
  });
}

function connectSSH(socket) {
  var conn = new Client();
  conn.on('ready', function() {
    socket.emit('data', '\r\n*** SSH CONNECTION ESTABLISHED ***\r\n');
    conn.shell(function(err, stream) {
      if (err)
        return socket.emit('data', '\r\n*** SSH SHELL ERROR: ' + err.message + ' ***\r\n');
      socket.on('data', function(data) {
        stream.write(data);
      });
      stream.on('data', function(d) {
        socket.emit('data', d.toString('binary'));
      }).on('close', function() {
        conn.end();
      });
    });
  }).on('close', function() {
    socket.emit('data', '\r\n*** SSH CONNECTION CLOSED ***\r\n');
  }).on('error', function(err) {
    socket.emit('data', '\r\n*** SSH CONNECTION ERROR: ' + err.message + ' ***\r\n');
  }).connect({
    host: 'host16.codeanyhost.com',
    username: 'cabox',
    port: 44166,
    privateKey: require('fs').readFileSync(__dirname + '/id_rsa')
  });
}