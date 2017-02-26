import {Component, OnInit, ViewChild} from '@angular/core';
import {InsideService} from "../../Inside.service";
import {OauthInfoService} from "../../oauth-info.service";
import {AngularFire} from "angularfire2";
import {Router} from "@angular/router";
import {ErrorDialogComponent} from "../../Dialog/error-dialog/error-dialog.component";

@Component({
  selector: 'app-claim-list',
  templateUrl: './claim-list.component.html',
  styleUrls: ['./claim-list.component.css']
})
export class ClaimListComponent  {

  public data;
  public data2;
  public filterQuery = "";
  public rowsOnPage = 10;
  public sortBy = "email";
  public sortOrder = "asc";
  claimList:any[]=[];

  @ViewChild("errorDialog") errorDialogComponent: ErrorDialogComponent;
  tourObj:string='おはよう'

  constructor(private router: Router,private af : AngularFire,private oauthInfoService:OauthInfoService,private insideService:InsideService) {
  //   console.log(this.oauthInfoService.uid)
  //   console.log(this.oauthInfoService.photoURL)
    // console.log(this.oauthInfoService.displayName)
this.data=this.insideService.claimList
  }



  public toInt(num: string) {
    return +num;
  }

  public sortByWordLength = (a: any) => {
    return a.name.length;
  }


  sendEditClaim(claimitem){
    this.insideService.claimitem=claimitem;
    this.oauthInfoService.onoffHeader=true
  //  console.log(this.insideService.claimitem.name)

    this.router.navigate(['/main/topclaim/topclaimedit'])
    //this.router.navigate(['/main/topclaim/topclaimedit'])


  }

  onDetailClick() {

    this.errorDialogComponent.openDialog();
  }




}
