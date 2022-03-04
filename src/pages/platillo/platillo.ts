import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


import { CarroService } from "../../providers/carro/carro";


@IonicPage()
@Component({
  selector: 'page-platillo',
  templateUrl: 'platillo.html',
})
export class PlatilloPage {

  menu:any ={};

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private _cs:CarroService) {
                
    console.log(this._cs + 'Servicio en uso');
    this.menu =this.navParams.get("id");
    console.log(navParams);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PlatilloPage');
  }

}
