import {Component, OnInit, ViewChild} from '@angular/core';
import {InsideMainService} from "../../inside-main.service";
import {OauthInfoService} from "../../oauth-info.service";
import {ModalDirective} from "ng2-bootstrap";
import {ErrorDialogComponent} from "../error-dialog/error-dialog.component";

@Component({
  selector: 'app-taiou-select',
  templateUrl: './taiou-select.component.html',
  styleUrls: ['./taiou-select.component.css']
})
export class TaiouSelectComponent implements OnInit {
  @ViewChild("lgModal") modalRef:ModalDirective;//Modalダイアログへの参照
  @ViewChild("errorDialog") errorDialogComponent: ErrorDialogComponent;
  errorData:any;
uid:string;
naiyou:string='';
name:string='';
nameB:boolean;
naiyouB:boolean;
  constructor(private insideMainService:InsideMainService,private oauthInfoService:OauthInfoService) {
    this.uid=this.oauthInfoService.uid;
  }

  ngOnInit() {
  }

  openDialog() {
    this.modalRef.show();
  }

  onAdd(){

    if(this.naiyou==='') {
      this.naiyouB = true;
      return
    }else{
      this.naiyouB = false;
      if(this.name==='') {
        this.nameB = true;
        return
      }else{
        this.nameB = false;
             this.insideMainService.addTaiouSelect(this.uid,this.naiyou,this.name).then(data=>{
               this.name='';
               this.naiyou='';
            this.modalRef.hide()
     }).catch(error=>{
               this.modalRef.hide();
               this.errorData=error.message;
               this.errorDialogComponent.openDialog()

     })

      }

    }





  }
}
