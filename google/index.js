import express from 'express';
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, UI_URI, SERVER_URI } from './config';

const port = 8181;
const app = express();

app.get('/', async(req, res) => {
    const code = req.query.code;

    const token = await axios.post(`https://oauth2.googleapis.com/token?code=${code}&client_id=${GOOGLE_CLIENT_ID}&client_secret=${GOOGLE_CLIENT_SECRET}&redirect_uri=${UI_URI}/auth&grant_type=authorization`);
    const userInfo = await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${token.data.access_token}`);
    return res.send(userInfo.data);
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});