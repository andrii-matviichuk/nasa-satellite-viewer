import Loader from 'react-loader-spinner';

function SatelliteImage({
  satelliteImageURL,
  satelliteImageIsLoading,
  setSatelliteImageIsLoading,
}) {
  return (
    <div className="satellite_image_container">
      <Loader
        style={{ display: satelliteImageIsLoading ? 'block' : 'none' }}
        type="Circles"
        color="#00BFFF"
        height={80}
        width={80}
      />
      {satelliteImageURL.length > 0 ? (
        <img
          src={satelliteImageURL}
          alt="from satellite of selected location"
          onLoad={() => setSatelliteImageIsLoading(false)}
          style={{ display: !satelliteImageIsLoading ? 'block' : 'none' }}
        />
      ) : (
        <h2 style={{ display: !satelliteImageIsLoading ? 'block' : 'none' }}>
          No satellite image for selected location and date.
        </h2>
      )}
    </div>
  );
}

export default SatelliteImage;
