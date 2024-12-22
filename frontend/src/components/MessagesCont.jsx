import { useEffect, useState } from "react";
import { socket } from "../socket";
import { formatHourMinute } from "../utils/formatsDate";

export default function MessagesCont({ conversation }) {
  const ChatMessage = ({ texte, isUser, date, status }) => {
    return (
      <div className={`chat ${isUser ? "chat-end" : "chat-start"}`}>
        <div className="chat-header">
          <time className="text-xs opacity-50">{formatHourMinute(date)}</time>
        </div>
        <div
          className={`chat-bubble ${
            isUser ? "chat-bubble-success" : "chat-bubble-primary"
          }`}
        >
          {texte}
        </div>
        <div className="chat-footer opacity-50">{status}</div>
      </div>
    );
  };
  return (
    <div className="w-full lg:w-2/3 flex flex-col gap-2 mb-48 px-4 lg:px-8 pt-10">
      {conversation.map((item, i) => (
        <ChatMessage
          key={i}
          texte={item.text}
          isUser={item.isSender}
          date={item.createdAt}
          status={item.status}
        />
      ))}
      {/* {conversation.writing && (
            <div className="chat chat-end">
              <div className="chat-bubble animate-pulse">
                ecrit {"  "}
                <span className="text-3xl font-extrabold animate-pulse">
                  ...
                </span>
              </div>
            </div>
          )} */}
    </div>
  );
}
