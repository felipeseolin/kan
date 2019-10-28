const mongoose = require('mongoose');

const { Schema } = mongoose;
const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    hashed_password: {
      type: String,
      default: '',
    },
    boards: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Board',
      },
    ],
  },
  { timestamps: true }
);

UserSchema.virtual('password').set(password => {
  this._password = password;
});

UserSchema.pre('save', next => {
  const user = this;
  if (user._password === undefined) {
    return next();
  }
  bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
    if (err) {
      console.log(err);
    }
    bcrypt.hash(user._password, salt, (error, hash) => {
      if (err) {
        console.log(error);
      }
      user.hashed_password = hash;
      next();
    });
  });
});

mongoose.model('User', UserSchema);
