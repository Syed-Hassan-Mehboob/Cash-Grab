import React from 'react';
import {
  View,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Platform,
} from 'react-native';
import Colors from '../common/Colors';
import Images from '../common/Images';
import RegularTextCB from '../components/RegularTextCB';

const {height, width} = Dimensions.get('window');

export default class TermsAndConditions extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={[styles.container, {padding: 0}]}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            padding: 15,
            marginTop: Platform.OS === 'android' ? 0 : 20,
          }}>
          <TouchableOpacity
            style={{position: 'absolute', left: 10}}
            onPress={() => {
              this.props.navigation.goBack();
            }}>
            <Image
              source={Images.arrowBack}
              style={[styles.iconBack, {tintColor: Colors.black}]}
            />
          </TouchableOpacity>
          <RegularTextCB style={{fontSize: 30, color: Colors.black}}>
            Terms & Conditions
          </RegularTextCB>
        </View>
        <View style={styles.card}>
          <ScrollView
            style={{height: height - 60 * 5}}
            showsVerticalScrollIndicator={false}>
            <View>
              <RegularTextCB style={{color: Colors.coolGrey, fontSize: 16}}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Sed
                augue lacus viverra vitae.{'\n\n'} Fusce ut placerat orci nulla
                pellentesque dignissim enim. Sodales neque sodales ut etiam sit
                amet. Elementum tempus egestas sed sed risus. Vitae elementum
                curabitur vitae nunc sed. Turpis egestas maecenas pharetra
                convallis. Turpis massa sed elementum tempus egestas sed sed
                risus. Malesuada proin libero nunc consequat interdum varius
                sit. Gravida in fermentum et sollicitudin. Ut sem nulla pharetra
                diam sit amet. Imperdiet sed euismod nisi porta lorem mollis.
                Tempor id eu nisl nunc mi ipsum faucibus vitae aliquet. Vel
                fringilla est ullamcorper eget nulla facilisi.{'\n\n'} Eget
                egestas purus viverra accumsan in nisl nisi. Arcu cursus euismod
                quis viverra nibh. Aliquet eget sit amet tellus cras adipiscing
                enim eu. Dolor morbi non arcu risus quis varius. Sollicitudin
                tempor id eu nisl nunc mi ipsum. Curabitur vitae nunc sed velit
                dignissim sodales. Aliquam etiam erat velit scelerisque. Magna
                eget est lorem ipsum dolor sit. Euismod lacinia at quis risus
                sed. Enim praesent elementum facilisis leo vel fringilla. Porta
                lorem mollis aliquam ut porttitor leo. Maecenas accumsan lacus
                vel facilisis volutpat est velit. Porttitor leo a diam
                sollicitudin. Quam nulla porttitor massa id neque aliquam
                vestibulum morbi. Neque vitae tempus quam pellentesque nec nam
                aliquam sem. Pharetra magna ac placerat vestibulum.{'\n\n'}{' '}
                Eleifend mi in nulla posuere sollicitudin. Eget nunc scelerisque
                viverra mauris in aliquam sem fringilla. Viverra vitae congue eu
                consequat ac. Ac odio tempor orci dapibus ultrices in iaculis
                nunc. Diam quam nulla porttitor massa id. Elit at imperdiet dui
                accumsan sit amet. Tortor posuere ac ut consequat semper.
                Adipiscing elit pellentesque habitant morbi tristique.
                Pellentesque sit amet porttitor eget dolor morbi. Sed enim ut
                sem viverra aliquet eget sit. Mattis vulputate enim nulla
                aliquet porttitor lacus. Maecenas pharetra convallis posuere
                morbi. At lectus urna duis convallis convallis. Id leo in vitae
                turpis massa. Nulla aliquet porttitor lacus luctus accumsan
                tortor posuere. Consectetur adipiscing elit duis tristique
                sollicitudin nibh sit amet commodo. {'\n\n'}Iaculis nunc sed
                augue lacus viverra vitae congue eu. Laoreet non curabitur
                gravida arcu ac tortor dignissim convallis. Nunc non blandit
                massa enim nec dui nunc mattis enim. Sit amet purus gravida
                quis. Nunc sed augue lacus viverra vitae congue. Sit amet luctus
                venenatis lectus. Urna cursus eget nunc scelerisque viverra
                mauris in. Pharetra magna ac placerat vestibulum. In hendrerit
                gravida rutrum quisque non tellus orci. Etiam sit amet nisl
                purus. Libero id faucibus nisl tincidunt eget. Sed lectus
                vestibulum mattis ullamcorper velit. Posuere sollicitudin
                aliquam ultrices sagittis. Diam vulputate ut pharetra sit amet
                aliquam.{'\n\n'} Integer enim neque volutpat ac tincidunt vitae
                semper quis lectus. Aliquet nec ullamcorper sit amet risus
                nullam. Porta nibh venenatis cras sed felis eget. Et malesuada
                fames ac turpis. Aenean sed adipiscing diam donec adipiscing.
                Volutpat sed cras ornare arcu dui vivamus arcu felis bibendum.
                Lectus proin nibh nisl condimentum id venenatis. Sed risus
                pretium quam vulputate dignissim. Sed faucibus turpis in eu mi.
                Et netus et malesuada fames ac turpis egestas. Ultrices mi
                tempus imperdiet nulla malesuada pellentesque elit. In egestas
                erat imperdiet sed. Fusce ut placerat orci nulla pellentesque.
                Vitae auctor eu augue ut. Id neque aliquam vestibulum morbi
                blandit cursus risus. Sapien nec sagittis aliquam malesuada
                bibendum arcu. Mattis vulputate enim nulla aliquet porttitor.
                Quis hendrerit dolor magna eget est lorem. {'\n\n'}Integer quis
                auctor elit sed vulputate mi sit amet mauris. Neque sodales ut
                etiam sit amet nisl purus in mollis. Scelerisque eu ultrices
                vitae auctor eu augue ut lectus arcu. A cras semper auctor neque
                vitae tempus quam. Orci porta non pulvinar neque laoreet
                suspendisse interdum consectetur libero. Nulla pharetra diam sit
                amet nisl. Velit scelerisque in dictum non consectetur a erat.
                Nulla aliquet porttitor lacus luctus accumsan tortor posuere ac.
                Viverra aliquet eget sit amet tellus cras adipiscing enim.
                Faucibus turpis in eu mi bibendum neque egestas congue. Id leo
                in vitae turpis massa sed. Et leo duis ut diam quam nulla
                porttitor massa. What is Lorem Ipsum Lorem Ipsum is simply dummy
                text of the printing and typesetting industry Lorem Ipsum has
                been the industry's standard dummy text ever since the 1500s
                when an unknown printer took a galley of type and scrambled it
                to make a type specimen book it has? {'\n\n'}
                What is Lorem Ipsum Lorem Ipsum is simply dummy text of the
                printing and typesetting industry Lorem Ipsum has been the
                industry's standard dummy text ever since the 1500s when an
                unknown printer took a galley of type and scrambled it to make a
                type specimen book it has?{'\n\n'}
                What is Lorem Ipsum Lorem Ipsum is simply dummy text of the
                printing and typesetting industry Lorem Ipsum has been the
                industry's standard dummy text ever since the 1500s when an
                unknown printer took a galley of type and scrambled it to make a
                type specimen book it has?{'\n\n'}
                What is Lorem Ipsum Lorem Ipsum is simply dummy text of the
                printing and typesetting industry Lorem Ipsum has been the
                industry's standard dummy text ever since the 1500s when an
                unknown printer took a galley of type and scrambled it to make a
                type specimen book it has?{'\n\n'}
              </RegularTextCB>
            </View>
          </ScrollView>
        </View>
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
  card: {
    backgroundColor: Colors.white,
    borderRadius: 10,
    padding: 15,
    shadowColor: '#c5c5c5',
    shadowOffset: {width: 5, height: 5},
    shadowOpacity: 1.0,
    shadowRadius: 10,
    elevation: 10,
    marginHorizontal: 15,
    alignItems: 'center',
  },
});
