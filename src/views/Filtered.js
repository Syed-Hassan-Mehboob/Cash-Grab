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
import Colors from '../common/Colors';
import Constants, { SIZES } from '../common/Constants';
import Images from '../common/Images';
import RegularTextCB from '../components/RegularTextCB';
import LightTextCB from '../components/LightTextCB';
import utils from '../utils';
import Axios from '../network/APIKit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Spinner from 'react-native-loading-spinner-overlay';
import ListComponent from "../components/ListComponent";

export default class FileredScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            accessToken: '',
            allJobs: []
        };

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
            this.getAllJobs();
        });
    };

    getAllJobs = () => {
        const onSuccess = ({ data }) => {
            this.setState({ isLoading: false, allJobs: data.data.records });
        };

        const onFailure = (error) => {
            this.setState({ isLoading: false });
            utils.showResponseError(error);
        };

        this.setState({ isLoading: true });

        Axios.get(Constants.getAllJobs, {
            headers: { Authorization: this.state.accessToken },
        })
            .then(onSuccess)
            .catch(onFailure);
    };


    renderSingleCategoriesItem = ({ item }) => {
        return (
        //    console.log('=====Item',item['user']['userProfile']),
        //    console.log('=====Item',item.user.userProfile),
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


                    <RegularTextCB style={{ fontSize: SIZES.ten*3, color: Colors.black }}>All Jobs</RegularTextCB>

                </View>

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
