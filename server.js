const express = require('express');
const cors = require('cors');
const translate = require('./translate');

const app = express();

app.use(cors());

app.get('/translate/:text', async (req, res) => {
        
    const translation = await translate(req.params.text);

    console.log(req.params.text);
    console.log(translation);

    res.send(translation);
    res.end();

});

app.listen(process.env.PORT || 8080, () => {

    console.log('Now listening...');

});
