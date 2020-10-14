import { Component } from '@angular/core';
import { SwaggerService } from 'src/app/services/swagger.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  public id: number;

  constructor(private swagService: SwaggerService) {}

  // reload method to allow for mocking
  static reloadPage() {
    window.location.reload();
  }

  searchSummary() {
    sessionStorage.setItem('swaggerSummaryId', this.id.toString());
    this.swagService.loadSummaryInTable(this.id);
    NavbarComponent.reloadPage();
  }
}
