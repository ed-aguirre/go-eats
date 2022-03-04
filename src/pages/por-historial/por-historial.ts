import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UsuarioService } from '../../providers/usuario/usuario';


@IonicPage()
@Component({
  selector: 'page-por-historial',
  templateUrl: 'por-historial.html',
})
export class PorHistorialPage {

  public orden:any ={};
  public orden_detalle:any = {} ;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public _us:UsuarioService) {

      this.orden = this.navParams.get("id");
      console.log(this.orden['creado_en'])

      this.orden_detalle = this.orden.detalle;
      console.log(this.orden_detalle);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PorHistorialPage');
  }

}
