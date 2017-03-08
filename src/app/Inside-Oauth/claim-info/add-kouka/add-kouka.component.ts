import { Component } from '@angular/core';
import {InsideMainService} from "../../inside-main.service";

@Component({
  selector: 'app-add-kouka',
  templateUrl: './add-kouka.component.html',
  styleUrls: ['./add-kouka.component.css']
})
export class AddKoukaComponent  {
  aa:string='active';
  bb:string='';
  cc:string="disabled";
  public constructor(private insideMainService:InsideMainService) {
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
