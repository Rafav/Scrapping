var url_base="http://bdh-rd.bne.es/high.raw?id="

var url_nombre_pdf="&name=00000001.original.pdf&view=main&lang=es&page=1&attachment=";



// Selecciona el primer elemento 'span' con la clase 'LabelBlue'
let spanElement = document.querySelector('span.LabelBlue');

// Inicializa la variable totalNumber
let totalNumber = 0;

var descargarPDF=document.createElement('a');

// Extrae el total de resultados usando una expresión regular, teniendo en cuenta los espacios en blanco
if (spanElement) {
    var text = spanElement.innerHTML.trim(); // Elimina espacios en blanco al principio y al final
    var match = text.match(/de\s(\d+\.?\d+)/);

    if (match) {
        totalNumber = parseInt(match[1].replace('.', ''), 10);

	console.log(totalNumber);
        // Obtiene la URL base
        var baseUrl = document.querySelectorAll('span.LabelBlack + a')[0].href;

        // Iterar sobre cada pageNumber
        for (var i = 1; i <= totalNumber; i++) {
            // Construye la nueva URL
            var newUrl = baseUrl.replace(/(pageNumber=)[^\&]+/, '$1' + i);
            if (!newUrl.includes('pageNumber=')) {
                newUrl += '&pageNumber=' + i; // Agrega pageNumber si no está presente
            }

            // Realiza una solicitud fetch a cada nueva URL
            fetch(newUrl)
                .then(response => response.text()) // o .json() si esperas JSON
                .then(data => {
                    //PID 
                    var pidRegex = /<div class="dato">\s*PID\s*<\/div>\s*<div class="valor">\s*([^<]+)\s*<\/div>/;
             var match = data.trim().match(pidRegex);

if (match) {
    var valor = match[1].trim();
//    console.log(valor);
    
     //
                    var h1Regex = /<h1 class="valor">\n*\s*\t(.*)/;
		    var h1Match = data.trim().match(h1Regex);
		    //console.log(h1Match[1]);
                  var urlPdf= encodeURI(url_base+valor+url_nombre_pdf+h1Match[1]);
                  console.log(urlPdf);
              
               
               
               
               
                  
} else {
    console.log('PID no encontrado');
}
                    
                    
                   
                   
                })
                .catch(error => {
                    console.error('Error en la solicitud fetch:', error);
                });
        }
    } else {
        console.log('Número no encontrado');
    }
} else {
    console.log('Elemento no encontrado');
}
