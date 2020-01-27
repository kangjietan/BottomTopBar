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
          <div className="playback-background" />
          <div className="playcontrol-buttons">
            <button id="back" type="button" aria-label="back"/>
            <button id="play" type="button" aria-label="play"/>
            <button id="forward" type="button" aria-label="forward"/>
            <button id="shuffle" type="button" aria-label="shuffle"/>
            <button id="repeat" type="button" aria-label="repeat"/>
          </div>
        </section>
      </div>
    );
  }
}

export default App;
