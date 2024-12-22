import { useEffect, useState } from "react";
import { Navbar } from "../components/Nav";
import ListConversations from "./ListConversations";
import { socket } from "../socket";
import InputCont from "../components/InputMessage";
import MessagesCont from "../components/MessagesCont";
import axios from "axios";
import { useFetch } from "../hooks/useFetch";
import { userData } from "../hooks/userData";
import { useNavigate } from "react-router-dom";
export default function Messagerie() {
  const nav = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("kento");
    if (!token) {
      nav("/login");
    }
  }, []);
  const { datas, loading } = useFetch("/conversations");
  const { user_data } = userData();
  const [conversationSelected, setConversationSelected] = useState(null);
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [fooEvents, setFooEvents] = useState([]);
  const [friend, setFriend] = useState(null);

  useEffect(() => {
    socket.emit("user-connected", user_data.id);

    // Écouter les messages entrants
    socket.on("receive-message", (data) => {
      if (data.conversationId === conversation._id) {
        setConversationSelected((conversationSelected) => [
          ...conversationSelected,
          data,
        ]);
      }
    });

    // Nettoyage lorsque le composant se démonte
    return () => {
      socket.off("receive-message");
      // socket.disconnect();
    };
  }, []);
  const sendMessage = (senderId, conversationId, text) => {
    console.log("conv Id: " + conversationId);

    const receiverId = friend._id; // Assurez-vous que `friend` est correctement défini
    console.log("receveur:" + receiverId);

    socket.emit("send-message", {
      senderId,
      conversationId,
      text,
      receiverId,
    });
  };

  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(!open);
  };
  return (
    <div className="h-screen overflow-hidden flex flex-col">
      <div className="w-full h-full flex">
        <ListConversations
          open={open}
          setOpen={setOpen}
          setConversation={setConversationSelected}
          user_data={user_data}
          conversations={datas}
          setFriend={setFriend}
        />
        <div className="w-full h-screen flex flex-col">
          <Navbar
            handleOpen={handleOpen}
            online={
              conversationSelected ? conversationSelected.isOnline : false
            }
            titre={conversationSelected ? friend.name : "Messagerie"}
          />
          {conversationSelected ? (
            <div className="w-full h-screen overflow-auto flex justify-center">
              <MessagesCont conversation={conversationSelected} />
            </div>
          ) : (
            <div className="w-full lg:w-2/3 flex flex-col gap-2 mb-48 px-4 lg:px-8 pt-10">
              <div className="w-full h-full flex flex-col gap-8 justify-center items-center text-base font-semibold text-center opacity-60 hover:opacity-100">
                <img src="/wink.png" className="w-28 h-28" alt="" />
                SELECTIONNEZ UNE CONVERSATION POUR COMMENCER A DISCUTER
              </div>
            </div>
          )}
          {conversationSelected && (
            <InputCont
              sendMessage={sendMessage}
              user_data={user_data}
              data={conversationSelected}
            />
          )}
        </div>
      </div>
    </div>
  );
}
