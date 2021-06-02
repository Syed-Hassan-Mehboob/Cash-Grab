import React, {Component} from 'react';
import {
  FlatList,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Modal from 'react-native-modal';
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
    service: 'Select',
    rateRequested: '',
    location: '',
    address: '',
    availability: '',
    jobDesc: '',
    isSelectionModalVisible: false,
    selections: [
      {
        id: '0',
        text: 'Service 1',
        isSelected: false,
      },
      {
        id: '1',
        text: 'Service 2',
        isSelected: false,
      },
      {
        id: '2',
        text: 'Service 3',
        isSelected: false,
      },
      {
        id: '3',
        text: 'Service 4',
        isSelected: false,
      },
      {
        id: '4',
        text: 'Service 5',
        isSelected: false,
      },
      {
        id: '5',
        text: 'Service 6',
        isSelected: false,
      },
    ],
  };

  toggleIsSelectionModalVisible = () => {
    this.setState({
      isSelectionModalVisible: !this.state.isSelectionModalVisible,
    });
  };

  renderSelectionBottomSheetContent = () => {
    return (
      <View style={styles.bottomSheetBody}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <RegularTextCB style={{fontSize: 16, color: Colors.sickGreen}}>
            Select
          </RegularTextCB>
          <TouchableOpacity
            onPress={() => {
              this.clearSelection();
              this.toggleIsSelectionModalVisible();
            }}>
            <Image
              source={Images.iconClose}
              style={{
                height: 15,
                width: 15,
                tintColor: Colors.coolGrey,
                resizeMode: 'contain',
              }}
            />
          </TouchableOpacity>
        </View>
        <FlatList
          style={{marginTop: 5}}
          data={this.state.selections}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          renderItem={this.renderSelectionItem}
          extraData={this.state.selections}
          contentContainerStyle={{
            paddingBottom: 50,
          }}
        />
      </View>
    );
  };

  renderSelectionItem = ({item, index}) => {
    return (
      <TouchableOpacity
        activeOpacity={0.7}
        style={[
          item.isSelected === false
            ? styles.unselectedFilter
            : styles.selectedFilter,
        ]}
        onPress={() => {
          this.handleOnSelectionItemClick(index);
        }}>
        <RegularTextCB
          style={{
            fontSize: 14,
            color: Colors.black,
          }}>
          {item.text}
        </RegularTextCB>
      </TouchableOpacity>
    );
  };

  handleOnSelectionItemClick = (index) => {
    let mSelection = this.state.selections;
    mSelection.forEach((item) => {
      item.isSelected = false;
    });
    mSelection[index].isSelected = true;
    this.setState({selections: mSelection, service: mSelection[index].text});
    this.toggleIsSelectionModalVisible();
  };

  clearSelection() {
    this.state.selections.forEach((item) => {
      item.isSelected = false;
    });
    this.state.service = 'Select';
  }

  render() {
    return (
      <View style={{flex: 1, backgroundColor: Colors.white}}>
        <ScrollView
          style={styles.container}
          showsVerticalScrollIndicator={false}>
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
                value={this.state.serviceCaption}
                onChangeText={(text) => {
                  this.setState({
                    serviceCaption: text,
                  });
                }}
                style={[styles.textInput]}
              />
            </View>
            <View style={[{marginTop: 20}]}>
              <RegularTextCB style={{fontSize: 14, color: Colors.black}}>
                Select Service
              </RegularTextCB>
              <TouchableOpacity
                style={[
                  styles.card,
                  {
                    height: 60,
                    borderRadius: 10,
                    alignItems: 'center',
                    paddingHorizontal: 20,
                    paddingVertical: 5,
                  },
                ]}
                onPress={() => this.toggleIsSelectionModalVisible()}>
                <RegularTextCB style={{color: Colors.black}}>
                  {this.state.service}
                </RegularTextCB>
              </TouchableOpacity>
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
                      paddingTop: 10,
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
        <Modal
          isVisible={this.state.isSelectionModalVisible}
          coverScreen={false}
          style={styles.modal}>
          {this.renderSelectionBottomSheetContent()}
        </Modal>
      </View>
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
  bottomSheetBody: {
    backgroundColor: Colors.white,
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  selectedFilter: {
    alignItems: 'center',
    paddingVertical: 10,
    margin: 2,
    maxWidth: '100%',
    width: '100%',
    backgroundColor: Colors.sickGreen,
    borderRadius: 12,
  },
  unselectedFilter: {
    alignItems: 'center',
    paddingVertical: 10,
    margin: 2,
    maxWidth: '100%',
    width: '100%',
    backgroundColor: Colors.white,
    borderRadius: 12,
  },
});
