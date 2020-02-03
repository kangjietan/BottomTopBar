import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Progress = ({
  val, change, song,
}) => (
  <Container>
    <Slider type="range" min="0" max="100" value={val} id="bar" name="seeking" onChange={(e) => { change(e, song); }} />
  </Container>
);

const Container = styled.div`
  line-height: 40px;
  flex-grow: 1;
  margin: 0 10px;
  width: 512px;
`;

const Slider = styled.input`
  -webkit-appearance: none;
  background-color: #ccc;
  height: 1px;
  margin: 0 auto;
  width: 100%;
  &::-webkit-slider-thumb {
      -webkit-appearance: none;
      border: 1px solid #f50;
      background-color: #f50;
      width: 8px;
      height: 8px;
      border-radius: 100%;
      box-sizing: border-box;
      margin-left: -4px;
  }
`;

Progress.propTypes = {
  val: PropTypes.number.isRequired,
  change: PropTypes.func.isRequired,
  song: PropTypes.instanceOf(Element).isRequired,
};

export default Progress;
