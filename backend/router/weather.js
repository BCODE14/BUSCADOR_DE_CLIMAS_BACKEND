
/**
 * @author Jackelin Marca
 * @version 1.0.0
 * @description creacion de las rutas 
 * @date 2025-04-29
 */

import express from 'express'; //para crear un router
import axios from 'axios'; //para hacer la peticion a la api externa del clima
import { gethistory, savecitytohistory } from '../utils/historymanager.js';


const BASE_URL = 'http://api.weatherapi.com/v1/current.json';

export default function weatherroutes(apikey){

    const router = express.Router();  //crear el router de rutas-mini app de express sola para rutas

router.get('/',async (req,res)=>{

    const city = req.query.city; //esta parte lee el parametro enviado por la url en este caso el nombre de la ciudad

    if(!city) return res.status(400).json({error:'hey tu no encuentro tu ciudad'}); //veryfica que se pase una ciudad

    try{

        //para depurar

        console.log(city);
        console.log(apikey);
        console.log(`${BASE_URL}?key=${apikey}&q=${city}&lang=es`);

        //llamamos a la api con la ciudad y le dice que venga en espanol
        const response = await axios.get(`${BASE_URL}?key=${apikey}&q=${city}&lang=es`);
        const data = response.data;
        //guardar en historial en la primera posicion -sin duplicados
        savecitytohistory(city); 
       
        res.json(data); //devuelve el resultado de la api al frontend en formato json

    }catch(err){

        console.log("error en la peticion a weatherapi",err.message);
        if(err.response){
            console.error("respuesta del servidor",err.response.data);
        }
        //en caso exista error mandar mensaje y responder con estatus 500
        console.error(err);
        res.status(500).json({error:'error al obtener datos del clima'});

    }
});

//ruta para historial
router.get('/history',(req,res)=>{

    const dat_history=gethistory()
    res.json(dat_history); //devuelve el historial completo

});

return router;

}




