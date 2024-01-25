<?php

// La ruta al archivo JSON
$filePath = './5000.json';

// Leer el contenido del archivo JSON
$jsonString = file_get_contents($filePath);

// Verificar que se pudo leer el archivo
if ($jsonString === false) {
    die("Error al leer el archivo.");
}

// Decodificar la cadena JSON a una estructura de PHP
$data = json_decode($jsonString, true);




// Verificar que la decodificación fue exitosa y que el campo 'items' está disponible
if ($data !== null && json_last_error() === JSON_ERROR_NONE && isset($data['items'])) {
    $itemIds = array_map(function($item) {
        if ($item['filetype']== "cpd")
        echo "https://wdc.contentdm.oclc.org/digital/api/collection/scw/id/". $item['itemId']."/page/0/inline/scw_". $item['itemId']."_0".PHP_EOL;
        else {
            if ($item['filetype']== "jp2"){
                echo "https://wdc.contentdm.oclc.org/digital/download/collection/scw/id/". $item['itemId']."/size/large".PHP_EOL;
            }
        else echo "NOOO";
    }}      
        , $data['items']);

   
} else {
    echo "Error al decodificar JSON o el campo 'items' no está disponible.";
}
?>
