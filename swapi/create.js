'use strict';

const uuid = require('uuid');
const dynamodb = require('./dynamodb');

module.exports.create = async (event) => {
  const data = JSON.parse(event.body);
  d/* ata.id = 'jyfyuyu' */
  const params = {
    TableName: process.env.DYNAMODB_TABLE,
    Item: data
  };

  try {
    await dynamodb.put(params).promise()
    return {
      statusCode: 200,
      body: JSON.stringify(
        params.Item
      ),
    };
  } catch (error) {
    console.log(error)
    return {
      statusCode: error.statusCode || 501,
      headers: { 'Content-Type': 'text/plain' },
      body: 'Couldn\'t create the todo item.',
    };
  }
};
