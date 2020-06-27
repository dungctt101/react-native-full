import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  Keyboard,
  Platform,
  TextInput,
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native';

import Sizes from './Sizes';

import {Picker, DatePicker} from './pickTime';
import moment from './pickTime/moment';
import {objectIsNull, arrayIsEmpty, stringIsEmpty} from './Functions';
import Icon from 'react-native-vector-icons/FontAwesome5';
function wait(timeout) {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
}

export default class PickDate extends React.Component {
  constructor(props) {
    super(props);
    // let date = new Date().getDate();
    // let month = new Date().getMonth() + 1;
    // let year = new Date().getFullYear();
    // let hour = new Date().getHours();
    // let minute = new Date().getMinutes();
    var dateObj = new Date();
    var momentObj = moment(dateObj);
    this.dateString = momentObj.format(
      !objectIsNull(this.props.format) ? this.props.format : 'DD-MM-YYYY',
    );
    this.timeString = momentObj.format(
      !objectIsNull(this.props.format) ? this.props.format : 'HH:MM',
    );


    // this.currentDate = dateString
    // this.currentTime = date + '-' + month + '-' + year
    this.state = {
      visible: false,
      date: !objectIsNull(this.props.currentDate)
        ? !objectIsNull(this.props.pickTime)
          ? this.timeString
          : this.dateString
        : '',
    };
  }
  show = () => {
    this.setState({
      visible: true,
    });
  };
  hide = () => {
    this.setState({
      visible: false,
    });
  };
  parseDate(dateString) {
    if (!objectIsNull(this.props.pickTime)) {
      this.setState({date: dateString});
    } else {
      const {format} = this.props;
      var dateObj = new Date(dateString);
      var momentObj = moment(dateObj);
      var momentString = momentObj.format(
        !objectIsNull(format) ? format : 'DD-MM-YYYY',
      );

      this.setState({date: momentString});
    }
  }
  render() {
      console.log("this.dateString",this.dateString)
    const {title, style, styleTitle, param, icon, pickTime} = this.props;
    const {visible, date} = this.state;
    return (
      <View>
        <TouchableOpacity
          onPress={() => {
            this.show();
          }}
          style={{width: '100%', flexDirection: 'row', ...style}}>
          <Text
            multiline={true}
            style={{
              flex: 1,
              ...styleTitle,
            }}>
            {!stringIsEmpty(date) ? date : title}
          </Text>
          {!objectIsNull(icon) && <Icon {...icon} />}
        </TouchableOpacity>
        <Modal
          onRequestClose={() => {}}
          visible={visible}
          transparent
          style={{}}>
          <TouchableOpacity
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#00000040',
            }}
            onPress={() => {
              this.hide();
            }}>
            <TouchableWithoutFeedback
              onPress={() => {}}
              style={{
                width: '100%',
                marginBottom: this.state.margin,
                paddingHorizontal: Sizes.s20,
              }}>
              <View
                style={{
                  width: '90%',
                }}>
                {!objectIsNull(pickTime) ? (
                  <View style={{flexDirection: 'row'}}>
                    <Picker
                      style={{backgroundColor: 'white', flex: 1, height: 215}}
                      selectedValue="02"
                      pickerData={[
                        '01',
                        '02',
                        '03',
                        '04',
                        '05',
                        '06',
                        '07',
                        '08',
                        '09',
                        '10',
                        '11',
                        '12',
                        '13',
                        '14',
                        '15',
                        '16',
                        '17',
                        '18',
                        '19',
                        '20',
                        '21',
                        '22',
                        '23',
                        '24',
                      ]}
                      onValueChange={value => {
                        if (
                          !stringIsEmpty(this.state.date) &&
                          this.state.date.split(':').length === 2
                        ) {
                          this.parseDate(
                            value + ':' + this.state.date.split(':')[1],
                          );
                        }
                      }}
                      itemSpace={30}
                    />
                    <Picker
                      style={{backgroundColor: 'white', flex: 1, height: 215}}
                      selectedValue="01"
                      pickerData={[
                        '01',
                        '02',
                        '03',
                        '04',
                        '05',
                        '06',
                        '07',
                        '08',
                        '09',
                        '20',
                        '21',
                        '22',
                        '23',
                        '24',
                        '25',
                        '26',
                        '27',
                        '28',
                        '29',
                        '30',
                        '31',
                        '32',
                        '33',
                        '34',
                        '35',
                        '36',
                        '37',
                        '38',
                        '39',
                        '40',
                        '41',
                        '42',
                        '43',
                        '44',
                        '45',
                        '46',
                        '47',
                        '48',
                        '49',
                        '50',
                        '51',
                        '52',
                        '53',
                        '54',
                        '55',
                        '56',
                        '57',
                        '58',
                        '59',
                        '60',
                      ]}
                      onValueChange={value => {
                        if (
                          !stringIsEmpty(this.state.date) &&
                          this.state.date.split(':').length === 2
                        ) {
                          this.parseDate(
                            this.state.date.split(':')[0] + ':' + value,
                          );
                        }
                      }}
                      itemSpace={30}
                    />
                  </View>
                ) : (
                  <DatePicker
                    {...param}
                    // date={new Date(this.dateString)}
                    onDateChange={_date => {
                      this.parseDate(_date);
                    }}
                  />
                )}
              </View>
            </TouchableWithoutFeedback>
          </TouchableOpacity>
        </Modal>
      </View>
    );
  }
}

PickDate.defaultProps = {};
