import React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  Image,
  Animated,
  Easing,
  Dimensions,
  ScrollView,
  TouchableWithoutFeedback,
  BackHandler,
} from 'react-native';
const sizeWindow = Dimensions.get('window');
const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;
import LazyImage from "./LazyImage"
import Sizes from "./Sizes"
import Modal from "./modal/index"
import Icon from 'react-native-vector-icons/FontAwesome5';
import {stringIsEmpty, objectIsNull, arrayIsEmpty} from './Functions';

import TabBarAnimation from './tabBar/tabBarAnimation';

import TabBarAnimation2 from './tabBar/tabBarAnimation2';
import { getStatusBarHeight } from '@dungdang/react-native-full/HeightStatusBar';
import { colors } from '../../../src/res';
class TabBarIcon3 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      select: this.props.select,
    };
  }
  componentDidMount() {
    this.refs.tabBar.setSelect(!objectIsNull(this.props.indexDefault)?this.props.indexDefault:0);
  }
  render() {
    const {onClick, menu, style, themes} = this.props;
    return (
      <View
        style={{
          // flex: 1,
          // height: Sizes.s100,
          justifyContent: 'space-between',
          alignItems: 'center',
paddingBottom:getStatusBarHeight()>=44?Sizes.s20:0,
// paddingBottom:Sizes.s70,
          backgroundColor:this.props.color,
        }}>
        <TabBarAnimation2
        
        tintColor={this.props.tintColor}
color={this.props.color}
          ref="tabBar"
          onPress={tabIndex => {
            this.setState({
              select: tabIndex,
            });
            onClick(menu[tabIndex].key);
            // eslint-disable-next-line no-console
            // console.log('render component with index: ', tabIndex);
          }}
          values={menu}
        />
           <View style={{
          backgroundColor:this.props.color,position:"absolute",height:getStatusBarHeight()>=44?Sizes.s20:0,bottom:0,left:0,right:0}}></View>
       
      </View>
    );
  }
}
class TabBarIcon2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      select: this.props.select,
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.select !== this.props.select) {
      this.setState({
        select: this.props.select,
      });
    }
  }
  render() {
    const {onClick, menu, style, themes} = this.props;
    const {select} = this.state;
    const tabs = [];
    for (var i = 0; i < menu.length; i++) {
      const cur = i;
      tabs.push(
        <View
          // style={{
          //   backgroundColor: '#33ff33',
          // }}
          onPress={() => {
            this.setState({
              select: cur,
            });
            onClick(menu[cur].key);
          }}
          icon={menu[i].image}
          selectedIcon={menu[i].image}
          title={menu[i].title}
          // screenBackgroundColor={{backgroundColor: '#008080'}}
        />,
        // <TouchableOpacity
        //   style={{
        //     flexDirection: 'column',
        //     flex: 100 / menu.length,
        //     paddingVertical: 10,
        //     justifyContent: 'center',
        //     alignItems: 'center',
        //   }}
        //   key={i}
        //   onPress={() => {
        //     this.setState({
        //       select: cur,
        //     });
        //     onClick(menu[cur].key);
        //   }}>
        //   {!objectIsNull(menu[i].image) && (
        //     <Image
        //       style={{
        //         width:
        //           select === i
        //             ? themes.tabBar.sizeIcon
        //             : themes.tabBar.sizeIcon,
        //         height: themes.tabBar.sizeIcon,
        //         resizeMode: 'contain',
        //         tintColor:
        //           select === i
        //             ? themes.tabBar.colorIconTint
        //             : themes.tabBar.colorIcon,
        //       }}
        //       source={menu[i].image}
        //     />
        //   )}
        //   {objectIsNull(menu[i].image) && !objectIsNull(menu[i].icon) && (
        //     <Icon
        //       name={menu[i].icon}
        //       size={themes.tabBar.sizeIcon}
        //       color={
        //         select === i
        //           ? themes.tabBar.colorIconTint
        //           : themes.tabBar.colorIcon
        //       }
        //     />
        //   )}
        //   {!stringIsEmpty(menu[i].title) && (
        //     <Text
        //       style={{
        //         textAlign: 'center',
        //         marginTop: 5,
        //         color:
        //           select === i
        //             ? themes.tabBar.colorIconTint
        //             : themes.tabBar.colorIcon,
        //         fontSize: themes.tabBar.sizeText,
        //       }}>
        //       {menu[i].title}
        //     </Text>
        //   )}
        // </TouchableOpacity>,
      );
    }
    return (
      <TabBarAnimation
        bgNavBar="white"
        bgNavBarSelector="white"
        stroke="skyblue"
        style={{height: Sizes.s60}}>
        {tabs}
        {/* <TabBar.Item
          icon={images.ic_empty}
          selectedIcon={images.menu}
          title="Tab1"
          screenBackgroundColor={{backgroundColor: '#008080'}}>
        </TabBar.Item>
        <TabBar.Item
          icon={images.ic_empty}
          selectedIcon={images.menu}
          title="Tab2"
          screenBackgroundColor={{backgroundColor: '#F08080'}}>
        </TabBar.Item>
        <TabBar.Item
          icon={images.ic_empty}
          selectedIcon={images.menu}
          title="Tab3"
          screenBackgroundColor={{backgroundColor: '#485d72'}}>
        </TabBar.Item> */}
      </TabBarAnimation>
    );
  }
}

class TabBarIcon extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      select: this.props.select,
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.select !== this.props.select) {
      this.setState({
        select: this.props.select,
      });
    }
  }
  render() {
    const {onClick, menu, style, themes} = this.props;
    const {select} = this.state;
    const tabs = [];
    for (var i = 0; i < menu.length; i++) {
      const cur = i;
      tabs.push(
        <TouchableOpacity
          style={{
            flexDirection: 'column',
            flex: 100 / menu.length,
            paddingVertical: 10,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          key={i}
          onPress={() => {
            this.setState({
              select: cur,
            });
            onClick(menu[cur].key);
          }}>
          {!objectIsNull(menu[i].image) && (
            <Image
              style={{
                width:
                  select === i
                    ? themes.tabBar.sizeIcon
                    : themes.tabBar.sizeIcon,
                height: themes.tabBar.sizeIcon,
                resizeMode: 'contain',
                tintColor:
                  select === i
                    ? themes.tabBar.colorIconTint
                    : themes.tabBar.colorIcon,
              }}
              source={menu[i].image}
            />
          )}
          {objectIsNull(menu[i].image) && !objectIsNull(menu[i].icon) && (
            <Icon
              name={menu[i].icon}
              size={themes.tabBar.sizeIcon}
              color={
                select === i
                  ? themes.tabBar.colorIconTint
                  : themes.tabBar.colorIcon
              }
            />
          )}
          {!stringIsEmpty(menu[i].title) && (
            <Text
              style={{
                textAlign: 'center',
                marginTop: 5,
                color:
                  select === i
                    ? themes.tabBar.colorIconTint
                    : themes.tabBar.colorIcon,
                fontSize: themes.tabBar.sizeText,
              }}>
              {menu[i].title}
            </Text>
          )}
        </TouchableOpacity>,
      );
    }
    return (
      <View
        style={{
          paddingBottom: themes.tabBar.paddingBottom,
          flexDirection: 'row',
          ...style,
        }}>
        {tabs}
      </View>
    );
  }
}
const defaultTab = 0;
export default class TabBar extends React.Component {
  constructor(props) {
    super(props);
    this._listTab = this.props.tabBarSetting;
    // tabBarSetting(this.props);

    this.state = {
      indexSelect: defaultTab,
      tab: this._listTab[defaultTab],
    };
    this.changeTab(defaultTab);
  }

  changeTab(select) {
    this.setState({
      tab: this._listTab[select],
    });
    if (!objectIsNull(this.props.changeTab))
      this.props.changeTab(this._listTab[select]);
  }
  showHideMenu() {
    if (!objectIsNull(this.refs.menu)) this.refs.menu.showHide();
  }
  render() {
    const {tab, indexSelect} = this.state;
    const {themes, navigation,imageView,coverView,menuCircleView,textCover} = this.props;
    // console.log("--->",menuCircleView)
    return (
      <View style={{flex: 1, flexDirection: 'column'}}>

        <View style={{flex: 1}}>
        {!objectIsNull(imageView)&&imageView()}
          {tab.view}

        {!objectIsNull(menuCircleView) && menuCircleView()}
          </View>
        <TabBarIcon3
tintColor={this.props.tintColor}
color={this.props.color}
        indexDefault ={this.props.indexDefault}
          themes={themes}
          style={{backgroundColor: themes.tabBar.color}}
          select={indexSelect}
          menu={this._listTab}
          onClick={select => {
            this.changeTab(select);
          }}
        />
        {!arrayIsEmpty(this.props.leftMenuSetting) && (
          <MenuLeft
            themes={themes}
            ref="menu"
            infoUser={{fullName: 'ada', email: 'asdsad'}}
            onClickAvatar={() => {
              // this.changeView(KEY_APP.avatar);
            }}
            onSelectItem={(item, index) => {
              // console.warn("ass",item)
              // if (item.key === 2) {
              //   this.props.navigation.replace(item.task);
              // } else {

              if (!objectIsNull(this.refs.menu)) this.refs.menu.hide();
              if (!stringIsEmpty(item.task)) {
                navigation.navigate(item.task);
              }
              if (!objectIsNull(item.handle)) {
                item.handle();
              }
              // }
              // this.changeView(app);
            }}
            items={this.props.leftMenuSetting}
          />
        )}

{/* {!objectIsNull(coverView */}
        {!objectIsNull(coverView) &&<View style={{position:"absolute",top:0,left:0,right:0,bottom:0}}>{coverView}</View>}
        {!stringIsEmpty(textCover)&& <View style={{position:"absolute",top:0,left:0,right:0,backgroundColor:"#F3534A",opacity:0.9,paddingHorizontal:Sizes.s20,paddingVertical:Sizes.s30,justifyContent:"center",alignItems:"center"}}><Text style={{color:"#ffffff",fontSize:Sizes.h32}}>{textCover}</Text></View>}
      </View>
    );
  }
}

const duration = 150;
class MenuLeft extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // backgroundColor: '#00000000',
      visible: false,
    };
    // this.position = new Animated.Value(0);
    this.hide = this.hide.bind(this);
    // this.doWork = this.doWork.bind(this);
  }
  showHide() {
    if (this.state.visible === true) {
      this.hide();
    } else {
      this.show();
    }
  }
  show() {
    // console.warn('DDD');
    this.setState({
      visible: true,
    });
  }
  hide() {
    this.setState({
      visible: false,
    });
  }
  componentDidMount() {
    const {onClose} = this.props;
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      return true;
    });
  }
  componentWillUnmount() {
    this.backHandler.remove();
  }

  render() {
    const {
      styleOut,
      style,
      onSelectItem,
      items,
      onClickAvatar,
      infoUser,
      themes,
      navigation,
    } = this.props;
    // console.warn(infoUser);
    const {visible} = this.state;
    var itemViews = [];
    for (var i = 0; i < items.length; i++) {
      const cur = i;

      // if (i === 0) {
      itemViews.push(
        <TouchableOpacity
          onPress={() => {
            onSelectItem(items[cur], cur);
          }}
          style={{
            flexDirection: 'column',
            borderBottomColor: themes.leftMenu.colorLine,
            borderBottomWidth: Sizes.s2,
            paddingVertical: Sizes.s20,
          }}>
          <Text style={{color: themes.leftMenu.colorText}}>
            {items[i].title}
          </Text>
        </TouchableOpacity>,
      );
    }
    return (
      <Modal
        animationIn={'slideInLeft'}
        animationOut={'slideOutLeft'}
        backdropOpacity={0.5}
        isVisible={visible}
        onBackdropPress={this.hide}>
        <View
          style={{
            height: deviceHeight,
            margin: -20,
            width: '60%',
            paddingTop: themes.leftMenu.paddingTop,
            // justifyContent:"center",
            alignItems: 'center',
            backgroundColor: themes.leftMenu.color,
          }}>
          <LazyImage
            // placeholder={images.more}
            style={{
              width: themes.leftMenu.sizeImage,
              height: themes.leftMenu.sizeImage,
              borderRadius: themes.leftMenu.sizeImage,
            }}
            source={{
              uri:
                'https://images.pexels.com/photos/1382734/pexels-photo-1382734.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
            }}
          />
          <Text
            style={{
              marginTop: 20,
              fontSize: themes.leftMenu.sizeName,
              color: themes.leftMenu.colorText,
              fontWeight: 'bold',
            }}>
            {!objectIsNull(infoUser) && !objectIsNull(infoUser.fullName)
              ? infoUser.fullName.toUpperCase()
              : Strings.noInfo}
          </Text>
          <Text
            style={{
              fontSize: themes.leftMenu.sizeMail,
              color: themes.leftMenu.colorText,
              marginBottom: 10,
            }}>
            {!objectIsNull(infoUser) && !objectIsNull(infoUser.email)
              ? infoUser.email
              : ''}
          </Text>
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{width: '100%'}}
            contentContainerStyle={{
              flexGrow: 1,
              paddingHorizontal: Sizes.s20,
              paddingBottom: Sizes.s20,
              paddingTop: Sizes.s20,
            }}>
            {itemViews}
          </ScrollView>
        </View>
      </Modal>
    );
  }
}
