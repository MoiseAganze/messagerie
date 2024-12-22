import { useState } from "react";
import { whoIsFriend } from "../utils/whoIsFriend";

export default function InputCont({ sendMessage, user_data, data }) {
  const [message, setMessage] = useState("");
  return (
    <div className="p-3 w-full flex justify-center">
      <div className="p-3 w-full lg:w-1/2 bg-base-300 rounded-3xl">
        <textarea
          className="textarea mb-1 w-full rounded-3xl bg-base-300 border-none border-0 text-sm"
          rows="2"
          placeholder="votre message......"
          value={message}
          onChange={(event) => setMessage(event.target.value)}
        />
        <div className="w-full flex justify-between items-center">
          <button className="btn btn-circle">
            <img src="/paperclip.png" className="w-5 h-5" alt="" />
          </button>
          {data && (
            <button
              className="btn btn-circle"
              onClick={() => {
                sendMessage(user_data.id, data[0].conversationId, message);
                setMessage("");
              }}
            >
              <img src="/send.png" className="w-5 h-5" alt="" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
