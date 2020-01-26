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
            <button>Go</button>
          </div>
          <div className="playback-background"></div>
        </section>
      </div>
    );
  }
}

export default App;
