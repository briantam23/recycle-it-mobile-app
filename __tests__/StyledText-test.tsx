import 'react-native';
import * as React from 'react';
import TabBarIcon from '../components/TabBarIcon';
/* import SignUp from '../components/SignUp';
import { Provider } from 'react-redux';
import store from '../store/index'; */
import * as renderer from 'react-test-renderer';


it('TabBarIcon renders correctly', () => {
  const tree = renderer.create(<TabBarIcon />).toJSON();
  expect(tree).toMatchSnapshot();
});
/* it('SignUp renders correctly', () => {
  const tree = renderer.create(
    <Provider store={ store }>
      <SignUp />
    </Provider>
  ).toJSON();
  expect(tree).toMatchSnapshot();
}) */