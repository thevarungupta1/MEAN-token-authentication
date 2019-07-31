const express = require('express');
const bodyParser = require('body-parser');
const api = require('./routes/api');
const app = express();
const cors = require('cors');


app.use(cors());

app.use(bodyParser.json());
app.use('/api', api);

const PORT = 3000;


app.listen(process.env.PORT || 5000, function(){
    console.log('server is running on port :'+ PORT);
});