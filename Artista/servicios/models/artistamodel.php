<?php
header('Content-Type: application/json');

require 'database.php';

class ArtistaModel extends Database {

    private function validarDatos($nombre, $nacionalidad) {
        if (empty($nombre) || empty($nacionalidad)) {
            throw new Exception("Todos los datos son obligatorios", 10);
        }
    }

    // Alta
    public function alta($datos) {
        extract($datos);

        $this->validarDatos($nombre, $nacionalidad);

        $sql = "INSERT INTO artista VALUES (NULL, :nombre, :nacionalidad)";
        $stmt = $this->getConexion()->prepare($sql);
        $stmt->bindParam(':nombre', $nombre);
        $stmt->bindParam(':nacionalidad', $nacionalidad);
        $stmt->execute();
        $id = $this->getConexion()->lastInsertId();

        return array('codigo' => '00', 'datos' => "Artista dado de alta con el id $id");
    } 

    // Consulta 
    public function consulta($datos) {
        extract($datos);
    
        $sql = "SELECT * FROM artista ORDER BY nombre";
    
        $stmt = $this->getConexion()->query($sql);
        //  posibles errores que puede ser pero mas detallada 
        if (!$stmt) {
            $error = $this->getConexion()->errorInfo();
            throw new Exception("Error en la consulta: $sql. Error: {$error[2]}");
        }

        $stmt->setFetchMode(PDO::FETCH_ASSOC);
        $artistas = $stmt->fetchAll();
    
        if (empty($artistas)) {
            return array('codigo' => '01', 'datos' => 'No existen artistas en la base de datos');
        } else {
            return array('codigo' => '00', 'datos' => $artistas);
        }
    }

// Consulta de un artista  
public function consultaArtista($datos) {
          extract($datos);
    
        $sql = "SELECT * FROM artista WHERE idartista = :idartista";
    
        $stmt = $this->getConexion()->prepare($sql);
        $stmt->bindParam(':idartista', $idartista);
        $stmt->execute();
    
        $artista = $stmt->fetch(PDO::FETCH_ASSOC);
    
        if (!$artista) {
            return array('codigo' => '01', 'datos' => "No existe ningún artista con el id $idartista");
        } else {
            return array('codigo' => '00', 'datos' => $artista);
        }
    }


    // Modificar
    public function modificar($datos) {
        extract($datos);

        $this->validarDatos($nombre, $nacionalidad);

        $sql = "UPDATE artista SET nombre = :nombre, nacionalidad = :nacionalidad WHERE idartista = :idartista";
        $stmt = $this->getConexion()->prepare($sql);
        $stmt->bindParam(':nombre', $nombre);
        $stmt->bindParam(':nacionalidad', $nacionalidad);
        $stmt->bindParam(':idartista', $idartista);
        $stmt->execute();

        if ($stmt->rowCount() == 0) {
            return array('codigo' => '01', 'datos' => 'No se pudo actualizar el artista');
        } else {
            return array('codigo' => '00', 'datos' => 'Artista actualizado correctamente');
        }
}

    // Eliminar
    public function eliminar($datos) {
        extract($datos);

        $sql = "DELETE FROM artista WHERE idartista = :idartista";
        $stmt = $this->getConexion()->prepare($sql);
        $stmt->bindParam(':idartista', $idartista);
        $stmt->execute();

        $num_filas_afectadas = $stmt->rowCount();

        if ($num_filas_afectadas === 0) {
            return array('codigo' => '01', 'datos' => 'No se ha encontrado el artista especificado');
        } else {
            return array('codigo' => '00', 'datos' => "Artista eliminado con éxito");
        }
    }


}
?>
