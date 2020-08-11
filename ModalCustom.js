import React, {Component} from 'react';
import {View} from 'react-native';
import Sizes from './Sizes';
import {objectIsNull} from './Functions';
import {Dimensions} from 'react-native';
const screen = Dimensions.get("window");
import Modal from './modal/index';
export default  class ModalCustom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
  }
  isVisible() {
    return this.state.visible;
  }
  showHideModal(visible) {
    this.setState({
      visible: visible,
    });
  }
  render() {
    const {children, onBackPress} = this.props;
    const {visible} = this.state;
    return (
      <Modal
        onBackButtonPress={() => {
          if (!objectIsNull(onBackPress)) {
            onBackPress();
          }
          this.setState({
            visible: false,
          });
        }}
        style={{
          justifyContent: 'flex-end',
          alignItems: 'center',
          marginHorizontal: -Sizes.s20,
          marginBottom: -Sizes.s20,
        }}
        animationIn={'slideInUp'}
        animationOut={'slideOutDown'}
        backdropOpacity={0.5}
        isVisible={visible}
        coverScreen={true}
        onBackdropPress={() => {
          if (!objectIsNull(onBackPress)) {
            onBackPress();
          }
          this.setState({
            visible: false,
          });
        }}>
        <View
          style={{
            width: screen.width,
            flexDirection: 'column',
            backgroundColor: '#ffffff',
            borderRadius: Sizes.s40,
            justifyContent: 'center',
            alignItems: 'center',
            // paddingHorizontal: Sizes.s40,
          }}>
          {children}
        </View>
      </Modal>
    );
  }
}
