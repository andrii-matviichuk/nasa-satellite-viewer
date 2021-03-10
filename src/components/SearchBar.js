import { useRef, useState, useCallback } from 'react';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';
import 'mapbox-gl/dist/mapbox-gl.css';
import 'react-map-gl-geocoder/dist/mapbox-gl-geocoder.css';
import MapGL from 'react-map-gl';
import Geocoder from 'react-map-gl-geocoder';

function SearchBar({
  map,
  setSatelliteImageIsLoading,
  setSatelliteImageURL,
  searchHistory,
  setSearchHistory,
}) {
  const [searchDate, setSearchDate] = useState(
    new Date().toISOString().split('T')[0]
  );

  const defaultViewport = {
    latitude: 37.7577,
    longitude: -122.4376,
  };
  const geocoderContainerRef = useRef();
  const mapRef = useRef();

  // Handlers
  const handleViewportChange = useCallback(
    async (newViewport) => {
      map.setView([newViewport.latitude, newViewport.longitude], 12);
      setSatelliteImageIsLoading(true);
      try {
        const date = searchDate;
        const data = await axios.get(
          // I would normally use the commented line below, but as this is a test task,
          // I've included my API Key in the code, so the person who will
          // check this don't have to sing up for a new API key.
          //`https://api.nasa.gov/planetary/earth/imagery?api_key=${process.env.REACT_APP_NASA_API_KEY}&lat=${newViewport.latitude}&lon=${newViewport.longitude}&date=${date}&dim=0.1`
          `https://api.nasa.gov/planetary/earth/imagery?api_key=XXWcDCjYg89Dp4RcVQdUvZPfijE2jxLUqnS7Wvdi&lat=${newViewport.latitude}&lon=${newViewport.longitude}&date=${date}&dim=0.1`
        );
        setSatelliteImageURL(data.config.url);
        setSearchHistory([
          {
            img: data.config.url,
            viewport: [newViewport.latitude, newViewport.longitude],
            date,
          },
          ...searchHistory,
        ]);
      } catch (err) {
        setSatelliteImageURL('');
        setSatelliteImageIsLoading(false);
      }
    },
    [
      map,
      searchDate,
      setSatelliteImageIsLoading,
      searchHistory,
      setSearchHistory,
      setSatelliteImageURL,
    ]
  );

  return (
    <div className="search_bar_container">
      <div className="geocoder_container" ref={geocoderContainerRef} />
      <Tooltip title="The closest satellite photo to the specified date will be displayed">
        <TextField
          className="date_text_field"
          id="date"
          type="date"
          defaultValue={searchDate}
          onChange={(event) => setSearchDate(event.target.value)}
        />
      </Tooltip>
      <MapGL
        style={{ display: 'none' }}
        ref={mapRef}
        {...defaultViewport}
        // I would normally use the commented line below, but as this is a test task,
        // I've included my API Key in the code, so the person who will
        // check this don't have to sing up for a new API key.
        //mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_API_KEY}
        mapboxApiAccessToken="pk.eyJ1IjoiemFjb3phY28yNyIsImEiOiJja20yamkzMWsxd3B1MnFseW5mYnY0MmtnIn0.BLKP9Se1SHztyPvo18N0fA"
      ></MapGL>
      <Geocoder
        mapRef={mapRef}
        containerRef={geocoderContainerRef}
        onViewportChange={handleViewportChange}
        //mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_API_KEY}
        mapboxApiAccessToken="pk.eyJ1IjoiemFjb3phY28yNyIsImEiOiJja20yamkzMWsxd3B1MnFseW5mYnY0MmtnIn0.BLKP9Se1SHztyPvo18N0fA"
        placeholder="Search location..."
      />
    </div>
  );
}

export default SearchBar;
