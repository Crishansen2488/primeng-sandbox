export class Paginator {
  constructor(
    public page: number = 0,
    public size: number = 20,
    public first: number = 0,
    public totalElements: number = 0,
  ) {}
}
