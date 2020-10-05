import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CsvParserService } from '../../services/csv-parser.service';

@Component({
  selector: 'app-temp-file-upload',
  templateUrl: './temp-file-upload.component.html',
  styleUrls: ['./temp-file-upload.component.scss']
})
export class TempFileUploadComponent implements OnInit {
  private baseUrl = 'http://localhost:8083/Docutest';

  public uploadForm: FormGroup;

  public csvParser: CsvParserService;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.uploadForm = this.formBuilder.group({
      csvFile: ['']
    });
  }

  onFileSelect(event): void {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.csvParser.readCsv(file);
      this.uploadForm.get('csvFile').setValue(file);
    }
  }

  logger(): void {
    this.csvParser.readCsv(this.uploadForm.get('csvFile').value);
  }
}
