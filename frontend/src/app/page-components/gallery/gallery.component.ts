import { Component, OnInit } from '@angular/core';
import { Observable } from "rxjs";
import { Photo } from "../../strapi-model/img";
import { PhotoService } from "../../strapi-services/photo.service";
import { ImageService } from "../../core/image.service";

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {

  photos$: Observable<Photo[]> | null;

  constructor(
    private photoService: PhotoService,
    private imageService: ImageService,
  ) {
    this.photos$ = this.photoService.getMany();

    this.photos$.subscribe(p => {
      console.log("p", p);
    })
  }

  public getImg(photo: Photo): string {
    if (photo.img) {
      return "url" in photo.img ?
        this.imageService.getImgUrl(photo.img.url) : "";
    }
    return "";
  }

  ngOnInit(): void {
  }

}
