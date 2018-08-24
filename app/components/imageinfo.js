import React, {Component} from 'react'
import { Text, View } from 'react-native'

import Styles from './../assets/styles'

class ImageInfo extends Component {
    render() {
        let imgdata = this.props.data
        return (
            <View>
                <Text>Imageinfo:</Text>
                <Text>created_at: {imgdata.created_at}</Text>
                <Text>width: {imgdata.width}px</Text>
                <Text>height: {imgdata.height}px</Text>
            </View>
        )
    }
}

export default ImageInfo
