
/**
 * @author Jackelin Marca
 * @version 1.0.0
 * @description metodos para administrar la data historica
 * @date 2025-04-29
 */


import fs from 'fs'

const filePath='./data/history.json';

//comporbar que el archivo exista

export function inithistoryfile(){

    if(!fs.existsSync('./data')){ //comprobar que existe el directorio

        fs.mkdirSync('./data')
    }


    if(!fs.existsSync(filePath)){ //comprobar que existe la ruta

        fs.writeFileSync(filePath,JSON.stringify([]));
    }

}

export function gethistory(){ //para sacar la data

    try{

        const data=fs.readFileSync(filePath,'utf-8'); //leer en formato utf-8
        return data ? JSON.parse(data) : []; //devolver la data parseada a json

    }catch(err){

        console.error("error al leer a parsear el historial",err.message);
        return []

    }
}

export function savecitytohistory(city){ //guardar la nueva ciudad

    const history = gethistory();

    //para evistar duplicados

    if(!history.includes(city)){
        history.unshift(city);
        fs.writeFileSync(filePath,JSON.stringify(history,null,2))
    }
}


