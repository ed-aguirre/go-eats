//import { HTTP } from '@ionic-native/http'; Este alparecer no e ocupa :'(
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

//import { UsuarioService } from "../usuario/usuario";

import { URL_SERVICIOS } from "../../config/url.service";
import 'rxjs/add/operator/map';



@Injectable()
export class ProductosService {

  private url = URL_SERVICIOS + "Productos/todos"; //llama a los productos del servicio
  private url_lineas = URL_SERVICIOS + "Lineas";
  //private url_por_cate = URL_SERVICIOS + "Productos/por_tipo/";

  productos: any[] = []; //arreglo vacio que recibe los productos
  lineas: any[] = []; //arreglo que recibe los productos por categorias
  por_cate: any[] = []; //arreglo que ordena pos platillos por su categoria
  por_tipo: any[] = []; //arreglo que recibe los productos por su tipo

  tipo_comida: any[] =[]; //arreglo que recibe los platillos segun su tipo
  resultados:any[] = [];

  constructor(public http: HttpClient) {
    this.cargar_todos();
    this.cargar_lineas();
    this.cargar_por_tipo();
  
  }

  buscar_producto( termino:string ){
    let busqueda = URL_SERVICIOS + "Productos/buscar/" + termino;
    
    this.resultados = [];

    this.http.get(busqueda)
    .subscribe((data: any) => {
      console.log(data);
      this.resultados.push(...data.productos);
      console.log(this.resultados);
    }, error => {
      console.log(error);
    });

  }

  cargar_por_categoria(categori: string) {

    this.por_cate = this.productos
      .filter(function (por_categoria){ //aqui no se ocupa el HTTP porque se agarra el array de productos y se filtra por categoria, nose si es mala practica pero funciona
            return por_categoria.linea_id == categori;
              });
        console.log(this.por_cate);
  }

  cargar_tipo_comida( tipo:string ){
      this.tipo_comida = this.productos
            .filter(function (tipo_comida){
                return tipo_comida.por_tipo_id == tipo;
            })
      console.log( this.tipo_comida )
  }

  cargar_lineas() {

    this.http.get(this.url_lineas)
      .subscribe((data: any) => {
        console.log(data);
        this.lineas.push(...data.lineas); //data.lineas : el 'lineas' creo que es la database, hacer pruebass ACT: es el nombre que se le puso en la $respuesta de php
        console.log(this.lineas);
      }, error => {
        console.log(error);
      });

  }

  cargar_por_tipo(){
    let url_por_tipo = this.url_lineas + '/por_tipo';

      this.http.get( url_por_tipo)
          .subscribe(( data:any )=>{
              console.log(data);
              this.por_tipo.push( ...data.por_tipo );
              console.log(this.por_tipo)
              //console.log('%c Hola tengo estilos','color:red; font-weight:bold')
          },error =>{
            console.log('Error ' + error);
          })
  }

  cargar_todos() { 

    this.http.get(this.url)
      .subscribe((data: any) => {
        //(data.Data); supongo que esto es para cuando se tiene una promesa, sino, es inútil

        console.log(data); //muestra la data que recibe del db
        this.productos.push(...data.productos); //con esto lo asigna al arreglo productos

      }, error => {
        console.log(error);
      });

  }

}
