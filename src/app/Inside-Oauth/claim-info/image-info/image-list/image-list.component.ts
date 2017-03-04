import { Component, OnInit } from '@angular/core';
import {ImageDetail} from "../ImageDetail";
import {ImageService} from "../image.service";

@Component({
  selector: 'app-image-list',
  templateUrl: './image-list.component.html',
  styleUrls: ['./image-list.component.css']
})
export class ImageListComponent implements OnInit {

  imagedetail: ImageDetail[];

  constructor(private imageService: ImageService) {
   // this.imagedetail = this.imageService.imagedetail
    this.imageService.setFile()
  }

  ngOnInit() {
    this.imageService.flagChange$.subscribe(
      (imagedetail: ImageDetail[]) => {
        console.log("fileに変更合った");
        this.imagedetail = imagedetail
      })

  }
}
