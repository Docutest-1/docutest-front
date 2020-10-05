/* eslint-disable no-console */
/* eslint-disable no-undef */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
})
export default class FileUploadComponent implements OnInit {
  private baseUrl = 'http://localhost:8083/Docutest';

  public uploadForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private http: HttpClient) {}

  ngOnInit(): void {
    this.uploadForm = this.formBuilder.group({
      swaggerFile: [''],
    });
  }

  onFileSelect(event): void {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.uploadForm.get('swaggerFile').setValue(file);
    }
  }

  onSubmit(): void {
    const formData = new FormData();
    formData.append('file', this.uploadForm.get('swaggerFile').value);
    this.http.post<any>(`${this.baseUrl}/upload`, formData).subscribe(
      (res) => console.log(res),
      (err) => console.log(err),
    );
  }
}
