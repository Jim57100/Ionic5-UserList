import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'userNew'
})
export class UserNewPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
