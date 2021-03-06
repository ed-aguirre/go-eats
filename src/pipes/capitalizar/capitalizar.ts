import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the CapitalizarPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'capitalizar',
})
export class CapitalizarPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: string, ...args) {

    if(value){
      return value.charAt(0).toUpperCase() + value.slice(1);
    }
    return value;
  }
}
