import {Component, OnInit, Input} from '@angular/core';
import {InsideMainService} from "../../inside-main.service";
import {OauthInfoService} from "../../oauth-info.service";

@Component({
  selector: 'app-nav-sabu',
  templateUrl: './nav-sabu.component.html',
  styleUrls: ['./nav-sabu.component.css']
})
export class NavSabuComponent implements OnInit {
  @Input() loginCheck;//親コンポーネントから受取る属性
  OnOff:string="";
  OnOff2:boolean=false;
  email:string;
  constructor(private oauthInfoService:OauthInfoService,private insideMainService:InsideMainService) {
    this.email=this.oauthInfoService.emailMain;
    if(this.email=='shinichi-ito@lotsjoys.com'){
      this.OnOff2=true;
    }else{
      this.OnOff2=false;
    }
// if(this.insideMainService.login == false){
//  // console.log('ここ')
//  this.OnOff="disabled";
// }else{
//   this.OnOff="";
//
// }



  }

  ngOnInit() {
  }

}
