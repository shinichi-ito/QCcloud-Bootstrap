import { Pipe, PipeTransform } from '@angular/core';

@Pipe(
  {name: 'orderby'}
  )
export class OrderbyPipe implements PipeTransform {
  transform(array:any, key:string): any {
    array.sort((a: any, b: any) => {
      if (a[key] > b[key]) {
        return -1;
      } else if (a[key] < b[key]) {
        return 1;
      } else {
        return 0;
      }
    });
    return array;
  }
}
