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
  index:number;
  commentData;
  uid:string;
  syubetu:string;
  name:string;
  siten:string;
  busyo:string;
  naiyou:string;
  value: FirebaseObjectObservable<any>;

  @ViewChild("editCommentDialog") commentDialogComponent: CommentDialogComponent;
  constructor(private af : AngularFire,private oauthInfoService:OauthInfoService,private insideService:InsideService) {
    this.uid=this.oauthInfoService.uid;
  }

  ngOnInit() {
    this.commentList=this.insideService.commentList
  }

  setEdit(index){
    this.index=index
    this.commentData=this.commentList[index];
    this.commentDialogComponent.openDialog();
  }

  Delete(index){
    this.index=index
    this.commentData=this.commentList[index];
    this.insideService.deleteComment(this.commentData.key,this.uid)
  }
}
