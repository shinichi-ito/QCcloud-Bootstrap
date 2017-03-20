import {Component, OnInit, ViewChild} from '@angular/core';
import {TaikaiCheckComponent} from "../Dialog/taikai-check/taikai-check.component";
import {OauthInfoService} from "../oauth-info.service";

@Component({
  selector: 'app-taiaki-edit',
  templateUrl: './taiaki-edit.component.html',
  styleUrls: ['./taiaki-edit.component.css']
})
export class TaiakiEditComponent implements OnInit {
  @ViewChild("taikaicheckDialog") taikaiCheckComponent: TaikaiCheckComponent;
  uid:string;
  constructor(private oauthInfoService:OauthInfoService) {

  }

  ngOnInit() {
  }
  taikai(){
    this.uid=this.oauthInfoService.uid;
    this.taikaiCheckComponent.openDialog()
  }
}
