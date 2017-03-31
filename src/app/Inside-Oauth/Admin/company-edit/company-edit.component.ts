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
        this.companyeditDialogComponent.closeDialog();
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
  //  let companyList:any[]=[];

    let newcompanyList2:any[]=[];
    this.getCompany().subscribe(data=>{
      for(let key in data){
        let newcompanyList:any[]=[];

        if(data[key].companyInfo['term']=='1') {

          if(data[key].$key=='PbuebiUmDZQzeDpaqhTlH0DfzZk1'){
          //  console.log('管理者用')
          }else{
            newcompanyList.push(data[key].$key);
            newcompanyList.push('空白');
            newcompanyList.push('空白');
            newcompanyList2.push(newcompanyList)

          }

        }
     }
     });

  // this.insideMainService.download(companyList)
   this.insideMainService.download(newcompanyList2)


  }


  Download2(){
  //  let companyList:any[]=[];
    let newcompanyList2:any[]=[];
    let renban:string;
    this.getCompany().subscribe(data=>{
      for(let key in data){
        let newcompanyList:any[]=[];
        let count=0;

        if(data[key].companyInfo['term']=='1'){

          if(data[key].$key=='PbuebiUmDZQzeDpaqhTlH0DfzZk1'){
              console.log('管理者用')
         }else {
count++;
if(String(count).length===1){
  //console.log(('0000' + count).slice(-5)); // 005
  renban=('0000' + count).slice(-5);
}else if(String(count).length===2){
  //console.log(('000' + count).slice(-5)); // 005
  renban=('000' + count).slice(-5);
}else if(String(count).length===3){
  //console.log(('00' + count).slice(-5)); // 005
  renban=('00' + count).slice(-5);
}else if(String(count).length===4){
  //console.log(('0' + count).slice(-5)); // 005
  renban=('0' + count).slice(-5)
}else if(String(count).length===5){
 // console.log((count)); // 005
  renban=String(count);
}else{
  console.log('6桁になった!!!!')

}

             let date = this.formatDate(new Date(), 'YYYYMMDD');
             newcompanyList.push(this.insideMainService.shopID);
             newcompanyList.push(data[key].$key);
             newcompanyList.push('空白');
             newcompanyList.push('0');
             newcompanyList.push(String(date));
             newcompanyList.push(data[key].companyInfo.OrderID);
             newcompanyList.push('空白');
             newcompanyList.push(String(data[key].companyInfo.price));
             newcompanyList.push('空白');
             newcompanyList.push('1');
             newcompanyList.push('空白');
             newcompanyList.push('空白');
             newcompanyList.push('空白');
            newcompanyList.push(renban);
            newcompanyList.push('空白');
            newcompanyList.push('空白');
            newcompanyList.push('空白');
            newcompanyList.push('空白');
            newcompanyList.push('空白');

            newcompanyList2.push(newcompanyList)




          }


        }






//console.log(data[key].companyInfo)

       // companyList.push(data[key].companyInfo)

      }
    });

    this.insideMainService.download2(newcompanyList2)



  }

//指定の日付フォーマットで表示
  formatDate(date, format) {//console.log(this.formatDate(new Date(),'YYYYMMDDhhmmss'));表示は20170324094029
    if (!format) format = 'YYYY-MM-DD hh:mm:ss.SSS';
    format = format.replace(/YYYY/g, date.getFullYear());
    format = format.replace(/MM/g, ('0' + (date.getMonth() + 1)).slice(-2));
    format = format.replace(/DD/g, ('0' + date.getDate()).slice(-2));
    format = format.replace(/hh/g, ('0' + date.getHours()).slice(-2));
    format = format.replace(/mm/g, ('0' + date.getMinutes()).slice(-2));
    format = format.replace(/ss/g, ('0' + date.getSeconds()).slice(-2));
    if (format.match(/S/g)) {
      var milliSeconds = ('00' + date.getMilliseconds()).slice(-3);
      var length = format.match(/S/g).length;
      for (var i = 0; i < length; i++) format = format.replace(/S/, milliSeconds.substring(i, i + 1));
    }
    return format;
  };



}
