#!/usr/bin/env node
import { program } from "commander"
import { sendTxt, sendXml } from "./services.js"


program.name("estupendo").version("1.0.0")

program.command("send_xml")
    .requiredOption("-d, --directory <char>", "Directorio donde se encuentran los documentos XML")
    .option("-p, --prod", "Producción, si no es enviado recibe el api pruebas")
    .requiredOption ("-n, --nit <char>", "Nit de la empresa")
    .description("Envio masivos XML")
    .action(sendXml)

program.command("send_txt")
    .requiredOption("-d, --directory <char>", "Directorio donde se encuentran los documentos TXT")
    .option("-p, --prod", "Producción, si no es enviado recibe el api pruebas")
    .description("Envio masivo TXT")
    .action(sendTxt)

program.parse()


