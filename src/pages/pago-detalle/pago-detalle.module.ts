import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PagoDetallePage } from './pago-detalle';

@NgModule({
  declarations: [
    PagoDetallePage,
  ],
  imports: [
    IonicPageModule.forChild(PagoDetallePage),
  ],
})
export class PagoDetallePageModule {}
