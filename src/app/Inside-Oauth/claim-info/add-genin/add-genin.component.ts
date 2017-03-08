import { Component, OnInit } from '@angular/core';
import {InsideMainService} from "../../inside-main.service";

@Component({
  selector: 'app-add-genin',
  templateUrl: './add-genin.component.html',
  styleUrls: ['./add-genin.component.css']
})
export class AddGeninComponent {
  aa:string='active';
  bb:string='';
  cc:string="disabled";

  public constructor(private insideMainService:InsideMainService) {
    this.insideMainService.flagChangeActive$.subscribe(
      flag => {
        console.log('ここ')
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
