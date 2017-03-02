import {Component, OnInit, ViewChild} from '@angular/core';
import {FirebaseObjectObservable, AngularFire, FirebaseListObservable} from "angularfire2";
import {OauthInfoService} from "../../../oauth-info.service";
import {InsideService} from "../../../Inside.service";
import {CommentDialogComponent} from "../../../Dialog/edit-dialog/comment-dialog/comment-dialog.component";
import * as firebase from 'firebase'
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
  @ViewChild("editCommentDialog") commentDialogComponent: CommentDialogComponent;
  constructor(private af : AngularFire,private oauthInfoService:OauthInfoService,private insideService:InsideService) {
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
    this.index=index
    this.commentData=this.commentList[index];
    this.deleteComment(this.commentData.key,this.uid)
  }
  deleteComment(key:string,uid:string){
    this.comments=this.af.database.list('CommentData/'+this.uid)
    this.comments.remove(key)
      .then(data=>{
        this.commentList=[];
        this.newcommentList=[];
        this.commentList=this.insideService.commentList
        for(let key in this.commentList){
          if(this.claimitem.key==this.commentList[key].claimkey){
            this.newcommentList.push(this.commentList[key])
          }
        }
        this.minusCommentSu()
      })
      .catch(error=>{


      });
  }
  minusCommentSu(){//クレーム情報の対応数をマイナス

    this.claimList=this.insideService.claimList
    for(let key in this.claimList) {
      if (this.claimList[key].key == this.claimitem.key) {
         let su:number;
        su=this.claimList[key].comment-1
        if(su<0){
          su=0;
        }
        const claimInfo = {
          comment:su,
           updateAt: firebase.database.ServerValue.TIMESTAMP
        };
        this.claimInfo=this.af.database.object('ClaimData/'+this.uid+'/'+this.claimitem.key)
        this.claimInfo.update(claimInfo).then(data=>{

        }).catch(error=>{

        })
      }
    }
  }

}
