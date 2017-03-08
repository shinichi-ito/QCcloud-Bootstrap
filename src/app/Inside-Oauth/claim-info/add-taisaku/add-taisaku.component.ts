import { Component } from '@angular/core';
import {InsideMainService} from "../../inside-main.service";
@Component({
  selector: 'app-add-taisaku',
  templateUrl: './add-taisaku.component.html',
  styleUrls: ['./add-taisaku.component.css']
})
export class AddTaisakuComponent  {
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
