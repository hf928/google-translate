const express = require('express');
const translate = require('./translate');

const app = express();

app.get('/translate/:text', async (req, res) => {
    
    const translation = await translate(req.params.text);

    res.send(translation);
    res.end();

});

app.listen(process.env.PORT || 8080);
