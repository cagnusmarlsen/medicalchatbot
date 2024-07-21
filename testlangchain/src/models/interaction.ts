import { Document, Schema, model } from 'mongoose';
import { IInteraction, IMessage, messageTypes } from '../interfaces/interactions';

const messageSchema = new Schema<IMessage & Document>({
    from: {type: String, enum: [messageTypes.USER, messageTypes.BOT], required: true},
    text: { type: String, required: true },
    date: { type: Number, default: Date.now() }
  });

const interactionSchema = new Schema<IInteraction & Document>({
  patientId: { type: Schema.Types.String, ref: 'Patient', required: true },
  doctorId: { type: Schema.Types.String, ref: 'Doctor', required: false },
  date: { type: Schema.Types.Number, default: Date.now() },
  messages: [messageSchema]
});

export const Interaction = model<IInteraction & Document>('Interaction', interactionSchema);