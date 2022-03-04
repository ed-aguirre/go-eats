//import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

import { AlertController} from 'ionic-angular';
import { ToastController } from 'ionic-angular';

import { Platform } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
//import { UsuarioService } from '../usuario/usuario';


@Injectable()
export class CarroService {

  public activo : any;
  public plan;
  public elementos: any[] = []; //arreglo que almacenará el id de los platillos


  constructor(private alertCtrl: AlertController, private toastCtrl: ToastController,
    public plt: Platform, public storage:Storage,
    public http:HttpClient ){
      console.log(this.elementos.length);
      console.log(this.plan);

  }

  carro_vacio(){ //esta funcion creo que no se pondrá
    if( this.plt.is('cordova') ){
        this.storage.remove('pedido');
    }else{
      localStorage.removeItem( "pedido" )
    }
  }


  cargar_pedido(){

    let promesa = new Promise ( (resolve ,reject) =>{

      if( this.plt.is('cordova') ){
        console.log("inicio de storage");

        this.storage.ready()
            .then(()=>{
              console.log("storage listo");

              this.storage.get( 'pedido' )
                  .then( pedid=>{

                    if( pedid){ //verifica si existe algo en pedid, yaque al inicio no tiene nada...
                      this.elementos = pedid;
                    }
                      resolve();

                  })
            })
  
      }else{
          if( localStorage.getItem("pedido") ){
            this.elementos = JSON.parse(localStorage.getItem( "pedido" ))
            //this.activo = JSON.parse( localStorage.getItem('activo') )

          }
      }
      resolve();
    });
    return promesa;


  }

  set_pedido(){
    if( this.plt.is('cordova') ){
      //console.log("cel");
      this.storage.ready()
            .then(()=>{
              
              this.storage.set('pedido',this.elementos);
            })

    }else{
      //console.log("compu");
      localStorage.setItem( "pedido", JSON.stringify(this.elementos) )
      //localStorage.setItem( "activo", JSON.stringify( this._us.token ) )
    }

}
  

  agregar_carrito(item_parametro: any) {
    console.log(this.elementos.length);

    for (let item of this.elementos) {
      if (item.codigo == item_parametro.codigo) {

        this.alertCtrl.create({
          title: "Item existente",
          subTitle: item_parametro.nombre + " ya está en el carrito.",
          buttons: ["Ok"]
        }).present();

        return;
      }
    }

    if ( this.elementos.length >= this.plan  ){
      if ( this.plan == 0 ) {

        this.aceptado(item_parametro);
        return;
        
      }

      let toast = this.toastCtrl.create({
        message: 'Carrito lleno',
        duration: 1700,
        position: 'bottom'
      });
      toast.present();
      return;

    } else {

      this.aceptado(item_parametro);

    }

  }

  aceptado(itemparam: any){
    this.elementos.push(itemparam); //si no está el item agregado, lo agregará en este punto
    this.set_pedido();
    let toast = this.toastCtrl.create({
      message: 'Platillo agregado al carrito correctamente.',
      duration: 1700,
      position: 'bottom'
    });
    toast.present();
  }


}
