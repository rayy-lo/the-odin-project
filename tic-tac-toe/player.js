const playerFactory = (marker) => {
  const _marker = marker;

  const getMarker = () => {
    return _marker;
  };

  return {
    getMarker,
  };
};
