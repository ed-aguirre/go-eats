import { Component } from '@angular/core';

import { BuscarPage } from "../buscar/buscar";
import { CategoriasPage } from "../categorias/categorias";
import { ListPage } from "../list/list";


@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {

  tab1= ListPage;
  tab2= CategoriasPage;
  tab3= BuscarPage ;



}
