import { Schema, model } from 'mongoose';
import { IDoctor } from '../interfaces/doctors';

const doctorSchema = new Schema<IDoctor>({
  name: { type: String, required: true },
  specialty: { type: String, required: true },
  contact: { type: String, required: true },
  location: { type: String, required: true },
  doctorId: { type: String, required: true, unique: true }
});

export const Doctor = model<IDoctor>('Doctor', doctorSchema);