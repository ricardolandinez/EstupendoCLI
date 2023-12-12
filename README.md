# EstupendoCLI

Esta herramienta esta destinada para uso de los Ing. implementadores y de soporte de la empresa Estupendo-Colombia.
*Requerimientos : 

- node 20.9.0 [Descargar aqui](https://nodejs.org/en/download)

- npm 9.6.7 


Para instalar el aplicativo CLI, deben realizar el siguiente procedimiento :

- Abrir CMD(Windows) o la terminal(Unix) el siguiente comando :
```npm i -g @ricardolandinez/nomeolviden```

- Luego de esto deben validar la version de la herramienta :
```estupendo --version```, si esta  indica que es la 1.0.9 es la correcta.

- Para conocer que opciones tienen de comandos solo deben ingresar en su CMD : 
```estupendo --help```

## Ejemplos de comando valido :
- ```estupendo send_txt -d [Carpeta donde se encuentran los archivos txt]```
- ```estupendo send_xml -d [Carpeta donde se encuentran los archivos xml] -n [Nit de la empresa que emite documentos]```
- ```estupendo send_attached -d [Carpeta donde se encuentran los archivos xml] -p[Produccion, si no es enviado toma api pruebas]```
  
Parametros :
- -d = ruta de los documentos a leer en la maquina.
- -n = nit
- -p = produccion(si no es enviado por defecto toma pruebas).
  
