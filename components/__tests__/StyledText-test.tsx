import 'react-native';
import * as React from 'react';
import { MonoText } from '../StyledText';
import TabBarIcon from '../TabBarIcon';
import SignUp from '../SignUp';
import { Provider } from 'react-redux';
import store from '../../store/index';
import * as renderer from 'react-test-renderer';

it('renders correctly', () => {
  const tree = renderer.create(<MonoText>Snapshot test!</MonoText>).toJSON();
  expect(tree).toMatchSnapshot();
});
it('TabBarIcon renders correctly', () => {
  const tree = renderer.create(<TabBarIcon />).toJSON();
  expect(tree).toMatchSnapshot();
});
it('SignUp renders correctly', () => {
  const tree = renderer.create(
    <Provider store={ store }>
      <SignUp />
    </Provider>
  ).toJSON();
  expect(tree).toMatchSnapshot();
})