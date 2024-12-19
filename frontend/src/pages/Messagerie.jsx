import { useState } from "react";
import { Navbar } from "../components/Nav";
import ListConversations from "./ListConversations";
import { conversations } from "../datas/conversations";
import { formatHourMinute } from "../utils/formatsDate";
export default function Messagerie() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(!open);
  };
  const [conversationSelected, setConversationSelected] = useState(null);
  return (
    <div className="h-screen overflow-hidden flex flex-col">
      <div className="w-full h-full flex">
        <ListConversations
          open={open}
          setConversation={setConversationSelected}
          conversations={conversations}
        />
        <div className="w-full h-screen flex flex-col">
          <Navbar
            handleOpen={handleOpen}
            online={
              conversationSelected ? conversationSelected.isOnline : false
            }
            titre={
              conversationSelected
                ? conversationSelected.otherPerson.name
                : null
            }
          />
          <div className="w-full h-screen overflow-auto flex justify-center">
            <MessagesCont conversation={conversationSelected} />
          </div>
          {conversationSelected && <InputCont />}
        </div>
      </div>
    </div>
  );
}

function MessagesCont({ conversation }) {
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
      {conversation ? (
        <>
          {conversation.messages.map((item, i) => (
            <ChatMessage
              key={i}
              texte={item.text}
              isUser={item.isSender}
              date={item.date}
              status={item.status}
            />
          ))}
          {conversation.writing && (
            <div className="chat chat-end">
              <div className="chat-bubble animate-pulse">
                ecrit {"  "}
                <span className="text-3xl font-extrabold animate-pulse">
                  ...
                </span>
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="w-full h-full flex flex-col gap-8 justify-center items-center text-base font-semibold text-center opacity-60 hover:opacity-100">
          <img src="/wink.png" className="w-28 h-28" alt="" />
          SELECTIONNEZ UNE CONVERSATION POUR COMMENCER A DISCUTER
        </div>
      )}
    </div>
  );
}

function InputCont() {
  return (
    <div className="p-3 w-full flex justify-center">
      <div className="p-3 w-full lg:w-1/2 bg-base-300 rounded-3xl">
        <textarea
          className="textarea mb-1 w-full rounded-3xl bg-base-300 border-none border-0 text-sm"
          rows="2"
          placeholder="votre message......"
        />
        <div className="w-full flex justify-between items-center">
          <button className="btn btn-circle">
            <img src="/paperclip.png" className="w-5 h-5" alt="" />
          </button>
          <button className="btn btn-circle">
            <img src="/send.png" className="w-5 h-5" alt="" />
          </button>
        </div>
      </div>
    </div>
  );
}
