import React, {Component} from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import Colors from '../common/Colors';
import Constants from '../common/Constants';
import Images from '../common/Images';
import ButtonRadius10 from '../components/ButtonRadius10';
import EditText from '../components/EditText';
import RegularTextCB from '../components/RegularTextCB';

export default class PostJob extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    serviceCaption: '',
    service: '',
    rateRequested: '',
    location: '',
    address: '',
    availability: '',
    jobDesc: '',
  };

  render() {
    return (
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            padding: 15,
            marginTop: Platform.OS === 'android' ? 0 : 20,
          }}>
          <RegularTextCB style={{fontSize: 30, color: Colors.black}}>
            Post a Job
          </RegularTextCB>
        </View>
        <View style={{padding: 20}}>
          <View>
            <RegularTextCB style={{fontSize: 14, color: Colors.black}}>
              Service Caption
            </RegularTextCB>
            <EditText
              ref={'service_caption'}
              placeholder={'Service Caption'}
              value={this.state.service}
              onChangeText={(text) => {
                this.setState({
                  service: text,
                });
              }}
              style={[styles.textInput]}
            />
          </View>
          <View style={[{marginTop: 20}]}>
            <RegularTextCB style={{fontSize: 14, color: Colors.black}}>
              Select Service
            </RegularTextCB>
            <EditText
              ref={'service'}
              placeholder={'Select Service'}
              value={this.state.service}
              onChangeText={(text) => {
                this.setState({
                  service: text,
                });
              }}
              style={[styles.textInput]}
            />
          </View>
          <View style={[{marginTop: 20}]}>
            <RegularTextCB style={{fontSize: 14, color: Colors.black}}>
              Rate Requested
            </RegularTextCB>
            <EditText
              ref={'rate'}
              placeholder={'Enter Rate'}
              value={this.state.rateRequested}
              onChangeText={(text) => {
                this.setState({
                  rateRequested: text,
                });
              }}
              style={[styles.textInput]}
            />
          </View>
          <View style={[{marginTop: 20}]}>
            <RegularTextCB style={{fontSize: 14, color: Colors.black}}>
              Location
            </RegularTextCB>
            <EditText
              ref={'location'}
              placeholder={'Enter Location'}
              value={this.state.location}
              onChangeText={(text) => {
                this.setState({
                  location: text,
                });
              }}
              style={[styles.textInput]}
            />
          </View>
          <View style={[{marginTop: 20}]}>
            <RegularTextCB style={{fontSize: 14, color: Colors.black}}>
              Address
            </RegularTextCB>
            <EditText
              ref={'address'}
              placeholder={'Enter Address'}
              value={this.state.address}
              onChangeText={(text) => {
                this.setState({
                  address: text,
                });
              }}
              style={[styles.textInput]}
            />
          </View>
          <View style={[{marginTop: 20}]}>
            <RegularTextCB style={{fontSize: 14, color: Colors.black}}>
              Availability
            </RegularTextCB>
            <EditText
              ref={'availability'}
              placeholder={'Enter Availability'}
              value={this.state.availability}
              onChangeText={(text) => {
                this.setState({
                  availability: text,
                });
              }}
              style={[styles.textInput]}
            />
          </View>
          <View style={[{marginTop: 20}]}>
            <RegularTextCB style={{fontSize: 14, color: Colors.black}}>
              Job Description
            </RegularTextCB>
            <View style={styles.card}>
              <TextInput
                ref={'job_desc'}
                placeholder={'Enter Job Description'}
                multiline={true}
                numberOfLines={5}
                value={this.state.jobDesc}
                onChangeText={(text) => {
                  this.setState({
                    jobDesc: text,
                  });
                }}
                style={[
                  styles.textInput,
                  {
                    height: 120,
                    alignItems: 'flex-start',
                    textAlignVertical: 'top',
                  },
                ]}
              />
            </View>
          </View>
          <View
            style={[
              styles.dashBorder,
              {
                marginTop: 30,
                padding: 25,
              },
            ]}>
            <Image
              source={Images.cloud}
              style={{height: 50, width: 80, resizeMode: 'contain'}}
            />
            <RegularTextCB
              style={{marginTop: 10, color: Colors.black, fontSize: 16}}>
              Upload Photo
            </RegularTextCB>
            <RegularTextCB style={{color: Colors.coolGrey}}>
              Please upload a clear high-quality photo
            </RegularTextCB>
          </View>
          <View style={{marginTop: 30, paddingBottom: 80}}>
            <ButtonRadius10
              bgColor={Colors.sickGreen}
              label="POST"
              onPress={() => this.props.navigation.goBack()}
            />
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  iconBack: {
    height: 20,
    width: 20,
    resizeMode: 'contain',
  },
  textInput: {
    fontSize: 16,
    flex: 1,
    fontFamily: Constants.fontRegular,
    color: Colors.black,
  },
  card: {
    flexDirection: 'row',
    height: 120,
    backgroundColor: Colors.white,
    borderRadius: 10,
    padding: 20,
    shadowColor: '#c5c5c5',
    shadowOffset: {width: 5, height: 5},
    shadowOpacity: 1.0,
    shadowRadius: 10,
    elevation: 10,
    alignItems: 'center',
  },
  dashBorder: {
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: Colors.sickGreen,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
