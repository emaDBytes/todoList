import "./App.css";
import Container from "@mui/material/Container";
import { Link, Outlet } from "react-router-dom";
import { Stack } from "@mui/material"; // Importing Stack for spacing

function App() {
  return (
    <div>
      <nav>
        <Stack direction="row" spacing={2} justifyContent="center">
          <Link to="/">HOME</Link>
          <Link to="/todolist">TODOS</Link>
        </Stack>
      </nav>
      <Container maxWidth="lg">
        <Outlet />
      </Container>
    </div>
  );
}

export default App;
