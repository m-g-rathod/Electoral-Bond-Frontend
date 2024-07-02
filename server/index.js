const express = require('express');
const cors = require('cors');

const conn = require('./database/db');
const partyRoutes = require('./routes/partyRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/party', partyRoutes);

app.listen(5000, () => {
    console.log('server started on port 5000....');
});

conn.connect((err) => {
    if(err) {
        console.log(err);
    }

    console.log('Connected to database....');
})