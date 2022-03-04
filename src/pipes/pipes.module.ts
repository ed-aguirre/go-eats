import { NgModule } from '@angular/core';
import { ImagenPipe } from './imagen/imagen';
import { CapitalizarPipe } from './capitalizar/capitalizar';
@NgModule({
	declarations: [ImagenPipe,
    CapitalizarPipe],
	imports: [],
	exports: [ImagenPipe,
    CapitalizarPipe]
})
export class PipesModule {}
