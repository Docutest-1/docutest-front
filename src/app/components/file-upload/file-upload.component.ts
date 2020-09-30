import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit {
  private Base_Url = "http://localhost:8080/";
  public uploadForm: FormGroup;
  private formData = new FormData();

  constructor(private formBuilder: FormBuilder, private http: HttpClient) { }

  ngOnInit(): void {
    this.uploadForm = this.formBuilder.group({
      swaggerFile: ['']
    });
  }

  onFileSelect(event) {
    if (event.target.files.length > 0) {
      let file = event.target.files[0];
      this.uploadForm.get('swaggerFile').setValue(file);
    }
  }

  onSubmit() {
    this.formData.append('file', this.uploadForm.get('swaggerFile').value);
    try {
      let results = this.http.post<any>(this.Base_Url + 'upload',
        {
          file: this.formData,
        }
      );
    } catch (error) {
      console.log(error);
      alert('Failed to upload');
    }
  }
}