import { Component } from '@angular/core';
import {InsideMainService} from "../../inside-main.service";
@Component({
  selector: 'app-add-taiou',
  templateUrl: './add-taiou.component.html',
  styleUrls: ['./add-taiou.component.css']
})
export class AddTaiouComponent  {
  aa:string='active';
  bb:string='';
  cc:string="disabled";
  fileupcheck:string='';
  public constructor(private insideMainService:InsideMainService) {
    if(this.insideMainService.fileup==false){//ファイルアップロード数が限度を超えていると登録画面に行かないようにしてある
      this.fileupcheck='disabled';
    }else{
      this.fileupcheck='';

    }





    this.insideMainService.flagChangeActive$.subscribe(
      flag => {
        this.aa='';
        this.bb='';
        this.cc="active";
      })


  }
aaa(){
  this.aa='active';
  this.bb='';
  this.cc='disabled'

}
  bbb(){
    this.bb='active';
    this.aa='';
    this.cc='disabled'
  }


}
