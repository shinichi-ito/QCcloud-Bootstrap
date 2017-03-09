import {Component, OnInit, ViewChild, Input} from '@angular/core';
import {ModalDirective} from "ng2-bootstrap";
import {Router} from "@angular/router";
import {InsideService} from "../../Inside.service";

@Component({
  selector: 'app-check-kouka',
  templateUrl: './check-kouka.component.html',
  styleUrls: ['./check-kouka.component.css']
})
export class CheckKoukaComponent implements OnInit {
  @ViewChild("lgModal") modalRef:ModalDirective;//Modalダイアログへの参照
  @Input() koukakakuninTaisaku;//親コンポーネントから受取る属性

  claimkeyJSON:any[]=[];
  constructor(private insideService:InsideService,private router: Router) {}

  ngOnInit() {
  //  console.log(this.koukakakuninTaisaku)
  }
  openDialog() {
    this.modalRef.show();
  }
  onSend(value){
//console.log(value)
    this.claimkeyJSON['key']=value.claimkey;
    this.insideService.claimitem=this.claimkeyJSON;
  //  console.log(this.insideService.claimitem)
   this.router.navigate(['main/topclaim/addtaisaku/listtaisaku'])
  }
}
