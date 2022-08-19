import "./App.css";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";

function App() {
  const KEY = `${process.env.REACT_APP_UNSPLASH_ACCESS_KEY}`;
  console.log(KEY);
  return (
    <Container maxWidth="lg">
      <Box sx={{ bgcolor: "#cfe8fc", height: "100vh" }} />
    </Container>
  );
}

export default App;
