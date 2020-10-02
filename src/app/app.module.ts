import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import FileUploadComponent from './components/file-upload/file-upload.component';
import AppRoutingModule from './app-routing.module';
import AppComponent from './app.component';
import NavbarComponent from './components/navbar/navbar.component';
import DashboardComponent from './pages/dashboard/dashboard.component';
import LineChartComponent from './components/line-chart/line-chart.component';
import LeftColumnComponent from './components/left-column/left-column.component';
import * as fromGraphRoute from './state/graph-route/graph-route.reducer';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    DashboardComponent,
    LineChartComponent,
    FileUploadComponent,
    LeftColumnComponent
  ],
  imports: [
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    NgxChartsModule,
    BrowserAnimationsModule,
    StoreModule.forRoot({
      graphRoute: fromGraphRoute.reducer,
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
// eslint-disable-next-line import/prefer-default-export
export class AppModule {}
