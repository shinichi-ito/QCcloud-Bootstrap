import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-genin',
  templateUrl: './add-genin.component.html',
  styleUrls: ['./add-genin.component.css']
})
export class AddGeninComponent {
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
