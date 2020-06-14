import React from 'react';
import {View, Text, Image} from 'react-native';
// import {images} from './res';
import {Sizes, Colors, ButtonD as Button} from './index';
const NoItem = ({title, onPress, theme}) => {
  //   sizeImage: Sizes.s50,
  //   image: images.ic_empty,
  //   colorButton: '#ff9f24',
  //   colorTitle: colors.black,
  //   sizeTitle: colors.black,
  //   marginHozButton: Sizes.s5,
  //   marginVerButton: Sizes.s5,
  //   colorTitleButton: colors.white,
  //   sizeTitleButton: sizes.title,
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Image
        source={theme.image}
        style={{height: theme.sizeImage, resizeMode: 'contain'}}
      />
      <Text
        style={{
          color: theme.colorTitle,
          fontSize: theme.sizeTitle,
          fontWeight: 'bold',
          marginTop: theme.marginTopTitle,
        }}>
        {title}
      </Text>
      <Button
        onPress={onPress}
        style={{
          backgroundColor: theme.colorButton,
          paddingVertical: theme.paddingVerButton,
          paddingHorizontal: theme.paddingHozButton,
          borderRadius: Sizes.s50,
          marginTop: theme.marginTopButton,
        }}
        styleTitle={{
          color: theme.colorTitleButton,
          fontSize: theme.sizeTitleButton,
          fontWeight: 'bold',
        }}>
        Reload
      </Button>
    </View>
  );
};
export default NoItem;
