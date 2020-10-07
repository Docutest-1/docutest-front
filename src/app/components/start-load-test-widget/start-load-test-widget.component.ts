import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { LoadTestConfig } from 'src/app/models/loadTestConfig';

// NgRX
/* import { SwagPaths } from '../../state/swag-paths/swag-paths.model';
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
  time = 0;

  interval;

  running = false;

  advance = false;

  click = false;

  indexValue = 0;

  LFC;

  Msg = '';

  public MsgShowError = false;

  public MsgShowSuccess = false;

  private Base_Url = 'http://localhost:8083/Docutest';

  AdvanceForm = new FormGroup({
    planName: new FormControl(''),
    loops: new FormControl(''),
    duration: new FormControl(''),
    thread: new FormControl(''),
    rampUp: new FormControl(''),
    followRedirect: new FormControl(''),
  });

  // eslint-disable-next-line class-methods-use-this
  ngOnInit(): void {}

  startTest() {
    if (this.advance === true) {
      this.LFC = new LoadTestConfig(
        this.AdvanceForm.get('planName').value,
        this.AdvanceForm.get('loops').value,
        this.AdvanceForm.get('duration').value,
        this.AdvanceForm.get('thread').value,
        this.AdvanceForm.get('rampUp').value,
        this.AdvanceForm.get('followRedirect').value,
      );
      if (this.LFC.loops === '' || this.LFC.duration > 0) {
        this.LFC.loops = -1;
      }
      if (this.LFC.duration === '' || this.LFC.loops > 0) {
        this.LFC.duration = 0;
      }
      if (this.LFC.threads == '') {
        this.LFC.threads = 10;
      }
      if (this.LFC.rampUp == '') {
        this.LFC.rampUp = 10;
      }
    } else {
      this.LFC = new LoadTestConfig('Default', 0, 10, 10, 10, true);
    }
    if (
      this.LFC.loops == null
      || this.LFC.duration == null
      || this.LFC.threads == null
      || this.LFC.rampUp == null
    ) {
      this.ErrorMessage('Please use numbers');
    } else {
      this.submit();
    }
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

  stopTimer() {
    this.running = false;
    this.time = 0;
    clearInterval(this.interval);
  }

  submit() {
    this.running = true;
    this.startTimer();
  }

  showAdvance() {
    this.advance = !this.advance;
  }

  SuccessfulMessage(): void {
    this.Msg = 'Success!!';
    this.MsgShowSuccess = true;
    setTimeout(() => {
      this.MsgShowSuccess = false;
    }, 3000);
  }

  ErrorMessage(error): void {
    this.Msg = error;
    this.MsgShowError = true;
    setTimeout(() => {
      this.MsgShowError = false;
      this.running = false;
      this.click = false;
    }, 3000);
  }

  stop() {
    this.running = false;
  }
}
