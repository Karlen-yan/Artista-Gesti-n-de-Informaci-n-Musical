<?php
header('Content-Type: application/json');

require '../models/artistamodel.php';

if (!$peticion = filter_input(INPUT_POST, 'peticion')){
    throw new Exception("Petición obligatoria", 10);
}

$artista = new ArtistaModel();

switch ($peticion){

    case 'A':

        $nombre = $_POST['nombre'];
        $nacionalidad = $_POST['nacionalidad'];
        $datos = compact('nombre', 'nacionalidad');

        try {

            $respuesta = $artista->alta($datos);
            $respuesta = $artista->consulta($datos); // Aquí se hace la consulta después de dar de alta el artista

        } catch (Exception $e) {

            $respuesta = array('codigo' => $e->getCode(), 'error' => $e->getMessage());

        }

        echo json_encode($respuesta);
        break;

    case 'C':

        $idartista = $_POST['idartista'];
        $datos = compact('idartista');

        try {

            $respuesta = $artista->consulta($datos);

        } catch (Exception $e) {

            $respuesta = array('codigo' => $e->getCode(), 'error' => $e->getMessage());

        }

        echo json_encode($respuesta);
        break;

    case 'M':

            $idartista = $_POST['idartista'];
            $nombre = $_POST['nombre'];
            $nacionalidad = $_POST['nacionalidad'];
            $datos = compact('idartista', 'nombre', 'nacionalidad');
            $idartista = intval($idartista);
            try {

                $respuesta = $artista->modificar($datos);
                $respuesta = $artista->consulta($datos); // Aquí se hace la consulta después de modificar el artista

            } catch (Exception $e) {
                $respuesta = array('codigo' => $e->getCode(), 'error' => $e->getMessage());
            }
        
            echo json_encode($respuesta);
            break;
}

?>