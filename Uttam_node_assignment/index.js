const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const controller = require('./controller')


const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get('/countries', controller.getCountries);
app.get('/search', controller.searchName)


app.listen(3000, () => console.log("server listening on port 3000"))