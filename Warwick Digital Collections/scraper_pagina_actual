const links = document.querySelectorAll('a.SearchResult-container');

// Extraer los href
const hrefs = Array.from(links).map(link => link.getAttribute('href'));

const idRegex = /\/id\/(\d+)/;
const collectionRegex = /\/collection\/([^\/]+)/;

// Arrays para almacenar ids y urls
const ids = [];
const validUrls = [];

// Extraer los identificadores y formar las URLs
hrefs.forEach(href => {
    // Buscar el id y la collection en el href
    const idMatch = href.match(idRegex);
    const collectionMatch = href.match(collectionRegex);
    
    if (idMatch && collectionMatch) {
        // Extraer el id y la collection
        const id = idMatch[1];
        const collection = collectionMatch[1];
        
        // Guardar el id en el array de ids
        ids.push(id);
        
        // Formar y guardar la URL en el array de URLs
        validUrls.push(`https://wdc.contentdm.oclc.org/digital/api/collection/${collection}/id/${id}/page/0/inline/${collection}_${id}_0`);
    }
});

// Seleccionar el contenedor con el atributo data-id='mainContent'
const container = document.querySelector('div[data-id="mainContent"]');

validUrls.forEach((url, index) => {
    const id = ids[index]; // Obtener el id correspondiente a la URL
    
    // Crear un nuevo elemento <a> (no lo añadiremos al DOM, solo lo usaremos para descargar)
    const link = document.createElement('a');
    
    // Establecer el href y el atributo download
    link.href = url;
    link.download = `documento_${id}.pdf`; // Usar el id en el nombre del archivo
    
    // Realizar la solicitud y procesar la respuesta
    fetch(url)
        .then(response => response.blob()) // Convertir la respuesta en Blob
        .then(blob => {
            // Crear una URL para el Blob
            const blobUrl = URL.createObjectURL(blob);
            
            // Configurar el enlace para la descarga
            link.href = blobUrl;
            link.download = `documento_${id}.pdf`;
            
            // Añadir el enlace al contenedor (opcional, solo si quieres que sea visible)
            container.appendChild(link);
            
            // Opcional: añadir un salto de línea o algún otro separador si lo deseas
            container.appendChild(document.createElement('br'));
            
            // Hacer clic en el enlace para iniciar la descarga
            link.click();
            
            // Limpiar la URL del objeto después de la descarga
            URL.revokeObjectURL(blobUrl);
        })
        .catch(error => console.error('Error fetching the PDF:', error));
});
