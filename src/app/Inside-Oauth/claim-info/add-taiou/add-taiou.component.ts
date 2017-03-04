import { Component } from '@angular/core';
@Component({
  selector: 'app-add-taiou',
  templateUrl: './add-taiou.component.html',
  styleUrls: ['./add-taiou.component.css']
})
export class AddTaiouComponent  {
aa:string;
  bb:string;
  cc:string;
  public constructor() {
this.aa='active'
    this.bb=''
    this.cc=''
  }
aaa(){
  this.aa='active'
  this.bb=''
  this.cc=''
}
  bbb(){
    this.bb='active'
    this.aa=''
    this.cc=''
  }
  ccc(){
    this.cc='active'
    this.bb=''
    this.aa=''
  }

}
