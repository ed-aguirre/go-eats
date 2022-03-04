import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UsuarioService } from '../../providers/usuario/usuario';



@IonicPage()
@Component({
  selector: 'page-planes',
  templateUrl: 'planes.html',
})
export class PlanesPage {
  bandera:boolean= true;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public _us:UsuarioService) {
    this._us.planes = []; //preguntate porque cierras un grifo cuando dejas la llave abierta, y entenderaste esto Luis.
    this._us.get_planes();        
        
  }

  ionViewDLoad() {
    console.log('ionViewDLoad PlanesPage');
  }

}
