import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { RegistroPage } from '../registro/registro';
import { UsuarioService } from '../../providers/usuario/usuario';
import { CargandoPage } from '../cargando/cargando';

@IonicPage()
@Component({
  selector: 'page-inicio',
  templateUrl: 'inicio.html'
})
export class InicioPage {

  private Cuenta:any={
    correo:'luis@prueba.com',
    contra:'1234'
  }

  //private haber = this._us.token;
  //private user:boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public _us:UsuarioService, public view:ViewController) {
  }

  registro(){
    this.navCtrl.push(RegistroPage);
    
  }

  inicioSes(){
    try {
      this._us.login( this.Cuenta );
        //console.log( this._us.token )
    } catch (error) {
      console.log( 'Error ' + error );
    }
    this.navCtrl.push( CargandoPage );

  }
  

}
