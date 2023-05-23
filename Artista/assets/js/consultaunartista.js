function consultarUnaArtista(id) {
    fetch('servicios/controllers/artistacontroller.php', {
      method: 'POST',
      body: JSON.stringify({ peticion: 'S', idartista: id })
    })
    .then(response => response.json())
    .then(data => {
      if (data.codigo === '00') {
        // Aquí procesamos la información del artista recibida en el objeto data
        console.log(data.datos);
      } else {
        // Aquí mostramos el mensaje de error recibido
        console.error(data.error);
      }
    })
    .catch(error => {
      // Aquí mostramos el mensaje de error en caso de que la petición falle
      console.error('Error en la petición:', error);
    });
  }
  