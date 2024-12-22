import { useState } from "react";
import { Navbar2 } from "../components/Nav";
import { formatHourMinute } from "../utils/formatsDate";
import { useFetch } from "../hooks/useFetch";
import { reduceText } from "../utils/reduceText";
import { whoIsFriend } from "../utils/whoIsFriend";

export default function ListConversations({
  open,
  setOpen,
  conversations,
  setConversation,
  user_data,
  setFriend,
}) {
  const [selected, setSelected] = useState(null);
  const handleSelect = (item) => {
    setSelected(item);
  };
  const Message = ({ conversation }) => {
    const { datas, loading } = useFetch(`/messages/${conversation._id}`);

    return (
      <div
        onClick={() => {
          setOpen(false);
          setConversation(datas);
          handleSelect(conversation._id);
          setFriend(whoIsFriend(user_data.id, conversation.participants));
        }}
        className={`
          ${selected == conversation._id && "bg-base-100"} 
          ${"bg-base-100"} w-full flex justify-start gap-1 rounded-3xl py-2 px-3 cursor-pointer transition hover:translate-x-2`}
      >
        <div
          role="button"
          className={`avatar placeholder mr-4 ${1 == 1 && "online"}`}
        >
          <div className="bg-orange-700 text-sky-100  w-12 h-12 rounded-full">
            <span className="text-xl font-bold">
              {whoIsFriend(user_data.id, conversation.participants).name[0]}
            </span>
          </div>
        </div>
        <button className="w-full flex flex-col">
          <div className="w-full flex justify-between">
            <p className="text-base font-bold">
              {whoIsFriend(user_data.id, conversation.participants).name}
            </p>
            <p
              className={`text-sm ${
                conversation.status == "vu" ? "" : "text-accent font-bold"
              }`}
            >
              {formatHourMinute(conversation.lastMessage.createdAt)}
            </p>
          </div>
          {1 == 0 ? (
            <p className="text-accent animate-pulse">
              ecrit {"  "}
              <span className="text-3xl font-extrabold animate-pulse">...</span>
            </p>
          ) : (
            <p>{reduceText(conversation.lastMessage.text, 20)}</p>
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
          {conversations?.map((item, i) => (
            <Message key={i} conversation={item} />
          ))}
        </div>
      </div>
    </div>
  );
}
