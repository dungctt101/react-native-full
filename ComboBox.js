import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Keyboard,
  Platform,
  ScrollView,
} from 'react-native';
import Sizes from './Sizes';
import Colors from './Colors';
import {objectIsNull, arrayIsEmpty, stringIsEmpty} from './Functions';
import Icon from 'react-native-vector-icons/FontAwesome5';
import ModalCustom from './ModalCustom';
function wait(timeout) {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
}

export default class ComboBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      margin: 0,
      select: !objectIsNull(this.props.defaultSelect)
        ? this.props.defaultSelect
        : -1,
      data: !arrayIsEmpty(this.props.data) ? this.props.data : [],
    };
  }

  componentDidUpdate(prev) {
    if (prev.defaultSelect !== this.props.defaultSelect) {
      this.setState({
        select: !objectIsNull(this.props.defaultSelect)
          ? this.props.defaultSelect
          : -1,
      });
    }
    if (prev.data !== this.props.data && !arrayIsEmpty(this.props.data)) {
      this.setState({
        data: this.props.data,
      });
    }
  }
  _keyboardDidHide = e => {
    this.setState({
      margin: 0,
    });
  };
  _keyboardDidShow = e => {
    this.setState({
      margin: e.endCoordinates.height,
    });
  };
  componentWillUnmount() {
    if (Platform.OS === 'ios') {
      this.keyboardDidHideListener.remove();
      this.keyboardDidShowListener.remove();
    }
  }

  componentDidMount() {
    if (Platform.OS === 'ios') {
      this.keyboardDidShowListener = Keyboard.addListener(
        'keyboardDidShow',
        this._keyboardDidShow,
      );
      this.keyboardDidHideListener = Keyboard.addListener(
        'keyboardDidHide',
        this._keyboardDidHide,
      );
    }
  }
  setSelect(select) {
    this.setState({
      select: select,
    });
  }
  show = data => {
    if (!arrayIsEmpty(data))
      this.setState({
        data: data,
      });
    this.refs.modal.showHideModal(true);
  };
  hide = () => {
    this.refs.modal.showHideModal(false);
  };
  getValue() {
    if (!arrayIsEmpty(this.state.data)) {
      return this.state.data[this.state.select];
    } else {
      return null;
    }
  }
  render() {
    const {data} = this.state;
    const {
      styleTitleInput,
      title,
      styleTitle,
      style,
      onChangeValues,
      disable,
      heightView,
    } = this.props;
    const {select} = this.state;
    var itemViews = [];
    if (!arrayIsEmpty(data)) {
      for (var i = 0; i < data.length; i++) {
        const index = i;
        if (!stringIsEmpty(data[index].value)) {
          itemViews.push(
            <TouchableOpacity
              style={{
                backgroundColor: select === index ? '#F7F6FB' : '#ffffff',
                paddingVertical: Sizes.s30,
                paddingHorizontal: Sizes.s40,
                flexDirection: 'row',
              }}
              onPress={() => {
                this.hide();
                this.setState({
                  select: index,
                });
                onChangeValues(data[index], index);
              }}>
              <Text
                style={{
                  fontSize: Sizes.s30,
                  color: select === index ? '#2F6BFE' : '#2F2E37',
                  flex: 1,
                  textAlignVertical: 'center',
                  fontWeight: select === index ? '600' : '300',
                }}>
                {data[index].value}
              </Text>
              {select === index && (
                <Icon
                  solid
                  size={Sizes.s30}
                  color={'#2F6BFE'}
                  name={'check-circle'}
                />
              )}
            </TouchableOpacity>,
          );
        }
      }
    }
    return (
      <TouchableOpacity
        disabled={disable}
        onPress={() => {
          this.show(data);
        }}
        style={{
          flexDirection: 'row',
          width: '100%',
          borderRadius: Sizes.s10,
          alignItems: 'center',
          paddingHorizontal: Sizes.s10,
          paddingVertical: Sizes.s10,
          marginTop: Sizes.s10,
          marginBottom: Sizes.s20,
          backgroundColor: 'white',
          borderWidth: Sizes.s2 / 1.5,
          borderColor: 'silver',
          ...style,
          opacity: disable === true ? 0.4 : 1,
        }}>
        <View style={{flex: 1}}>
          <Text
            style={{
              fontSize: Sizes.h24,
              color: '#2F2E37',
              marginBottom: Sizes.s10,
              ...styleTitle,
            }}>
            {title}
          </Text>
          <Text
            multiline={true}
            style={{
              fontSize: Sizes.h30,
              color: '#2F2E37',
              fontWeight: '600',
              ...styleTitleInput,
            }}>
            {select !== -1 && data.length > select ? data[select].value : ''}
          </Text>
        </View>

        <Icon size={Sizes.s30} color={'#989898'} name="chevron-down" />
        <ModalCustom ref="modal">
          <View
            style={{
              backgroundColor: Colors.white,
              width: '100%',

              height: !objectIsNull(heightView) ? heightView : undefined,
              // borderRadius: Sizes.s10,
              backgroundColor: '#00000000',
              paddingVertical: Sizes.s20,
            }}>
            <Text
              style={{
                fontSize: Sizes.h30,
                color: '#2F2E37',
                fontWeight: '600',
                width: '100%',
                textAlign: 'center',
                paddingHorizontal: Sizes.s20,
                paddingVertical: Sizes.s20,
              }}>
              {title}
            </Text>
            <View
              style={{
                height: Sizes.s2 / 1.5,
                backgroundColor: '#ededed',
                marginBottom: Sizes.s20,
                width: '100%',
              }}
            />
            <ScrollView
              showsVerticalScrollIndicator={false}
              style={{
                width: '100%',
              }}
              contentContainerStyle={{flexGrow: 1}}>
              {itemViews}
            </ScrollView>
          </View>
        </ModalCustom>
      </TouchableOpacity>
    );
  }
}

ComboBox.defaultProps = {
  styleTitleInputNew: {
    fontSize: Sizes.h28,
    textAlignVertical: 'center',
    color: Colors.title,
  },

  styleModal: {
    paddingHorizontal: Sizes.s20,
    paddingVertical: Sizes.s20,
  },
  onChangeValues: () => {},
  onPressItemModal: () => {},
  onPressItemsModal: () => {},
  visible: false,
  items: [],
  placeholder: 'Tìm kiếm',
  placeholderTextColor: Colors.title_fuzzy,
  onBlur: () => {},
  onFocus: () => {},
  onPress: () => {},
  action: () => {},
  data: [],
};
