import { Schema, model } from 'mongoose';
import { IPatient } from '../interfaces/patients';

const patientSchema = new Schema<IPatient>({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  patientId: { type: String, required: true, unique: true },
  doctorId: { type: String, required: false },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true }
});

export const Patient = model<IPatient>('Patient', patientSchema);