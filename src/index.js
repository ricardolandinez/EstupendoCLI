#!/usr/bin/env node
import { program } from "commander"
import { sendTxt, sendXml, sendAttached  } from "./services.js"


program.name("estupendo").version("1.0.9")

program.command("send_xml")
    .requiredOption("-d, --directory <char>", "Directorio donde se encuentran los documentos XML")
    .option("-p, --prod", "Producción, si no es enviado recibe el api pruebas")
    .requiredOption("-n, --nit <char>", "Nit de la empresa")
    .description("Envio masivos XML")
    .action(sendXml)

program.command("send_txt")
    .requiredOption("-d, --directory <char>", "Directorio donde se encuentran los documentos TXT")
    .option("-p, --prod", "Producción, si no es enviado recibe el api pruebas")
    .description("Envio masivo TXT")
    .action(sendTxt)

program.command("send_attached")
    .requiredOption("-d, --directory <char>", "Directorio donde se encuentran los documentos para recepcionar")
    .option("-p, --prod", "Producción, si no es enviado recibe el api pruebas")
    .description("Envio masivo attachedPdf")
    .action(sendAttached)
    



program.parse()


