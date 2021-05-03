import {
  FlatList,
  Image,
  LayoutAnimation,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {Component} from 'react';
import Colors from '../common/Colors';
import Images from '../common/Images';
import RegularTextCB from '../components/RegularTextCB';

export default class Faq extends Component {
  data = {
    title: "FAQ's",
    rows: [
      {
        id: '1',
        title: 'Lorem ipsum dolor sit amet,',
        isExpanded: false,
        content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sed tempor sem. Aenean vel turpis feugiat, ultricies metus at, consequat velit. Curabitur est nibh, varius in tellus nec, mattis pulvinar metus. In maximus cursus lorem, nec laoreet velit eleifend vel. Ut aliquet mauris tortor, sed egestas libero interdum vitae. Fusce sed commodo purus, at tempus turpis.`,
      },
      {
        id: '2',
        title: 'Nunc maximus, magna at ultricies elementum',
        isExpanded: false,
        content:
          'Nunc maximus, magna at ultricies elementum, risus turpis vulputate quam, vitae convallis ex tortor sed dolor.',
      },
      {
        id: '3',
        title: 'Curabitur laoreet, mauris vel blandit fringilla',
        isExpanded: false,
        content: `Curabitur laoreet, mauris vel blandit fringilla, leo elit rhoncus nunc, ac sagittis leo elit vel lorem. Fusce tempor lacus ut libero posuere viverra. Nunc velit dolor, tincidunt at varius vel, laoreet vel quam. Sed dolor urna, lobortis in arcu auctor, tincidunt mattis ante. Vivamus venenatis ultricies nibh in volutpat. Cras eu metus quis leo vestibulum feugiat nec sagittis lacus.Mauris vulputate arcu sed massa euismod dignissim. `,
      },
      {
        id: '4',
        title: 'Lorem ipsum dolor sit amet,',
        isExpanded: false,
        content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sed tempor sem. Aenean vel turpis feugiat, ultricies metus at, consequat velit. Curabitur est nibh, varius in tellus nec, mattis pulvinar metus. In maximus cursus lorem, nec laoreet velit eleifend vel. Ut aliquet mauris tortor, sed egestas libero interdum vitae. Fusce sed commodo purus, at tempus turpis.`,
      },
      {
        id: '5',
        title: 'Nunc maximus, magna at ultricies elementum',
        isExpanded: false,
        content:
          'Nunc maximus, magna at ultricies elementum, risus turpis vulputate quam, vitae convallis ex tortor sed dolor.',
      },
      {
        id: '6',
        title: 'Curabitur laoreet, mauris vel blandit fringilla',
        isExpanded: false,
        content: `Curabitur laoreet, mauris vel blandit fringilla, leo elit rhoncus nunc, ac sagittis leo elit vel lorem. Fusce tempor lacus ut libero posuere viverra. Nunc velit dolor, tincidunt at varius vel, laoreet vel quam. Sed dolor urna, lobortis in arcu auctor, tincidunt mattis ante. Vivamus venenatis ultricies nibh in volutpat. Cras eu metus quis leo vestibulum feugiat nec sagittis lacus.Mauris vulputate arcu sed massa euismod dignissim. `,
      },
    ],
  };

  constructor(props) {
    super(props);
  }

  state = {
    expanded: false,
    data: this.data,
  };

  onChangeLayout = (title) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState({expanded: title});
  };

  renderFaqItem = ({item}) => {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        style={[
          styles.card,
          {padding: 15, borderWidth: item.isExpanded ? 2 : 0},
        ]}
        onPress={() => {
          this.onChangeLayout(item.title);
          this.state.data.rows.map((childItem) => {
            childItem.isExpanded = false;
          });
          item.isExpanded = true;
          console.log(
            'item: ' + item.id + ' ' + item.title + ' ' + item.isExpanded,
          );
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <RegularTextCB
            style={{
              fontSize: 16,
              color: item.isExpanded ? Colors.black : Colors.coolGrey,
              flex: 1,
            }}>
            {item.title}
          </RegularTextCB>
          <Image
            source={item.isExpanded ? Images.iconDash : Images.iconArrowDown}
            style={{height: 15, width: 15, resizeMode: 'contain'}}
          />
        </View>
        {item.isExpanded && (
          <View style={{height: this.state.expanded === item.title ? null : 0}}>
            <RegularTextCB style={{fontSize: 14, color: Colors.coolGrey}}>
              {item.content}
            </RegularTextCB>
          </View>
        )}
      </TouchableOpacity>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            padding: 15,
          }}>
          <TouchableOpacity
            style={{position: 'absolute', left: 10}}
            onPress={() => {
              this.props.navigation.goBack();
            }}>
            <Image source={Images.arrowBack} style={[styles.iconBack]} />
          </TouchableOpacity>
          <RegularTextCB style={{fontSize: 30}}>
            {this.state.data.title}
          </RegularTextCB>
        </View>
        <FlatList
          data={this.state.data.rows}
          showsVerticalScrollIndicator={false}
          keyExtractor={(data) => data.id}
          renderItem={this.renderFaqItem}
        />
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
    padding: 20,
    margin: 10,
    borderColor: Colors.sickGreen,
    shadowColor: '#ccc',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 10,
  },
});
