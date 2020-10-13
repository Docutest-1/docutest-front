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
import { HttpStatusCircleChartComponent } from './components/http-status-circle-chart/http-status-circle-chart.component';
import { TreeMapComponent } from './components/tree-map/tree-map.component';
import { CssDashboardComponent } from './components/css-dashboard/css-dashboard.component';
import { BoxChartComponent } from './components/box-chart/box-chart.component';
import { HistogramComponent } from './components/histogram/histogram.component';
import { EndpointOverviewComponent } from './components/endpoint-overview/endpoint-overview.component';
import { HomeComponent } from './pages/home/home.component';
import { FooterComponent } from './components/footer/footer.component';

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
    HttpStatusCircleChartComponent,
    TreeMapComponent,
    CssDashboardComponent,
    BoxChartComponent,
    HistogramComponent,
    EndpointOverviewComponent,
    HomeComponent,
    FooterComponent,
    HomeComponent,
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
