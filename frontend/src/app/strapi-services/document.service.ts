import { Injectable } from "@angular/core";
import { StrapiService } from "../core/strapi.service";
import { Observable } from "rxjs";

export interface Document {
  name: string;
  doc: {
    url: string,
  }
}

const BASE = "http://localhost:1337"

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  constructor(private strapi: StrapiService) {
  }

  getDocuments(): Observable<Document[]> {
    return this.strapi.getMany<Document>("documents", {"populate": "*"});
  }

  getDocUrl(doc: Document): string {
    return BASE + doc.doc.url;
  }
}
