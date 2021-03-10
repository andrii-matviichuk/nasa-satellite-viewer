import { useState } from 'react';

import SearchBar from './components/SearchBar';
import LeafletMap from './components/LeafletMap';
import SatelliteImage from './components/SatelliteImage';
import SearchHistory from './components/SearchHistory';

import Grid from '@material-ui/core/Grid';

function App() {
  const [map, setMap] = useState(null);
  const [searchHistory, setSearchHistory] = useState([]);
  const [satelliteImageURL, setSatelliteImageURL] = useState('');
  const [satelliteImageIsLoading, setSatelliteImageIsLoading] = useState(false);

  return (
    <Grid container>
      <Grid item xs={12}>
        <SearchBar
          map={map}
          setSatelliteImageIsLoading={setSatelliteImageIsLoading}
          setSatelliteImageURL={setSatelliteImageURL}
          searchHistory={searchHistory}
          setSearchHistory={setSearchHistory}
        />
      </Grid>
      <Grid item xs={12} sm={8}>
        <LeafletMap setMap={setMap} />
      </Grid>
      <Grid container item xs={12} sm={4}>
        <Grid item xs={12}>
          <SatelliteImage
            searchHistory={searchHistory}
            satelliteImageURL={satelliteImageURL}
            satelliteImageIsLoading={satelliteImageIsLoading}
            setSatelliteImageIsLoading={setSatelliteImageIsLoading}
          />
        </Grid>
        <Grid item xs={12}>
          <SearchHistory
            searchHistory={searchHistory}
            setSearchHistory={setSearchHistory}
          />
        </Grid>
      </Grid>
    </Grid>
  );
}

export default App;
