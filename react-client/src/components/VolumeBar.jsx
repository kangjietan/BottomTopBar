import React from 'react';
import PropTypes from 'prop-types';

const VolumeBar = ({
  leave, val, change, visible, song,
}) => (
  <div style={{ visibility: visible }} className="volume-slider-container" onMouseLeave={leave}>
    <input type="range" min="0" max="100" value={val} id="vol" name="volume" onChange={(e) => { change(e, song); }} />
  </div>
);

VolumeBar.propTypes = {
  leave: PropTypes.func.isRequired,
  val: PropTypes.number.isRequired,
  change: PropTypes.func.isRequired,
  visible: PropTypes.string.isRequired,
  song: PropTypes.instanceOf(Element).isRequired,
};

export default VolumeBar;
