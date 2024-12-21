import { useEffect, useState } from "react";
import axios from "axios";

export function useConversations(params) {
  const [datas, setDatas] = useState([]);

  useEffect(() => {
    const fetchMessages = async (params) => {
      const { datas } = await axios.get("http://localhost:10000/conversations");
      setDatas(datas);
    };
  }, []);

  return {
    datas,
  };
}
