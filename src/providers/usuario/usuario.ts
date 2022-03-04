import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { ToastController, LoadingController, Platform } from 'ionic-angular';

import { URL_SERVICIOS } from "../../config/url.service";
import 'rxjs/add/operator/map';
//import { TabsPage } from '../../pages/tabs/tabs';
import { CarroService } from '../carro/carro';


@Injectable()
export class UsuarioService {

  // private httpOptions = {
  //   headers: new HttpHeaders({
  //     'Content-Type': 'application/x-www-form-urlencoded'
  //   })
  // }
  // public token:any;
  // public id:number;

  public user_data: any = {}; //actualizar este con el REFRESH
  public ordenes:any[] = [];
  public planes:any[] = [];


  constructor(
    public http:     HttpClient,        private toastCtrl: ToastController,
    public loadCtrl: LoadingController, public carro:      CarroService,
    public plt:      Platform,          public storage:    Storage) {
    
    console.log('Hello UsuarioService');

  }

  login(Cuenta: any[]): any {
    let loading = this.loadCtrl.create({
      content: 'Cargando...'
    });
    loading.present();

    let url_login = URL_SERVICIOS + "Login";

    let rep = this.http.post(url_login, {
      correo: Cuenta['correo'],
      contra: Cuenta['contra']
      })
      .subscribe(resp => {

        console.log(resp);
        if (resp['error'] == true) {
          let toast = this.toastCtrl.create({
            message: resp['mensaje'],
            duration: 1700
          });
          toast.present();
          //valor = false;

        } else {
          //todo ok
          this.user_data = resp;
          // this.token = resp['token'];
          // this.id = resp['id_usuario']
          //console.log( resp['Token'] +" 2 " )
          this.set_usuario();

        }
        //resolve();
       
      }, err => {
        //error
        console.log(err);

      });
    loading.dismiss();
    return rep;

  }

  registro(Cuenta: any[]): any {
    let url_registro = URL_SERVICIOS + "Login/registrar";

    let httpParams = new HttpParams();
    httpParams.append("correo", Cuenta['correo'])
    httpParams.append("contra", Cuenta['contra']);

    // console.log(Cuenta['correo']);
    // console.log(Cuenta['contra']);

    // aqui quité esto :  const rqp =
    return this.http.post(url_registro, {
      correo:   Cuenta['correo'],
      contra:   Cuenta['contra'],
      nombre:   Cuenta['nombre'],
      ap_P:     Cuenta['ap_P'],
      ap_M:     Cuenta['ap_M'],
      ciudad:   Cuenta['ciudad'],
      colonia:  Cuenta['colonia'],
      calle:    Cuenta['calle'],
      numero:   Cuenta['numero'],
      cp:       Cuenta['cp']
    })
      .subscribe(
        resp => {
          //console.log(resp['Mensaje'])
          //ok, manda la solicitud, ahora verifica si el usurio ya existe en la db
          if (resp['error'] == true) {
            let toast = this.toastCtrl.create({
              message: resp['Mensaje'],
              duration: 1700,
              position: 'top'
            });
            toast.present();
          } else { //todo ok, entonces inicia sesión y manda a la tabspage
            console.log(resp);
            this.login(Cuenta);
          }

        },
        err => {
          //console.log(err.error['Mensaje'] )
          let toast = this.toastCtrl.create({
            message: err.error['Mensaje'],
            duration: 1700,
            position: 'top'
          });
          toast.present();
        });

  }

  salir() {
    this.user_data['token'] = null;
    this.set_usuario();
  }


  set_usuario() { //EL SET TIENE QUE SER ANTES, ES POR ESO QUE SE TIENE DE DAR DOS CLICKS 
    if (this.plt.is('cordova')) {
      //console.log("cel");
      this.storage.ready()
        .then(() => {

          this.storage.set('activo', this.user_data);
        })

    } else {
      //console.log("compu");
      //localStorage.setItem( "pedido", JSON.stringify(this.elementos) )
      if (this.user_data['token']) {
        localStorage.setItem("activo", JSON.stringify(this.user_data))
      } else {
        localStorage.removeItem("activo");
      }
    }
  }

  cargar_usuario() {

    let promesa = new Promise((resolve, reject) => {

      if (this.plt.is('cordova')) {
        console.log('storage listo');

        this.storage.ready()
          .then(() => {
            console.log('storage listo');

            this.storage.get('activo')
              .then(activo => {

                if (activo) {
                  this.user_data = activo;
                }
                resolve();
              })
          })
      } else {
        if (localStorage.getItem('activo')) {
          this.user_data = JSON.parse(localStorage.getItem('activo'));
        }
      }
      resolve();
    })
    return promesa;
  }

  get_ordenes(){
    let loading = this.loadCtrl.create({
      content : 'Cargando...'
    });
    loading.present();

    let url_pedidos = `${URL_SERVICIOS}Pedidos/obt_pedidos/${ this.user_data.token }/${ this.user_data.id_usuario }`;

    this.http.get( url_pedidos )
        .subscribe((data:any)=>{
            console.log(data);
            this.ordenes.push(...data.Ordenes); //el data : 'Ordenes' es el nombre que se le puso en el array que recibe por php
            console.log(this.ordenes)
        },error=>{
          console.log(error)
        });
    loading.dismiss();

  }

  get_planes(){
    let loading = this.loadCtrl.create({
      content: 'Cargando...'
    });
    loading.present();

    let url_plan = `${URL_SERVICIOS}Lineas/planes`;

    this.http.get( url_plan )
        .subscribe((data:any) =>{
          console.log(data);
          this.planes.push(...data.planes);
          console.log(this.planes);
        },error=>{
          console.log(error);
        });
    loading.dismiss();

  }


}
