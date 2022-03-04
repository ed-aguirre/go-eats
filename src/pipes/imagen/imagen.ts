import { Pipe, PipeTransform } from '@angular/core';
import { URL_IMAGENES } from "../../config/url.service";


@Pipe({
  name: 'imagenPipe',
})
export class ImagenPipe implements PipeTransform {
  transform(codigo: string) {
		return URL_IMAGENES + codigo +".png"; //recibe como parametro el codigo del platillo y hacer el pipe *-*
	}
}
