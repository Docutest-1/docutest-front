/* eslint-disable import/named */
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSliderModule } from '@angular/material/slider';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { FileUploadComponent } from './components/file-upload/file-upload.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import * as fromGraphRoute from './state/graph-route/graph-route.reducer';
import { DemoTableComponent } from './components/demo-table/demo-table.component';
import { ResultsSummaryComponent } from './pages/results-summary/results-summary.component';
import { UploadComponent } from './pages/upload/upload.component';
import { StartLoadTestWidgetComponent } from './components/start-load-test-widget/start-load-test-widget.component';
import { GenericD3Component } from './components/generic-d3/generic-d3.component';
import { HttpStatusDonutChartComponent } from './components/http-status-donut-chart/http-status-donut-chart.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    DashboardComponent,
    FileUploadComponent,
    StartLoadTestWidgetComponent,
    DemoTableComponent,
    ResultsSummaryComponent,
    UploadComponent,
    GenericD3Component,
    HttpStatusDonutChartComponent,
  ],
  imports: [
    CommonModule,
    MatCheckboxModule,
    MatSliderModule,
    MatInputModule,
    MatFormFieldModule,
    MatProgressBarModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    NgxChartsModule,
    BrowserAnimationsModule,
    StoreModule.forRoot({
      graphRoute: fromGraphRoute.reducer
    }),
    StoreDevtoolsModule.instrument({
      maxAge: 25
    })
  ],
  providers: [],
  bootstrap: [AppComponent],
})
// eslint-disable-next-line import/prefer-default-export
export class AppModule {}
