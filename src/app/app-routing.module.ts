import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ResultsSummaryComponent } from './pages/results-summary/results-summary.component';
import { UploadComponent } from './pages/upload/upload.component';

const routes: Routes = [
  { path: 'upload', component: UploadComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'results-summary', component: ResultsSummaryComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
