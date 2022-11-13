import express from 'express';
import cors from 'cors';
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, UI_URI, SERVER_URI } from './config.js';
import axios from 'axios';

const port = 8181;
const app = express();
app.use(cors());

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });

app.get('/', async(req, res) => {
    const code = req.query.code;
    console.log(code);
    if (code) {
        const response = await axios.post('https://oauth2.googleapis.com/token', {
            client_id: GOOGLE_CLIENT_ID,
            client_secret: GOOGLE_CLIENT_SECRET,
            code: code,
            redirect_uri: UI_URI,
            grant_type: 'authorization_code'
        });
        const userInfo = await axios.get('https://www.googleapis.com/oauth2/v2/userinfo?alt=json', {
            headers: {
              authorization: `Bearer ${response.data.access_token}`
            }
        });
        res.send(userInfo.data);
    }
    else { res.send('No code'); }
});