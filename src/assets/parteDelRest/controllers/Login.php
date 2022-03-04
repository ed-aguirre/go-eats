<?php
defined('BASEPATH') OR exit('No direct script access allowed');

require_once( APPPATH.'/libraries/REST_Controller.php' );
use Restserver\libraries\REST_Controller;

class Login extends REST_Controller {

    public function __construct(){ //constructor, con t al final...

        header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE, OPTIONS");
        header("Access-Control-Allow-Headers: Content-Type, Content-Length, Accept-Encoding");
        header("Access-Control-Allow-Origin: *"); 

        parent::__construct();//con esto se incia el constructor

        $this->load->database(); //se pone despues del 'parent::' para que siempre inicie cargando el database

    }

    public function index_post(){ //como es _post los parametros no lo recibe dentro de los '()'. Y se llama index porque es la principal

        $data = $this->post(); //asi es COMO SE OBTIENE LA INFORMACION CON POST, TODOOO

        if( !isset( $data['correo']) OR !isset( $data['contra'] ) ){

            $respuesta = array('error' => TRUE,
                             'Mensaje'=>'La informacion no es correcta'
                            );
            $this->response( $respuesta, REST_Controller::HTTP_BAD_REQUEST );
            return;  //este es IF-mensaje saldrá en caso de que no se envie nada.
        }

        //Si tenemos correo y contraseña en el post
        $condiciones = array('correo' => $data['correo'],  //almacena los datos en el array condiciones
                             'contra'=> $data['contra']);

        $query = $this->db->get_where( 'tb_user' , $condiciones ); //get_where funciona como condicion, que pide la tabla (login) y un arreglo de las condiciones.

        $usuario = $query->row(); //variable usuario que sera el resultado del query

        if( !isset( $usuario ) ){ // SI NO SE HACE MATCH CON EL USURIO DE LA DB, MOSTRARA ERROR
            $respuesta = array('error' => TRUE,
                                'Mensaje'=>'El usuario/contrasena no es valido.'
           );
            $this->response( $respuesta );
            return; //alparecer este da error,no borrar
           
        }

        //TODO OK?! 
        //entonces TOKEN
        $token = bin2hex( openssl_random_pseudo_bytes(20) ); // cadena de bytes si va a hacer alatorio
        $token = hash( 'ripemd160', $data[ 'correo' ] ); // o hacer un hash del correo, si va hacer el same
        //$this->response($token);

        //guardar el token en la DB
        $this->db->reset_query(); //se tiene que limpiar el query,porque se hizo muchos cambios
        $act_token = array('token' => $token );
        $this->db->where( 'id_user', $usuario->id_user ); //que usuario se va afectar

        $listo = $this->db->update( 'tb_user',$act_token ); //que tabla y QUE SE QUIERE actualizar

        $respuesta = array('error' => FALSE,
                            'token'=> $token,
                            'contra' => $usuario->contra,
                            'id_usuario'=> $usuario->id_user,
                            'nombre' => $usuario->nombre,
                            'ap_P' => $usuario ->ap_P,
                            'ap_M' => $usuario ->ap_M,
                            'correo' => $usuario ->correo,
                            'ciudad' => $usuario ->ciudad,
                            'calle' => $usuario->calle,
                            'colonia' => $usuario ->colonia,
                            'numero' => $usuario ->numero,
                            'cp' => $usuario ->cp,
                            'plan' => $usuario ->FK_suscripcion,
                            'puntos' => $usuario ->puntos,
                            'wallet' => $usuario ->wallet
                            );
        $this->response( $respuesta );

    }

    public function registrar_post( ) {
       
        $data = $this->post(); //asi es COMO SE OBTIENE LA INFORMACION CON POST

        if( !isset( $data['correo']) OR !isset( $data['contra'] ) ){

            $respuesta = array('error' => TRUE,
                             'Mensaje'=>'La informacion no es correcta'
                            );
            $this->response( $respuesta, REST_Controller::HTTP_BAD_REQUEST );
            return;  //este es IF-mensaje saldrá en caso de que no se envie nada.
        }

        //si no se envia nada,osea nulo...
        if( $data['correo']==null || $data['contra']== null ){
            $respuesta = array('error' => TRUE,
                            'Mensaje'=>'Hay un campo o más vacio');
            $this->response( $respuesta, REST_Controller::HTTP_BAD_REQUEST );
            return;  //este es IF-mensaje saldrá en caso de que falte un campo...
        }

        //Si tenemos correo y contraseña en el post
        $condiciones = array('correo' => $data['correo'],  //almacena los datos en el array condiciones
                            'contra'=> $data['contra'],
                            'nombre' => $data['nombre'],
                            'ap_P' => $data['ap_P'],
                            'ap_M' => $data['ap_M'],
                            'ciudad' => $data['ciudad'],
                            'calle' => $data['calle'],
                            'colonia' => $data['colonia'],
                            'numero' => $data['numero'],
                            'cp' => $data['cp'] );

        //Ahora verificar si el correo ya existe en la DB
        $condicion = array('correo' => $data['correo']);
        $query = $this->db->get_where( 'tb_user' , $condicion ); //get_where funciona como condicion, que pide la tabla (login) y un arreglo de las condic      
        $usuario = $query->row('correo'); //variable usuario que sera el resultado del query 

        if( isset( $usuario ) ){ // SI HACE MATCH CON EL correo DE LA DB,esdecir, el usuario ya existe
          $respuesta = array('error' => TRUE,
                               'Mensaje'=>'El usuario(correo) ya existe.');
          $this->response( $respuesta );
           return; //alparecer este da error,no borrar
        }
        //todo ok, entonces lo graba en la DB
        $this->db->insert('tb_user', $condiciones );
        $this->response( $condiciones);

        
    }

}