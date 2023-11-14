import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"
import { request } from "./request_api.js"
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

//envio aumaticos XML

const sendXml = async (options) => {
    if (!fs.existsSync(options.directory)) {
        console.error("La carpeta no existe")
        return
    }
    const archivos = fs.readdirSync(options.directory)
    const pattern = /.xml$/
    const xmls = archivos.filter(archivo => pattern.test(archivo))
    let urlApi = "https://pruebas.estupendo.com.co/api/documento"
    let identificacion = "";
    if(options.prod){
        urlApi = "https://app.estupendo.com.co/api/documento"
    }
    if(options.nit){
         identificacion = options.nit
    }
    const output = []
   for(let archivo of xmls) {
    const name = path.join(options.directory, archivo)
    const content = fs.readFileSync(name, { encoding: "utf-8" })
        const encoded = Buffer.from(content).toString("base64")
        const data = await request(urlApi,{
            api_key: "",
            nit: identificacion, // enviar nit de la empresa que deseo recorrer
            prefijo: "",
            contingencia: false,
            xml: encoded
        })
        output.push(data)
   }
   fs.appendFile(path.join(__dirname, "Output_xml.json"), JSON.stringify(output,null,4), () => { })
}

// envios automaticos TXT
const sendTxt = async (options) => {
    if (!fs.existsSync(options.directory)) {
        console.error("La carpeta no existe")
        return
    }
    const archivos = fs.readdirSync(options.directory)
    const pattern = /.txt$/
    const txts = archivos.filter(archivo => pattern.test(archivo))
    let urlApi = "https://pruebas.estupendo.com.co/api/cargarDocumentoTxt"
    if (options.prod) {
        urlApi = "https://app.estupendo.com.co/api/cargarDocumentoTxt"
    }
    const output = [];
    for (let archivo of txts) {
        const name = path.join(options.directory, archivo)
        const content = fs.readFileSync(name, { encoding: "utf-8" })
        const encoded = Buffer.from(content).toString("base64")
        const data = await request (urlApi, {
            txtEncode: encoded
        })
        output.push(data)
    }
    fs.appendFile(path.join(__dirname, "Output_txt.json"), JSON.stringify(output, null,4), () => { })
}




export { sendTxt, sendXml }