export class SwaggerUploadResponse {
  public eta: number;

  public resultRef: string;

  public swaggerSummaryId: number;

  constructor();
  constructor(eta: number, result_ref: string, swaggerSummaryId: number);
  constructor(eta?: number, result_ref?: string, swaggerSummaryId?: number) {
    this.eta = eta;
    this.resultRef = result_ref;
    this.swaggerSummaryId = swaggerSummaryId;
  }
}
