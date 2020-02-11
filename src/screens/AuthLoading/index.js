import React, {Component} from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
} from 'react-native';
import {inject} from 'mobx-react';

@inject('AuthStore')
class AuthLoading extends Component {
    async componentDidMount() {

        await this.props.AuthStore.setupAuth();
    }

    render() {
        return (
            <View>
                <Text>Auth Loading...</Text>
            </View>
        );
    }
}

export default AuthLoading;
