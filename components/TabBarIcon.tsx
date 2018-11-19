import React from 'react';
import { Icon } from 'expo';

import Colors from '../constants/Colors';

interface TabBarIconProps {
  name: string;
  focused: string;
}

export default class TabBarIcon extends React.Component <TabBarIconProps> {
  render() {
    return (
      <Icon.Ionicons
        name={this.props.name}
        size={26}
        style={{ marginBottom: -3 }}
        color={this.props.focused ? Colors.tabIconSelected : Colors.tabIconDefault}
      />
    );
  }
}