import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const VolumeBar = ({
  leave, val, change, visible, song,
}) => (
  <Container style={{ visibility: visible }} onMouseLeave={leave}>
    <Slider type="range" min="0" max="100" value={val} id="vol" name="volume" onChange={(e) => { change(e, song); }} />
  </Container>
);

const Container = styled.div`
  position: absolute;
  background-color: #f2f2f2;
  border: 1px solid transparent;
  outline: 0;
  width: 92px;
  height: 30px;
  z-index: 11;
  bottom: 75px;
  left: 810px;
  transform: rotate(270deg);
  overflow: hidden;
  outline: 0;
`;

const Slider = styled.input`
  -webkit-appearance: none;
  background-color: #ccc;
  width: 90px;
  height: 2px;
  bottom: 13px;
  position: absolute;
  &::-webkit-slider-thumb {
      -webkit-appearance: none;
      background-color: #f50;
      width: 8px;
      height: 8px;
      border-radius: 100%;
  }
`;

VolumeBar.propTypes = {
  leave: PropTypes.func.isRequired,
  val: PropTypes.number.isRequired,
  change: PropTypes.func.isRequired,
  visible: PropTypes.string.isRequired,
  song: PropTypes.instanceOf(Element).isRequired,
};

export default VolumeBar;
