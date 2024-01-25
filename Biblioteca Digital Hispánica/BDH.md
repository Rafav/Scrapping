#Herramienta para generar URL de obras de la Biblioteca Digital Hispánica

A partir de una búsqueda, por ejemplo [Teatro del Siglo de oro](http://bdh.bne.es/bnesearch/Search.do?destacadas1=Teatro+del+Siglo+de+Oro&home=true&languageView=es) vemos que las URL son consecutivas.
Dentro de cada obra se distinguen por su PID.

Se generar las URL a descargar con el [scrapper](scrapper.js) usando la consola del navegador. No se descragan directamente porque la URL cambia ligeramente y el dominio es distinto. [Por ejemplo esta](http://bdh-rd.bne.es/high.raw?id=bdh0000214648&name=00000001.original.pdf&view=main&lang=es&page=1&attachment=Ver%20y%20no%20creer%20%5BManuscrito%5D%20:comedia%20nueva.%20Emp.:%20Tras%20el%20invierno%20proceloso%20y%20fr%C3%ADo%20(h.%201)...%20Fin.:%20da%20fin%20tambi%C3%A9n%20la%20comedia%20(h.%2062v))

