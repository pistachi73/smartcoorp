import mongoose from 'mongoose';

export const initializeDbConnection = async (dataBase: string) => {
  if (
    process.env.NODE_ENV === 'production' ||
    process.env.NODE_ENV === 'development'
  )
    await mongoose.connect(dataBase);
};
