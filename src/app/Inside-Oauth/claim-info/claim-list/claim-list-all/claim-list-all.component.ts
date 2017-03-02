import {Component, OnInit, ViewChild} from '@angular/core';
import {ErrorDialogComponent} from "../../../Dialog/error-dialog/error-dialog.component";
import {Router} from "@angular/router";
import {AngularFire} from "angularfire2";
import {OauthInfoService} from "../../../oauth-info.service";
import {InsideService} from "../../../Inside.service";
import {ProgressDialogComponent} from "../../../Dialog/progress-dialog/progress-dialog.component";

@Component({
  selector: 'app-claim-list-all',
  templateUrl: './claim-list-all.component.html',
  styleUrls: ['./claim-list-all.component.css']
})
export class ClaimListAllComponent  {

  public data;
  public data2;
  public filterQuery = "";
  public rowsOnPage = 10;
  public sortBy = "email";
  public sortOrder = "asc";


  @ViewChild("errorDialog") errorDialogComponent: ErrorDialogComponent;
  errorData:string='エラー内容'
  @ViewChild("progrssDialog") progressDialogComponent: ProgressDialogComponent;
  Data:string='プログレス内容'
  constructor(private router: Router,private af : AngularFire,private oauthInfoService:OauthInfoService,private insideService:InsideService) {
      this.data=this.insideService.claimList
 }



  public toInt(num: string) {
    return +num;
  }

  public sortByWordLength = (a: any) => {
    return a.name.length;
  }
  Error(){
    this.errorDialogComponent.openDialog();
  }
  Progress(){
    this.progressDialogComponent.openDialog();
  }
  sendEditClaim(claimitem){
    this.insideService.claimitem=claimitem;
  //  console.log(claimitem)
    this.oauthInfoService.onoffHeader=false;
    this.router.navigate(['/main/topclaim/topclaimedit'])
   }

  onDetailClick() {

    this.errorDialogComponent.openDialog();
  }




}
