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
        `https://api.unsplash.com/photos?client_id=Yl9KaLAhCpFk6nZMVBENhRQKsk1jbFczlbdCrI9zE1I&page=${page}&per_page=8`
      );
      console.log(res.data);
      const newPhotos = await res.data.map((pho) => {
        return {
          id: pho.id,
          url: pho.urls.regular,
          description: pho.description,
          width: pho.width,
          height: pho.height,
          links: { ...pho.links },
          likes: pho.likes,
          views: pho.views,
          downloads: pho.downloads,
          user: {
            displayName: `${pho.user.first_name} ${pho.user.last_name}`,
          },
        };
      });
      await setList((prev) => _.unionBy(prev, newPhotos, "id"));
      await setLoading(false);
    } catch (err) {
      await setLoading(false);
      await setError(err.response.data.errors[0] || err.message);
    }
  }, [page]);

  useEffect(() => {
    sendQuery(page);
  }, [sendQuery, page]);

  return { loading, error, list };
}

export default useFetch;
