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
import Constants from '../common/Constants';
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
                        marginTop: Platform.OS === 'android' ? 0 : 20,
                    }}>
                    <TouchableOpacity
                        style={{ position: 'absolute', left: 10 }}
                        onPress={() => {
                            this.props.navigation.goBack();
                        }}>
                        <Image
                            source={Images.arrowBack}
                            style={[styles.iconBack, { tintColor: Colors.black }]}
                        />
                    </TouchableOpacity>


                    <RegularTextCB style={{ fontSize: 30, color: Colors.black }}>All Jobs</RegularTextCB>

                </View>

                <FlatList
                    style={{ marginTop: 10 }}
                    data={this.state.allJobs}
                    keyExtractor={(item) => item.id}
                    showsVerticalScrollIndicator={false}
                    renderItem={this.renderSingleCategoriesItem}
                    contentInset={{
                        // for ios
                        bottom: 100,
                    }}
                    contentContainerStyle={{
                        // for android
                        paddingBottom: 100,
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
        height: 20,
        width: 20,
        resizeMode: 'contain',
    },
    iconFilter: {
        height: 30,
        width: 30,
        resizeMode: 'contain',
    },
    iconForward: {
        height: 100,
        width: 100,
        resizeMode: 'contain',
    },
    iconUser: {
        height: 60,
        width: 60,
        borderRadius: 60 / 2,
        resizeMode: 'contain',
    },
    iconPassword: {
        fontSize: 20,
        height: 20,
        width: 20,
        alignSelf: 'center',
        color: Colors.orange,
    },
    container: {
        backgroundColor: Colors.white,
        flex: 1,
        paddingTop: 15,
        paddingHorizontal: 5,
    },
    childContainer: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    itemContainer: {
        padding: 20,
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
        borderRadius: 20,
        flex: 1,
        shadowColor: '#c5c5c5',
        shadowOffset: { width: 5, height: 5 },
        shadowOpacity: 1.0,
        shadowRadius: 10,
        elevation: 10,
    },
    circleCard: {
        height: 60,
        width: 60,
        borderRadius: 30,
        shadowColor: '#c5c5c5',
        shadowOffset: { width: 5, height: 5 },
        shadowOpacity: 0.15,
        shadowRadius: 5,
        elevation: 5,
    },
    spinnerTextStyle: {
        color: '#FFF',
        fontFamily: Constants.fontRegular,
    },
});
