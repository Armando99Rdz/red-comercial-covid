import mongoose, { Schema } from "mongoose";
import bcryptjs from "bcryptjs";

const userSchema = new Schema({
  firstname: {
    type: String, 
    maxlength: 80,
    trim: true,
    required: 'El nombre es obligatorio',
  },
  lastname: {
    type: String, 
    maxlength: 80,
    trim: true,
    required: 'El apellido es obligatorio',
  },
  type: { // 1 = ADMIN, 2 = EMPRESA, 3 = USER.
    type: Number,
    min: 1,
    default: 3,
    required: 'El tipo de usuario es obligatorio'
  },
  email: {
    type: String,
    maxlength: 255,
    trim: true,
    unique: true,
    required: 'El correo elextrónico es obligatorio'
  },
  password: {
    type: String,
    trim: true,
    maxlength: 255,
    required: 'La contraseña es obligatoria'
  },
  imagePath: {
    type: String,
    allowNull: true
  },
  addresses: [ // multiple addresses
    {
      state: {
        type: String,
        trim: true,
        maxlength: 80
      },
      city: {
        type: String,
        trim: true,
        maxlength: 80
      },
      zipCode: {
        type: String,
        maxlength: 10,
        trim: true
      },
      description: {
        type: String,
        trim: true,
        minlength: 50
      }
    }
  ],
  email_verified_at: {
    type: Date
  },
  token: {
    type: String
  },
  tokenExpiration: {
    type: Date
  },
  isActive: {
    type: Boolean,
    default: true
  }

}, { timestamps: true });

userSchema.methods.encryptPassword = async (pass) => {
  const salt = await bcryptjs.genSalt(10);
  return await bcryptjs.hash(pass, salt);
}

userSchema.methods.matchPassword = async (pass) => {
  return await bcryptjs.compare(pass, this.password);
}

const User = mongoose.model('users', userSchema);
export default User;