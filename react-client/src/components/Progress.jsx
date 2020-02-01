import React from 'react';
import PropTypes from 'prop-types';

const Progress = ({ val, change, song }) => (
  <div className="bar-container">
    <input type="range" min="0" max="100" value={val} id="bar" name="seeking" onChange={(e) => { change(e, song); }} />
  </div>
);

Progress.propTypes = {
  val: PropTypes.number.isRequired,
  change: PropTypes.func.isRequired,
};

export default Progress;
