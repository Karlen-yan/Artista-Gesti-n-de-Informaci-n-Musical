function modificarArtista(idartista){
  let nombre = document.querySelector("#nombre").value.trim();
  let nacionalidad = document.querySelector("#nacionalidad").value.trim();

  let servicio = "servicios/controllers/artistacontroller.php";
  const datos = new FormData();
  datos.append('peticion', 'M');
  datos.append('idartista', idartista); // Ahora se usa el ID del parámetro
  datos.append('nombre', nombre);
  datos.append('nacionalidad', nacionalidad);
  let parametros = {
    method: "post",
    body: datos
  };
  fetch(servicio, parametros)
  .then(response => {
    if (!response.ok) {
      throw new Error('Error en la llamada al servidor');
    }
    return response.json();
  })
  .then(data => {
    if (data.codigo === '00') {
      alert(data.datos);
      consultaArtistas('T');
    } else {
      alert(`Error: ${data.error}`);
    }
  }).catch(error => {
    console.error(error);
  });
}
