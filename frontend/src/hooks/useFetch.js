import { useEffect, useState } from "react";
import { api } from "../config/baseApi";

export const useFetch = (url) => {
  const [datas, setDatas] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchDatas = async () => {
      api
        .get(url)
        .then((res) => {
          console.log(res.data);
          setDatas(res.data);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => setLoading(false));
    };
    fetchDatas();
  }, []);

  return {
    datas,
    loading,
  };
};
