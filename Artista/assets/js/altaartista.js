function altaArtista() {
    let nombre = document.querySelector("#nombre").value.trim();
    let nacionalidad = document.querySelector("#nacionalidad").value.trim();
  
    let servicio = "servicios/controllers/artistacontroller.php";
    let datos = new FormData();
    datos.append("peticion", "A");
    datos.append("nombre", nombre);
    datos.append("nacionalidad", nacionalidad);
    let parametros = {
      method: "post",
      body: datos
    };
    fetch(servicio, parametros)
      .then(respuesta => respuesta.json())
      
      .then(mensaje => {
        let codigo = mensaje.codigo;
        // let datos = mensaje.datos;
        let error = mensaje.error;
  
        if (codigo == "00") {
          document.querySelector("#formulario").reset();
          document.querySelector("#modificar").setAttribute("disabled", true);
          // Primero se inserta el artista y después se llama a consultaArtistas()
          consultaArtistas("A");
        } else {
          alert(error);
        }
      })
      .catch(error => {
        console.log(error);
      });
  }
  
  document.querySelector("#alta").addEventListener("click", altaArtista);


// Funcionando  1 
// function altaArtista() {
//     let nombre = document.querySelector('#nombre').value.trim();
//     let nacionalidad = document.querySelector('#nacionalidad').value.trim();
  
//     let servicio = 'servicios/controllers/artistacontroller.php';
//     let datos = new FormData();
//     datos.append('peticion', 'A');
//     datos.append('nombre', nombre);
//     datos.append('nacionalidad', nacionalidad);
//     let parametros = {
//       method: 'post',
//       body: datos
//     };
//     fetch(servicio, parametros)
//       .then(respuesta => respuesta.json())
//       .then(mensaje => {
//         let codigo = mensaje.codigo;
//         let datos = mensaje.datos;
//         let error = mensaje.error;
        
//         if (codigo == '00') {
//           document.querySelector('#formulario').reset();
//           document.querySelector('#modificar').setAttribute('disabled', true);
//           consultaArtistas('B');
//         } else {
//           alert(error);
//         }
//       })
//       .catch(error => {
//         console.log(error);
//       });
//   }
  
//   document.querySelector('#alta').addEventListener('click', altaArtista);
  