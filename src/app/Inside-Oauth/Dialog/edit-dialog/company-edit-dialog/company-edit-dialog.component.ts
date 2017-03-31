import {Component, OnInit, ViewChild, Input} from '@angular/core';
import {ModalDirective} from "ng2-bootstrap";
import {FirebaseObjectObservable, AngularFire} from "angularfire2";
import {InsideMainService} from "../../../inside-main.service";
import * as firebase from 'firebase'
import {ErrorDialogComponent} from "../../error-dialog/error-dialog.component";
@Component({
  selector: 'app-company-edit-dialog',
  templateUrl: './company-edit-dialog.component.html',
  styleUrls: ['./company-edit-dialog.component.css']
})
export class CompanyEditDialogComponent implements OnInit {
  @ViewChild("lgModal") modalRef:ModalDirective;//Modalダイアログへの参照
  @Input() companyData;//親コンポーネントから受取る属性

  @ViewChild("errorDialog") errorDialogComponent: ErrorDialogComponent;
  errorData:any;
  companyname:string='';
  label:string='';
  term:number=1;
  value: FirebaseObjectObservable<any>;

  constructor(private insideMainService:InsideMainService,private af : AngularFire) {
    this.insideMainService.flagChangeError$.subscribe((error)=>{
      //   console.log(error)
      this.modalRef.hide();
      this.errorData=error;
      this.errorDialogComponent.openDialog()

    })





  }

  ngOnInit() {
  }
  openDialog() {
    this.modalRef.show();
  }
  closeDialog() {
    this.modalRef.hide();
  }
  onEditStartAt(){
    const Info = {
      startAt: firebase.database.ServerValue.TIMESTAMP,
    };
    this.value = this.af.database.object('companyData/'+this.companyData.key+'/companyInfo');
    this.value.update(Info).then(data=>{
      this.modalRef.hide()

    }).catch(error=>{
      this.modalRef.hide();
      this.insideMainService.setError(error.message);


    })


  }


  onEdit(){


    if(this.companyname==''){
      this.companyname=this.companyData.companyname;
      //console.log(this.syubetu)
    }
    if(this.label==''){
      this.label=this.companyData.label;
      //console.log(this.syubetu)
    }
    if(this.term===1){
      this.term=Number(this.companyData.term);
      //console.log(this.syubetu)
    }

    const Info = {
      companyname:this.companyname,
     label:this.label,
      term:Number(this.term)
    };
    this.value = this.af.database.object('companyData/'+this.companyData.key+'/companyInfo');
     this.value.update(Info).then(data=>{
       this.modalRef.hide()

     }).catch(error=>{
      this.modalRef.hide();
       this.insideMainService.setError(error.message);


     })



  }


}
