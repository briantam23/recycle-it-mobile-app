import 'react-native';
import * as React from 'react';
import App from '../App';
import { Provider } from 'react-redux';
import store from '../store/index';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import * as renderer from 'react-test-renderer';
import NavigationTestUtils from 'react-navigation/NavigationTestUtils';


describe('App snapshot', () => {
  jest.useFakeTimers();
  beforeEach(() => {
    NavigationTestUtils.resetInternalState();
  });

  it('renders the loading screen', async () => {
    const tree = renderer.create(<App />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders the root without loading screen', async () => {
    const tree = renderer.create(<App skipLoadingScreen />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('renders the home screen', async () => {
    const tree = renderer.create(
      <Provider store={ store }>
        <HomeScreen />
      </Provider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('renders the map screen', async () => {
    const tree = renderer.create(
      <Provider store={ store }>
        <LoginScreen />
      </Provider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  })
});
