#Generamos lista de URL de pdf de Trabajadores : The Spanish Civil War through the eyes of organised labour 

[Colección digital](https://wdc.contentdm.oclc.org/digital/collection/scw)

Afortunadamente tiene una API.  Buscamos la página 1 de 5000 registros para que devuelva todos los items, que son 4,483. [Descargamos su json](https://wdc.contentdm.oclc.org/digital/api/search/collection/scw/page/1/maxRecords/5000)

Procesamos con [json.php](json.php),que espera que el json se llame 5000.json En ellas hay los items con dos tippos, $item['filetype']== "cpd"  como si fueran imágenes de un pdf y $item['filetype']== "jp2" que son solo 1 imagen. Como resultado genera las URL a descargar, usando DownThemAll o similar.
