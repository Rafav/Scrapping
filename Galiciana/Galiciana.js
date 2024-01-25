async function fetchData(idEjemplar) {
    try {
        // Primera solicitud GET
        let response = await fetch("https://biblioteca.galiciana.gal/gl/catalogo_imagenes/descargar_imprimir_form.do?path="+idEjemplar+"&presentacion=miniaturas&numPags=6&interno=S&destino=..%2Fcatalogo_imagenes%2Fgrupo.do%3Fpath%3D1336455%26amp%3Binterno%3DS");
        if (!response.ok) {
            throw new Error('Error en la primera solicitud GET: ' + response.statusText);
        }

        // Configuración para la segunda solicitud POST
        const headers = new Headers({
            'User-Agent': 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:120.0) Gecko/20100101 Firefox/120.0',
            'Accept': 'text/html',
            'Accept-Language': 'es-ES,es;q=0.8,en-US;q=0.5,en;q=0.3',
            'Content-Type': 'application/x-www-form-urlencoded',
            'Origin': 'https://biblioteca.galiciana.gal',
            'Connection': 'keep-alive',
            'Referer': 'https://biblioteca.galiciana.gal/gl/catalogo_imagenes/descargar_imprimir_form.do?path='+idEjemplar+'&presentacion=miniaturas&numPags=6&interno=S&destino=..%2Fcatalogo_imagenes%2Fgrupo.do%3Fpath%3D1336455%26amp%3Binterno%3DS',
            // ... otros encabezados ...
        });
        const postData = new URLSearchParams({
            'interno': 'S',
            'posicion': '',
            'path': '1336455',
            'destination': '..%2Fcatalogo_imagenes%2Fgrupo.do%3Fpath%3D'+idEjemplar+'%26interno%3DS',
            'formato': 'pdf',
            'tipoDescarga': 'entero',
            'rango': 'rango'
            // ... otros datos POST ...
        });

        // Segunda solicitud POST
        response = await fetch("https://biblioteca.galiciana.gal/gl/catalogo_imagenes/iniciar_descarga.do", {
            method: 'POST',
            headers: headers,
            body: postData
        });
        if (!response.ok) {
            throw new Error('Error en la segunda solicitud POST: ' + response.statusText);
        }

        // Tercera solicitud POST - create media group download job
        const postDataCreateMediaGroup = new URLSearchParams({
            'email': 'tu_email@example.com', // Reemplaza con el email correspondiente
            'destination': '../catalogo_imagenes/grupo.do?path='+idEjemplar+'&interno=S',
            'posicion': '',
            'path': idEjemplar,
            'formato': 'pdf',
            'rango': '',
            'rangoInf': '',
            'rangoSup': '',
            'tipoDescarga': 'entero'
            // ... otros datos POST ...
        });

        response = await fetch("https://biblioteca.galiciana.gal/gl/media/create-media-group-download-job.do", {
            method: 'POST',
            headers: headers,
            body: postDataCreateMediaGroup
        });

        if (!response.ok) {
            throw new Error('Error en la tercera solicitud POST: ' + response.statusText);
        }

        // Procesar la respuesta JSON para obtener el jobId
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
            const jsonResponse = await response.json();
            if (jsonResponse && jsonResponse['data']) {
                const jobId = jsonResponse['data'];
                console.log("El jobid es " + jobId);

                // Verificar el estado del job
                await checkJobStatus(jobId,idEjemplar);
            } else {
                console.log('No se pudo decodificar la respuesta JSON o el campo "data" no está presente.');
            }
        } else {
            // No es JSON, imprimir la respuesta como texto para depuración
            const textResponse = await response.text();
            console.log('La respuesta no es JSON. Respuesta:', textResponse);
        }
    } catch (error) {
        console.error('Error al realizar solicitudes fetch:', error);
    }
}

async function checkJobStatus(jobId,idEjemplar) {
   const url = `https://biblioteca.galiciana.gal/jobs/${jobId}/status.do`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Error al verificar el estado del job: ' + response.statusText);
        }

        const jobStatus = await response.json();
        const status = jobStatus.status || '';

        if (status === "FINISHED") {
            console.log("Descarga completada: " + JSON.stringify(jobStatus));
            console.log(jobStatus.downloadFilesPaths); // Asumiendo que la respuesta contiene esta propiedad

        
            for (let i = 0; i < jobStatus.downloadFilesPaths.length; i++) {
        
                let downloadUrl;
                if (jobStatus.downloadFilesPaths.length==1) {
                     downloadUrl = "https://biblioteca.galiciana.gal/catalogo_imagenes/download_path.do?groupId="+idEjemplar;          
                }
                else {
                     downloadUrl = "https://biblioteca.galiciana.gal/catalogo_imagenes/download_path.do?groupId="+idEjemplar+"&initialPage&finalPage&downloadFileNumber="+i;
                }
                console.log(`Descargando archivo ${i}: ${downloadUrl}`);
                // Realizar la solicitud de descarga
                /*
                const downloadResponse = await fetch(downloadUrl);
                if (!downloadResponse.ok) {
                    throw new Error('Error al descargar el archivo: ' + downloadResponse.statusText);
                }
                */
                
            }






            for (let i = 0; i < jobStatus.downloadFilesPaths.length; i++) {
                    const downloadUrl = "https://biblioteca.galiciana.gal/catalogo_imagenes/download_path.do?groupId="+idEjemplar+"&initialPage&finalPage&downloadFileNumber="+i;
                    console.log(`Descargando archivo ${i}: ${downloadUrl}`);
                    // Realizar la solicitud de descarga
                    const downloadResponse = await fetch(downloadUrl);
                    if (!downloadResponse.ok) {
                        throw new Error('Error al descargar el archivo: ' + downloadResponse.statusText);
                    }
                    
                }


        } else {
            console.log("Estado actual: " + status + ". Reintentando...");
            setTimeout(() => checkJobStatus(jobId,idEjemplar), 15000); // Esperar 15 segundos antes de reintentar
        }
    } catch (error) {
        console.error('Error al verificar el estado del job:', error);
    }
}

//fetchData(1336455);





//localizar las Copia dixital

const anchorTags = document.querySelectorAll('a[href*="../catalogo_imagenes/grupo.do?path="]');
    anchorTags.forEach(anchor => {
        const href = anchor.getAttribute('href');
        const textContent = anchor.textContent.trim(); // Obtener el texto del enlace y eliminar espacios en blanco
        const pathMatch = href.match(/path=(\d+)/);

        if (pathMatch && pathMatch.length > 1 && textContent === 'Copia dixital') {
            const pathValue = pathMatch[1];
            console.log(`Valor de path encontrado: ${pathValue}`);
            fetchData(pathValue);  // Llamar a la función con el valor de path
        }
    });
