import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ResultSummary } from '../models/result-summary';
import { SwaggerSummary } from '../models/swagger-summary';

@Injectable({
  providedIn: 'root'
})
export class TreeMapService {
  private treeMapDataSource = new BehaviorSubject(null);

  private currentDashDataSource = new BehaviorSubject(null);

  private uri = `${environment.API_BASE_URL}:${environment.PORT}`;

  treeMapData: Observable<SwaggerSummary> = this.treeMapDataSource.asObservable();

  currentDashData: Observable<ResultSummary[]> = this.currentDashDataSource.asObservable();

  async updateData(id: number) {
    const responseData = await this.http.get<SwaggerSummary>(`${this.uri}/Docutest/swaggersummary/${id}`).toPromise();
    this.treeMapDataSource.next(responseData);
  }

  changeCurrentDashdata(resultSummaryArray: ResultSummary[]) {
    this.currentDashDataSource.next(resultSummaryArray);
  }

  constructor(private http : HttpClient) {

  }
}
