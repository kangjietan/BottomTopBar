import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Image = ({ image }) => (
  <SongImage>
    <img src={image} alt="test" />
  </SongImage>
);

const SongImage = styled.div`
  margin: 0 10px 0 0;
`;

Image.propTypes = {
  image: PropTypes.string.isRequired,
};

export default Image;
