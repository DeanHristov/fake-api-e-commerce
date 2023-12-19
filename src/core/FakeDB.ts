import { DataStoreOptions } from 'nedb';
import Datastore from 'nedb-async';
import { join } from 'path';
import Utils from '../utils/Utils';
import { ICart, IProduct, IUser } from '@/types';
import users from '@/mocks/users';
import products from '@/mocks/products';
import carts from '@/mocks/carts';

interface IDatastore {
  products: Datastore<IProduct[]>;
  users: Datastore<IUser[]>;
  carts: Datastore<ICart[]>;
}

export default class FakeDB implements IDatastore {
  private static instance: FakeDB;

  public products: Datastore<IProduct[]>;
  public users: Datastore<IUser[]>;
  public carts: Datastore<ICart[]>;

  private constructor() {
    this.products = new Datastore<IProduct[]>(
      this.initDB(join(process.cwd(), '/database/products.db')),
    );

    this.users = new Datastore<IProduct[]>(
      this.initDB(join(process.cwd(), '/database/users.db')),
    );

    this.carts = new Datastore<ICart[]>(
      this.initDB(join(process.cwd(), '/database/carts.db')),
    );

    // Seeding the data (At least the users)
    this.users.insert<IUser[]>(users);
    if (process.env.DB_MOCKING && process.env.DB_MOCKING === 'true') {
      this.seedData();
    }
  }

  public static getInstance(): FakeDB {
    if (Utils.isNull(FakeDB.instance)) {
      return (FakeDB.instance = new FakeDB());
    }

    return FakeDB.instance;
  }

  private initDB = (
    pathToFile: string,
    inMemory = false,
  ): DataStoreOptions => ({
    inMemoryOnly: inMemory || process.env.NODE_ENV === 'production',
    filename: pathToFile,
    corruptAlertThreshold: 1,
    autoload: true,
  });

  private seedData(): void {
    this.products.insert<IProduct[]>(products);
    this.carts.insert<ICart[]>(carts);
  }
}
