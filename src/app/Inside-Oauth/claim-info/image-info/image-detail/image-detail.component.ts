import {Component, OnInit, Input} from '@angular/core';
import {DomSanitizer} from "@angular/platform-browser";
import {ImageDetail} from "../ImageDetail";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-image-detail',
  templateUrl: './image-detail.component.html',
  styleUrls: ['./image-detail.component.css']
})
export class ImageDetailComponent implements OnInit {
  @Input() file:ImageDetail;
  @Input() fileId:number;
  comment:string='';
  uid:string;
  flag:boolean=true;
  flagOK:boolean=false;
  flagNG:boolean=false;
  downloadURL:string;
  imageAnalysis:any[]=[]
  key:string;
  private subscription:Subscription;
  private _progress: number = 0;




  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit() {
  }
  photoURL() {
    return this.sanitizer.bypassSecurityTrustUrl(this.file.imageUrl);
  }
}
