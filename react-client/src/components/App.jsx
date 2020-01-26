import React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {}
  }

  render() {
    return (
      <div className="playback-bar">
        <section className="player">
          <div className="buttons">
            <button id="back" type="button"/>
            <button id="play" type="button"/>
            <button id="forward" type="button"/>
            <button id="shuffle" type="button"/>
            <button id="repeat" type="button"/>
          </div>
          <div className="playback-background"></div>
        </section>
      </div>
    );
  }
}

export default App;
