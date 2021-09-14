import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Image,
    TouchableOpacity,
    FlatList,
    Platform,
    LogBox,
} from 'react-native';
import Colors from '../../common/Colors';
import Constants, { SIZES } from '../../common/Constants';
import Images from '../../common/Images';
import RegularTextCB from '../../components/RegularTextCB';
import LightTextCB from '../../components/LightTextCB';
import utils from '../../utils';
import Axios from '../../network/APIKit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Spinner from 'react-native-loading-spinner-overlay';
import ListComponent from "../../components/ListComponent";

export default class VenderFileredScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            accessToken: '',
            allJobs: []
        };

        console.log('==========',this.props.route.params)
    }
    componentDidMount() {
        LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
        this.getUserAccessToken()
        this.props.navigation.addListener('focus', () => {
            this.getUserAccessToken()
        });
    }
    getUserAccessToken = async () => {
        const token = await AsyncStorage.getItem(Constants.accessToken);
        this.setState({ accessToken: token }, () => {
           this.getUserProfile()
        });
    };


    getUserProfile = () => {
        const onSuccess = ({ data }) => {
          let latitude=data.data.records.userProfile.latitude
          let longitude=data.data.records.userProfile.longitude
          let type=data.data.records.type
          
          console.log('Type ===== ', type)

          this.getFilterData(latitude,longitude,type);
        };
    
        const onFailure = (error) => {
          utils.showResponseError(error);
        };
        Axios.get(Constants.getProfileURL, {
          headers: {
            Authorization: this.state.accessToken,
          },
        })
          .then(onSuccess)
          .catch(onFailure);
      };

      getFilterData = (latitude,longitude,type) => {
        const postData = {
          type:type,
          categoryId:this.props.route.params ,
          min_price: this.props.route.params.minPrice !== null && this.props.route.params.minPrice !==undefined ?this.props.route.params.minPrice:null,
          max_price: this.props.route.params.maxPrice !== null && this.props.route.params.maxPrice !==undefined ?this.props.route.params.maxPrice:null,
          distance: this.props.route.params.location !==null && this.props.route.params.location !==undefined ? this.props.route.params.location :null,
          lat:latitude,
          lng:longitude
        };

        // console.log('Post Data  ===== ',postData)
      
        this.setState({isLoading: true});
    
        const onSuccess = ({data}) => {
        //   console.log('========================Filter Data==',data)

        //   utils.showToast(data.message);
          this.setState({isLoading: false,allJobs:data.data});
        };
        const onFailure = (error) => {
          //
          utils.showResponseError(error.massage);
          this.setState({isLoading: false});
        };
        const options = {
          headers: {
            Authorization: this.state.accessToken,
            // 'Content-Type':'application/x-www-form-urlencoded'
          },
        };
        Axios.post(Constants.venderFilterd,postData, options)
          .then(onSuccess)
          .catch(onFailure);
      };
    

    renderSingleCategoriesItem = ({ item }) => {
        console.log('Filter Data item Vender  ===== ',item)
        return (
            <ListComponent item={item} />
        )

    };

    openNextScreen = (nextScreen) => {
        this.props.navigation.navigate(nextScreen);
    };

    render() {
        return (
            <View style={[styles.container]}>
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '100%',
                        marginTop: Platform.OS === 'android' ? 0 : SIZES.twenty,
                    }}>
                    <TouchableOpacity
                        style={{ position: 'absolute', left: SIZES.ten }}
                        onPress={() => {
                            this.props.navigation.goBack();
                        }}>
                        <Image
                            source={Images.arrowBack}
                            style={[styles.iconBack, { tintColor: Colors.black }]}
                        />
                    </TouchableOpacity>


                    <RegularTextCB style={{ fontSize: SIZES.ten*3, color: Colors.black }}>Filtered Job</RegularTextCB>

                </View>
               
               <View style={{flex:1,marginLeft:SIZES.five}}>
               <FlatList
                    style={{ marginTop: SIZES.ten }}
                    data={(this.state.allJobs)}
                    keyExtractor={(item) => item.id}
                    showsVerticalScrollIndicator={false}
                    renderItem={this.renderSingleCategoriesItem}
                    contentInset={{
                        // for ios
                        bottom: SIZES.ten,
                    }}
                    contentContainerStyle={{
                        // for android
                        paddingBottom: SIZES.ten,
                    }}
                />
               </View>
            
                <Spinner
                    visible={this.state.isLoading}
                    textContent={'Loading...'}
                    textStyle={styles.spinnerTextStyle}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    iconBack: {
        height: SIZES.twenty,
        width: SIZES.twenty,
        resizeMode: 'contain',
    },
    iconFilter: {
        height: SIZES.ten*3,
        width: SIZES.ten*3,
        resizeMode: 'contain',
    },
    iconForward: {
        height: SIZES.ten,
        width: SIZES.ten,
        resizeMode: 'contain',
    },
    iconUser: {
        height: SIZES.ten*6,
        width: SIZES.ten*6,
        borderRadius: SIZES.ten*6 / 2,
        resizeMode: 'contain',
    },
    iconPassword: {
        fontSize: SIZES.twenty,
        height: SIZES.twenty,
        width: SIZES.twenty,
        alignSelf: 'center',
        color: Colors.orange,
    },
    container: {
        backgroundColor: Colors.white,
        flex: 1,
        paddingTop: SIZES.fifteen,
        paddingHorizontal: SIZES.five,
    },
    childContainer: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    itemContainer: {
        padding: SIZES.twenty,
        flex: 1,
    },
    formLabel: {
        fontSize: 16,
        color: Colors.grey,
    },
    textInput: {
        fontSize: 16,
        flex: 1,
        fontFamily: Constants.fontLight,
        color: Colors.black,
    },
    textInputContainer: {
        borderBottomWidth: 0.3,
        height: 45,
        borderColor: Colors.grey,
        flexDirection: 'row',
        alignItems: 'center',
    },
    underlineText: {
        color: Colors.black,
        textDecorationLine: 'underline',
        fontSize: 16,
    },
    noUnderlineText: {
        color: Colors.black,
        textDecorationLine: 'none',
        fontSize: 16,
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: SIZES.twenty,
        flex: 1,
        shadowColor: '#c5c5c5',
        shadowOffset: { width: SIZES.five, height: SIZES.five },
        shadowOpacity: 1.0,
        shadowRadius: SIZES.ten,
        elevation: SIZES.ten,
    },
    circleCard: {
        height: SIZES.ten*6,
        width: SIZES.ten*6,
        borderRadius: SIZES.ten*3,
        shadowColor: '#c5c5c5',
        shadowOffset: { width: SIZES.five, height: SIZES.five },
        shadowOpacity: 0.15,
        shadowRadius: SIZES.five,
        elevation: SIZES.five,
    },
    spinnerTextStyle: {
        color: '#FFF',
        fontFamily: Constants.fontRegular,
    },
});
