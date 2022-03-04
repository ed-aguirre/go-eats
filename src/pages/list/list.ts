import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';

//import { MenuService } from '../services/menu.service';
import { CarroService } from "../../providers/carro/carro";
import { ProductosService } from "../../providers/productos/productos";

import { PreviewPage } from '../preview/preview';
import { PlatilloPage } from '../platillo/platillo';
import { CarritoPage } from "../carrito/carrito";
import { PortipoPage } from '../portipo/portipo';




@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  PlatilloPage:any = PlatilloPage;
  
  // fondo:string;
  colorear:string= 'food';
  comida: string;
  selectedItem: any;

  cambio:number;
  
  platillos=null;
  platillos2=null;

  menu:any={};

  private PorTipo = PortipoPage; //dont remove!!

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private modalCtrl: ModalController,
              private _cs:CarroService, private _pS: ProductosService) {

                
              this.menu= this.navParams.get("id");
              //this.platillos = menuService.getMenu(); //para obtener los platillos del menu service
              //this.platillos2 = menuService.getMenu2(); //igual que el anterior pero diferente lol
              this.comida = 'apetecible';
              // si se navega a esta página,tendremos un item disponible para el nav params
              this.selectedItem = navParams.get('item');
              
  }


  // fit(){
  //   this.colorear = "primary";
  //   document.getElementById("conte").classList.remove("fondo1");
  //   document.getElementById("conte").classList.add("fondo2");
  // }
  // apete(){
  //   this.colorear = "food";
  //   document.getElementById("conte").classList.remove("fondo2");
  //   document.getElementById("conte").classList.add("fondo1");
  // }


  pressEvent(){
    let modal = this.modalCtrl.create(PreviewPage);
    modal.present();
  }

  irCarrito(){
    this.navCtrl.push(CarritoPage);
  }

}
