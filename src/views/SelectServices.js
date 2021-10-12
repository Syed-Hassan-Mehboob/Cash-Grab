import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
} from "react-native";
import Colors from "../common/Colors";
import Constants, { SIZES, STYLES, FONTS } from "../common/Constants";
import BoldTextCB from "../components/BoldTextCB";
import ButtonRadius10 from "../components/ButtonRadius10";
import NormalHeader from "../components/NormalHeader";
import RegularTextCB from "../components/RegularTextCB";
import utils from "../utils";
import Axios from "../network/APIKit";
import Spinner from "react-native-loading-spinner-overlay";

export default function SelectServices(props) {
  const [isLoading, setIsloading] = useState(true);
  console.log("other user id", props.route.params.id);

  const [serviceData, setServiceData] = useState([]);

  useEffect(async () => {
    getUserAccessToken();
  }, []);
  console.log("shaohabbb=====", serviceData);

  const getUserAccessToken = async () => {
    setIsloading(true);
    const value = await AsyncStorage.getItem("user");
    const accessToken = JSON.parse(value);
    if (accessToken !== undefined) {
      vendorAllServices(accessToken.token);
      // postJobRequest(accessToken.token);
    }
  };

  const vendorAllServices = async () => {
    const value = await AsyncStorage.getItem(Constants.accessToken);
    let config = {
      params: {
        categoryId: props.route.params.id,
      },
      headers: {
        Authorization: value,
      },
    };

    // console.log('tokennnnn', token);

    const onSuccess = ({ data }) => {
      console.log(
        "All Servicessssssss ======================>",
        data.data[0].services
      );
      // setAllServices(data.data[0].services);
      let temp = [];
      let temp1 = data.data[0].services;
      temp1.map((element) => {
        // element["isSelected"] = false;
        temp.push({ ...element, isSelected: false });
      });
      setServiceData(temp);
      setIsloading(false);
    };
    const onFailure = (error) => {
      utils.showResponseError(error);
      setIsloading(false);
      console.log("=======Servicessssss========>", error);
    };
    // const onSuccess = ({data}) => {
    //   console.log('asdsdasdsadasd ======================>', data.data);
    //   setJobAccept(data.data);
    //   setIsloading(false);
    // };
    // const onFailure = (error) => {
    //   utils.showResponseError(error);
    //   setIsloading(false);
    //   console.log('===============>', error);
    // };
    Axios.get(Constants.customerViewCategoriesURL, config)
      .then(onSuccess)
      .catch(onFailure);
  };

  const onPress = (id, type) => {
    let newArray = serviceData.map((val, i) => {
      if (id === val.id) {
        return { ...val, isSelected: type };
      } else {
        return val;
      }
    });
    setServiceData(newArray);
  };

  const renderServices = ({ item }) => {
    return (
      <TouchableOpacity
        style={{
          flexDirection: "row",
          backgroundColor: Colors.white,
          alignItems: "center",
          justifyContent: "space-between",
          paddingVertical: SIZES.fifteen,
          borderRadius: SIZES.ten,
          marginTop: SIZES.ten,
          paddingHorizontal: SIZES.twenty,
          shadowColor: "#c5c5c5",
          shadowOffset: { width: SIZES.five, height: SIZES.five },
          shadowOpacity: 1.0,
          shadowRadius: SIZES.ten,
          elevation: SIZES.ten,
          borderWidth: 1,
          borderColor: item.isSelected ? Colors.sickGreen : Colors.white,
        }}
        onPress={() => onPress(item.id, !item.isSelected)}
        activeOpacity={0.6}
      >
        <RegularTextCB>{item.name}</RegularTextCB>
        <RegularTextCB>{item.price}</RegularTextCB>
      </TouchableOpacity>
    );
  };

  return (
    <View
      style={[
        STYLES.container,
        {
          flex: 1,
          backgroundColor: Colors.white,
        },
      ]}
    >
      <NormalHeader name="Select Services" />
      <BoldTextCB style={{ marginLeft: SIZES.twenty, fontSize: 16 }}>
        {/* Cleaning */}
      </BoldTextCB>

      <FlatList
        data={serviceData}
        renderItem={renderServices}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          flex: 1,
          paddingHorizontal: SIZES.twenty,
        }}
        ListEmptyComponent={() => {
          return (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={[FONTS.mediumFont18, { color: Colors.black }]}>
                Record not found
              </Text>
            </View>
          );
        }}
      />

      <TouchableOpacity
        style={{
          flex: 1,
          position: "absolute",
          bottom: SIZES.twenty,
          width: "100%",
          paddingHorizontal: SIZES.ten,
        }}
        activeOpacity={0.6}
      >
        <ButtonRadius10
          bgColor={Colors.sickGreen}
          label="Next"
          onPress={() => {
            props.navigation.navigate(Constants.dateTimeSlots);
          }}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({});

const Data = [
  {
    id: 1,
    name: "Home Cleaning",
    price: "$240.00",
    isSelected: false,
  },
  {
    id: 2,
    name: "Garage Cleaning",
    price: "$240.00",
    isSelected: false,
  },
  {
    id: 3,
    name: "Garden Cleaning",
    price: "$240.00",
    isSelected: false,
  },
];
