// const axios = require('axios')
// const url = 'http://checkip.amazonaws.com/';

/**
 *
 * Event doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format
 * @param {Object} event - API Gateway Lambda Proxy Input Format
 *
 * Context doc: https://docs.aws.amazon.com/lambda/latest/dg/nodejs-prog-model-context.html 
 * @param {Object} context
 *
 * Return doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html
 * @returns {Object} object - API Gateway Lambda Proxy Output Format
 * 
 */

const Translate = require('./translate');

exports.lambdaHandler = async (event, context) => {

    const text = decodeURIComponent(event.pathParameters.text);

    console.log('===================');
    console.log(text)
    console.log('===================');

    let response;

    try {

        const translation = await Translate(text);

        console.log(translation);

        response = {
            'statusCode': 200,
            'body': JSON.stringify({
                message: translation,
            }),
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
                'Accept-Charset': 'UTF-8'
            }
        }

    }
    catch (err) {

        console.log(err);
        return err;

    }

    return response;

};
