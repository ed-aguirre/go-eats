<?php
defined('BASEPATH') OR exit('No direct script access allowed');

require_once( APPPATH.'/libraries/REST_Controller.php' );
use Restserver\libraries\REST_Controller;

class Productos extends REST_Controller {

    public function __construct(){ //constructor, con t al final...

        header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE, OPTIONS");
        header("Access-Control-Allow-Headers: Content-Type, Content-Length, Accept-Encoding");
        header("Access-Control-Allow-Origin: *"); 

        parent::__construct();//con esto se incia el constructor

        $this->load->database(); //se pone despues del 'parent::' para que siempre inicie cargando el database

    }

    public function todos_get(){

        $query = $this->db->query('SELECT * FROM `productos`' );
        
        $respuesta = array(
            'error' => FALSE,
            'productos'=> $query->result_array() 
        );
        $this->response( $respuesta );

    }

    public function por_tipo_get( $linea_id= 0){ //busca por tipo de platillo, 0 ó 1(fit o normal)ALPARECER ESTE NO LO OCUPÉ

        if ( $linea_id <1 OR $linea_id >6){
            $respuesta = array(
                'error' => TRUE,
                'MENSAJE'=> 'No existe tipo.'
            );
            $this->response( $respuesta,REST_Controller::HTTP_BAD_REQUEST  );
            return;
        }

        $query = $this->db->query("SELECT * FROM `productos` where linea_id='". $linea_id ."' ");
        
        
        $respuesta = array(
            'error' => FALSE,
            'lineas'=> $query->result_array() 
        );
        $this->response( $respuesta );
        
    }
    
    public function buscar_get( $termino = 'No específico'){ //busca si existe una semejanza con el nombre del producto

        $query = $this->db->query("SELECT * FROM `productos` where nombre like '%$termino%' ");
        
        $respuesta = array(
            'error' => FALSE,
            'termino'=> $termino,
            'productos'=> $query->result_array() //este es muy importante
        );
        $this->response( $respuesta );

    }

}