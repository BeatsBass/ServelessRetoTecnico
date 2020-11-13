'use strict';

const dynamodb = require('./dynamodb');
const { getApi } = require('../src/getDataApi')
const { createData } = require('./createData')


const checkType = (str) => {
  if (str.match(/films|people|planets|species|starships|vehicles/gi) !== null) return true
  else return false
}

const checkElementInto = (str) => {
  if (str.match(/^\d+$/g) !== null) return true
  else return false
}

const istDataInDB = async (idApiDefault) => {
  const params = {
    TableName: process.env.DYNAMODB_TABLE,
    Key: {
      id: idApiDefault
    },
  };

  try {
    const response = await dynamodb.get(params).promise()
    return response.Item
  } catch (error) {
    console.log(error)
  }

}

module.exports.get = async event => {
  const { query } = event.pathParameters
  const splitQuery = query.split(',')
  if (splitQuery.length !== 2) {
    return {
      statusCode: error.statusCode || 501,
      headers: { 'Content-Type': 'text/plain' },
      body: 'error no 2.',
    };
  } else {
    const typeOfSwapi = splitQuery[0]
    const elementIntoType = splitQuery[1]
    if (checkType(typeOfSwapi) && checkElementInto(elementIntoType)) {
      const istDb = await istDataInDB(typeOfSwapi + elementIntoType)
      if (istDb === undefined) {
        const getSwapiTranslate = await getApi(typeOfSwapi, elementIntoType)
        const istCreate = await createData(getSwapiTranslate)
        if (istCreate) {
          return {
            statusCode: 200,
            body: JSON.stringify(
              getSwapiTranslate
            ),
          }
        } else {
          return {
            statusCode: error.statusCode || 501,
            headers: { 'Content-Type': 'text/plain' },
            body: 'Couldn\'t create the todo item.',
          };
        }
      } else {
        return {
          statusCode: 200,
          body: JSON.stringify(
            istDb
          ),
        }
      }

    }
    else {
      return {
        statusCode: error.statusCode || 501,
        headers: { 'Content-Type': 'text/plain' },
        body: 'error data',
      };
    }
  }
};
