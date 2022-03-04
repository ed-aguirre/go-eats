import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';

import { InicioPage } from '../inicio/inicio';
import { TabsPage } from "../tabs/tabs";
import { CarroService } from '../../providers/carro/carro';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ProductosService } from '../../providers/productos/productos';
import { UsuarioService } from '../../providers/usuario/usuario';

@IonicPage()
@Component({
  selector: 'page-cargando',
  templateUrl: 'cargando.html',
})
export class CargandoPage {

  constructor(public platform: Platform, public carro:CarroService,
            public navCtrl: NavController, public navParams: NavParams,
            public statusBar: StatusBar, public splashScreen: SplashScreen,
            public _ps:ProductosService, public _us: UsuarioService,
            public _cs:CarroService) {
    
    //console.log(this._us.token)
    setTimeout(() => {
      this.iniciar_app();
    }, 2000);
  }

  
  iniciar_app() {
    this.platform.ready().then(() => {

      this._us.cargar_usuario() //luis del futuro... al parecer es con el _us y debes de crear un metodo de cargar usuario,asi como el de cargar_pedido
          .then(()=>{ //no recibe ningun parametro, por eso se pone parentesis vacios

            this._cs.plan = this._us.user_data['plan'];
            
            this._cs.cargar_pedido();
            
            if(localStorage.getItem("activo")){
               
              this.navCtrl.setRoot(TabsPage);
            }else{
              this.navCtrl.setRoot(InicioPage);
            }

            this.platform.pause.subscribe(()=>{
              console.log("La app se detendrá");
            });

            this.platform.resume.subscribe(()=>{
              console.log("La app volvio a iniciar");
            });


            // ok, si la plataforma esta lista and los plugins estan disponibles
            // Aqui puedes hacer cualquier accion nativa de alto nivel que se requiera
            this.statusBar.styleDefault();
            this.splashScreen.hide();
          })
    });
  }

}
