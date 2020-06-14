import React, {Component} from 'react';
import {StyleSheet, View, Text, TextInput} from 'react-native';

import Block from './Block';
import Button from './Button';
import ViewKeyBoard from './ViewKeyBoard';
import Modal from './modal/index';

import {stringIsEmpty, objectIsNull} from './Functions';
import Sizes from './Sizes';
export default class DialogAlert extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.defaultState();
    this.hide = this.hide.bind(this);
    this.show = this.show.bind(this);
    this.data = {};
    this.theme = this.props.theme;
  }

  defaultState = () => {
    return {
      visible: false,
      title: '',
      des: '',
      button: {},
      view: undefined,
    };
  };

  show(input) {
    let newState = this.defaultState();
    if (!stringIsEmpty(input.title)) {
      newState = {...newState, title: input.title};
    } else {
      if (!stringIsEmpty(this.props.input.title)) {
        newState = {...newState, title: this.props.input.title};
      }
    }

    if (!objectIsNull(this.props.input.button)) {
      let _button = newState.button;
      if (!objectIsNull(this.props.input.button.left)) {
        _button = {..._button, left: this.props.input.button.left};
      }
      if (!objectIsNull(this.props.input.button.right)) {
        _button = {..._button, right: this.props.input.button.right};
      }
      newState = {...newState, button: _button};
    }

    if (!objectIsNull(input.button)) {
      let _button = newState.button;
      if (!objectIsNull(input.button.left)) {
        _button = {..._button, left: input.button.left};
      }
      if (!objectIsNull(input.button.right)) {
        _button = {..._button, right: input.button.right};
      }
      newState = {...newState, button: _button};
    }
    if (!stringIsEmpty(input.des)) {
      newState = {...newState, des: input.des};
    } else {
      if (!stringIsEmpty(this.props.input.des)) {
        newState = {...newState, des: this.props.input.des};
      }
    }

    if (!objectIsNull(input.view)) {
      newState = {...newState, view: input.view};
    } else {
      if (!objectIsNull(this.props.input.view)) {
        newState = {...newState, view: this.props.input.view};
      }
    }

    this.setState({...newState, visible: true});
  }
  hide() {
    this.setState({
      visible: false,
    });
  }

  render() {
    const {visible, title, des, button, view} = this.state;
    return (
      <Modal
        animationIn={'slideInUp'}
        animationOut={'slideOutDown'}
        backdropOpacity={0.5}
        isVisible={visible}
        onBackdropPress={this.hide}>
        <ViewKeyBoard
          ios
          styleScrollView={{
            justifyContent: 'center',
            alignItems: 'center',
          }}
          style={{
            justifyContent: 'center',
            alignSelf: 'center',
            alignItems: 'center',
            width: '100%',
            backgroundColor: this.theme.color,
            paddingHorizontal: this.theme.marginHoz,
            paddingVertical: this.theme.marginVer,
            borderRadius: this.theme.borderRadius,
          }}>
          <Text
            style={{
              color: this.theme.colorTitle,
              fontSize: this.theme.sizeTitle,
            }}>
            {title}
          </Text>
          <Text
            style={{
              color: this.theme.colorTitle,
              fontSize: this.theme.sizeDes,
              marginVertical: this.theme.marginVer,
            }}>
            {des}
          </Text>
          {!objectIsNull(view) && view(this.data)}
          <View
            style={{
              flexDirection: 'row',
              width: '100%',
              marginTop: this.theme.marginVer,
            }}>
            {!objectIsNull(button.left) && (
              <Button
                onPress={() => {
                  this.hide();
                  if (!objectIsNull(button.left.handle))
                    button.left.handle(this.data);
                }}
                color={this.theme.colorButton}
                style={{
                  flex: 1,
                  marginHorizontal: this.theme.marginHozButton,
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    fontSize: this.theme.sizeTitleButton,
                    color: this.theme.colorTitleButton,
                  }}>
                  {button.left.title}
                </Text>
              </Button>
            )}
            {!objectIsNull(button.right) && (
              <Button
                onPress={() => {
                  this.hide();
                  if (!objectIsNull(button.right.handle))
                    button.right.handle(this.data);
                }}
                color={this.theme.colorButton}
                style={{
                  flex: 1,
                  marginHorizontal: this.theme.marginHozButton,
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    fontSize: this.theme.sizeTitleButton,
                    color: this.theme.colorTitleButton,
                  }}>
                  {button.right.title}
                </Text>
              </Button>
            )}
          </View>
        </ViewKeyBoard>
      </Modal>
    );
  }
}
