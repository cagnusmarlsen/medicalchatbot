import { IInteraction, IMessage } from "../interfaces/interactions";

export const formatMessage = (message: IMessage) => {
    return `${message.from}: ${message.text}`;
};

export const formatMessageHistory = (messages: IMessage[]) => {
    const formattedMessages = messages.map(message => formatMessage(message));
    return formattedMessages.join('\n');
}