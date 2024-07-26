import { Injectable } from '@angular/core';
import { TDocumentDefinitions } from 'pdfmake/interfaces';


type PDFMake = typeof import('pdfmake/build/pdfmake')
@Injectable({
  providedIn: 'root'
})
export class PdfService {

  constructor() { }

  private pdfMake: PDFMake;
    private fonts: { [file: string]: string };

    async loadPDFMaker() {
        if (!this.pdfMake) {
            this.pdfMake = await import('pdfmake/build/pdfmake');
            this.fonts = (await import('pdfmake/build/vfs_fonts')).pdfMake.vfs;
        }
    }

    async open(def: TDocumentDefinitions) {
        if(!this.pdfMake) {
            try {
                await this.loadPDFMaker()
            } catch (error) {
                console.error("Failed to load pdf maker lib");
            }
        }
        this.pdfMake.createPdf(def, null, null, this.fonts).open();
    }
}
