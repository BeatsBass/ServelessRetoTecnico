# Serverless REST API with DynamoDB and offline support

Este ejemplo deuestra a como ejecutar localmente Serveless Framework, usando 
[serverless-offline](https://github.com/dherault/serverless-offline) plugin. Implementando una REST API para realizar peticiones GET a la API pública de STAR WARS [Swapi](https://swapi.dev/)traduciendo los atributos, para finalmente almacenarlo en DynamoDB.


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

Tu pueddes crear, listar, obtener con los siguientes comandos:


### (GET) Obtener una entrada en DynamoDb

Obtiene una entrada almacenada en DynamoDb 

```bash
# Replazar query por <query> una combinación (tipoAtributo,numero)
# El tipoAtributo correcto son:
#  films string -- The URL root for Film resources
#  people string -- The URL root for People resources
#  planets string -- The URL root for Planet resources
#  species string -- The URL root for Species resources
#  starships string -- The URL root for Starships resources
#  vehicles string -- The URL root for Vehicles resources
# El numero es el id dentro de la API de SWAPI

curl -H "Content-Type:application/json" http://localhost:3000/dev/swapi/<query>
```

### (CREATE)Crear una nueva entrada en DynamoDB

```bash
curl -X POST -H "Content-Type:application/json" http://localhost:3000/dev/swapi --data '{ "text": "Learn Serverless" }'
```

### Listar todo

```bash
curl -H "Content-Type:application/json" http://localhost:3000/dev/swapi
```
