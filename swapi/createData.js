'use strict';

const uuid = require('uuid');
const dynamodb = require('./dynamodb');

module.exports.createData = async (dataFromApi) => {
    
    const params = {
        TableName: process.env.DYNAMODB_TABLE,
        Item: dataFromApi
    }

    //
    try {
        await dynamodb.put(params).promise()
        return true
    } catch (error) {
        console.log(error)
        return false
    }
};