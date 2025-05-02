

/**
 * @author Jackelin Marca
 * @version 1.0.0
 * @description montando el servidor
 * @date 2025-04-29
 */

import express from 'express' // framework para crear el servidor y manejar rutas http
import cors from 'cors' //middleware permitir que el front acceda a la api desde otro origen - hacer peticiones al puerto del backend
import dotenv from 'dotenv'//permite manejar la api key en un archivo .env sin exponerla - lee el archivo y cargar sus variables al objecto global process.env

import weatherroutes from './router/weather.js' //rutas de la app
import { inithistoryfile } from './utils/historymanager.js'

dotenv.config(); //configuracion de la dotenv
const apikey=process.env.WEATHER_API_KEY; //variable de almacenamiento de la api key

inithistoryfile(); //comprobando que el archivo de almacenamiento exista

const app = express(); //crea una instancia de la aplicacion express - dame una instancia de tu servidor
const PORT = process.env.PORT; //definir el puerto donde va a corre el backend

app.use(cors()); //esto permite que el navegador no bloque peticiones del frontend que corre en otro server
app.use(express.json());//vas a recibir peticiones en formato json debes de parsearlas automaticamente

app.use('/api/weather',weatherroutes(apikey)); //le dice a express que toda ruta que empieze con esa ruta utiliza las rutas que estan definidas en el archivo que se le pasa

app.listen(PORT,()=>{ //inicia el servidor y lo deja escuchando en el puerto que se le pasa
    console.log(`servidor corriendo en http://localhost:${PORT}`);
});
