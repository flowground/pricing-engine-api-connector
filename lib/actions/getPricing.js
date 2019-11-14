/**
 * Auto-generated action file for "Pricing Engine API" API.
 *
 * Generated at: 2019-11-14T10:52:06.160Z
 * Mass generator version: 1.0.0
 *
 * flowground :- Telekom iPaaS / pricing-engine-api-connector
 * Copyright © 2019, Deutsche Telekom AG
 * contact: flowground@telekom.de
 *
 * All files of this connector are licensed under the Apache 2.0 License. For details
 * see the file LICENSE on the toplevel directory.
 *
 *
 * Operation: 'getPricing'
 * Endpoint Path: '/org/{org-id}/pricing/'
 * Method: 'post'
 *
 */

const Swagger = require('swagger-client');
const processWrapper = require('../services/process-wrapper');
const spec = require('../spec.json');

// this wrapers offers a simplified emitData(data) function
module.exports.process = processWrapper(processAction);

// parameter names for this call
const PARAMETERS = [
    "org-id"
];

// mappings from connector field names to API field names
const FIELD_MAP = {
    "org_id": "org-id",
    "register_id": "register_id",
    "operator_id": "operator_id",
    "sales_channel_id": "sales_channel_id",
    "customer_id": "customer_id",
    "sales_orders_id": "sales_orders_id",
    "value": "value",
    "unit": "unit",
    "gross_amount": "gross_amount",
    "net_amount": "net_amount",
    "external_data": "external_data",
    "manual_discount": "manual_discount",
    "discounts": "discounts",
    "markups": "markups",
    "items": "items",
    "additional_invoice_information": "additional_invoice_information",
    "description": "description",
    "checksum": "checksum",
    "last_pricing_status": "last_pricing_status",
    "requestBody": "requestBody"
};

function processAction(msg, cfg) {
    var isVerbose = process.env.debug || cfg.verbose;

    if (isVerbose) {
        console.log(`---MSG: ${JSON.stringify(msg)}`);
        console.log(`---CFG: ${JSON.stringify(cfg)}`);
        console.log(`---ENV: ${JSON.stringify(process.env)}`);
    }

    const contentType = 'application/json';

    const body = msg.body;
    mapFieldNames(body);

    let parameters = {};
    for(let param of PARAMETERS) {
        parameters[param] = body[param];
    }

    // credentials for this operation
    let securities = {};

    let callParams = {
        spec: spec,
        operationId: 'getPricing',
        pathName: '/org/{org-id}/pricing/',
        method: 'post',
        parameters: parameters,
        requestContentType: contentType,
        requestBody: body.requestBody,
        securities: {authorized: securities},
        server: spec.servers[cfg.server] || cfg.otherServer,
    };

    if (isVerbose) {
        let out = Object.assign({}, callParams);
        out.spec = '[omitted]';
        console.log(`--SWAGGER CALL: ${JSON.stringify(out)}`);
    }

    // Call operation via Swagger client
    return Swagger.execute(callParams).then(data => {
        // emit a single message with data
        this.emitData(data);

        // if the response contains an array of entities, you can emit them one by one:

        // data.obj.someItems.forEach((item) => {
        //     this.emitData(item);
        // }
    });
}

function mapFieldNames(obj) {
    if(Array.isArray(obj)) {
        obj.forEach(mapFieldNames);
    }
    else if(typeof obj === 'object' && obj) {
        Object.keys(obj).forEach(key => {
            mapFieldNames(obj[key]);

            let goodKey = FIELD_MAP[key];
            if(goodKey && goodKey !== key) {
                obj[goodKey] = obj[key];
                delete obj[key];
            }
        });
    }
}