import mongoose from 'mongoose';

interface ConnectionOptions{
  mongoUrl: string;
  dbName: string;
}

export class MongoDatabase{
  static async connect(options: ConnectionOptions){
    const { mongoUrl, dbName } = options;

    try {
      await mongoose.connect(mongoUrl, {
        dbName,

      })
      console.log('Connected to database mongo');
    } catch (error) {
      console.log('Error connecting to database mongo');
      throw error
    }
  }
}