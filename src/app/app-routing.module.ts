import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { FileUploadComponent } from './components/file-upload/file-upload.component';
import { ResultsSummaryComponent } from './pages/results-summary/results-summary.component';

const routes: Routes = [
  { path: 'upload', component: FileUploadComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'results-summary', component: ResultsSummaryComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
