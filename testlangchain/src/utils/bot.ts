import { ChatMistralAI } from "@langchain/mistralai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import {
  IInteraction,
  IMessage,
  messageTypes,
} from "../interfaces/interactions";
import { formatMessage, formatMessageHistory } from "./message";

export const instantiateBot = () => {
  const llm = new ChatMistralAI({
    model: "mistral-large-latest",
    apiKey: process.env.MISTRAL_API_KEY,
  });

  const TEMPLATE = `You are a medical expert chatbot. You have wide range of information on medical topics.
                    If the user asks a question that is not related to medicine or healthcare, like a math or general knowledge question, politely refuse to answer stating you can only answer medicine related questions.

    Current conversation:
    {chat_history}

    user: {input}
    assistant:`;

  const prompt = ChatPromptTemplate.fromTemplate(TEMPLATE);
  const chain = prompt.pipe(llm);
  const getResponse: (
    text: string,
    messages: IMessage[]
  ) => Promise<IMessage> = async (text, interaction) => {
    const result = await chain.invoke({
      input: text,
      chat_history: formatMessageHistory(interaction),
    });
    console.log()
    console.log(result);
    return {
      from: messageTypes.BOT,
      text: result.content as string,
      date: Date.now(),
    };
  };

  return { getResponse };
};
