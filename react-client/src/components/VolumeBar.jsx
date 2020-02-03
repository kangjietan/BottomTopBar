import React from 'react';
import PropTypes from 'prop-types';

const VolumeBar = ({
  leave, val, change, visible, song
}) => (
  <div style={{ visibility: visible }} className="volume-slider-container" onMouseLeave={leave}>
    <input type="range" min="0" max="100" value={val} id="vol" name="volume" onChange={(e) => { change(e, song); }} />
  </div>
);

export default VolumeBar;
