import mongoose from 'mongoose';
const { Schema } = mongoose;

const UserSchema = new Schema({
  username: {
    type: String,
    unique: true,
    trim: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  is_admin: {
    type: Boolean,
    default: true,
  },
  created_at: {
    Date,
  },
});

export default mongoose.model('users', UserSchema);
