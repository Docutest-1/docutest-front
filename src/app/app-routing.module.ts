import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import DashboardComponent from './pages/dashboard/dashboard.component';
import FileUploadComponent from './components/file-upload/file-upload.component';
import StartLoadTestWidgetComponent from './components/start-load-test-widget/start-load-test-widget.component';

const routes: Routes = [
  { path: 'upload', component: FileUploadComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'widget', component: StartLoadTestWidgetComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
class AppRoutingModule {}

export default AppRoutingModule;
