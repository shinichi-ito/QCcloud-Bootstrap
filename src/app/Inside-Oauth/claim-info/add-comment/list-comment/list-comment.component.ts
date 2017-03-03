import {Component, OnInit, ViewChild} from '@angular/core';
import {FirebaseObjectObservable, AngularFire, FirebaseListObservable} from "angularfire2";
import {OauthInfoService} from "../../../oauth-info.service";
import {InsideService} from "../../../Inside.service";
import {CommentDialogComponent} from "../../../Dialog/edit-dialog/comment-dialog/comment-dialog.component";
import * as firebase from 'firebase'
import {CommentDeleteDialogComponent} from "../../../Dialog/delete-dialog/comment-delete-dialog/comment-delete-dialog.component";
import {InsideMainService} from "../../../inside-main.service";
@Component({
  selector: 'app-list-comment',
  templateUrl: './list-comment.component.html',
  styleUrls: ['./list-comment.component.css']
})
export class ListCommentComponent implements OnInit {
  commentList:any[]=[];
  newcommentList:any[]=[];
  index:number;
  commentData;
  uid:string;
  syubetu:string;
  name:string;
  siten:string;
  busyo:string;
  naiyou:string;
  value: FirebaseObjectObservable<any>;
//key:string;
  comments: FirebaseListObservable<any[]>;
  claimList:any[]=[];
  claimitem:any;
  claimInfo: FirebaseObjectObservable<any[]>;
  key:string;
  Data2:any[]=[];
  @ViewChild("editCommentDialog") commentDialogComponent: CommentDialogComponent;
  @ViewChild("deleteCommentDialog") commentDeleteDialogComponent: CommentDeleteDialogComponent;
  constructor(private insideMainService:InsideMainService,private af : AngularFire,private oauthInfoService:OauthInfoService,private insideService:InsideService) {
    this.uid=this.oauthInfoService.uid;
   // this.key=this.insideService.claimitem.key;
    this.claimitem=this.insideService.claimitem;
    this.insideService.flagChangeComment$.subscribe(
      flag => {
        //  console.log('対策');
        this.commentList=[];
        this.newcommentList=[];
        this.commentList=this.insideService.commentList
        for(let key in this.commentList){
          if(this.claimitem.key==this.commentList[key].claimkey){
            this.newcommentList.push(this.commentList[key])
          }
        }

      })
    this.insideService.flagChangeCommentDelete$.subscribe(
      flag => {
        this.key=this.insideMainService.commentkey;
        this.Data2=this.insideMainService.commentData;
        for(let key in this.Data2){
      //      console.log(this.Data2[key])
          if(this.Data2[key].key==this.key){
            this.Data2.splice(Number(key),1);
          }
        }
      //  console.log(this.Data2)
        this.newcommentList=this.Data2;
      })




  }

  ngOnInit() {
    this.commentList=this.insideService.commentList
    for(let key in this.commentList){
      if(this.claimitem.key==this.commentList[key].claimkey){
         this.newcommentList.push(this.commentList[key])
      }
    }


  }

  setEdit(index){
    this.index=index
    this.commentData=this.newcommentList[index];
    this.commentDialogComponent.openDialog();
  }

  Delete(index){
    this.index=index;
    this.commentData=this.newcommentList[index];
    this.insideMainService.commentData=this.newcommentList;//jyoukyoData内にはFileDataの更に対応や対策等に絞り込んだデータが入っている　それを一旦別に保管
    this.commentDeleteDialogComponent.openDialog();
    //  this.deleteTaiou(this.taiouData.key,this.uid)
  }


  // Delete(index){
  //   this.index=index
  //   this.commentData=this.commentList[index];
  //   this.deleteComment(this.commentData.key,this.uid)
  // }
  // deleteComment(key:string,uid:string){
  //   this.comments=this.af.database.list('CommentData/'+this.uid)
  //   this.comments.remove(key)
  //     .then(data=>{
  //       this.commentList=[];
  //       this.newcommentList=[];
  //       this.commentList=this.insideService.commentList
  //       for(let key in this.commentList){
  //         if(this.claimitem.key==this.commentList[key].claimkey){
  //           this.newcommentList.push(this.commentList[key])
  //         }
  //       }
  //       this.minusCommentSu()
  //     })
  //     .catch(error=>{
  //
  //
  //     });
  // }
  // minusCommentSu(){//クレーム情報の対応数をマイナス
  //
  //   this.claimList=this.insideService.claimList
  //   for(let key in this.claimList) {
  //     if (this.claimList[key].key == this.claimitem.key) {
  //        let su:number;
  //       su=this.claimList[key].comment-1
  //       if(su<0){
  //         su=0;
  //       }
  //       const claimInfo = {
  //         comment:su,
  //          updateAt: firebase.database.ServerValue.TIMESTAMP
  //       };
  //       this.claimInfo=this.af.database.object('ClaimData/'+this.uid+'/'+this.claimitem.key)
  //       this.claimInfo.update(claimInfo).then(data=>{
  //
  //       }).catch(error=>{
  //
  //       })
  //     }
  //   }
  // }

}
