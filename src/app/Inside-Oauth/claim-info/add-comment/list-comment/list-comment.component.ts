import {Component, OnInit, ViewChild} from '@angular/core';
import {FirebaseObjectObservable, AngularFire} from "angularfire2";
import {TaiouDialogComponent} from "../../../Dialog/edit-dialog/taiou-dialog/taiou-dialog.component";
import {OauthInfoService} from "../../../oauth-info.service";
import {InsideService} from "../../../Inside.service";
import {CommentDialogComponent} from "../../../Dialog/edit-dialog/comment-dialog/comment-dialog.component";

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
key:string;
  @ViewChild("editCommentDialog") commentDialogComponent: CommentDialogComponent;
  constructor(private af : AngularFire,private oauthInfoService:OauthInfoService,private insideService:InsideService) {
    this.uid=this.oauthInfoService.uid;
    this.key=this.insideService.claimitem.key;
    this.insideService.flagChangeComment$.subscribe(
      flag => {
        //  console.log('対策');
        this.commentList=[];
        this.newcommentList=[];
        this.commentList=this.insideService.commentList
        for(let key in this.commentList){
          if(this.key==this.commentList[key].claimkey){
            this.newcommentList.push(this.commentList[key])
          }
        }

      })
  }

  ngOnInit() {
    this.commentList=this.insideService.commentList
    for(let key in this.commentList){
      if(this.key==this.commentList[key].claimkey){
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
    this.insideService.deleteComment(this.commentData.key,this.uid)
    this.commentList=[];
    this.newcommentList=[];
    this.commentList=this.insideService.commentList
    for(let key in this.commentList){
      if(this.key==this.commentList[key].claimkey){
        this.newcommentList.push(this.commentList[key])
      }
    }

  }
}
