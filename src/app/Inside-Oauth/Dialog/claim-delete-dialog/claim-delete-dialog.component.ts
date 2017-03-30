import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {ModalDirective} from "ng2-bootstrap";
import {OauthInfoService} from "../../oauth-info.service";
import {InsideMainService} from "../../inside-main.service";

@Component({
  selector: 'app-claim-delete-dialog',
  templateUrl: './claim-delete-dialog.component.html',
  styleUrls: ['./claim-delete-dialog.component.css']
})
export class ClaimDeleteDialogComponent implements OnInit {
  @ViewChild("lgModal") modalRef:ModalDirective;//Modalダイアログへの参照
  @Input() claimData;//親コンポーネントから受取る属性
  uid:string;
  constructor(private insideMainService:InsideMainService,private oauthInfoService:OauthInfoService) {
    this.uid=this.oauthInfoService.uid;
  }

  ngOnInit() {
  }
  openDialog() {
    this.modalRef.show();
  }

  delete(){
    this.insideMainService.deleteClaim(this.claimData.key,this.uid);
    this.modalRef.hide();




  }
}
