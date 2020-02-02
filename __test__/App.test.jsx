import React from 'react';
import { shallow } from 'enzyme';
import App from '../react-client/src/components/App';

describe('Unit tests', () => {
  test('should render the app component on the screen', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.exists()).toEqual(true);
  });

  // test('should have audio source loaded', () => {
  //   const wrapper = shallow(<App />);
  //   const state = wrapper.state('initial');
  //   console.log(state);
  // });

  test('should query db for songs on componentDidMount', () => {
    const wrapper = shallow(<App />);
    const mock = jest.fn();

    wrapper.instance().getSongs = mock;
    wrapper.instance().forceUpdate();
    wrapper
      .instance()
      .componentDidMount();
    expect(mock).toHaveBeenCalled();
  });
});
