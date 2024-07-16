<?php
// Verifica si se ha enviado un archivo
if(isset($_FILES['imagen'])){
    $archivo = $_FILES['imagen'];

    // Ruta donde se guardará la imagen en el servidor
    $ruta = 'fileserver/' . $archivo['name'];

    // Mueve el archivo cargado al directorio deseado
    if(move_uploaded_file($archivo['tmp_name'], $ruta)){
        echo 'La imagen se ha cargado correctamente.';
    } else {
        echo 'Error al cargar la imagen.';
    }
}
?>