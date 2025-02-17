import React, {useEffect} from 'react'
import {View, FlatList, Text, StyleSheet, Platform} from 'react-native'
import {HeaderButtons, Item} from 'react-navigation-header-buttons'
import {useSelector, useDispatch} from "react-redux"

import HeaderButton from "../components/HeaderButton"
import PlaceItem from "../components/PlaceItem"
import * as placesActions from '../store/places-actions'

import {insertPlace, fetchPlaces} from '../helpers/db'


const PlacesListScreen = props => {

  const places = useSelector(state => state.places.places)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(placesActions.loadPlaces())
  }, [dispatch])

  if (places.length === 0) {
    return (
      <View style={styles.noPlaces}>
        <Text>Click '+' icon to start adding new places!</Text>
      </View>
    )
  }


  console.log(places[0]);
  return (
    <FlatList
      data={places}
      keyExtractor={item => item.id}
      renderItem={itemData => (
        <PlaceItem
          image={itemData.item.imageUri}
          title={itemData.item.title}
          address={itemData.item.address}
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