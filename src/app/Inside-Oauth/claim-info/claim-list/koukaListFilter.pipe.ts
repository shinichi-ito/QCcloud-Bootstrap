/**
 * Created by hp on 2017/03/23.
 */
import {Pipe, PipeTransform} from "@angular/core";
import * as _ from "lodash";

@Pipe({
  name: 'koukaFilter'
})
export class KoukaFilterPipe implements PipeTransform {

  transform(array: any[], query: string): any {
    if (query) {
      return _.filter(array, row=>row.naiyou.indexOf(query) > -1||row.aanaiyou.indexOf(query) > -1||
      row.bbnaiyou.indexOf(query) > -1||row.ccnaiyou.indexOf(query) > -1||row.ddnaiyou.indexOf(query) > -1);
    }
    return array;
  }

}
