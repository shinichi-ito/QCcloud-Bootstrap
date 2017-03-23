import {Component, OnInit, ViewChild} from '@angular/core';
import {FirebaseListObservable, AngularFire} from "angularfire2";
import {ErrorDialogComponent} from "../../Dialog/error-dialog/error-dialog.component";
import {InsideMainService} from "../../inside-main.service";
import {CompanyEditDialogComponent} from "../../Dialog/edit-dialog/company-edit-dialog/company-edit-dialog.component";

@Component({
  selector: 'app-company-edit',
  templateUrl: './company-edit.component.html',
  styleUrls: ['./company-edit.component.css']
})
export class CompanyEditComponent implements OnInit {
companyList:any[]=[];
  @ViewChild("companyeditDialog") companyeditDialogComponent: CompanyEditDialogComponent;
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
 // console.log(data[key].$key)
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



  Download(){
    let companyList:any[]=[];
    this.getCompany().subscribe(data=>{
      for(let key in data){
      if(data[key].companyInfo.label=='スタンダード'){
          data[key].companyInfo['plice']=15000;
       }else if(data[key].companyInfo.label=='プレミアム'){
          data[key].companyInfo['plice']=25000;

       }else if(data[key].companyInfo.label=='エキスパート'){
          data[key].companyInfo['plice']=35000;

       }
    data[key].companyInfo['uid']=data[key].$key;
        data[key].companyInfo['term']=data[key].companyInfo.term;

        delete data[key].companyInfo['companyname'];
        delete data[key].companyInfo['daihyouname'];
        delete data[key].companyInfo['email'];
        delete data[key].companyInfo['employee'];
        delete data[key].companyInfo['occupation'];
        delete data[key].companyInfo['planUp'];
        delete data[key].companyInfo['privacypolicy'];
        delete data[key].companyInfo['riyoukiyaku'];
        delete data[key].companyInfo['startAt'];
        delete data[key].companyInfo['tantouname'];
        delete data[key].companyInfo['tel'];
        delete data[key].companyInfo['updateAt'];
      delete data[key].companyInfo['address'];
        delete data[key].companyInfo['label'];
        companyList.push(data[key].companyInfo)

      }
      });

   this.insideMainService.download(companyList)



  }
}
