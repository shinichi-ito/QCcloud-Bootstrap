import {Directive, ElementRef, HostListener} from '@angular/core';
import {InsideService} from "../../Inside.service";
import {ImageService} from "./image.service";

@Directive({
  selector: '[appAddImageFile]'
})
export class AddImageFileDirective {

  private element:ElementRef;
  public constructor(private imageService:ImageService,element:ElementRef,private insideService:InsideService) {
    this.element = element;
 }

  @HostListener('change')
  public onChange():any {
    let files = this.element.nativeElement.files;
   // this.insideService.file=files[0]

   this.imageService.addFile(files[0])
  }


}
