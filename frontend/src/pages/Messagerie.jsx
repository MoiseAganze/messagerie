import { useEffect, useState } from "react";
import { Navbar } from "../components/Nav";
import ListConversations from "./ListConversations";
import { socket } from "../socket";
import InputCont from "../components/InputMessage";
import MessagesCont from "../components/MessagesCont";
import axios from "axios";
export default function Messagerie() {
  const [datas, setDatas] = useState([]);
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [fooEvents, setFooEvents] = useState([]);
  const sendMessage = async (mess) => {
    socket.emit("send_message", {
      isSender: false,
      text: mess,
      sender: {
        id: "2bd34s7q",
        name: "Jean",
      },
      date: new Date(),
      status: "vu",
    });
  };

  useEffect(() => {
    const fetchMessages = async () => {
      const token = "tokenxxx";
      const { data } = await axios.get(
        "http://localhost:10000/conversations/aldlasldael",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setDatas(data);
      console.log(data);
    };
    fetchMessages();
  }, []);

  useEffect(() => {
    // Écouter les messages entrants du serveur
    socket.on("receive_message", (data) => {
      console.log(data);
      setDatas([...datas, data]);
    });

    // Nettoyer l'effet en supprimant l'écouteur d'événements lorsque le composant se démonte
    return () => {
      socket.off("receive_message");
    };
  }, []);
  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    function onFooEvent(value) {
      setFooEvents((previous) => [...previous, value]);
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("foo", onFooEvent);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("foo", onFooEvent);
    };
  }, []);
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
          conversations={datas}
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
          {conversationSelected && <InputCont sendMessage={sendMessage} />}
        </div>
      </div>
    </div>
  );
}
