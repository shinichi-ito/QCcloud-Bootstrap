import {Pipe, PipeTransform} from "@angular/core";
import * as _ from "lodash";
/**
 * Created by hp on 2017/02/18.
 */
@Pipe({
  name: 'dataFilter'
})
export class DataFilterPipe implements PipeTransform {

  transform(array: any[], query: string): any {
    if (query) {
      return _.filter(array, row=>row.name.indexOf(query) > -1);
    }
    return array;
  }

}
