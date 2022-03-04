import { Component } from '@angular/core';
import { IonicPage, NavController, ToastController } from 'ionic-angular';
//import { ListPage } from '../list/list';
//import { TabsPage } from '../tabs/tabs';
import { UsuarioService } from '../../providers/usuario/usuario';
import { CargandoPage } from '../cargando/cargando';


@IonicPage()
@Component({
  selector: 'page-registro',
  templateUrl: 'registro.html',
})
export class RegistroPage {
  

  //  El campo de cuenta para el formulario de refistro 
  private cuenta: any = {
    nombre: '',
    ap_P: '',
    ap_M: '',
    correo: '',
    contra: '',
    ciudad: '',
    colonia: '',
    calle: '',
    numero: '',
    cp: ''
  };
  // name:any;
  // email:any;
  // pass:any;

  // mensaje de error 
  private signupErrorString: string;

  constructor(public navCtrl: NavController,
              public toastCtrl: ToastController,
              public _us:UsuarioService) {
        
      this.signupErrorString = "Error en inicio";
  
  }

  doRegistro() {
    try {
      this._us.registro( this.cuenta );
      
    } catch (error) {
      console.log('Error ' + error)
    }
    this.navCtrl.push( CargandoPage )
  }

}
