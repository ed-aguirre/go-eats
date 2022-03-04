<?php
defined('BASEPATH') OR exit('No direct script access allowed');

require_once( APPPATH.'/libraries/REST_Controller.php' );
use Restserver\libraries\REST_Controller;

class Pedidos extends REST_Controller {

    public function __construct(){ //constructor, con t al final...

        header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE, OPTIONS");
        header("Access-Control-Allow-Headers: Content-Type, Content-Length, Accept-Encoding");
        header("Access-Control-Allow-Origin: *"); 

        parent::__construct();//con esto se incia el constructor

        $this->load->database(); //se pone despues del 'parent::' para que siempre inicie cargando el database

    }

    public function do_orden_post( $token = "0", $id_user= "0", $total="0"){

        $data=  $this->post();

        if( $token== '0' || $id_user == '0' ){  //si no hay token o usuario,mostrará el bad request
            $respuesta = array('error' => TRUE,
                                'mensaje'=> "Token o usuario no valido.");
            $this->response( $respuesta, REST_Controller::HTTP_BAD_REQUEST );
            return;
        }

        if( !isset($data['items']) || strlen( $data['items'] )== 0 ){ //si la data de los items es nulo o la longitud del string es 0, es un error
            $respuesta = array('error' => TRUE,
                             'mensaje'=> "No existe items.");
            $this->response( $respuesta, REST_Controller::HTTP_BAD_REQUEST );
            return;

        }

        //Aqui items,token, usuario
        $condiciones = array('id_user' =>$id_user ,
                            'token'=> $token ); //arreglo de condiciones
        $this->db->where( $condiciones );

        $query = $this->db->get('tb_user'); //el get compara el 'id' con el de la tabla 'tb_user' 
        
        $existe = $query->row();

        if( !$existe ){ //si no hace match mostrará un mensaje de error
            $respuesta = array('error' => TRUE,
                             'mensaje'=> "Usuario y Token incorrecto.");
            $this->response( $respuesta );
            return;
        }
        //todo ok,checamos su saldo
        $this->db->reset_query();

        $query = $this->db->query("SELECT (wallet - '$total') AS `saldo` FROM `tb_user` WHERE token = '$token'");
       
        $respuesta = $query->row();

        foreach ( $respuesta as $row ) { //barremos el arreglo y obtenemos el primer caracter xd
           $cont = $row[0];
        }

        if( $cont === '-'){ //si es negativo entonces no puede pocesar la compra
            $respuesta = array(
                'error' => TRUE,
                'mensaje' => "Saldo insuficiente.",
            );
            $this->response( $respuesta );
            return;
        }
        //TODO OKEY?!? ENTONCES
        //pues realiza el update
        $this->db->reset_query();
        //limpiamos el query aqui arriba

        $query = $this->db->query("UPDATE `tb_user` SET wallet = (wallet - '$total') WHERE `id_user` = '$id_user'");

        //Usuario y Token son correctos entonces
        $this->db->reset_query();

        $insertar = array('usuario_id'=> $id_user);
        $this->db->insert('ordenes', $insertar ); //inserta el id de usuario a la tabla pedidos de la db
        $orden_id = $this->db->insert_id(); //regresa el id de la última inserción realizada en la tabla

        //crear detalle de la orden
        $this->db->reset_query();
        $items = explode(',', $data['items']); //separa los productos por cada coma

        foreach ($items as &$producto_id) { //barrer cada uno de los elementos del arreglo items y por cada uno se crea el producto_id
            $data_insertar = array('producto_id' => $producto_id , 
                                    'orden_id'=> $orden_id );
            $this->db->insert('ordenes_detalle',$data_insertar); 
            
        }
        $respuesta = array(
            'error' => FALSE,
            'orden_id'=> $orden_id,
            'monto' => "$ $total ",
            'usuario' => $token);

        $this->response( $respuesta );
    }

    public function obt_pedidos_get( $token= "0", $id_user= "0" ){

        if( $token== '0' || $id_user == '0' ){  //si no hay token o usuario,mostrará el bad request(SE REPITE COMO EL DO_ORDEN)
            $respuesta = array('error' => TRUE,
                                'mensaje'=> "Token o usuario no valido.");
            $this->response( $respuesta, REST_Controller::HTTP_BAD_REQUEST );
            return;
        }
        $condiciones = array('id_user' =>$id_user ,
                            'token'=> $token ); //arreglo de condiciones
        $this->db->where( $condiciones );

        $query = $this->db->get('tb_user'); //el get compara el 'id' con el de la tabla 'login' 
        
        $existe = $query->row();

        if( !$existe ){ //si no hace match mostrará un mensaje de error
            $respuesta = array('error' => TRUE,
                             'mensaje'=> "Usuario y Token incorrecto.");
            $this->response( $respuesta );
            return;
        }      //aqui el token existe, es valido y se puede mostrar todos los pedidos que el usuario tenga

        //Retornas las ordenes del usuario
        $query= $this->db->query('SELECT * FROM `ordenes` WHERE usuario_id ='. $id_user .' ');

        $ordenes = array(); //arreglo que guardarà màs adelante las ordenes

        foreach ($query->result() as $row) { //barre las ordenes que regrese el query

            $query_detalle = $this->db->query('SELECT a.orden_id,b.* FROM `ordenes_detalle` a INNER JOIN productos b on a.producto_id = b.codigo WHERE orden_id = '. $row->id.'');
                //el query obtiene la losdatos dela db y con el inner junta dos tablas para mostrar los detalles

            $orden = array('id' => $row->id,
                            'creado_en'=>$row->creado_en,
                            'status' =>$row->status,
                            'detalle'=> $query_detalle->result()
                             );
            
            array_push( $ordenes, $orden ); //inserta un array dentro del otro.[ordenes recibe,y orden es el que se manda]
        }

        $respuesta = array('error' => FALSE,
                            'Ordenes'=>$ordenes );
        $this->response( $respuesta );
    }

    public function borrar_pedido_delete( $token = "0", $id_user= "0", $orden_id= "0" ){ //FUNCION QUE BORRA PEDIDOS

        if( $token== '0' || $id_user == '0' || $orden_id == '0' ){  //si no hay token o usuario,mostrará el bad request(SE REPITE COMO EL DO_ORDEN)
            $respuesta = array('error' => TRUE,
                                'mensaje'=> "Token o usuario no valido.");
            $this->response( $respuesta, REST_Controller::HTTP_BAD_REQUEST );
            return;
        }
        $condiciones = array('id_user' =>$id_user ,
                            'token'=> $token ); //arreglo de condiciones
        $this->db->where( $condiciones );

        $query = $this->db->get('tb_user'); //el get compara el 'id' con el de la tabla 'tb_user' 
        
        $existe = $query->row();

        if( !$existe ){ //si no hace macht mostrará un mensaje de error
            $respuesta = array('error' => TRUE,
                             'mensaje'=> "Usuario y Token incorrecto.");
            $this->response( $respuesta );
            return;
        } 
        //indicar que la orden es de ese usuario
        $this->db->reset_query(); //se limpia el query
        $condiciones = array('id' =>$orden_id,
                            'usuario_id'=>$id_user );
        $this->db->where( $condiciones ); //se mandan las condiciones
        $query = $this->db->get( 'ordenes' );

        $existe = $query->row(); //se almacena en la variable existe el valor de la tabla del query

        if( !$existe ){ //si no existe en la tabla de la db... 
            $respuesta = array('error' => TRUE,
                                'mensaje'=> "Esa orden no puede ser borrada.");
            $this->response( $respuesta );
            return;
        }

        //Aqui todo esta ok
        $condiciones = array('id' => $orden_id ); //se crea un arreglo para hacer la eliminación(solo evalua si es del usuario)
        $this->db->delete( 'ordenes', $condiciones ); // borrará la orden de la tabla 'ordenes' db

        $condiciones = array('orden_id' => $orden_id);
        $this->db->delete( 'ordenes_detalle', $condiciones ); //esto lo borra obviamente de la tabla ordenes_detalle

        $respuesta = array('error' => FALSE,
                            'Mensaje'=> 'Orden eliminada correctamente.');
        $this->response( $respuesta );
        return;
    }



}
