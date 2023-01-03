// React Query
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

// React Router Dom
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Sass
import "./sass/styles.scss";

// Pages
import Home from "./pages/Home";
import Navbar from "./components/navbar/Navbar";
import MovieDetails from "./pages/MovieDetails";
import TvDetails from "./pages/TvDetails";
import PersonDetails from "./pages/PersonDetails";

const queryClient = new QueryClient();

function App() {
  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movies/:movieId" element={<MovieDetails />} />
            <Route path="/tv/:tvId" element={<TvDetails />} />
            <Route path="/person/:personId" element={<PersonDetails />} />
          </Routes>
        </BrowserRouter>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </div>
  );
}

export default App;
