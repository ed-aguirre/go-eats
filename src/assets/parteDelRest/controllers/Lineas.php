<?php
defined('BASEPATH') OR exit('No direct script access allowed');


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


    public function por_tipo_get(){

        $query = $this->db->query( 'SELECT * FROM `por_tipo`' );

        $respuesta = array(
            'error' => FALSE,
            'por_tipo' => $query->result_array()
        );
        $this->response( $respuesta );

    }

    public function planes_get(){

        $query = $this->db->query( 'SELECT * FROM `planes`' );

        $respuesta = array(
            'error' => FALSE,
            'planes' => $query->result_array()
        );
        $this->response( $respuesta );
    }
    
    /* PAGO Y COBRO*/
    public function cobrar_get( $total="0",$id_user="0"){

        // $data=  $this->post();
        // $total= $data['total'];
        // $token= 1;
        //dejemos elUPDATE para otro momento
        // $query = $this->db->query("UPDATE `tb_user` SET wallet = (wallet - '$total') WHERE `id_user` = 1");

        $query = $this->db->query("SELECT (wallet - '$total') AS `saldo` FROM `tb_user` WHERE id_user = '$id_user'");
       
        $respuesta = $query->row();

        foreach ( $respuesta as $row ) {
           $cont = $row[0];
        }

        if( $cont === '-'){
            $resp = array(
                'error' => TRUE,
                'detalle' => 'Saldo insuficiente',
            );
            $this->response( $resp );
            return;
        }
        //todo ok, pues realiza el update
        $this->db->reset_query();
        //limpiamos el query aqui arriba

        $query = $this->db->query("UPDATE `tb_user` SET wallet = (wallet - '$total') WHERE `id_user` = '$id_user'");

        $resp = array(
            'error' => FALSE,
            'detalle' => 'Pago realizado con exito!',
            'monto' => $total,
            'id_user' => $id_user
        );
        $this->response( $resp );

        
       
        
        
    }


}