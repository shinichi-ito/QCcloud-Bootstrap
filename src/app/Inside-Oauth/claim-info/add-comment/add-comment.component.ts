import { Component, OnInit } from '@angular/core';
import {InsideMainService} from "../../inside-main.service";

@Component({
  selector: 'app-add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.css']
})
export class AddCommentComponent implements OnInit {
  aa:string='active';
  bb:string='';

  fileupcheck:string='';
  constructor(private insideMainService:InsideMainService) {
    if(this.insideMainService.fileup==false){//ファイルアップロード数が限度を超えていると登録画面に行かないようにしてある
      this.fileupcheck='disabled';
    }else{
      this.fileupcheck='';

    }



  }

  ngOnInit() {
  }
  aaa(){
    this.aa='active';
    this.bb='';


  }
  bbb(){
    this.bb='active';
    this.aa='';

  }
}
