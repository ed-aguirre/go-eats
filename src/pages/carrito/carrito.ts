import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { CarroService } from "../../providers/carro/carro";
import { UsuarioService } from '../../providers/usuario/usuario';
//import { HttpClient } from '@angular/common/http';

//import { URL_SERVICIOS } from "../../config/url.service";
import 'rxjs/add/operator/map';
import { PagoPage } from '../pago/pago';

@IonicPage()
@Component({
  selector: 'page-carrito',
  templateUrl: 'carrito.html',
})
export class CarritoPage {
  
  // private httpOptions = {
  //   headers: new HttpHeaders({
  //     'Content-Type': 'application/x-www-form-urlencoded'
  //   })
  // }
  
  private Pago = PagoPage;
  
  //private data:string[]=[];

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public _cs: CarroService, public _us:UsuarioService,
              ) {
  }

  borrar( idx:number ){
    this._cs.elementos.splice( idx,1 );
    this._cs.set_pedido();

    if(this._cs.elementos.length == 0){
      console.log("esta vacio");
      // this._cs.carro_vacio();
    }
  }


  
  
}
