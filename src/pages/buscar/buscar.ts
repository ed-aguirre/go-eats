
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Component} from '@angular/core';
import { PlatilloPage } from "../platillo/platillo";

import { ProductosService } from "../../providers/productos/productos";


@IonicPage()
@Component({
  selector: 'page-buscar',
  templateUrl: 'buscar.html',
})

export class BuscarPage {

  PlatilloPage = PlatilloPage;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public _pS:ProductosService) {

  }

  buscar_platillo( ev:any ){

    let valor = ev.target.value;
    console.log( valor );

    this._pS.buscar_producto( valor );
  }

}
