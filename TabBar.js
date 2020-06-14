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
// import { themes} from './index';

// import OneComponent from '../OneComponent';
// import ThreeComponent from '../ThreeComponent';
// import SecondComponent from '../SecondComponent';
// import FourComponent from '../FourComponent';
const sizeWindow = Dimensions.get('window');
const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;
// import Modal from '../../../../react-native-full/modal';
import {LazyImage, Sizes, Modal} from './index';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {stringIsEmpty, objectIsNull, arrayIsEmpty} from './Functions';
// const tabBarSetting = props => {
//   return [
//     {
//       key: 0,
//       icon: 'home',
//       title: 'One',
//       view: <OneComponent {...props} />,
//       leftView: 'Login',
//       rightView: 'Forgot',
//     },
//     {
//       key: 1,
//       image: images.message,
//       title: 'Two',
//       view: <SecondComponent {...props} />,
//       leftView: 'Login',
//       rightView: 'Forgot',
//     },
//     {
//       key: 2,
//       image: images.message,
//       title: 'Three',
//       view: <ThreeComponent {...props} />,
//       leftView: 'Login',
//       rightView: 'Forgot',
//     },
//     {
//       key: 3,
//       image: images.message,
//       title: 'Four',
//       view: <FourComponent {...props} />,
//       leftView: 'Login',
//       rightView: 'Forgot',
//     },
//   ];
// };
// const leftMenuSetting = [
//   {
//     key: 0,
//     title: 'menu 1',
//     icon: images.message,
//     color: theme.colors.accent,
//     // task: 'Login',
//   },
//   {
//     key: 1,
//     title: 'menu 1',
//     icon: images.message,
//     color: theme.colors.accent,
//     // task: 'Forgot',
//   },
//   {
//     key: 2,
//     title: 'menu 3',
//     icon: images.message,
//     color: theme.colors.accent,
//     task: 'Login',
//   },
// ];

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
    const {themes,navigation} = this.props;
    return (
      <View style={{flex: 1, flexDirection: 'column'}}>
        <View style={{flex: 1}}>{tab.view}</View>
        <TabBarIcon
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
