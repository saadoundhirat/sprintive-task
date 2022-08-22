import "../styles/App.css";
import Box from "@mui/material/Box";
import { useCallback, useEffect, useRef, useState } from "react";
import Header from "./components/header/Header";
import MasonryImageList from "./components/masonry-image-list/MasonryImageList";
import useFetch from "./hooks/useFetch";
import SnackbarMessage from "./components/snackbar/SnackbarMessage";

// Yl9KaLAhCpFk6nZMVBENhRQKsk1jbFczlbdCrI9zE1I

function App() {
  const [page, setPage] = useState(1);
  const triggerRef = useRef(null);
  const { loading, error, list } = useFetch(page);

  console.log('error', error);

  const handleObserver = useCallback((entries) => {
    const target = entries[0];
    if (target.isIntersecting) {
      setPage((prev) => prev + 1);
    }
  }, []);

  useEffect(() => {
    const option = {
      root: null,
      rootMargin: "20px",
      threshold: 0,
    };
    const observer = new IntersectionObserver(handleObserver, option);
    if (triggerRef.current) observer.observe(triggerRef.current);
  }, [handleObserver]);

  return (
    <Box sx={{ width: "100%", display: "flex", flexDirection: "column" }}>
      <Header />

      {error && <SnackbarMessage open message={error} variant='error' />}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          maxWidth: "1320px",
          margin: "0 auto",
          height: "auto",
        }}
      >
        <MasonryImageList list={list} loading={loading} />
      </Box>
      <Box ref={triggerRef} />
    </Box>
  );
}

export default App;
