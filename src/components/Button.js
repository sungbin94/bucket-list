import React from 'react';
import { StyleSheet, Button, View, SafeAreaView, Text, Alert } from 'react-native';



const Separator = () => (
  <View style={styles.separator} />
);

const clearAll = () => (
  <SafeAreaView style={styles.container}>
    <View>
      <Text style={styles.title}></Text>
      <Button
        title="완료항목 전체삭제"
        onPress={() => Alert.alert('삭제')}
      />
    </View>
    <Separator/>
    </SafeAreaView>);

const styles = StyleSheet.create({
  container: {
    flex: 0.3,
    justifyContent: 'center',
    width: 300,
  },
  title: {
    textAlign: 'center',
  },
  fixToText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  separator: {
    borderBottomColor: '#ff0000',
    Color: '#ff0000'
  },
});

export default clearAll;