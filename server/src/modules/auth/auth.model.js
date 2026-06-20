import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const UserSchema = new mongoose.Schema({
  name:                { type: String, required: true },
  email:               { type: String, required: true, unique: true, lowercase: true },
  password:            { type: String },
  googleId:            { type: String },
  avatarUrl:           { type: String },
  xp:                  { type: Number, default: 0 },
  streak:              { type: Number, default: 0 },
  lastActiveDate:      { type: Date },
  isVerified:          { type: Boolean, default: false },
  verifyToken:         { type: String },
  verifyTokenExpiry:   { type: Date },
  resetToken:          { type: String },
  resetTokenExpiry:    { type: Date },
  learningPaths: [{
    pathSlug: { type: String, required: true },
    nodeStatuses: {
      type: Map,
      of: new mongoose.Schema({
        mastery: { type: Number, default: 0 },
        level: { type: String, enum: ['locked', 'not-started', 'weak', 'medium', 'strong'], default: 'not-started' },
      }, { _id: false })
    }
  }],
}, { timestamps: true });

UserSchema.pre('save', async function () {
  if (!this.isModified('password') || !this.password) return;
  this.password = await bcrypt.hash(this.password, 12);
});

UserSchema.methods.comparePassword = function (candidate) {
  return bcrypt.compare(candidate, this.password);
};

export const User = mongoose.model('User', UserSchema);