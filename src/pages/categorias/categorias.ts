import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { ProductosService } from "../../providers/productos/productos";
import { CarroService } from "../../providers/carro/carro";

import { PorCategoriaPage } from "../por-categoria/por-categoria";
import { CarritoPage } from "../carrito/carrito";

@IonicPage()
@Component({
  selector: 'page-categorias',
  templateUrl: 'categorias.html',
})
export class CategoriasPage {

  private PorCategorias = PorCategoriaPage; //variable para el navpush, no borrar si es importante .-.

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public _pS: ProductosService, public _cs:CarroService) {
  }

  irCarrito(){
    this.navCtrl.push(CarritoPage);
  }

}
