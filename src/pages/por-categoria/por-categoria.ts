import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { PlatilloPage } from "../platillo/platillo";
import { ProductosService } from "../../providers/productos/productos";
import { CarroService } from "../../providers/carro/carro";

@IonicPage()
@Component({
  selector: 'page-por-categoria',
  templateUrl: 'por-categoria.html',
})
export class PorCategoriaPage {
  PlatilloPage:any = PlatilloPage;
  categoria:any= {};

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private _pS:ProductosService, public _cs:CarroService) {
                
    this.categoria = this.navParams.get('id');
    
    this._pS.cargar_por_categoria( this.categoria.id );

    console.log( this.navParams.get('id') );
    // console.log(this._pS.cargar_por_categoria( this.categoria.id ));

  }

 
}
