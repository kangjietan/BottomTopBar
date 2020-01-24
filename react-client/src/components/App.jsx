import React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {}
  }

  render() {
    return (
      <div className="playback-bar">
        <audio controls>

        </audio>
      </div>
    );
  }
}

export default App;
