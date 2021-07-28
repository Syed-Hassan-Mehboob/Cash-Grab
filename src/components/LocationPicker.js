import React, { useState, } from "react";
import { Dimensions, View, TouchableOpacity, Modal, StyleSheet } from "react-native";
import RegularTextCB from "../components/RegularTextCB";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import Placesearch from 'react-native-placesearch';
const { width, height } = Dimensions.get("window");

export function LocationPicker(props) {
    const [showModal, setShowModal] = useState(false);
    const [coordinate, setcoordinate] = useState()

    const selectMultipleValues = (item) => {
        props.onChangeValue();

    };

    const MY_API_KEY = "AIzaSyC-MPat5umkTuxfvfqe1FN1ZMSafBpPcpM";

    { /* Google Mao Auto Search Code Start with Hear ========================================================================================>*/ }

    const GooglePlacesInput = (props) => {
        return (
            <GooglePlacesAutocomplete
                placeholder={"Search"}
                //   renderLeftButton={() => }
                minLength={2}
                keyboardKeyType={"search"}
                fetchDetails={true}
                onPress={(data, details = null) => {
                    console.log(details)
                    console.log(data)

                }}


                query={{ key: "AIzaSyC-MPat5umkTuxfvfqe1FN1ZMSafBpPcpM", language: "en", types: "", }}
                enablePoweredByContainer={false}
                styles={{
                    textInputContainer: {
                        backgroundColor: "#fff", marginTop: 0, marginBottom: 0, marginLeft: 0, marginRight: 0, shadowColor: "#000",
                        shadowOffset: {
                            width: 0,
                            height: 5,
                        },
                        shadowOpacity: 0.36,
                        shadowRadius: 6.68,
                        elevation: 11,
                        paddingHorizontal: 5,
                        borderRadius: 8,
                    },
                    textInput: { marginTop: 0, marginBottom: 0, marginLeft: 0, marginRight: 0, },
                    listView: { marginTop: 10, borderRadius: 8, overflow: "hidden", backgroundColor: "#fff", },
                    row: { borderRadius: 8, }
                }}
                GooglePlacesSearchQuery={{ rankby: "distance", }}
                GooglePlacesDetailsQuery={{ fields: ["formatted_address", "geometry"], }}
                renderDescription={(row) => row.description}
                currentLocation={true}
                currentLocationLabel="Current location"
                nearbyPlacesAPI="GooglePlacesSearch"
                predefinedPlaces={[]}
                debounce={200}
                google
            />
        );
    };
    return (
        <View
            style={[
                styles.card,
                {
                    height: 60,
                    borderRadius: 10,
                    justifyContent: 'center',
                    paddingHorizontal: 20,
                    paddingVertical: 5,
                    marginHorizontal: 0,
                    marginTop: 0
                },
            ]}
        >
            <Modal
                animationType="fade"
                transparent={true}
                visible={showModal}
                onRequestClose={() => { setShowModal(!showModal); }}
            >
                <View style={{ flex: 1, padding: 20, backgroundColor: 'rgba(52, 52, 52, 0.5)' }}
                >
                    <View style={{ flex: 1 }} >
                        {/* <GooglePlacesInput /> */}
                        <Placesearch
                            apikey={MY_API_KEY} // required *
                            SelectedAddress={(data) => console.log(data)} // required *
                            country="PK" //optional
                            area={true}
                            lat="22.5726"
                            lng="88.3639"
                            radius="500" // in meters
                        />

                    </View>

                </View>
            </Modal>

            <TouchableOpacity onPress={() => { setShowModal(true); }}>
                <RegularTextCB>{"Get Location"} </RegularTextCB>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
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
});