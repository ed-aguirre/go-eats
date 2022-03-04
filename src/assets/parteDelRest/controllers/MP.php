<?php
defined('BASEPATH') OR exit('No direct script access allowed');

require_once( 'vendor/autoload.php' ) ;

require_once( APPPATH.'/libraries/REST_Controller.php' );
use Restserver\libraries\REST_Controller;

class Lineas extends REST_Controller {

    public function __construct(){ //constructor, con t al final...

        header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE, OPTIONS");
        header("Access-Control-Allow-Headers: Content-Type, Content-Length, Accept-Encoding");
        header("Access-Control-Allow-Origin: *"); 

        parent::__construct();//con esto se incia el constructor

        $this->load->database(); //se pone despues del 'parent::' para que siempre inicie cargando el database

    }

    public function index_get(){

        $query = $this->db->query('SELECT * FROM `lineas`' );
        
        $respuesta = array(
            'error' => FALSE,
            'lineas'=> $query->result_array() 
        );
        $this->response( $respuesta );
    }



}
