/* eslint-disable no-restricted-globals */
/* eslint-disable no-undef */
import { Component, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { LoadTestConfig } from 'src/app/models/loadTestConfig';
@Component({
  selector: 'app-start-load-test-widget',
  templateUrl: './start-load-test-widget.component.html',
  styleUrls: ['./start-load-test-widget.component.scss'],
})
export class StartLoadTestWidgetComponent {
  public time = 0;

  public showDuration = true;

  public interval: any;

  public running = false;

  public advance = false;

  public click = false;

  public allowRedirect = true;

  public indexValue = 0;

  public LTC: LoadTestConfig;

  public msg: string;

  public msgShowError = false;

  public msgShowSuccess = false;

  public tester = 'Default';

  @Output() myEvent: EventEmitter<boolean> = new EventEmitter();

  public advanceForm = new FormGroup({
    planName: new FormControl('Default'),
    loops: new FormControl(5),
    duration: new FormControl(10),
    thread: new FormControl(10),
    rampUp: new FormControl(10),
    followRedirect: new FormControl(true),
  });

  startTest(): void {
    if (this.showDuration === true) {
      this.LTC = new LoadTestConfig(
        this.advanceForm.get('planName').value,
        -1,
        this.advanceForm.get('duration').value,
        this.advanceForm.get('thread').value,
        this.advanceForm.get('rampUp').value,
        this.advanceForm.get('followRedirect').value,
      );
      sessionStorage.setItem('loadTestConfig', JSON.stringify(this.LTC));
    } else {
      this.LTC = new LoadTestConfig(
        this.advanceForm.get('planName').value,
        this.advanceForm.get('loops').value,
        0,
        this.advanceForm.get('thread').value,
        this.advanceForm.get('rampUp').value,
        this.advanceForm.get('followRedirect').value,
      );
      sessionStorage.setItem('loadTestConfig', JSON.stringify(this.LTC));
    }
    // } else {
    //   this.LTC = new LoadTestConfig('Default', -1, 10, 10, 10, true);
    //   sessionStorage.setItem('loadTestConfig', JSON.stringify(this.LTC));
    // }
    if (
      this.LTC.loops == null
      || this.LTC.duration == null
      || this.LTC.threads == null
      || this.LTC.rampUp == null
    ) {
      this.errorMessage('Please use numbers');
    } else {
      this.submit();
      this.myEvent.emit(true);
      console.log('event emitted');
    }
  }

  startTimer(): void {
    if (this.interval == null || this.interval > 0) {
      this.interval = setInterval(() => {
        this.time += 1;
        if (this.time > 200) {
          this.stopTimer();
        }
      }, 1000);
    }
  }

  stopTimer(): void {
    this.stop();
    this.time = 0;
    clearInterval(this.interval);
  }

  submit(): void {
    this.running = true;
    this.startTimer();
  }

  showAdvance(): void {
    this.advance = !this.advance;
  }

  successfulMessage(): void {
    this.msg = 'Success!!';
    this.msgShowSuccess = true;
    setTimeout(() => {
      this.msgShowSuccess = false;
    }, 3000);
  }

  errorMessage(error: string): void {
    this.msg = error;
    this.msgShowError = true;
    setTimeout(() => {
      this.msgShowError = false;
      this.running = false;
      this.click = false;
    }, 3000);
  }

  stop(): void {
    this.running = false;
    this.click = false;
  }

  changeRedirect(): void {
    this.allowRedirect = !this.allowRedirect;
  }

  cancel(): void {
    this.time = 0;
    this.stop();
    location.reload();
  }

  toggleLoopsOrDuration() {
    this.showDuration = !this.showDuration;
  }
}
