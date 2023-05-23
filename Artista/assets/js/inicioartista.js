// variable global para almacenar el artista seleccionado
var artistaSeleccionado = null;

window.onload = function() {
  consultaArtistas('A', 1); // Consulta todos los artistas que comienzan con la letra 'A'

  document.querySelector('#listaartistas').onclick = function(event) {
    if (event.target.nodeName.toUpperCase() == 'TD') {
      let id = event.target.closest('tr').getAttribute('data-id');
      consultaArtistas('F', id); // Consulta el artista con el id seleccionado
    }
  }
    }
  
// modificar 
document.querySelector('#modificar').onclick = function() {
  // utilizamos los valores del objeto artista seleccionado
  modificarArtista(artistaSeleccionado.id);
}




