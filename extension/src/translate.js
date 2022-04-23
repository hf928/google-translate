import { openDB } from 'idb';
import config from './config'

let text = '';
let timer;

const env = chrome || browser;

async function initDB () {

    const idbPromise = await openDB('HFTranslateData', 1, {

        upgrade(db) {

            db.createObjectStore('translate', {
                // keyPath: 'id',
                // autoIncrement: true
            });

        }

    });
  
    const idbTranslate = {
        get: async (key) => await idbPromise.get('translate', key),
        set: async (key, val) => await idbPromise.put('translate', val, key),
        delete: async (key) =>  await idbPromise.delete('translate', key),
        clear: async () => await idbPromise.clear('translate'),
        keys: async () => await idbPromise.getAllKeys('translate')
    };
  
    return { idbTranslate };

}

//接受訊息
env.runtime.onMessage.addListener(async ({ action, status } ) => {

    const { idbTranslate } = await initDB();

    if (action === 'translate') {

        if (status) {

            timer = setInterval(async () => {

                const curText = (document.querySelector(config.selector).innerText).trim();
            
                if (curText && text !== curText) {
            
                    text = curText;

                    // 確認 db 是否有資料
                    const storageTranslate = await idbTranslate.get(curText);
                    // console.log('storageTranslate',storageTranslate);
            
                    if (storageTranslate) {

                        text = storageTranslate;
                        document.querySelector(config.selector).innerText = storageTranslate;

                    }
                    else {

                        fetch(config.endpoint(curText))
                            .then((res) => res.json())
                            .then(async (res) => {
                
                                const translation = res.message;
                                
                                text = translation;
                                document.querySelector(config.selector).innerText = translation;

                                await idbTranslate.set(curText, translation);
                
                            });

                    }
            
                }
            
            }, config.delay);

        }
        else {

            clearInterval(timer);
            
        }
        
    }



});

