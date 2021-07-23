const playerFactory = (marker, name) => {
  const _marker = marker;
  const _name = name;

  const getMarker = () => {
    return _marker;
  };

  const getName = () => {
    return _name;
  };

  return {
    getMarker,
    getName,
  };
};
