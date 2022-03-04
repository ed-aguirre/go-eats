import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CarroService } from '../../providers/carro/carro';
import { ProductosService } from '../../providers/productos/productos';
import { PlatilloPage } from '../platillo/platillo';



@IonicPage()
@Component({
  selector: 'page-portipo',
  templateUrl: 'portipo.html',
})
export class PortipoPage {

  PlatilloPage:any = PlatilloPage;
  Tipo:any ={};

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public _cs:CarroService, public _ps:ProductosService) {

            this.Tipo = this.navParams.get('id');
            console.log( this.navParams.get('id') );
            this._ps.cargar_tipo_comida( this.Tipo.id );
  }

  ionViewDidLoad() {
    console.log('si jala PortipoPage');
  }

}
