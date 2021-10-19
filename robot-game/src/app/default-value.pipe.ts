import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'defaultValue'
})
export class DefaultValuePipe implements PipeTransform {

  transform(value: number, cantidad: number | undefined): number {

    cantidad = value

    if(value)
      return value;
    return 0;
  }

}
