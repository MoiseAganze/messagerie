import { useState } from "react";
import { Navbar2 } from "../components/Nav";
import { formatHourMinute } from "../utils/formatsDate";

export default function ListConversations({
  open,
  conversations,
  setConversation,
}) {
  const [selected, setSelected] = useState(null);
  const handleSelect = (item) => {
    setSelected(item);
  };
  const Message = ({ conversation, key }) => {
    return (
      <div
        onClick={() => {
          setConversation(conversation);
          handleSelect(conversation.id);
        }}
        className={`
          ${selected == conversation.id && "bg-base-100"} 
          ${
            key == 2 && "bg-base-100"
          } w-full flex justify-start gap-1 rounded-3xl py-2 px-3 cursor-pointer transition hover:translate-x-2`}
      >
        <div
          role="button"
          className={`avatar placeholder mr-4 ${
            conversation.isOnline && "online"
          }`}
        >
          <div className="bg-orange-700 text-sky-100  w-12 h-12 rounded-full">
            <span className="text-xl font-bold">
              {conversation.otherPerson.name[0]}
            </span>
          </div>
        </div>
        <button className="w-full flex flex-col">
          <div className="w-full flex justify-between">
            <p className="text-base font-bold">
              {conversation.otherPerson.name}
            </p>
            <p
              className={`text-sm ${
                conversation.status == "vu" ? "" : "text-accent font-bold"
              }`}
            >
              {formatHourMinute(conversation.date)}
            </p>
          </div>
          {conversation.writing ? (
            <p className="text-accent animate-pulse">
              ecrit {"  "}
              <span className="text-3xl font-extrabold animate-pulse">...</span>
            </p>
          ) : (
            <p>{conversation.messages[0].text}</p>
          )}
        </button>
      </div>
    );
  };
  return (
    <div
      className={`absolute -left-96 z-40 top-0 lg:static ${
        open ? "translate-x-96" : "translate-x-0"
      } w-96 lg:flex justify-center bg-base-300 h-screen transition`}
    >
      <div className="w-full min-height-screen bg-gray">
        <Navbar2 />
        <div className="flex flex-col gap-1 mt-3 overflow-x-hidden">
          {conversations.map((item, i) => (
            <Message key={i} conversation={item} />
          ))}
        </div>
      </div>
    </div>
  );
}
