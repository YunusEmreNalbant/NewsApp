import React, {Component} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {Left} from "native-base";

class Detail extends Component {

    constructor(props) {
        super(props);
        this.item = props.navigation.getParam('item')
    }
    render() {
        return (
            <View>
                <Image
                    style={{width: null, height: 250}}
                    source={{uri: this.item.urlToImage}}
                />
                <Text>{this.item.title}</Text>
                <Text>{this.item.description}</Text>
            </View>
        );
    }
}

export default Detail;
