import { Component } from '@angular/core';
@Component({
  selector: 'app-add-taiou',
  templateUrl: './add-taiou.component.html',
  styleUrls: ['./add-taiou.component.css']
})
export class AddTaiouComponent  {
aa:string;
  bb:string;

  public constructor() {
this.aa='active';
    this.bb=''
  }
aaa(){
  this.aa='active';
  this.bb=''

}
  bbb(){
    this.bb='active';
    this.aa='';
  }


}
