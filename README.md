# Serverless REST API with DynamoDB and offline support

Este ejemplo demuestra a como ejecutar localmente Serveless Framework, usando 
[serverless-offline](https://github.com/dherault/serverless-offline) plugin. Implementando una REST API para realizar peticiones GET a la API pública de STAR WARS [SWAPI](https://swapi.dev/) traduciendo los atributos, para finalmente almacenarlo en DynamoDB.


## Requerimientos

```bash
npm install -g serveless
instalar localmente Java SDK(Para ejecutar DynamoDB)
```

## Configuración 

```bash
npm install
serverless dynamodb install
serverless offline start
serverless dynamodb migrate
```

## Ejecutar el servicio

```bash
serverless offline start
```

## Uso

Puedes crear, listar y obtener datos con los siguientes comandos:


### (GET) Obtener una entrada en DynamoDb

Obtiene una entrada almacenada en DynamoDb 


Replazar query por <query> una combinación (tipoAtributo,numero)
El tipoAtributo correcto son:
```bash
 (films) string -- The URL root for Film resources
 (people) string -- The URL root for People resources
 (planets) string -- The URL root for Planet resources
 (species) string -- The URL root for Species resources
 (starships) string -- The URL root for Starships resources
 (vehicles) string -- The URL root for Vehicles resources
```

Ejemplo 1:<br>
para obtener los datos de [Luke Skywalker](https://swapi.dev/api/people/1/) en SWAPI, 
el endpoint es https://swapi.dev/api/people/1/
Entonces para almacenar la respuesta de SWAPI, con los sus atributos traducidos al Español deberá realizar la siguiente petición:
```bash
curl -H "Content-Type:application/json" http://localhost:3000/dev/swapi/people,1
```

Ejemplo 2:<br>
para obtener los datos de la primera pelicula de STAR WARS A [New Hope](https://swapi.dev/api/films/1/), 
el endpoint es https://swapi.dev/api/films/1/
Entonces para almacenar la respuesta de SWAPI, con los sus atributos traducidos al Español deberá realizar la siguiente petición:
```bash
curl -H "Content-Type:application/json" http://localhost:3000/dev/swapi/films,1
```


Si la query (tipoAtributo,numero) se encuentra almacenado en DynamoDb, devuelve lo que esta en la Base de Datos.

### (CREATE)Crear una nueva entrada en DynamoDB

```bash
curl -X POST -H "Content-Type:application/json" http://localhost:3000/dev/swapi --data '{ "text": "Learn Serverless" }'
```

### Listar todo

```bash
curl -H "Content-Type:application/json" http://localhost:3000/dev/swapi
```
