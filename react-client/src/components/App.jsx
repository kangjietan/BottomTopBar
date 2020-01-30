import React from 'react';
import styled from 'styled-components';
import axios from 'axios';

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
  cursor: pointer;
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

const Volume = styled(Button)`
  background-image: url("buttons/volume.svg");
  padding: 10px;
  margin-bottom: 15px;
`;

const Heart = styled(Button)`
  background-image: url("buttons/heart.svg");
`;

const Queue = styled(Button)`
  background-image: url("buttons/queue.svg");
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
      initial: [], // Initial load of songs
      song: '', // song url to load as audio source
      image: '', // song image to load as img
      seeking: 0, // Seeking time
      volume: 100, // Seeking time
      pop: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.popUpVolume = this.popUpVolume.bind(this);
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
    axios.get('http://localhost:3000/initial')
      .then((res) => {
        console.log(res);
        this.setState({
          initial: res.data,
        }, () => { this.setState({ song: res.data[0] }); });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  popUpVolume() {
    this.setState((state) => ({ pop: !state.pop }));
  }

  render() {
    const {
      seeking, volume, pop, initial, song,
    } = this.state;
    const visibility = pop ? 'visible' : 'hidden';

    return (
      <div className="playback-bar">
        {/* <div className="player-container"> */}
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
                <input type="range" min="1" max="100" value={seeking} id="bar" name="seeking" onChange={this.handleChange} />
              </div>
              <End>3:50</End>
            </div>
            <div>
              <div className="volume">
                <Volume onMouseEnter={this.popUpVolume} />
                <div style={{ visibility }} className="volume-slider-container" onMouseLeave={this.popUpVolume}>
                  <input type="range" min="0" max="100" value={volume} id="vol" name="volume" onChange={this.handleChange} />
                </div>
              </div>
            </div>
            <div className="song-info">
              <div className="song-img">
                <img src={song.song_image} alt="test" />
              </div>
              <div className="artist-title">
                <div className="artist">{song.artist}</div>
                <div className="title">{song.title}</div>
              </div>
              <Heart />
              <Queue />
            </div>
          </div>
        </section>
        {/* </div> */}
      </div>
    );
  }
}

export default App;
