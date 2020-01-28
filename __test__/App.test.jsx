import React from 'react';
import { shallow } from 'enzyme';
import App from '../react-client/src/components/App';

describe('Unit tests', () => {
  test('should render the app component on the screen', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.exists()).toEqual(true);
  });
});
