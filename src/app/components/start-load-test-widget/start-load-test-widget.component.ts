import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import LoadTestConfig from '../../models/LoadTestConfig';

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
  click: boolean = false;
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

  constructor(private http: HttpClient) {}

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
      if (this.LFC.loops == '') {
        this.LFC.loops = 100;
      }
      if (this.LFC.duration == '') {
        this.LFC.duration = 100;
      }
      if (this.LFC.threads == '') {
        this.LFC.threads = 100;
      }
      if (this.LFC.rampUp == '') {
        this.LFC.rampUp = 100;
      }
      console.log(this.LFC);
    } else {
      this.LFC = new LoadTestConfig('Default', 100, 100, 100, 100);
      console.log(this.LFC);
    }
    this.startTimer();
    this.running = true;
    this.submit(this.LFC);
  }

  startTimer() {
    if (this.interval == null) {
      this.interval = setInterval(() => {
        this.time += 1;
        if (this.time > 200) {
          this.stopTimer();
        }
      }, 1000);
    }
  }

  showAdvance() {
    this.advance = !this.advance;
  }

  submit(item: any) {
    this.SuccessfulMessage();
    this.ErrorMessage();
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

  stopTimer() {
    this.running = false;
  }
}
