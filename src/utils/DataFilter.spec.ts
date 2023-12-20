import DataFilter, { IDataFilter } from './DataFilter';

const dataCollection: number[] = Array.from({ length: 100 }).map(
  (_, idx: number) => idx,
);

describe('Class / DataFilter', () => {
  it('Should be able to return the default state', () => {
    const outputDataArray: number[] = dataCollection.slice(0, 10);
    const output: IDataFilter<number> = DataFilter.simplePagination<number>(
      dataCollection,
      {},
    );

    expect(output.data).toHaveLength(10);
    expect(output).toEqual({
      limit: 10,
      nextPage: 2,
      totalRecords: 100,
      totalPages: 10,
      data: outputDataArray, // Expected: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
    });
  });

  it('Should be able to specify particular page with records', () => {
    const outputDataArray: number[] = dataCollection.slice(10, 20);
    const output: IDataFilter<number> = DataFilter.simplePagination<number>(
      dataCollection,
      { page: '2' },
    );

    expect(output.data).toHaveLength(10);
    expect(output).toEqual({
      limit: 10,
      nextPage: 3,
      prevPage: 1,
      totalRecords: 100,
      totalPages: 10,
      data: outputDataArray, // Expected [10, 11, 12, 13, 14, 15, 16, 17, 18, 19];
    });
  });

  it('Should be able to return the last page', () => {
    const outputDataArray: number[] = dataCollection.slice(90, 100);
    const output: IDataFilter<number> = DataFilter.simplePagination<number>(
      dataCollection,
      { page: '10' },
    );

    expect(output.data).toHaveLength(10);
    expect(output).toEqual({
      limit: 10,
      prevPage: 9,
      totalRecords: 100,
      totalPages: 10,
      data: outputDataArray, // Expected [90, 91, 92, 93, 94, 95, 96, 97, 98, 99];
    });
  });

  it('Should be able to specify particular limit of records per page', () => {
    //dataCollection = [10, 11, 12, 13, 14, 15, 16, 17, 18, 19];
    const outputDataArray: number[] = dataCollection.slice(10, 20);
    const expectedCollection: number[] = outputDataArray.slice(0, 5);
    const output: IDataFilter<number> = DataFilter.simplePagination<number>(
      outputDataArray,
      { limit: '5' },
    );

    expect(output.data).toHaveLength(5);
    expect(output).toEqual({
      limit: 5,
      nextPage: 2,
      totalRecords: 10,
      totalPages: 2,
      data: expectedCollection, //Expected: [10, 11, 12, 13, 14]
    });
  });

  it('Should not return extra fields if the data collection is less than 10 records', () => {
    const outputDataArray: number[] = dataCollection.slice(0, 5);
    const output: IDataFilter<number> = DataFilter.simplePagination<number>(
      outputDataArray,
      {},
    );

    expect(output.data).toHaveLength(5);
    expect(output).toEqual({
      data: outputDataArray, //Expected: [0, 1, 2, 3, 4]
    });
  });
});
