# NodePop

Deploy 

```sh
npm install
```

Star the application in production with :

```sh
node ./bin/www
```

Star the application in development with :

```sh
npm run dev
```

Product list:

GET /api/anuncios

"anuncios":[

    {

        "_id":"63baad7a2b988ee003811463",

        "nombre":"Bicicleta",

        "venta":true,

        "precio":23015,

        "foto":"bici.jpg",

        "tags":["lifestyle","motor"]

    }

]

How to start the MongoDB

From MongoDB folder

```sh
./bin/mongod --dbpath ./data
```

To Start the Mongosh

From Mongosh folder

```sh
./mongosh 
```

Select nodepop DB.

```sh
use nodepop 
```

To add/delete DB for the first time or develop.

```sh
node init-db 
```

Pruebas:

Listado de todos los anuncios.

http://localhost:3000/api/anuncios

![Alt text](public/images/GET.png)

Seleccionar un anuncio por ID

http://localhost:3000/api/anuncios/63bad94dd8b8f39f8fe8a7f4

![Alt text](public/images/GET2.png)

Paginación:

http://localhost:3000/api/anuncios?skip=1&limit=2

![Alt text](public/images/GET3.png)

Venta (Tipo), tags, Nombre

http://localhost:3000/api/anuncios?skip=1&limit=2

![Alt text](public/images/GET4.png)

http://localhost:3000/api/anuncios?tags=motor


![Alt text](public/images/GET5.png)

http://localhost:3000/api/anuncios?min=100&max=2000

![Alt text](public/images/GET6.png)

Metodo PUT de actualizacion de valore

http://localhost:3000/api/anuncios/63bad94dd8b8f39f8fe8a7f4

![Alt text](public/images/PUT.png)

Metodo POST para incorporar nuevos productos.

http://localhost:3000/api/anuncios/?nombre=casa&venta=true&precio=10000&foto=D:/foto.jpg&tags=mobile

![Alt text](public/images/POST.png)

Metodo DELETE

http://localhost:3000/api/anuncios/63bac56840731b5db54ab7ea

![Alt text](public/images/DELETE.png)


Listado de tags:

http://localhost:3000/api/anuncios/tags

![Alt text](public/images/GETTags.png)


Descargar fotos.

http://localhost:3000/images/anuncios/bici.jpeg

![Alt text](public/images/FOTO.png)

