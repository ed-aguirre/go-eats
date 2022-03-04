import { Component, ViewChild } from '@angular/core';
import { Nav, Platform} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { PerfilPage } from '../pages/perfil/perfil';
import { CargandoPage } from '../pages/cargando/cargando';
//import { InicioPage } from '../pages/inicio/inicio';

import { TabsPage } from "../pages/tabs/tabs";
import { CarroService } from '../providers/carro/carro';
import { UsuarioService } from '../providers/usuario/usuario';
import { HistorialPage } from '../pages/historial/historial';
import { PlanesPage } from '../pages/planes/planes';
//import { TemplateBindingParseResult } from '@angular/compiler';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage:any= CargandoPage;

  // pages: Array<{title: string, component: any, icon:string}>;
  pages = [
    { color: 'secondary', title: 'Perfil', component: PerfilPage, icon: "person" },
    { color: 'food', title: 'Menu', component: TabsPage, icon: "restaurant" },
    { color: 'azul', title: 'Pedidos', component: HistorialPage, icon: 'time'},
    { color: 'amarillo', title: 'Planes', component: PlanesPage, icon: 'star'}
  ]

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen,
    public carro:CarroService, public _us:UsuarioService) {
    this.initializeApp();

    // //  uso de ejemplo para un ngfor y navegacion
    // this.pages = [
    //   { title: 'Perfil', component: PerfilPage, icon: "person" },
    //   { title: 'Ordenar', component: ListPage }
    // ];

  }

  initializeApp() {

    this.platform.ready().then(() => {

      // this.carro.cargar_pedido()
      //     .then(()=>{ //no recibe ningun parametro, por eso se pone parentesis vacios

      //       // if(localStorage.getItem("pedido")){
      //       //   this.rootPage = TabsPage;
      //       // }else{
      //       //   this.rootPage = CargandoPage;
      //       // }

      //       this.platform.pause.subscribe(()=>{
      //         console.log("La app se detendrá");
      //       });

      //       this.platform.resume.subscribe(()=>{
      //         console.log("La app volvio a iniciar");
      //       });


            // ok, si la plataforma esta lista and los plugins estan disponibles
            // Aqui puedes hacer cualquier accion nativa de alto nivel que se requiera
            this.statusBar.styleDefault();
            this.splashScreen.hide();
          })
    // });


  }

  openPage(page) {
    // Resetea el contenido del nav para tener solo esta pagina (page)
    // no se usa el boton back por accesibilidad...
    this.nav.setRoot(page.component);
  }

  logout(){
    //console.log("corre")
    this._us.salir();
    this.nav.setRoot(CargandoPage);
    //this.navCtrl.setRoot(TabsPage);
    //this.viewCtrl.dismiss(true)
    
  }

}
