import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';

// jest.mock('@sendgrid/mail', () => {
//   return {
//     setApiKey: jest.fn(),
//     send: jest.fn(),
//   };
// });

// jest.mock('../docs/swagger', () => {
//   return {
//     swaggerSetup: {},
//     options: {},
//   };
// });

let mongo: any = null;

const setUp = async () => {
  mongo = await MongoMemoryServer.create();
  const url = mongo.getUri();

  await mongoose.connect(url, {});
};

const dropDatabase = async () => {
  if (mongo) {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await mongo.stop();
  }
};

const dropCollections = async () => {
  if (mongo) {
    const collections = mongoose.connection.collections;

    for (const key in collections) {
      const collection = collections[key];
      await collection.deleteMany({});
    }
  }
};

beforeAll(async () => {
  await setUp();
});

afterEach(async () => {
  jest.clearAllMocks();
});

beforeEach(() => {
  jest.clearAllMocks();
});

afterAll(async () => {
  await dropDatabase();
});
