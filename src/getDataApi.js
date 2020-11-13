'use strict';
const fetch = require('node-fetch')
const { translateFunction } = require('./translateFunction')


const getData = async (uriApiStarWars) => {
  const data = await fetch(uriApiStarWars);
  const realData = await data.json()
  const myApi = {}
  console.log('translate ...')
  for (var key in realData) {
    const splitKey = key.split('_')
    const translateKey = await Promise.all(splitKey.map(e => translateFunction(e)))
    const newKey = translateKey.reduce((accumulator, currentValue) => `${accumulator}_${currentValue}`)
    const value = realData[key]
    myApi[newKey] = value
  }
  return myApi
}

module.exports.getApi = async (typeOfSwapi, elementIntoType) => {
  const uri = `https://swapi.dev/api/${typeOfSwapi}/${elementIntoType}`
  const data = await getData(uri)
  data.id = typeOfSwapi+elementIntoType
  console.log(data)
  return data
};
