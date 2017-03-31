import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {ModalDirective} from "ng2-bootstrap";
import {AngularFire, FirebaseObjectObservable} from "angularfire2";
import {InsideMainService} from "../../../inside-main.service";
import {ErrorDialogComponent} from "../../error-dialog/error-dialog.component";

@Component({
  selector: 'app-card-edit-check-dialog',
  templateUrl: './card-edit-check-dialog.component.html',
  styleUrls: ['./card-edit-check-dialog.component.css']
})
export class CardEditCheckDialogComponent implements OnInit {
  @ViewChild("lgModal") modalRef:ModalDirective;//Modalダイアログへの参照
  @Input() companyData;//親コンポーネントから受取る属性

  @ViewChild("errorDialog") errorDialogComponent: ErrorDialogComponent;
  errorData:any;
  companyname:string='';
  uid:string='';
  term:number=1;
  cardedit:any;
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




  onEdit(){


    if(this.companyname==''){
      this.companyname=this.companyData.companyname;
      //console.log(this.syubetu)
    }

    if(this.term===1){
      this.term=Number(this.companyData.term);
      //console.log(this.syubetu)
    }

    const Info = {
      companyname:this.companyname,
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
