import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { HttpClientModule } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage';

import { MyApp } from './app.component';
import { PerfilPage } from '../pages/perfil/perfil';
import { ListPage } from '../pages/list/list';
import { InicioPage } from '../pages/inicio/inicio';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { RegistroPage } from '../pages/registro/registro';
import { PreviewPage } from '../pages/preview/preview';
import { CarritoPage } from '../pages/carrito/carrito';
import { CategoriasPage } from '../pages/categorias/categorias';
import { PlatilloPage } from '../pages/platillo/platillo';
import { PorCategoriaPage } from '../pages/por-categoria/por-categoria';
import { TabsPage } from '../pages/tabs/tabs';
import { BuscarPage } from "../pages/buscar/buscar";
import { CargandoPage } from '../pages/cargando/cargando';
import { HistorialPage } from "../pages/historial/historial";
import { PortipoPage } from '../pages/portipo/portipo';
import { PagoPage } from '../pages/pago/pago';
import { PlanesPage } from '../pages/planes/planes';
import { PorHistorialPage } from '../pages/por-historial/por-historial';
import { PagoDetallePage } from '../pages/pago-detalle/pago-detalle';


import { ReactiveFormsModule } from '@angular/forms';
//import { HttpModule } from '@angular/http';
import { HTTP } from '@ionic-native/http';

import { UsuarioService2 } from "../pages/services/usuario.service";
import { CarroService } from '../providers/carro/carro';
import { ProductosService } from '../providers/productos/productos';
import { UsuarioService } from '../providers/usuario/usuario';

//Pipes
import {PipesModule } from "../pipes/pipes.module";



@NgModule({
  declarations: [
    MyApp,
    PerfilPage,
    ListPage,
    InicioPage,
    RegistroPage,
    PreviewPage,
    CarritoPage,
    CategoriasPage,
    PlatilloPage,
    PorCategoriaPage,
    TabsPage,
    BuscarPage,
    CargandoPage,
    PortipoPage,
    PagoPage,
    HistorialPage,
    PlanesPage,
    PorHistorialPage,
    PagoDetallePage

  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp,{
      backButtonText: 'Atrás',
      // pageTransition: 'ios-transition',
      //modalLeave: 'modal-slide-left',
      tabsHighlight: 'true'
    }),
    ReactiveFormsModule,
    HttpClientModule,
    PipesModule,
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    PerfilPage,
    ListPage,
    InicioPage,
    RegistroPage,
    PreviewPage,
    CarritoPage,
    CategoriasPage,
    PlatilloPage,
    PorCategoriaPage,
    TabsPage,
    BuscarPage,
    CargandoPage,
    PortipoPage,
    PagoPage,
    HistorialPage,
    PlanesPage,
    PorHistorialPage,
    PagoDetallePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    CarroService,
    ProductosService,
    UsuarioService2,
    HTTP,
    UsuarioService
  ]
})
export class AppModule {}
