import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ViewController } from 'ionic-angular';
import { UsuarioService } from '../../providers/usuario/usuario';

/**
 * Generated class for the PagoDetallePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pago-detalle',
  templateUrl: 'pago-detalle.html',
})
export class PagoDetallePage {

  public puntos:any = [];

  public menu:any = {};
  

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public Modal: ModalController,
              private view: ViewController,
              private _us: UsuarioService) {
      
    this.menu = this.navParams.get('data');
    console.log(this.menu);

    this.puntos = parseInt(this._us.user_data['puntos']);
    this.puntos = parseInt(this.puntos);
    console.log(this.puntos);

  }

  ionViewDidLoad() {
    // const data = this.navParams.get('platillo');
    
  }

  close() {
    this.view.dismiss()
  }

  update(e, id:string){
    console.log(id)
    //console.table(e);

    if( e.value ){
      this.puntos--;
    } else {
      this.puntos++;
    }
  }

}
