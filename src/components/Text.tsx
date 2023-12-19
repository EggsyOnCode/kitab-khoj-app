import { View } from 'react-native'
import { Text } from 'react-native-paper'
import React from 'react'

function PickerDisplay(props:any) {
  return (
    <View>
      <Text>{props.text}</Text>
    </View>
  );
}
export default PickerDisplay;