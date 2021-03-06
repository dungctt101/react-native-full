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
    const {children, onBackPress,alpha,style,styleModal,disableClickOutside,disableClickButton} = this.props;
    const {visible} = this.state;
    if(visible===true){ return (
      <Modal
        onBackButtonPress={disableClickButton===true ?undefined:() => {
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
          ...styleModal
        }}
        animationIn={'slideInUp'}
        animationOut={'slideOutDown'}
        backdropOpacity={!objectIsNull(alpha)?alpha: 0.5}
        isVisible={visible}
        coverScreen={true}
        onBackdropPress={disableClickOutside===true ?undefined:() => {
          if (!objectIsNull(onBackPress)) {
            onBackPress();
          }
          this.setState({
            visible: false,
          });
        }}
        >
        <View
          style={{
            width: screen.width,
            flexDirection: 'column',
            // backgroundColor: '#ffffff',
            borderRadius: Sizes.s40,
            justifyContent: 'center',
            alignItems: 'center',
            ...style
            // paddingHorizontal: Sizes.s40,
          }}>
          {children}
        </View>
      </Modal>
    );}else{
      return null
    }
   
  }
}
