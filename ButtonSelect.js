import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from 'react-native';
import Button from './Button';
import Block from './Block';
import Modal from './modal/index';
import { theme } from "../src/res";
import {arrayIsEmpty, objectIsNull, stringIsEmpty} from './Functions';
import {Input} from '.';

export default class ButtonSelect extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.defaultState();
    this.hide = this.hide.bind(this);
    this.show = this.show.bind(this);
  }

  defaultState = () => {
    return {
      visible: false,
      value: '',
      layout: {},
      array: this.props.array,
    };
  };

  show(input) {
    this.setState({
      visible: true,
    });
  }
  hide() {
    this.setState({
      visible: false,
    });
  }
  setArray(array) {
    let newState = this.state;
    if (this.state.visible === false) {
      newState = {...newState, visible: true};
    }

    newState = {...newState, array: array};
    console.warn('ddad', newState);
    this.setState(newState);
  }

  render() {
    const {visible, layout, value, array} = this.state;
    const {
      style,
      title,
      styleTitle,
      onPressItem,
      styleItem,
      styleTitleItem,
      isSearch,
    } = this.props;
    let items = [];
    if (!arrayIsEmpty(array)) {
      for (let i = 0; i < array.length; i++) {
        let index = i;
        items.push(
          <TouchableOpacity
            style={{
              paddingHorizontal: theme.sizes.base,
              paddingVertical: theme.sizes.base / 3,
              borderBottomWidth:
                index + 1 === array.length ? 0 : StyleSheet.hairlineWidth,
              borderBottomColor: theme.colors.black,
              ...styleItem,
            }}
            onPress={() => {
              this.hide();
              this.setState({
                value: array[index],
              });
              if (!objectIsNull(onPressItem)) {
                onPressItem(array[index], index);
              }
            }}>
            <Text
              style={{
                fontSize: theme.sizes.body,
                color: theme.colors.black,
                ...styleTitleItem,
              }}>
              {array[index]}
            </Text>
          </TouchableOpacity>,
        );
      }
    }
    return (
      <View
        onLayout={(e) => {
          this.setState({
            layout: e.nativeEvent.layout,
          });
        }}>
        <Button
          style={{
            backgroundColor: theme.colors.black3,
            marginHorizontal: theme.sizes.base,
            ...style,
          }}
          onPress={() => {
            if (visible === false) {
              this.show();
            } else {
              this.hide();
            }
          }}>
          <Text
            style={{
              fontSize: theme.sizes.header,
              color: theme.colors.white,
              paddingHorizontal: theme.sizes.base,
              opacity: !stringIsEmpty(value) ? 1 : 0.6,
              ...styleTitle,
            }}>
            {!stringIsEmpty(value) ? value : title}
          </Text>
        </Button>

        <Modal
          animationIn={'fadeIn'}
          animationOut={'fadeOut'}
          backdropOpacity={0}
          isVisible={visible}
          style={{justifyContent: 'flex-start', alignItems: 'stretch'}}
          onBackdropPress={this.hide}>
          <Block
            flex={false}
            style={{
              backgroundColor: theme.colors.gray,
              marginTop: layout.y + theme.navigate.height + layout.height - 20,
            }}>
            {!objectIsNull(isSearch) && (
              <Input
                ref="input"
                autoFocus={true}
                onChangeText={(text) => {
                  this.setState({
                    value: text,
                  });
                  var searchItems = this.props.array.filter((item, index) => {
                    if (item.indexOf(text.toLowerCase()) > -1) {
                      return item;
                    }
                  });
                  if (stringIsEmpty(text)) {
                    searchItems = [];
                  }
                  this.setArray(searchItems);
                }}
                style={{
                  paddingHorizontal: theme.sizes.base,
                  paddingVertical: theme.sizes.base,
                  fontSize: theme.sizes.header,
                  color: theme.colors.white,
                  opacity: !stringIsEmpty(value) ? 1 : 0.6,
                  ...styleTitle,
                }}>
              </Input>
            )}

            {items}
          </Block>
        </Modal>
      </View>
    );
  }
}
