import React, {Component} from 'react';

import {View, TextInput, TouchableOpacity} from 'react-native';
import Sizes from './Sizes';
import Icon from 'react-native-vector-icons/Feather';
import Icon2 from 'react-native-vector-icons/FontAwesome5';
import {stringIsEmpty} from './Functions';
export default class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
    };
  }
  render() {
    const {onChangeText, style, styleInput} = this.props;
    const {value} = this.state;
    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          height: Sizes.s80,
          backgroundColor: '#e2e3e8',
          justifyContent: 'center',
          alignItems: 'center',
          paddingLeft: Sizes.s20,
          borderRadius: Sizes.s10,
          ...style,
        }}>
        <Icon name="search" size={Sizes.s40} color={'#717171'} />
        <TextInput
          value={value}
          placeholder={'Tìm kiếm'}
          onChangeText={text => {
            this.setState({
              value: text,
            });
            onChangeText(text);
          }}
          style={{
            flex: 1,
            height: Sizes.s80,
            paddingVertical: 0,
            marginLeft: Sizes.s10,
            fontSize: Sizes.h28,
            color: "#000000",
            fontWeight: "400",
            ...styleInput,
          }}
        />
        {!stringIsEmpty(value) && (
          <TouchableOpacity
            onPress={() => {
              this.setState({
                value: '',
              });
              onChangeText('');
            }}
            style={{padding: Sizes.s20}}>
            <Icon2
              solid
              name="times-circle"
              size={Sizes.s30}
              color={'#717171'}
            />
          </TouchableOpacity>
        )}
      </View>
    );
  }
}
