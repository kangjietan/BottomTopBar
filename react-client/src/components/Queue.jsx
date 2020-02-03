import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Queue = ({ visible }) => (
  <QueueContainer style={{ visibility: visible }}>
    <Background>
      <Panel>
        <Title>Next up</Title>
        <Clear>Clear</Clear>
        <Exit />
      </Panel>
    </Background>
  </QueueContainer>
);

const QueueContainer = styled.div`
  position: absolute;
  bottom: 54px;
  right: 8px;
  width: 480px;
  height: 660px;
  max-height: calc(100vh - 120px);
`;

const Background = styled.div`
  height: 100%;
  position: relative;
  box-shadow: 0 0 4px rgba(0,0,0,.25);
  background-color: #fff;
`;

const Panel = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  box-sizing: border-box;
  border-bottom: 1px solid #e5e5e5;
  padding: 9px 24px;
  height: 64px;
  cursor: pointer;
  font-family: Interstate,
                Lucida Grande,
                Lucida Sans Unicode,
                Lucida Sans,Garuda,
                Verdana,Tahoma,
                sans-serif;
`;

const Title = styled.div`
  font-size: 16px;
  flex-grow: 1;
  line-height: 46px;
  font-weight: 100;
`;

const Clear = styled.button`
  margin-right: 16px;
  height: 26px;
  padding: 2px 11px 2px 10px;
  border: 1px solid #e5e5e5;
  border-radius: 3px;
  background-color: #fff;
  cursor: pointer;
  color: #333;
  font-size: 14px;
  line-height: 20px;
`;

const Exit = styled.button`
  background-image: url("buttons/exit.svg");
  height: 46px;
  background-position: 50%;
  background-repeat: no-repeat;
  background-size: 24px 24px;
  border: 0;
  font: 0/0 a;
  text-shadow: none;
  color: transparent;
  background-color: transparent;
  transition: none;
  padding-top: 3px;
  padding-bottom: 3px;
  cursor: pointer;
`;

Queue.propTypes = {
  visible: PropTypes.string.isRequired,
};

export default Queue;
