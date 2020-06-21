import React from 'react';
import {SafeAreaView, Keyboard, View, Platform, ScrollView} from 'react-native';
import {objectIsNull} from './Functions';
{/* <ViewKeyBoard
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
  backgroundColor: theme.dialog.color,
  paddingHorizontal: theme.dialog.marginHoz,
  paddingVertical: theme.dialog.marginVer,
  borderRadius: theme.dialog.borderRadius,
}}> */}
export default class ViewKeyBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      margin: 0,
    };
  }
  _keyboardDidHide = (e) => {
    this.setState({
      margin: 0,
    });
  };
  _keyboardDidShow = (e) => {
    this.setState({
      // margin:0,
      margin: e.endCoordinates.height,
    });

    // this.myScroll.scrollTo(this.props.positionScroll);
  };
  componentWillUnmount() {
    this.keyboardDidHideListener.remove();
    this.keyboardDidShowListener.remove();
  }

  componentDidMount() {
    this.keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      this._keyboardDidShow,
    );
    this.keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      this._keyboardDidHide,
    );
  }
  renderView() {
    const {margin} = this.state;
    const {children, style, isSafeView, styleScrollView} = this.props;

    if (!objectIsNull(styleScrollView)) {
      return (
        <ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          // ref={(ref) => {
          //   this.myScroll = ref;
          // }}
          contentContainerStyle={{flexGrow: 1, ...styleScrollView}}
          //   style={}
        >
          <View style={{...style, marginBottom: margin}}>{children}</View>
        </ScrollView>
      );
    } else {
      return <View style={{...style, marginBottom: margin}}>{children}</View>;
    }
  }
  render() {
    const {android, ios,style,children} = this.props;
    if (objectIsNull(android) && objectIsNull(ios)) {
      return this.renderView();
    } else {
      if (!objectIsNull(ios)) {
        if (Platform.OS === 'ios') {
          return this.renderView();
        } else {
          return <View style={{...style}}>{children}</View>;
        }
      }
      if (!objectIsNull(android)) {
        if (Platform.OS === 'android') {
          return this.renderView();
        } else {
          return <View style={{...style}}>{children}</View>;
        }
      }
    }
  }
}

ViewKeyBoard.defaultProps = {isSafeView: false};
