import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

// Declare the Schema of the Mongo model
var userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: [true, 'Enter First Name'],
    trim: true,
  },
  lastname: {
    type: String,
    required: [true, 'Enter Last Name'],
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  mobile: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    minLength: [6, 'Password should be at least six characters'],
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  role: {
    type: String,
    default: 'user',
  },
  cart: {
    type: Array,
    default: [],
  },
  address: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Address' }],
  wishList: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
  createdDate: {
    type: Date,
    default: Date.now,
  },
});

userSchema.pre('save', async function (next) {
  const salt = await bcrypt.genSaltSync(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.isPasswordMatched = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};
//Export the model
const User = mongoose.model('User', userSchema);
export default User;
