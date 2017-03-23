/**
 * Created by hp on 2017/03/23.
 */
import {Pipe, PipeTransform} from "@angular/core";
import * as _ from "lodash";

@Pipe({
  name: 'geninFilter'
})
export class GeninFilterPipe implements PipeTransform {

  transform(array: any[], query: string): any {
    if (query) {
      return _.filter(array, row=>row.naiyou.indexOf(query) > -1);
    }
    return array;
  }

}
