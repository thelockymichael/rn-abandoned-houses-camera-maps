import React from 'react'

import ENV from "../env"

import {
  TouchableOpacity,
  View,
  Image,
  StyleSheet
} from "react-native"

const apiKey = ENV().googleApiKey

const MapPreview = props => {
  let imagePreviewUrl

  console.log("API KEY", apiKey);
  if (props.location) {
    imagePreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${
      props.location.lat
      },${
      props.location.lng
      }&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:A%7C${
      props.location.lat
      },${props.location.lng}&key=${apiKey}`
  }

  return <TouchableOpacity
    onPress={props.onPress}
    style={{
      ...styles.mapPreview,
      ...props.style
    }}>
    {props.location ?
      <Image
        style={styles.mapImage}
        source={{uri: imagePreviewUrl}}
      /> :
      props.children
    }
  </TouchableOpacity>
}


const styles = StyleSheet.create({
  mapPreview: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  mapImage: {
    width: '100%',
    height: '100%'
  }
})

export default MapPreview