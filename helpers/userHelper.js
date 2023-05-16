import mongoose, { Error } from 'mongoose';

const validateMongoDbId = (res, id) => {
  const isValid = mongoose.Types.ObjectId.isValid(id);
  if (!isValid) {
    return res.status(400).send({ message: 'Invalid ID or User not found' });
  }
};

export default validateMongoDbId;
