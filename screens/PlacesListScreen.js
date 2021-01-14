import React from 'react'
import {View, FlatList, Text, StyleSheet, Platform} from 'react-native'
import {HeaderButtons, Item} from 'react-navigation-header-buttons'
import {useSelector} from "react-redux"

import HeaderButton from "../components/HeaderButton"
import PlaceItem from "../components/PlaceItem"

const PlacesListScreen = props => {

  const places = useSelector(state => state.places.places)

  if (places.length === 0) {
    return (
      <View style={styles.noPlaces}>
        <Text>Click '+' icon to start adding new places!</Text>
      </View>
    )
  }

  return (


    <FlatList
      data={places}
      keyExtractor={item => item.id}
      renderItem={itemData => (
        <PlaceItem
          image={null}
          title={itemData.item.title}
          address={null}
          onSelect={() => {
            props.navigation.navigate('PlaceDetail', {
              placeTitle: itemData.item.title,
              placeId: itemData.item.id
            })
          }}
        />
      )
      }
    />
  )
}

PlacesListScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "All Places",
    headerRight: () => <HeaderButtons HeaderButtonComponent={HeaderButton}>
      <Item
        title='Add Place'
        iconName={Platform.OS === 'android' ? 'md-add' : 'ios-add'}
        onPress={() => {
          navData.navigation.navigate('NewPlace')
        }}
      />
    </HeaderButtons>
  }
}

const styles = StyleSheet.create({
  noPlaces: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
})

export default PlacesListScreen