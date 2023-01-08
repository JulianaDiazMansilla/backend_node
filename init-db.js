// Inicializar la base datos con los datos mínimos para funcionar

const readline = require('readline');

// cargamos los modelos
const Anuncio = require('./models/Anuncios');

async function main() {

  // preguntar al usuario si está seguro
  const continuar = await preguntaSiNo('Estas seguro, seguro, seguro, que quieres borrar la base de datos? [n]')
  if (!continuar) {
    process.exit();
  }

  // conectar a la base de datos
  const connection = require('./lib/connectMongoose')

  // inicializar la colección de anuncios
  await initAnuncio();

  // desconectamos de la base de datos
  connection.close();
}

main().catch(err => console.log('Hubo un error', err));

async function initAnuncio() {
  // borrar todos los documentos de la colección de anuncios
  const result = await Anuncio.deleteMany();
  console.log(`Eliminados ${result.deletedCount} anuncios.`);

  // crear anuncios iniciales
  const inserted = await Anuncio.insertMany([
        {
          "nombre": "Bicicleta",
          "venta": true,
          "precio": 23015,
          "foto": "bici.jpg",
          "tags": [ "lifestyle", "motor"]
        },
        {
          "nombre": "iPhone 3GS",
          "venta": false,
          "precio": 5000,
          "foto": "iphone.png",
          "tags": [ "lifestyle", "mobile"]
        }
      ]);
  console.log(`Creados ${inserted.length} anuncios.`)
}

function preguntaSiNo(texto) {
  return new Promise((resolve, reject) => {
    const interface = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    interface.question(texto, respuesta => {
      interface.close();
      if (respuesta.toLowerCase() === 'si') {
        resolve(true);
        return;
      }
      resolve(false);
    })
  })
}