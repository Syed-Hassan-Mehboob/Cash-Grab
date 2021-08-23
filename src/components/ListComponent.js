import React from "react";
import { View, TouchableOpacity, Image, StyleSheet } from "react-native";
import Colors from "../common/Colors";
import Constants from "../common/Constants";
import Images from "../common/Images";
import LightTextCB from "./LightTextCB";
import RegularTextCB from "./RegularTextCB";


const ListComponent = (props) => {
    const item = props.item;
    console.log('List Componant=======',item);
    return (
        <TouchableOpacity
            activeOpacity={0.5}
            style={[styles.card, { padding: 15, marginHorizontal: 15, marginBottom: 20, marginTop: 5 },]}
            onPress={() => this.props.navigation.navigate(Constants.viewJob)}>
            <View
                style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={styles.circleCard}>
                    {/* <Image
                        source={{ uri: Constants.imageURL + props.screenName ? item.category.image : item.user.userProfile.image }}
                        style={styles.iconUser}
                        resizeMode="cover"
                    /> */}
                </View>
                <View style={{ marginStart: 10 }}>
                    <RegularTextCB
                        style={{ color: Colors.black, fontSize: 16, }}>
                        {item.user.name}
                    </RegularTextCB>
                    <View
                        style={{ flexDirection: 'row', marginTop: 5, alignItems: 'center', }}>
                        <Image source={Images.iconVerified} style={{ height: 15, width: 15, resizeMode: 'contain', tintColor: item.user.email_verified_at !== null ? Colors.turqoiseGreen : 'red' }} />
                        <RegularTextCB style={{ color: item.user.email_verified_at !== null ? Colors.turqoiseGreen : 'red', fontSize: 12, marginStart: 5, }}>
                            {item.user.email_verified_at !== null ? "Verified" : "Unverified"}
                        </RegularTextCB>
                    </View>
                </View>
            </View>
            <View style={{ flexDirection: 'row', marginTop: 5, alignItems: 'center', justifyContent: 'space-between' }}>
                <RegularTextCB style={{ color: Colors.black, fontSize: 16, }}>
                    {item.title}
                </RegularTextCB>

                <LightTextCB
                    style={{ color: Colors.black, fontSize: 12, }}>
                    ${item.price}
                </LightTextCB>

            </View>

            <RegularTextCB
                style={{ color: Colors.sickGreen, fontSize: 12, }}>
                {item.service.name}
            </RegularTextCB>
            <RegularTextCB
                style={{ color: Colors.coolGrey, }}>
                {item.description}
            </RegularTextCB>
            <View
                style={{ flexDirection: 'row', marginTop: 5, alignItems: 'center' }}>
                <Image
                    source={Images.iconLocationPin}
                    style={{ height: 17, width: 17, resizeMode: 'contain' }}
                />
                <RegularTextCB
                    style={{
                        color: Colors.coolGrey,
                        marginStart: 5,
                    }}>
                    {item.address}
                </RegularTextCB>
            </View>
            <View
                style={{ flexDirection: 'row', marginTop: 5, alignItems: 'center' }}>
                <Image
                    source={Images.iconStopWatch}
                    style={{ height: 17, width: 17, resizeMode: 'contain' }}
                />
                <View
                    style={{
                        flexDirection: 'row',
                        marginStart: 5,
                        alignItems: 'center',
                        flex: 1,
                        justifyContent: 'space-between',
                    }}>
                    <RegularTextCB
                        style={{
                            color: Colors.coolGrey,
                        }}>
                        {item.time}
                    </RegularTextCB>
                    <RegularTextCB
                        style={{
                            color: Colors.black,
                        }}>
                        {'Contact >'}
                    </RegularTextCB>
                </View>
            </View>
        </TouchableOpacity>
    );
}

export default ListComponent;


const styles = StyleSheet.create({
    conatiner: {

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
    iconUser: {
        height: 60,
        width: 60,
        borderRadius: 60 / 2,
        resizeMode: 'contain',
    },

});