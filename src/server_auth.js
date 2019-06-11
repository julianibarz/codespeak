const {OAuth2Client} = require('google-auth-library');

export function verifyUser(req, res) {
    var id_token = req.body.id_token;
    const CLIENT_ID = '507622407892-07bkbhrdrb8qi6sn5ncqafmkehnaja19.apps.googleusercontent.com';
    const client = new OAuth2Client(CLIENT_ID);
    async function verify() {
    const ticket = await client.verifyIdToken({
        idToken: id_token,
        audience: CLIENT_ID,
    });
    const payload = ticket.getPayload();
    const user_id = payload.sub;
     console.log('user_id: ' + user_id);
  }
  verify().catch(console.error);
  res.sendStatus(200);
}
