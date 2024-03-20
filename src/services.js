import fs from "fs"
import path from "path"
import FormData from "form-data"
import { fileURLToPath } from "url"
import { request, requestFile } from "./request_api.js"
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
    if (options.prod) {
        urlApi = "https://app.estupendo.com.co/api/documento"
    }
    if (options.nit) {
        identificacion = options.nit
    }
    const output = []
    console.log("Procesando...")
    for (let archivo of xmls) {
        const name = path.join(options.directory, archivo)
        const content = fs.readFileSync(name, { encoding: "utf-8" })
        const encoded = Buffer.from(content).toString("base64")
        const data = await request(urlApi, {
            api_key: "",
            nit: identificacion, // enviar nit de la empresa que deseo recorrer
            prefijo: "",
            contingencia: false,
            xml: encoded
        })
        output.push(data)
    }
    const ruta = path.join(process.cwd(), "Output_xml.json")
    fs.appendFile(ruta, JSON.stringify(output, null, 4), () => { })
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
    console.log("Procesando...")
    for (let archivo of txts) {
        const name = path.join(options.directory, archivo)
        const content = fs.readFileSync(name, { encoding: "utf-8" })
        const encoded = Buffer.from(content).toString("base64")
        const data = await request(urlApi, {
            txtEncode: encoded
        })
        output.push(data)
    }
    const ruta = path.join(process.cwd(), "Output_txt.json")
    fs.appendFile(ruta, JSON.stringify(output, null, 4), () => { })

}

// cargue masivo Attached

const sendAttached = async (options) => {
    if (!fs.existsSync(options.directory)) {
        console.error("La carpeta no existe")
    }
    const archivos = fs.readdirSync(options.directory)
    const pattern = /\.(zip|xml)$/i;
    const attached = archivos.filter(archivo => pattern.test(archivo))
    let urlApi = "https://pruebas.estupendo.com.co/api/race/documento/cargar"
    if (options.prod) {
        urlApi = "https://app.estupendo.com.co/api/race/documento/cargar"
    }
    const output = [];
    console.log("Procesando...")
    for (let archivo of attached) {
        const name = path.join(options.directory, archivo)
        const fileStream = fs.createReadStream(name);
        const fd = new FormData()
        fd.append('file', fileStream, { filename: archivo });
        try {
            const filename = name.split("\\").at(-1)
            console.log(`Procesando archivo: ${filename}`);
            const data = await requestFile(urlApi, fd)
            output.push(`Nombre del archivo: ${filename}`)
            output.push(data)
        } catch (error) {
            const filename = name.split("\\").at(-1)
            console.error(`Error al procesar el archivo ${name}:`, error); 
            output.push(`El archivo ${filename} no se pudo procesar debido a: ${error.message}`);
        }
    }
    const ruta = path.join(process.cwd(), "Output_attached.json")
    fs.appendFile(ruta, JSON.stringify(output, null, 4), (err) => {
        if (err) {
            console.error('Error al escribir en el archivo:', err);
        } else {
            console.log('Los resultados han sido guardados en Output_attached.json');
        }
    });


}

export { sendTxt, sendXml, sendAttached }