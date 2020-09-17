// // @flow
// import * as React from 'react';

// import NativeVieWithoutOverflow from './ViewOverflow-native';

// class ViewWithoutOverflow extends React.PureComponent {
//   render() {
//     return <NativeVieWithoutOverflow {...this.props} />;
//   }
// }

// export default ViewWithoutOverflow;

// @flow
import * as React from 'react';

import { View } from 'react-native';

class ViewWithoutOverflow extends React.PureComponent {
  render() {
    return <View {...this.props} />;
  }
}

export default ViewWithoutOverflow;
