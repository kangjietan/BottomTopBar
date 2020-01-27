import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
  position: relative;
  visibility: visible;
  background-repeat: no-repeat;
  background-position: 40%;
  background-color: transparent;
  width: 24px;
  height: 100%;
  margin: 0 0 0 12px;
  border: 0;
`;

const Back = styled(Button)`
  background-image: url("buttons/back.svg");
`;
const Play = styled(Button)`
  background-image: url("buttons/play.svg");
`;
const Forward = styled(Button)`
  background-image: url("buttons/forward.svg");
`;
const Shuffle = styled(Button)`
  background-image: url("buttons/shuffle_black.svg");
`;
const Repeat = styled(Button)`
  background-image: url("buttons/repeat_none.svg");
`;

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {}
  }

  render() {
    return (
      <div className="playback-bar">
        <section className="player">
          <div className="playback-background" />
          <div className="playcontrol-buttons">
            <Back onClick={()=>{console.log('It works')}}/>
            <Play />
            <Forward />
            <Shuffle />
            <Repeat />
            <div className="progress">
              <div>Current Time</div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default App;
