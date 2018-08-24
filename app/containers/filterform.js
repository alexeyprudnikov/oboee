import React, {Component} from 'react'
import { Text, TextInput, View, Button, Picker } from 'react-native'

import Styles from './../assets/styles'

class FilterForm extends Component {
    constructor(props) {
        super(props);
        this.state = {query:'', orientation: null}
    }
    componentDidMount() {
        if(typeof this.props.filter.query !== 'undefined') {
            this.setQuery(this.props.filter.query)
        }
        if(typeof this.props.filter.orientation !== 'undefined') {
            this.setOrientation(this.props.filter.orientation)
        }
    }
    setQuery = (value) => {
        this.setState({query: value})
    }
    setOrientation = (value) => {
        this.setState({orientation: value})
    }
    applySearch = () => {
        let filter = {
            query: this.state.query,
            orientation: this.state.orientation
        }
        this.props.apply(filter)
    }
    clearSearch = () => {
        let filter = {
            query: '',
            orientation: null
        }
        this.props.apply(filter)
    }
    render() {
        let query = this.state.query
        return (
            <View>
                <Text>Filter:</Text>
                <Text>search terms</Text>
                <TextInput
                    style={{borderColor: 'gray', borderWidth: 1}}
                    onChangeText={(val) => this.setQuery(val)}
                    value={query}
                />
                {
                    query != '' &&
                    <Picker
                        selectedValue={this.state.orientation}
                        style={{ height: 50, width: 100 }}
                        onValueChange={(itemValue, itemIndex) => this.setState({orientation: itemValue})}>
                        <Picker.Item label="all" value="" />
                        <Picker.Item label="landscape" value="landscape" />
                        <Picker.Item label="portrait" value="portrait" />
                        <Picker.Item label="squarish" value="squarish" />
                    </Picker>
                }
                {
                    query != '' &&
                    <Button onPress={this.applySearch} title='apply search'/>
                }
                <Button onPress={this.clearSearch} title='clear search'/>
            </View>
        )
    }
}

export default FilterForm
