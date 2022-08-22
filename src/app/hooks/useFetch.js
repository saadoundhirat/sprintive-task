import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import _ from "lodash";

function useFetch(page) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [list, setList] = useState([]);

  const sendQuery = useCallback(async () => {
    try {
      await setLoading(true);
      await setError(null);
      const res = await axios.get(
        `https://api.unsplash.com/photos?client_id=${process.env.REACT_APP_UNSPLASH_ACCESS_KEY}&page=${page}&per_page=8`
      );
      await setList((prev) => _.unionBy(prev, res.data, "id"));
      await setLoading(false);
    } catch (err) {
      await setLoading(false);
      await setError(err.response.data.errors[0] || err.message);
    }
  }, [page]);

  useEffect(() => {
    sendQuery(page);
  }, [sendQuery, page]);

  console.log("image list", list);
  return { loading, error, list };
}

export default useFetch;
