import { Component } from '@angular/core';
import { IonicPage, 
         NavController, 
         NavParams, 
         LoadingController, 
         ViewController, 
         ToastController, 
         ModalController } from 'ionic-angular';

import { URL_SERVICIOS } from "../../config/url.service";
import { UsuarioService } from '../../providers/usuario/usuario';
import { CarroService } from '../../providers/carro/carro';
import { HttpClient } from '@angular/common/http';
import { PagoDetallePage } from '../pago-detalle/pago-detalle';



@IonicPage()
@Component({
  selector: 'page-pago',
  templateUrl: 'pago.html',
})
export class PagoPage {

  public subtotal:any = {};
  total = 0;

  private codigos:string[]=[];

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public loadCtrl:LoadingController, public viewCtrl:ViewController,
              public _us:UsuarioService, public _cs:CarroService,
              public http:HttpClient, public toastCtrl:ToastController,
              public Modal: ModalController) {
      
      console.log(this.navParams.get('id'));
      this.subtotal = this.navParams.get('id');
      //el 'id' es como una llave de los parametros que mandas/recibes

      this.subtotal.forEach(e => {
        let num = parseFloat(e.precio);
        this.total = this.total + num;
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PagoPage');
  }

  do_pedido(){
    let load = this.loadCtrl.create({
      content: 'Procesando...'
    })
    load.present();

    let url_pedido = 
    `${URL_SERVICIOS}Pedidos/do_orden/${ this._us.user_data.token }/${ this._us.user_data.id_usuario }/${ this.total}`;
   
    for(let item of this._cs.elementos){ //saca del arreglo de los pedidos la variable 'codigo' y los ingresa en un nuevo arreglo
      this.codigos.push( item.codigo )
    }

    console.log(this.codigos.toString());//convierte el arreglo en string *-*

    this.http.post(url_pedido,{
      items: this.codigos.toString()
    })
          .subscribe(resp=>{
            console.log(resp);
            if(resp['error'] == true){
              let toast = this.toastCtrl.create({
                message : resp['mensaje'],
                duration : 1700,
                position : 'top'
              });
              toast.present();

            }else{
              let toast = this.toastCtrl.create({
                message : 'Listo! Tu pedido ha sido enviado correctamente',
                duration : 1700,
                position : 'top'
              });
              toast.present();
              this.viewCtrl.dismiss(true);
              this._cs.carro_vacio();
              this._cs.elementos = [];

            }

          },err =>{
            console.log(err)
          });
    load.dismiss();
  }

  ver_modal() {
    const modal = this.Modal.create(PagoDetallePage,{ data: this.subtotal })
   modal.onDidDismiss( d => {
     console.log(d);
   });
   modal.present();
  }

}
