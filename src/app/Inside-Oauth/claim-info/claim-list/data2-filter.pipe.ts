/**
 * Created by hp on 2017/03/21.
 */
import {Pipe, PipeTransform} from "@angular/core";
import * as _ from "lodash";

@Pipe({
  name: 'data2Filter'
})
export class Data2FilterPipe implements PipeTransform {

  transform(array: any[], query: string): any {
    if (query) {
      return _.filter(array, row=>row.syousai.indexOf(query) > -1||row.syubetu.indexOf(query) > -1||row.seihin.indexOf(query) > -1||row.name.indexOf(query) > -1);
    }
    return array;
  }

}
