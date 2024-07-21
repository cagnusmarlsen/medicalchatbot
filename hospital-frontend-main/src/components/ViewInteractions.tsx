import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const ViewInteractions = () => {
  const location = useLocation();
  const { patientId } = location.state || {};
  const [interactions, setInteractions] = useState<
    {
      _id: string;
      date: number;
      messages: {
        from: string;
        text: string;
        date: number;
        _id: string;
      }[];
    }[]
  >([]);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(
          `http://localhost:3000/interactions/fetchAll/${patientId}`
        );
        const data = await res.json();
        setInteractions(data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
  return (
    <div>
      {interactions.map((interaction) => (
        <div
          key={interaction._id}
          className="mb-10 p-4 border border-black rounded-lg shadow-sm bg-white"
        >
          <strong className="text-xl font-bold mb-2">
            {interaction.messages[0].text}
          </strong>
          <p className="text-gray-600 mb-4"></p>
          <div className="">
            {interaction.messages.map((message) => (
              <div
                key={message._id}
                className={`p-4 rounded-lg ${
                  message.from === "USER" ? "bg-white" : "bg-gray-100"
                }`}
              >
                <strong className="block mb-2 text-lg">{message.from}:</strong>
                <span className="block mb-2">{message.text}</span>
                <div className="text-gray-500 text-sm">
                  {new Date(message.date).toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ViewInteractions;
