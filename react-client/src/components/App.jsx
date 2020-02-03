import React from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Queue from './Queue.jsx';
import Progress from './Progress.jsx';
import VolumeBar from './VolumeBar.jsx';
import Image from './Image.jsx';
import ArtistTitle from './ArtistTitle.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      initial: [], // Initial load of songs
      currentIdx: 0, // Current song in array
      song: '', // song url to load as audio source
      seeking: 0, // Seeking time
      volume: 100, // Volume of audio
      previousVol: 100, // Volume that was altered
      pop: false, // Pop up the volume slider
      queuepop: false, // Pop up the queue
      playing: false, // State of the song
      shuffle: false, // Shuffle songs
      loop: false, // replay song
      loopAll: false, // replay song infinitely
      mute: false, // set audio volume to 0
      startTime: '0:00', // Current time
      endTime: '0:00', // Duration of song
    };

    this.handleChange = this.handleChange.bind(this);
    this.popUpVolume = this.popUpVolume.bind(this);
    this.popUpQueue = this.popUpQueue.bind(this);
    this.playSong = this.playSong.bind(this);
    this.pauseSong = this.pauseSong.bind(this);
    this.goBack = this.goBack.bind(this);
    this.skip = this.skip.bind(this);
    this.repeat = this.repeat.bind(this);
    this.repeatAll = this.repeatAll.bind(this);
    this.repeatNone = this.repeatNone.bind(this);
    this.shuffle = this.shuffle.bind(this);
    this.mute = this.mute.bind(this);
    this.check = (cb, wait) => {
      setInterval(cb, wait);
    };
    this.random = () => {
      // Idx between 0 and initial array length
      const { initial } = this.state;
      const randomIdx = Math.floor(Math.random() * initial.length);
      return randomIdx;
    };
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
    this.getSongs();
  }

  getSongs() {
    axios.get('http://localhost:3000/initial')
      .then((res) => {
        // console.log(res);
        this.setState({
          initial: res.data,
        }, () => {
          const { initial, currentIdx } = this.state;
          this.setState({ song: initial[currentIdx] });
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  handleChange(event, param) {
    const { name, value } = event.target;
    const song = param;
    this.setState({
      [name]: value,
    }, () => {
      // Change song time to slider value
      if (name === 'seeking') {
        song.currentTime = (value / 100) * song.duration;
      } else if (name === 'volume') {
        if (value > 0) {
          this.setState({ mute: false });
        }
        // Change song volume to slider value
        song.volume = value / 100;
        // Keep track of previous volume setting for when user unmutes
        this.setState({ previousVol: value });
      }
    });
  }

  popUpVolume() {
    // Change visibility of the volume slider
    this.setState((state) => ({ pop: !state.pop }));
  }

  popUpQueue() {
    // Change visibility of the queue pop up
    this.setState((state) => ({ queuepop: !state.queuepop }));
  }

  playSong(song) {
    // Set state to true, start interval, and play song
    this.setState({ playing: true }, () => {
      const callback = () => {
        // Constantly update startTime and slider value
        const currentSeeking = (song.currentTime / song.duration) * 100;
        const currentStartTime = Math.floor(song.currentTime);

        song.ontimeupdate = () => {
          this.setState({ seeking: currentSeeking }, () => {
            if (song.ended) {
              this.setState({ playing: false });
            }
          });
          this.updateTime(currentStartTime);
        };
      };
      // Set up interval to constantly update startTime and progress bar
      this.check(callback, 500);
      // play song
      song.play();
      // Convert song duration to right format
      this.convertDuration(song.duration);
    });
  }

  pauseSong(song) {
    // Set state to false, clear interval, and pause song
    this.setState({ playing: false }, () => {
      clearInterval(this.check);
      song.pause();
    });
  }

  goBack() {
    // Go back one from current index
    const { currentIdx, initial, shuffle } = this.state;
    if (currentIdx !== 0) {
      // If shuffle is true, generate random idx
      if (shuffle) {
        const randomIdx = this.random();
        this.setState({ currentIdx: randomIdx, song: initial[randomIdx] });
      } else {
        // Otherwise go back one index
        this.setState((state) => ({ currentIdx: state.currentIdx - 1 }), () => {
          this.setState({ song: initial[this.state.currentIdx] });
        });
      }
    }
  }

  skip() {
    // Go forward one from current index
    const { initial, currentIdx, shuffle } = this.state;
    // If shuffle is true, generate random idx
    if (shuffle) {
      const randomIdx = this.random();
      this.setState({ currentIdx: randomIdx, song: initial[randomIdx] });
    } else {
      // Otherwise go forward one index
      this.setState({ currentIdx: currentIdx + 1 }, () => {
        this.setState({ song: initial[this.state.currentIdx] });
      });
    }
  }

  repeat(song) {
    // Set song loop to true
    this.setState({ loop: true }, () => {
      const { loop } = this.state;
      song.loop = loop;
    });
  }

  repeatAll(song) {
    // To be implemented
    // Loop through all the songs in the array
    // Iterate through each song and playing them
    song.loop = false;
    this.setState({ loopAll: true });
  }

  repeatNone() {
    this.setState({ loop: false, loopAll: false });
  }

  shuffle() {
    this.setState((state) => ({ shuffle: !state.shuffle }));
  }

  mute(song) {
    this.setState((state) => ({ mute: !state.mute }), () => {
      const { mute, previousVol } = this.state;
      if (mute) {
        song.volume = 0;
        this.setState({ volume: 0 });
      } else {
        song.volume = previousVol / 100;
        this.setState({ volume: previousVol });
      }
    });
  }

  // Format time in minutes:seconds -> 1:23
  updateTime(time) {
    const minutes = Math.floor(time / 60).toString();
    let seconds = time % 60;
    seconds = seconds < 10 ? `:0${seconds}` : `:${seconds}`;
    const displayTime = minutes + seconds;
    this.setState({ startTime: displayTime });
  }

  convertDuration(time) {
    const minutes = Math.floor(time / 60).toString();
    let seconds = Math.floor(time % 60);
    seconds = seconds < 10 ? `:0${seconds}` : `:${seconds}`;
    const displayTime = minutes + seconds;
    this.setState({ endTime: displayTime });
  }

  render() {
    const {
      seeking, volume, pop, queuepop, song, playing, startTime, endTime, loop, loopAll, shuffle,
    } = this.state;

    // The audio source. Will use audio properties for functionality.
    const sng = document.getElementById('songsrc');

    // Pop up volume and queue
    const volVisibility = pop ? 'visible' : 'hidden';
    const queueVisibility = queuepop ? 'visible' : 'hidden';

    // Repeat button
    let repeatButton;
    if (loopAll && loop) {
      repeatButton = <RepeatAll onClick={this.repeatNone} />;
    } else if (loop) {
      repeatButton = <RepeatOne onClick={() => { this.repeatAll(sng); }} />;
    } else {
      repeatButton = <Repeat onClick={() => { this.repeat(sng); }} />;
    }

    return (
      <div className="playback-bar">
        <audio src={song.song_url} type="audio/mpeg" id="songsrc">
          <track kind="captions" />
        </audio>
        <section className="player">
          <PlayBackbg />
          <div className="playcontrol-buttons">
            <Back onClick={this.goBack} />
            {playing ? <Pause onClick={() => { this.pauseSong(sng); }} />
              : <Play onClick={() => { this.playSong(sng); }} />}
            <Forward onClick={this.skip} />
            {shuffle ? <ShuffleTrue onClick={this.shuffle} /> : <Shuffle onClick={this.shuffle} />}
            {repeatButton}
            <div className="progress">
              <Start>{startTime}</Start>
              <Progress change={this.handleChange} val={seeking} song={sng} />
              <End>{endTime}</End>
            </div>
            <div className="volume">
              {volume === 0
                ? <Mute onMouseEnter={this.popUpVolume} onClick={() => { this.mute(sng); }} />
                : <Volume onMouseEnter={this.popUpVolume} onClick={() => { this.mute(sng); }} />}
              <VolumeBar
                leave={this.popUpVolume}
                val={volume}
                change={this.handleChange}
                song={sng}
                visible={volVisibility}
              />
            </div>
            <div className="song-info">
              <Image image={song.song_image} />
              <ArtistTitle artist={song.artist} title={song.title} />
              <Heart />
              <Queueb onClick={this.popUpQueue} />
            </div>
            <div style={{ visibility: queueVisibility }} className="queue-container">
              <Queue />
            </div>
          </div>
        </section>
      </div>
    );
  }
}

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

const Pause = styled(Button)`
  background-image: url("buttons/pause.svg");
`;

const Forward = styled(Button)`
  background-image: url("buttons/forward.svg");
`;

const Shuffle = styled(Button)`
  background-image: url("buttons/shuffle_black.svg");
`;

const ShuffleTrue = styled(Button)`
  background-image: url("buttons/shuffle_orange.svg");
`;

const Repeat = styled(Button)`
  background-image: url("buttons/repeat_none.svg");
  margin-right: 20px;
`;

const RepeatOne = styled(Button)`
  background-image: url("buttons/repeat_one.svg");
  margin-right: 20px;
`;

const RepeatAll = styled(Button)`
  background-image: url("buttons/repeat.svg");
  margin-right: 20px;
`;

const Volume = styled(Button)`
  background-image: url("buttons/volume.svg");
  padding: 10px;
  margin-bottom: 15px;
`;

const Mute = styled(Button)`
  background-image: url("buttons/mute.svg");
  padding: 10px;
  margin-bottom: 15px;
`;

const Heart = styled(Button)`
  background-image: url("buttons/heart.svg");
`;

const Queueb = styled(Button)`
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
  text-align: left;
  color: #333;
`;

// Background for whole container
const PlayBackbg = styled.div`
  border-top: 1px solid #cecece;
  background-color: #f2f2f2;
  position: absolute;
  visibility: visible;
  display: block;
  width: 100%;
  height: 100%;
`;

export default App;
