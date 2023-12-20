import { IDataFilter } from '@/utils/DataFilter';

export default class FilteredResponse<T> implements IDataFilter<T> {
  public data: T[];
  public status: string;
  public limit: number;
  public nextPage: number;
  public prevPage: number;
  public totalRecords: number;
  public totalPages: number;

  constructor(status: string, filteredData: IDataFilter<T>) {
    const { limit, nextPage, prevPage, totalPages, totalRecords, data } =
      filteredData;

    this.status = status;
    this.limit = limit;
    this.nextPage = nextPage as number;
    this.prevPage = prevPage as number;
    this.totalRecords = totalRecords;
    this.totalPages = totalPages;
    this.data = data;
  }
}
