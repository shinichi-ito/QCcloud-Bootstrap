import {Component, OnInit, ViewChild} from '@angular/core';
import {FirebaseListObservable, AngularFire} from "angularfire2";
import {NewsDialogComponent} from "../../Dialog/edit-dialog/news-dialog/news-dialog.component";
import {ErrorDialogComponent} from "../../Dialog/error-dialog/error-dialog.component";
import {InsideMainService} from "../../inside-main.service";

@Component({
  selector: 'app-company-edit',
  templateUrl: './company-edit.component.html',
  styleUrls: ['./company-edit.component.css']
})
export class CompanyEditComponent implements OnInit {
companyList:any[]=[];
  @ViewChild("companyeditDialog") companyeditDialogComponent: NewsDialogComponent;
  companyData:any;
  @ViewChild("errorDialog") errorDialogComponent: ErrorDialogComponent;
  errorData:any;
  constructor(private insideMainService:InsideMainService,private af : AngularFire) {

    this.insideMainService.flagChangeError$.subscribe(//編集ダイアログのエラーハンドリング
      error => {
        this.errorData=error;
        this.errorDialogComponent.openDialog();


      });



    this.getCompany().subscribe(data=>{
     let companyList:any[]=[];
      for(let key in data){
  console.log(data[key].$key)
        data[key].companyInfo['key']=data[key].$key
        companyList.push(data[key].companyInfo)

       }
     // this.companyList=data;

this.companyList=companyList;

    })

  }

  setEdit(index){
//console.log(index)
    this.companyData=this.companyList[index];
    //console.log(this.newsData.$key)
    this.companyeditDialogComponent.openDialog();
  }



  ngOnInit() {
  }
  getCompany(): FirebaseListObservable<any> {

    return this.af.database.list('/companyData');
  }
}
