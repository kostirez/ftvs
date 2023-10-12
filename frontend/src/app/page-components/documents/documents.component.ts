import { Component, OnDestroy, OnInit } from '@angular/core';
import { Document, DocumentService } from "../../strapi-services/document.service";
import { Subscription } from "rxjs";

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.scss']
})
export class DocumentsComponent implements OnDestroy {

  documents: Document[] = [];

  subs: Subscription[] = []

  constructor(private documentService: DocumentService) {
    this.subs.push(
      this.documentService.getDocuments().subscribe(d => {
        this.documents = d;
        console.log("docs", d);
      }));
  }

  ngOnDestroy(): void {
    this.subs.forEach(s => s.unsubscribe());
  }

  startDownload(doc: Document) {
    console.log(doc)
    let link = document.createElement("a");
    link.href = this.documentService.getDocUrl(doc);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

}
