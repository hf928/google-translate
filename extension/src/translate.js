const config = require('./config');

let text = '';
let timer;

const env = chrome || browser;


//接受訊息
env.runtime.onMessage.addListener(({ action, status } ) => {

    if (action === 'translate') {
        
        if (status) {

            timer = setInterval(() => {

                const curText = (document.querySelector(config.selector).innerText).trim();
            
                if (curText && text !== curText) {
            
                    text = curText;
            
                    fetch(config.endpoint(curText))
                        .then((res) => res.json())
                        .then((res) => {
            
                            const translation = res.message;
                            
                            text = translation;
                            document.querySelector(config.selector).innerText = translation;
            
                        });
            
                }
            
            }, config.delay);

        }
        else {

            clearInterval(timer);
            
        }
        
    }

});
