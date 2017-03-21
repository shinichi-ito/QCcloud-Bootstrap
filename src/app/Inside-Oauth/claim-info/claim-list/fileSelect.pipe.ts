/**
 * Created by hp on 2017/03/21.
 */
import {Pipe, PipeTransform} from "@angular/core";
import * as _ from "lodash";

@Pipe({
  name: 'fileSelectFilter'
})
export class FileSelectFilterPipe implements PipeTransform {

  transform(array: any[], query: string): any {
    if (query) {
      return _.filter(array, row=>row.comment.indexOf(query) > -1);
    }
    return array;
  }

}
