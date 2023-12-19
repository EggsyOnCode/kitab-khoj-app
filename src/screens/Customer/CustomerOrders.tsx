import { View, Text } from 'react-native'
import React from 'react'

interface props{
    theme: any
    navigation: any
}

const CustomerOrders:React.FC<props> = ({theme, navigation}) => {
  return (
    <View>
      <Text>CustomerOrders</Text>
    </View>
  )
}

export default CustomerOrders