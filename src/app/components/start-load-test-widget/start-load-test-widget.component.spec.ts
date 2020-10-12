import { nullSafeIsEquivalent } from '@angular/compiler/src/output/output_ast';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup } from '@angular/forms';
import { LoadTestConfig } from 'src/app/models/loadTestConfig';
import { StartLoadTestWidgetComponent } from './start-load-test-widget.component';

describe('StartLoadTestWidgetComponent', () => {
  let component: StartLoadTestWidgetComponent;
  let fixture: ComponentFixture<StartLoadTestWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StartLoadTestWidgetComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StartLoadTestWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

describe('start-load-test-widget', () => {
  let component: StartLoadTestWidgetComponent;
  let fixture: ComponentFixture<StartLoadTestWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StartLoadTestWidgetComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StartLoadTestWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('#submit() changes boolean value of running to true', () => {
    const comp = new StartLoadTestWidgetComponent();

    expect(comp.running).toEqual(false);
    comp.submit();

    expect(comp.running).toEqual(true);
  });

  it('#errorMessage() changes boolean of msgShowError to true', () => {
    const comp = new StartLoadTestWidgetComponent();

    expect(comp.msgShowError).toEqual(false);
    comp.errorMessage('error');

    expect(comp.msgShowError).toEqual(true);
  });

  it('#errorMessage() changes boolean of msgShowError to false after 3 secs', () => {
    const comp = new StartLoadTestWidgetComponent();

    expect(comp.msgShowError).toEqual(false);
    comp.errorMessage('error');

    setTimeout(() => {
      expect(comp.msgShowError).toEqual(false);
      expect(comp.running).toEqual(false);
      expect(comp.click).toEqual(false);
    }, 3001);
  });

  it('#successfulMessage() changes boolean of msgShowSuccess to true', () => {
    const comp = new StartLoadTestWidgetComponent();

    expect(comp.msgShowSuccess).toEqual(false);
    comp.successfulMessage();

    expect(comp.msgShowSuccess).toEqual(true);
  });

  it('#successfulMessage() changes boolean of msgShowSuccess to false after 3 secs', () => {
    const comp = new StartLoadTestWidgetComponent();

    expect(comp.msgShowSuccess).toEqual(false);
    comp.successfulMessage();

    setTimeout(() => {
      expect(comp.msgShowSuccess).toEqual(false);
    }, 3001);
  });

  it('#showAdvance() changes boolean of Advance to true', () => {
    const comp = new StartLoadTestWidgetComponent();

    expect(comp.advance).toEqual(false);
    comp.showAdvance();

    expect(comp.advance).toEqual(true);
  });
  it('#startTest() if advance is set to false creates default LTC', () => {
    const comp = new StartLoadTestWidgetComponent();
    comp.advance = false;
    comp.startTest();

    expect(comp.LTC).toEqual(new LoadTestConfig('Default', 0, 10, 10, 10, true));
  });

  it('#stop() changes boolean of running and click to false', () => {
    const comp = new StartLoadTestWidgetComponent();
    comp.running = true;
    comp.click = true;

    expect(comp.running).toEqual(true);
    expect(comp.click).toEqual(true);
    comp.stop();

    expect(comp.running).toEqual(false);
    expect(comp.click).toEqual(false);
  });


  it('#startTest() if advance is set to true it calls #submit()', () => {
    const comp = new StartLoadTestWidgetComponent();
    comp.advance = true;

    spyOn(comp, 'submit');

    comp.startTest();

    expect(comp.submit).toHaveBeenCalledTimes(1);
  });

  it('#startTest() if advance is set to false it calls #errorMessage() if form data is null', () => {
    const comp = new StartLoadTestWidgetComponent();
    comp.advance = true;
    comp.advanceForm = new FormGroup({
      planName: new FormControl(''),
      loops: new FormControl(''),
      duration: new FormControl(null),
      thread: new FormControl(''),
      rampUp: new FormControl(''),
      followRedirect: new FormControl('')
    });

    spyOn(comp, 'errorMessage');

    comp.startTest();

    expect(comp.errorMessage).toHaveBeenCalledTimes(1);
  });
});

describe('start-load-test-widget timers and intervals', () => {
  let comp = new StartLoadTestWidgetComponent();
  let fixture: ComponentFixture<StartLoadTestWidgetComponent>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StartLoadTestWidgetComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StartLoadTestWidgetComponent);
    comp = fixture.componentInstance;
    fixture.detectChanges();
  });

  comp.time = 0;
  comp.running = false;
  beforeEach(() => {
    jasmine.clock().install();
  });

  afterEach(() => {
    jasmine.clock().uninstall();
  });

  it('#startTimer() should begin the interval and increase time', () => {
    expect(comp.time).toEqual(0);
    comp.startTimer();
    setTimeout(() => {
      expect(comp.time).toBeGreaterThan(0);
    }, 1001);
  });

  it('#stopTimer() should clear the interval and set time to zero', () => {
    comp.time = 50;
    comp.stopTimer();

    expect(comp.time).toEqual(0);
  });

  it('#startTimer() should automatically end after 200 seconds and call stopTimer', () => {
    comp.time = 0;
    comp.startTimer();
    setTimeout(() => {
      expect(comp.stopTimer()).toHaveBeenCalledWith();
    }, 200001);

    expect(comp.time).toEqual(0);
  });
});
