import {Component, OnInit, Input, ViewChild} from '@angular/core';
import {ModalDirective} from "ng2-bootstrap";
import {AngularFire, FirebaseObjectObservable} from "angularfire2";
import {Observable} from "rxjs";
import {InsideMainService} from "../../../inside-main.service";

@Component({
  selector: 'app-news-dialog',
  templateUrl: './news-dialog.component.html',
  styleUrls: ['./news-dialog.component.css']
})
export class NewsDialogComponent implements OnInit {
  @ViewChild("lgModal") modalRef:ModalDirective;//Modalダイアログへの参照
  @Input() newsData;//親コンポーネントから受取る属性
  news:string='';
  value: FirebaseObjectObservable<any>;


  constructor(private af : AngularFire,private insideMainService:InsideMainService) {


  }

  openDialog() {
    this.modalRef.show();
  }


  onEdit(){


      if(this.news==''){
        this.news=this.newsData.news;
        //console.log(this.syubetu)
      }

      const Info = {
        news:this.news,

      };
      this.value = this.af.database.object('News/'+this.newsData.$key);
      this.value.update(Info).then(data=>{
       this.modalRef.hide()

      }).catch(error=>{
        this.modalRef.hide();
this.insideMainService.setError(error.message);


      })



  }


  ngOnInit() {
  }

}
