import {Component, OnInit, ViewChild} from '@angular/core';
import {FirebaseListObservable, AngularFire} from "angularfire2";
import * as firebase from 'firebase'
import {ProgressDialogComponent} from "../../Dialog/progress-dialog/progress-dialog.component";
import {ErrorDialogComponent} from "../../Dialog/error-dialog/error-dialog.component";
import {NewsDialogComponent} from "../../Dialog/edit-dialog/news-dialog/news-dialog.component";
import {InsideMainService} from "../../inside-main.service";
@Component({
  selector: 'app-news-line',
  templateUrl: './news-line.component.html',
  styleUrls: ['./news-line.component.css']
})
export class NewsLineComponent implements OnInit {
  @ViewChild("progrssDialog") progressDialogComponent: ProgressDialogComponent;
  Data:string='お待ちください';
  @ViewChild("errorDialog") errorDialogComponent: ErrorDialogComponent;
  errorData:any;
  @ViewChild("newsDialog") newsDialogComponent: NewsDialogComponent;
newsData:any;
  Info: FirebaseListObservable<any[]>;
  news:string;
  newsList:any[]=[];
  newsInfo: FirebaseListObservable<any[]>;
  constructor(private insideMainService:InsideMainService,private af : AngularFire) {
    this.insideMainService.flagChangeError$.subscribe(//編集ダイアログのエラーハンドリング
      error => {
        this.errorData=error;
        this.errorDialogComponent.openDialog();


      });
    this.getNews().subscribe(data=>{

      this.newsList=data;


    })
  }

  ngOnInit() {
  }
  onAdd(){
    this.progressDialogComponent.openDialog();
    const Info = {
      news:this.news,
      startAt: firebase.database.ServerValue.TIMESTAMP,
      //   updateAt: firebase.database.ServerValue.TIMESTAMP
    };
    this.Info=this.af.database.list('News');
    this.Info.push(Info).then(data=>{
      this.progressDialogComponent.closeDialog();

    }).catch(error=>{
      this.errorData=error.message;
      this.errorDialogComponent.openDialog();
    })
  }
  setEdit(index){
//console.log(index)
    this.newsData=this.newsList[index];
     //console.log(this.newsData.$key)
    this.newsDialogComponent.openDialog();
  }

  getNews(): FirebaseListObservable<any> {//お知らせを取得

    return this.af.database.list('/News');
  }

  Delete(index){
    this.deleteNews(this.newsList[index].key)
  }
  deleteNews(key:string){
    this.progressDialogComponent.openDialog();
    this.newsInfo=this.af.database.list('News');
    this.newsInfo.remove(key)
      .then(data=>{
        this.progressDialogComponent.closeDialog();
      })
      .catch(error=>{
        this.errorData=error.message;
        this.errorDialogComponent.openDialog();

      });
  }
}
