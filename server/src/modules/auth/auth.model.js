import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const UserSchema = new mongoose.Schema({
  name:           { type: String, required: true },
  email:          { type: String, required: true, unique: true, lowercase: true },
  password:       { type: String },
  googleId:       { type: String },
  avatarUrl:      { type: String },
  xp:             { type: Number, default: 0 },
  streak:         { type: Number, default: 0 },
  lastActiveDate: { type: Date },
}, { timestamps: true });

UserSchema.pre('save', async function () {
  if (!this.isModified('password') || !this.password) return;
  this.password = await bcrypt.hash(this.password, 12);
});

UserSchema.methods.comparePassword = function (candidate) {
  return bcrypt.compare(candidate, this.password);
};

export const User = mongoose.model('User', UserSchema);