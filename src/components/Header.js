import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {hScale, scale, wScale} from '../utils';
import {useNavigation} from '@react-navigation/native';

const Header = () => {
  const navigation = useNavigation();
  const goBack = () => navigation.goBack();
  return (
    <View style={styles.container}>
      <Ionicons
        name="chevron-back"
        size={scale(22)}
        color="black"
        onPress={goBack}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: wScale(8),
    borderBottomWidth: 0.5,
    borderBottomColor: '#ccc',
    paddingBottom:hScale(8)
  },
});

export default React.memo(Header);
