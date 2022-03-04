import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { UsuarioService } from '../../providers/usuario/usuario';


@Component({
  selector: 'page-perfil',
  templateUrl: 'perfil.html'
})
export class PerfilPage {
  
  tipo_plan:string ;
  plan2:number;
  
  usuario:any = {
    correo:'',
    contra: ''
  }

  constructor(public navCtrl: NavController,
              public _us:     UsuarioService) {

    this.usuario.correo = this._us.user_data['correo'];
    this.usuario.contra = this._us.user_data['contra'];
    console.log(this.usuario);

    this.plan2 = parseInt(this._us.user_data.plan);
    this.detectar_plan( this.plan2);

  }

  detectar_plan( plan:number ){
 
    switch (plan) {
      case 1:
        this.tipo_plan = 'Bronce';
        break;
      case 2:
        this.tipo_plan = 'Plata';
        break;
      case 3: 
        this.tipo_plan = 'Oro';
        break;
    
      default:
      this.tipo_plan = 'Sin plan';
        break;
    }
   
   
  }

  doRefresh( refrescar ){

    this._us.login( this.usuario );
    refrescar.complete();
    
  }
}
