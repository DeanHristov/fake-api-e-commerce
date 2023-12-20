import { ParsedQs } from 'qs';

export interface IPagination {
  limit: number;
  nextPage?: number;
  prevPage?: number;
  totalPages: number;
  totalRecords: number;
}

export interface IDataFilter<T> extends IPagination {
  data: T[];
}

export default class DataFilter {
  public static simplePagination<T>(
    collection: T[],
    query: ParsedQs,
  ): IDataFilter<T> {
    const { page, limit } = query;
    const pagination: IPagination = {} as IPagination;

    const currentPage = Number(page) || 1;
    const pageLimit = Number(limit) || 10;
    const startIdx = (currentPage - 1) * pageLimit;
    const endIdx = currentPage * pageLimit;
    const total = collection.length;
    const totalPages = Math.ceil(collection.length / pageLimit);

    if (endIdx < total) {
      pagination.nextPage = currentPage + 1;
      pagination.limit = pageLimit;
      pagination.totalRecords = total;
      pagination.totalPages = totalPages;
    }

    if (startIdx > 0) {
      pagination.prevPage = currentPage - 1;
      pagination.limit = pageLimit;
      pagination.totalRecords = total;
      pagination.totalPages = totalPages;
    }

    return {
      ...pagination,
      data: collection.slice(startIdx, endIdx),
    };
  }
}
