import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ResultsSummaryComponent } from './pages/results-summary/results-summary.component';
import { UploadComponent } from './pages/upload/upload.component';
import { FileUploadComponent } from './components/file-upload/file-upload.component';
import { CssDashboardComponent } from './components/css-dashboard/css-dashboard.component';

const routes: Routes = [
  { path: 'upload', component: UploadComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'results-summary', component: ResultsSummaryComponent },
  { path: '**', redirectTo: 'upload', pathMatch: 'full' },
  { path: 'cssdash', component: CssDashboardComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
