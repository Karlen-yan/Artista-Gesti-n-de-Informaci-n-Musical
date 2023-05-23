var artistaSeleccionado = {}; // Se inicializa la variable aquí
function consultaArtistas(inicial, id=0) {

  const formData = new FormData();
  formData.append("peticion", "C");
  formData.append("inicial", inicial);
  if (id > 0) {
    formData.append("idartista", id);
  }
  fetch("servicios/controllers/artistacontroller.php", {
    method: "POST",
    body: formData
  })
    .then(response => {
      if (!response.ok) {
        throw new Error("Error en la respuesta del servidor");
      }
      return response.json();
    })
    .then(data => {
      if (data.codigo === "00") {

        let tabla = "";
        if (data.datos.length > 0) {
          tabla = "<table>";
          tabla += "<tr><th>Nombre artista</th><th>Nacionalidad</th></tr>";
          data.datos.forEach(artista => {
          
            tabla += `<tr data-id="${artista.id}"><td>${artista.nombre}</td><td>${artista.nacionalidad}</td></tr>`;
          
            const fila = document.querySelector(`[data-id="${artista.id}"]`);
            if (fila) {
              console.log(fila);
              fila.addEventListener('click', () => {
                artistaSeleccionado = {
                  nombre: artista.nombre,
                  nacionalidad: artista.nacionalidad
                };
                document.querySelector("#nombre").value = artistaSeleccionado.nombre;
                document.querySelector("#nacionalidad").value = artistaSeleccionado.nacionalidad;
                document.querySelector("#modificar").removeAttribute("disabled");
                document.querySelector("#baja").removeAttribute("disabled");
              });
            
            }
          });
          tabla += "</table>";

          document.querySelector("#listaartistas").innerHTML = tabla;
        } else {
          alert("No existen artistas en la base de datos");
        }
      } else {
        alert(data.datos);
      }
    })
    .catch(error => {
      console.log(error);
    });
}
