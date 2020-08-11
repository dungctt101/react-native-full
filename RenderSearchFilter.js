import React, {Component} from 'react';
import {View, Text, Image, TouchableOpacity, ScrollView} from 'react-native';
import Sizes from './Sizes';
import Button from './ButtonD';
import Icon2 from 'react-native-vector-icons/FontAwesome5';
import ComboBox from './ComboBox';
import SearchBar from './SearchBar';
import {arrayIsEmpty, objectIsNull, stringIsEmpty} from './Functions';
import ModalCustom from './ModalCustom';
export default class RenderSearchFilter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filters: this.props.filters,
      heightView: 0,
    };
  }

  componentDidMount() {}

  componentWillUnmount() {
    if (!objectIsNull(this.keyboardDidHideListener))
      this.keyboardDidHideListener.remove();
    if (!objectIsNull(this.keyboardDidShowListener))
      this.keyboardDidShowListener.remove();
  }

  componentDidUpdate(prev) {
    if (prev.filters !== this.props.filters) {
      this.setState({filters: this.props.filters});
    }
  }

  renderFilterItem = (item, onClick) => {
    let value = '';
    if (
      !objectIsNull(item) &&
      !arrayIsEmpty(item.data) &&
      item.select > 0 &&
      !objectIsNull(item.data[item.select])
    ) {
      value = item.data[item.select].value;
    }
    if (!stringIsEmpty(value)) {
      return (
        <View
          style={{
            backgroundColor: '#50B0FF',
            flexDirection: 'row',
            alignItems: 'center',
            paddingVertical: Sizes.s15,
            paddingHorizontal: Sizes.s20,
            borderRadius: Sizes.s40,
            marginRight: Sizes.s10,
          }}>
          <Text
            style={{
              color: '#ffffff',
              marginRight: Sizes.s20,
            }}>
            {value}
          </Text>
          <TouchableOpacity
            onPress={() => {
              onClick();
            }}>
            <Icon2 name="times" color="#ffffff" size={Sizes.s30} />
          </TouchableOpacity>
        </View>
      );
    } else {
      return null;
    }
  };

  changeValue = () => {
    this.setState({filters: this.props.filters});
  };
  render() {
    const {onChangeSearch, noSearch, style} = this.props;
    const {filters} = this.state;
    let search = {
      text: '',
      filters: [...filters],
    };
    let filterView = [];
    let filterSelectView = [];
    if (!arrayIsEmpty(filters)) {
      for (let i = 0; i < filters.length; i++) {
        const index = i;
        const item = filters[index];
        let _data = item.data;
        filterView.push(
          <ComboBox
            defaultSelect={item.select >= 0 ? item.select : 0}
            heightView={this.state.heightView}
            title={item.title}
            styleTitleInput={{marginRight: Sizes.s20}}
            data={_data}
            onChangeValues={(_item, index) => {
              item.select = index;
              this.changeValue();
            }}
          />,
        );
        filterSelectView.push(
          this.renderFilterItem(item, () => {
            item.select = 0;
            this.changeValue();
            onChangeSearch(search);
          }),
        );
      }
    }

    return (
      <View
        style={{
          paddingBottom: Sizes.s20,
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginHorizontal: Sizes.s30,
            alignItems: 'center',
            ...style,
          }}>
          <SearchBar
            onChangeText={text => {
              search.text = text;
              onChangeSearch(search);
            }}
          />

          <TouchableOpacity
            onPress={() => {
              this.refs.modal.showHideModal(true);
            }}
            style={{
              paddingLeft: Sizes.s20,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              style={{width: Sizes.s40, height: Sizes.s40}}
              source={require('./res/image/ic_filter.png')}
            />
            <Text
              style={{
                fontSize: Sizes.h36,
                color: '#2F2E37',
                fontWeight: '600',
                fontSize: Sizes.h26,
                marginTop: Sizes.s5,
                color: '#000000',
              }}>
              Bộ lọc
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: 'row',
            marginTop: Sizes.s20,
          }}>
          <ScrollView
            contentContainerStyle={{
              paddingHorizontal: Sizes.s30,
            }}
            showsHorizontalScrollIndicator={false}
            horizontal={true}>
            {filterSelectView}
          </ScrollView>
        </View>

        <ModalCustom
          ref="modal"
          onBackPress={() => {
            onChangeSearch(search);
          }}>
          <View
            onLayout={({nativeEvent}) => {
              this.setState({
                heightView: nativeEvent.layout.height,
              });
            }}
            style={{
              width: '100%',
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
              {'Bộ lọc'}
            </Text>
            <View
              style={{
                height: Sizes.s2 / 1.5,
                backgroundColor: '#ededed',
                marginBottom: Sizes.s20,
                width: '100%',
              }}
            />
            <View style={{paddingHorizontal: Sizes.s30}}>
              {filterView}
              <Button
                onPress={() => {
                  onChangeSearch(search);
                  this.refs.modal.showHideModal(false);
                }}
                style={{
                  backgroundColor: '#3e62cc',
                  borderRadius: Sizes.s10,
                  justifyContent: 'center',
                  width: '100%',
                  paddingVertical: 0,
                  height: Sizes.s70,
                  marginBottom: Sizes.s80,
                  marginTop: Sizes.s10,
                }}
                styleTitle={{
                  fontSize: Sizes.h28,
                  color: "white",
                  fontWeight: 'bold',
                  textAlign: 'center',
                  textAlignVertical: 'center',
                }}>
                {'Lọc'}
              </Button>
            </View>
          </View>
        </ModalCustom>
      </View>
    );
  }
}
