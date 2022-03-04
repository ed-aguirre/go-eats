import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
//import { MenuService } from '../services/menu.service';

@IonicPage()
@Component({
  selector: 'page-preview',
  templateUrl: 'preview.html',
})
export class PreviewPage {
  nombre:any={};
 // edad:number=0;

 // id=null;
  //PLAT:any= {}; //variable vacia para recibir los parametros del menu service

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public viewCtrl: ViewController) {

              
             // this.PLAT = this.menuService.platillos;
              //console.log(this.PLAT);

             //console.log(this.navParams.get('nombre'));
             //console.log(this.nombre);
             
             //this.edad = this.navParams.get('edad');
          //console.log(this.nombre); //Se tiene que imprimir el valor PORQUE LE NAV PARAMS NO MUESTRA SOLO REIBE
             //this.edad = this.navParams.get("edad");
  }

  //comillas chidas ` `
  ionViewDidLoad(){
    //console.log(this.menuService.getMenu())
  }

  swipeLeftEvent(){
   
   this.viewCtrl.dismiss();
  }


}
