import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UsuarioService } from '../../providers/usuario/usuario';



@IonicPage()
@Component({
  selector: 'page-historial',
  templateUrl: 'historial.html',
})
export class HistorialPage {

  //private PorHistorialPage = PorHistorialPage;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public _us:UsuarioService ) {
      this._us.ordenes = []; 
      this._us.get_ordenes();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HistorialPage');
  }
  
}
