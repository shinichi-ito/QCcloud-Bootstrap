import {Component, OnInit, ViewChild} from '@angular/core';
import {AngularFire, FirebaseListObservable} from "angularfire2";
import {ErrorDialogComponent} from "../../Dialog/error-dialog/error-dialog.component";
import {CardEditCheckDialogComponent} from "../../Dialog/edit-dialog/card-edit-check-dialog/card-edit-check-dialog.component";

@Component({
  selector: 'app-card-edit-check',
  templateUrl: './card-edit-check.component.html',
  styleUrls: ['./card-edit-check.component.css']
})
export class CardEditCheckComponent implements OnInit {
  @ViewChild("cardEditCheckDialog") cardEditCheckDialogComponent: CardEditCheckDialogComponent;
  companyData:any;
  @ViewChild("errorDialog") errorDialogComponent: ErrorDialogComponent;
  errorData:any;



  companyList:any[]=[];
  constructor(private af : AngularFire) {
    this.getCompany().subscribe(data=>{
      let companyList:any[]=[];
      for(let key in data){
        // console.log(data[key].$key)
        data[key].companyInfo['key']=data[key].$key;
        companyList.push(data[key].companyInfo)

      }
       this.companyList=companyList;

    })

  }
  getCompany(): FirebaseListObservable<any> {

    return this.af.database.list('/companyData');
  }

  ngOnInit() {
  }
  setEdit(index){
//console.log(index)
    this.companyData=this.companyList[index];
    //console.log(this.newsData.$key)
    this.cardEditCheckDialogComponent.openDialog();
  }
}
