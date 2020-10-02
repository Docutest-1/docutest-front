import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import DashboardComponent from './pages/dashboard/dashboard.component';
import FileUploadComponent from './components/file-upload/file-upload.component';

const routes: Routes = [
  { path: 'upload', component: FileUploadComponent },
  { path: 'dashboard', component: DashboardComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
class AppRoutingModule {

}

export default AppRoutingModule;
