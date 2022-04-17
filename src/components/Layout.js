import {View, Text, SafeAreaView, StyleSheet} from 'react-native';
import React from 'react';

import {hScale} from '../utils';

const Layout = ({children}) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.body}>{children}</View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
  body:{
    flex:1,
  }
});
export default React.memo(Layout);
