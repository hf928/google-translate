/**
 * TODO(developer): Uncomment the following line before running the sample.
 */

// Imports the Google Cloud client library
const { Translate } = require('@google-cloud/translate').v2;

const projectId = 'translate-288008';
const keyFilename = './key.json'


// Instantiates a client
const translate = new Translate({
    projectId,
    keyFilename
});

// text: The text to translate
module.exports = async (text, target = 'zh-tw') => {

    // Translates some text into zh-tw
    const [translation] = await translate.translate(text, target);

    return translation;

};