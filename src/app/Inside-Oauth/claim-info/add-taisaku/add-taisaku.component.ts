import { Component } from '@angular/core';
@Component({
  selector: 'app-add-taisaku',
  templateUrl: './add-taisaku.component.html',
  styleUrls: ['./add-taisaku.component.css']
})
export class AddTaisakuComponent  {
  aa:string;
  bb:string;

  public constructor() {
    this.aa='active';
    this.bb='';

  }

  aaa(){
    this.aa='active';
    this.bb=''

  }
  bbb(){
    this.bb='active';
    this.aa=''

  }

}
