const swaggerAutogen = require('swagger-autogen')()
const outputFile = './swagger_output.json'
const endpointsFiles = ['projekt.js']
const doc = {
    info: {
        swagger: "2.0",
        title: 'Projekt zaliczeniowy',
        description: 'Dokumentacja REST API'
    },
    host: 'localhost:8081'
}
swaggerAutogen(outputFile, endpointsFiles, doc);