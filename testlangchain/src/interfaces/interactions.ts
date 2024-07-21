export const enum messageTypes {
    USER = 'USER',
    BOT = 'BOT'
}
export interface IInteraction {
    patientId: string;
    doctorId?: string;
    date: number;
    messages: IMessage[];
}

export interface IMessage {
    from: messageTypes;
    text: string;
    date: Number;
}