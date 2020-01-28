import React from 'react';
import styled from 'styled-components';

// Buttons
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
  margin-right: 20px;
`;

// Timestamps
const Time = styled.div`
  width: 50px;
  height: 46px;
  line-height: 46px;
`;

const Start = styled(Time)`
  text-align: right;
  color: #f50;
`;

const End = styled(Time)`
  text-align; left;
  color: #333;
`;

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      song: '', // song url to load as audio source
      image: '', // song image to load as img
      seeking: 0, // Seeking time
    };

    this.handleChange = this.handleChange.bind(this);
  }

  // Initial call to load player with song and queue with songs.
  // Default behavior of component based on SoundClound does not
  // load queue with songs nor does the player have a song loaded initially.
  // Songs only get added to the queue when user adds them.
  componentDidMount() {
    // If my component needed to add songs
    // Make get request to server
    // load app with songs data that includes
    // link to Amazon S3 where the images and actual song will be served

    // User interacts with songs that are already stored on the app
    // When they play/pause, skip, go back, etc...
  }

  handleChange(event) {
    this.setState({
      seeking: event.target.value,
    });
  }

  render() {
    const { seeking } = this.state;
    return (
      <div className="playback-bar">
        <section className="player">
          <div className="playback-background" />
          <div className="playcontrol-buttons">
            <Back onClick={() => { console.log('It works'); }} />
            <Play />
            <Forward />
            <Shuffle />
            <Repeat />
            <div className="progress">
              <Start>0:00</Start>
              <div className="bar-container">
                <input type="range" min="1" max="100" value={seeking} id="bar" onChange={this.handleChange} />
              </div>
              <End>3:50</End>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default App;
