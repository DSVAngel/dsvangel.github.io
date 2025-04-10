import { Component } from "@angular/core";
import { certificates } from "../models/certificates/certificates.model";
import { CertificatesService } from "../services/certificates-service/certificates.service";
import { map } from "rxjs/operators";

@Component({
  selector: "app-certificates",
  templateUrl: "./certificates.component.html",
  styleUrl: "./certificates.component.css",
})
export class CertificatesComponent {
  certificates: certificates[] = [];
  constructor(public certificatesService: CertificatesService) {
    console.log(this.certificatesService);
    this.certificatesService
      .getCertificates()
      .snapshotChanges()
      .pipe(
        map((changes) =>
          changes.map((c) => ({
            id: c.payload.doc.id,
            ...c.payload.doc.data(),
          }))
        )
      ).subscribe((data) => {
        this.certificates = data;
        console.log(this.certificates);
      });
  }
}
