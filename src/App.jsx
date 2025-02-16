import Layout from './components/Layout/Layout.jsx';
import { MoviesProvider } from './context/MoviesContext.jsx';
import { RatedMoviesProvider } from './context/RatedMoviesContext.jsx';
import { GuestSessionProvider } from './context/GuestSessionContext.jsx';

function App() {
  return (
    <MoviesProvider>
      <RatedMoviesProvider>
        <GuestSessionProvider>
          <Layout />
        </GuestSessionProvider>
      </RatedMoviesProvider>
    </MoviesProvider>
  );
}

export default App;
