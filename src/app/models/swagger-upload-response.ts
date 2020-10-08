export class SwaggerUploadResponse {
  eta: number;

  resultRef: string;

  swaggerSummaryId: number;

  constructor();
  constructor(eta: number, result_ref: string, swaggerSummaryId: number);
  constructor(eta?: number, result_ref?: string, swaggerSummaryId?: number) {
    this.eta = eta;
    this.resultRef = result_ref;
    this.swaggerSummaryId = swaggerSummaryId;
  }
}
