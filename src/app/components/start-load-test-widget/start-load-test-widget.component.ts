import { Component, OnInit } from '@angular/core';
import loadTestConfig from '../../models/loadTestConfig'
import { FormGroup, FormControl } from '@angular/forms'
/*import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatStepperModule } from '@angular/material/stepper';
import { MatInputModule } from '@angular/material/input';*/

import { HttpClient } from '@angular/common/http';
/*import { GraphRoute } from '../../state/graph-route/graph-route.model';
import { UPDATE_ROUTE } from '../../state/graph-route/graph-route.actions';
import { Store } from '@ngrx/store';*/

@Component({
  selector: 'app-start-load-test-widget',
  templateUrl: './start-load-test-widget.component.html',
  styleUrls: ['./start-load-test-widget.component.scss']
})
export class StartLoadTestWidgetComponent implements OnInit {
  time: number = 0;
  interval;
  running: boolean = false;
  advance: boolean = false;
  indexValue: number = 0;
  private Base_Url = "http://localhost:8083/Docutest";

  AdvanceForm = new FormGroup({
    planName: new FormControl(''),
    loops: new FormControl(''),
    duration: new FormControl(''),
    thread: new FormControl(''),
    rampUp: new FormControl('')
  });

  constructor(private http: HttpClient) { }

  ngOnInit(): void { }

  startTest() {
    var lfc;
    if (this.advance == true) {
      lfc = new loadTestConfig(
        this.AdvanceForm.get('planName').value,
        this.AdvanceForm.get('loops').value,
        this.AdvanceForm.get('duration').value,
        this.AdvanceForm.get('thread').value,
        this.AdvanceForm.get('rampUp').value,
      );
      console.log(lfc);
    } else {
      lfc = new loadTestConfig("Default", 123, 123, 123, 123);
      console.log(lfc)
    }
    //this.submit(lfc);
    this.startTimer();
    this.running = true;
  }

  startTimer() {
    if (this.interval == null) {
      this.interval = setInterval(() => {
        this.time++;
        if (this.time > 200) {
          this.running = false;
        }
      }, 1000)
    }
  }

  showAdvance() {
    this.advance = !this.advance;
  }

  submit(item: any) {
    const formData = new FormData();
    formData.append('file', sessionStorage.getItem('file'));
    this.http.post<any>(this.Base_Url + '/upload', formData).subscribe(
      (res) => console.log(res),
      (err) => console.log(err));
  }
}
