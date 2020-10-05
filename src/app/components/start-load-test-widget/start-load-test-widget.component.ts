import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import LoadTestConfig from '../../models/LoadTestConfig';

//NgRX
/*import { SwagPaths } from '../../state/swag-paths/swag-paths.model';
import { POPULATE_PATHS } from '../../state/swag-paths/swag-paths.actions';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { ParseError } from '@angular/compiler';
*/

@Component({
  selector: 'app-start-load-test-widget',
  templateUrl: './start-load-test-widget.component.html',
  styleUrls: ['./start-load-test-widget.component.scss'],
})
export default class StartLoadTestWidgetComponent implements OnInit {
  time: number = 0;
  interval;
  running: boolean = false;
  advance: boolean = false;
  indexValue = 0;
  LFC;
  Msg: string = '';
  public MsgShow: boolean = false;

  private Base_Url = 'http://localhost:8083/Docutest';

  AdvanceForm = new FormGroup({
    planName: new FormControl(''),
    loops: new FormControl(''),
    duration: new FormControl(''),
    thread: new FormControl(''),
    rampUp: new FormControl(''),
  });

  constructor(private http: HttpClient) {
    //private store: Store<{swagPaths}>,) {
    //this.swagPaths$ = store.select('swagPaths');
  }

  ngOnInit(): void {}

  startTest() {
    if (this.advance === true) {
      this.LFC = new LoadTestConfig(
        this.AdvanceForm.get('planName').value,
        this.AdvanceForm.get('loops').value,
        this.AdvanceForm.get('duration').value,
        this.AdvanceForm.get('thread').value,
        this.AdvanceForm.get('rampUp').value,
      );
      console.log(this.LFC);
    } else {
      this.LFC = new LoadTestConfig('Default', 123, 123, 123, 123);
      console.log(this.LFC);
    }
    // this.submit(lfc);
    this.startTimer();
    this.running = true;
    this.submit(this.LFC);
  }

  startTimer() {
    if (this.interval == null) {
      this.interval = setInterval(() => {
        this.time += 1;
        if (this.time > 200) {
          this.running = false;
        }
      }, 1000);
    }
  }

  showAdvance() {
    this.advance = !this.advance;
  }

  submit(item: any) {
    /*const formData = new FormData();
    formData.append('file', localStorage.getItem('swagPaths'));

    try{
    this.http.post<any>(`${this.Base_Url}/upload`, formData);
    this.SuccessfulMessage();
  }catch(error){
    console.log(error);
    this.ErrorMessage();
  }*/
  }

  SuccessfulMessage(): void {
    this.Msg = 'Success!!';
    this.MsgShow = true;
    setTimeout(() => {
      this.MsgShow = false;
    }, 3000);
  }

  ErrorMessage(): void {
    this.Msg = 'Error!!';
    this.MsgShow = true;
    setTimeout(() => {
      this.MsgShow = false;
    }, 3000);
  }
}
