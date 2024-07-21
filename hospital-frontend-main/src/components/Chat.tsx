/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";

export default function Component(props: any) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<{ sender: string; text: string }[]>(
    []
  );
  const [isNewInteraction, setIsNewInteraction] = useState(true);
  const [currentInteractionId, setCurrentInteractionId] = useState(null);
  const [loading, setLoading] = useState(false);

  const messageEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    setMessages((prevMessages) => [
      ...prevMessages,
      { sender: "user", text: message },
    ]);
    setMessage("");
    setLoading(true);

    try {
      let data: any;

      if (isNewInteraction) {
        const res = await fetch("http://localhost:3000/interactions/new", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            patientId: props.patientData.patientId,
            text: message,
          }),
        });
        data = await res.json();
        setIsNewInteraction(false);
        setCurrentInteractionId(data.interactionId);
      } else {
        const res = await fetch(
          "http://localhost:3000/interactions/conversation",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              patientId: props.patientData.patientId,
              interactionId: currentInteractionId,
              text: message,
            }),
          }
        );
        data = await res.json();
      }

      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "ai", text: data.response.text },
      ]);
    } catch (error) {
      console.log("Error:", error);
    } finally {
      setLoading(false);
    }
  };
  const handleKeyDown = (e: any) => {
    if (e.key === "Enter") {
      handleSubmit(e);
    }
  };
  return (
    <div className="rounded-lg shadow-lg">
      <div className="flex bg-black text-white text-center py-2 rounded-t-lg">
        <div className="ml-auto pr-4">
          <Button variant="ghost" size="sm" onClick={props.toggle}>
            Close
          </Button>
        </div>
      </div>
      <div className="h-60 overflow-y-auto bg-white">
        {messages.length === 0 && (
          <div className="flex justify-center py-4">
            What do you want to know about?
          </div>
        )}
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`py-2 px-4 ${
              msg.sender === "user" ? "text-right" : "text-left"
            }`}
          >
            <div
              className={`inline-block px-4 py-2 rounded-lg ${
                msg.sender === "user"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-300 text-black"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-center py-4">
            <div className="inline-block px-4 py-2 rounded-lg bg-gray-300 text-black">
              Bot is thinking...
            </div>
          </div>
        )}

        <div ref={messageEndRef} />
      </div>
      <Textarea
        placeholder="Enter your query..."
        className="p-2 bg-white rounded-lg border border-gray-400"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
}
