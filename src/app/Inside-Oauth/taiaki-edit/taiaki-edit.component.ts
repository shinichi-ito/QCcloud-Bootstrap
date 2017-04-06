import {Component, OnInit, ViewChild} from '@angular/core';
import {TaikaiCheckComponent} from "../Dialog/taikai-check/taikai-check.component";
import {OauthInfoService} from "../oauth-info.service";
import {InsideMainService} from "../inside-main.service";
import {CompanyInfoService} from "../company-info/company-info.service";

@Component({
  selector: 'app-taiaki-edit',
  templateUrl: './taiaki-edit.component.html',
  styleUrls: ['./taiaki-edit.component.css']
})
export class TaiakiEditComponent implements OnInit {
  @ViewChild("taikaicheckDialog") taikaiCheckComponent: TaikaiCheckComponent;
  uid:string;
  customerID:string;

  urlData:string;
  constructor(private oauthInfoService:OauthInfoService,private insideMainService:InsideMainService,private companyInfoService:CompanyInfoService) {
    this.uid=this.oauthInfoService.uid;
    this.insideMainService.getCompanyInfo(this.uid).subscribe((data)=>{
        for(let key in data){


          if(data[key].$key=='customerID'){
            //   console.log(data[key].$value)
            this.customerID=data[key].$value;
          }

        }//forを抜けた
      },
      (error)=>{

      })

  }

  ngOnInit() {
  }
  taikai(){
   this.PayJP();
    this.taikaiCheckComponent.openDialog()
  }

  PayJP(){

    let url=this.insideMainService.url4;

    let URL=url+'uid='+this.uid+'&customerID='+this.customerID;

    this.urlData=URL;

  }


}
