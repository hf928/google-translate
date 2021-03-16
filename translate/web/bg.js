const config = require('./config');

let text = '';

setInterval(() => {

    const curText = (document.querySelector(config.selector).innerText).trim();

    if (text !== curText) {

        text = curText;

        fetch(config.endpoint(curText))
            .then((res) => res.text())
            .then((translation) => {

                text = translation;
                document.querySelector(config.selector).innerText = translation;

            });

    }

}, config.delay);
