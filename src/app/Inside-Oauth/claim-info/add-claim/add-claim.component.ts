import { Component } from '@angular/core';
import {InsideService} from "../../Inside.service";
import {OauthInfoService} from "../../oauth-info.service";


@Component({
  selector: 'app-add-claim',
  templateUrl: './add-claim.component.html',
  styleUrls: ['./add-claim.component.css']
})
export class AddClaimComponent  {
  public mytime: Date = new Date();
  public dt: Date = new Date();
  public minDate: Date = void 0;
  public events: any[];
  public tomorrow: Date;
  public afterTomorrow: Date;
  public dateDisabled: {date: Date, mode: string}[];
  private opened: boolean = false;
  syubetus:any[]=[];
  syubetu:string;

  public constructor(private oauthInfoService:OauthInfoService,private insideService:InsideService) {

     this.syubetus=this.oauthInfoService.syubetu;
     console.log(this.syubetus);

    (this.tomorrow = new Date()).setDate(this.tomorrow.getDate() + 1);
    (this.afterTomorrow = new Date()).setDate(this.tomorrow.getDate() + 2);
    (this.minDate = new Date()).setDate(this.minDate.getDate() - 1000);
    (this.dateDisabled = []);
    this.events = [
      {date: this.tomorrow, status: 'full'},
      {date: this.afterTomorrow, status: 'partially'}
    ];


  }








//以下カレンダー関連のメソッド
  public getDate(): number {
    return this.dt && this.dt.getTime() || new Date().getTime();
  }
  public open(): void {
    this.opened = !this.opened;
  }

}
