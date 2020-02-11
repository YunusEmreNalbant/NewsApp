import React, {Component} from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
} from 'react-native';
import {Body,Header,Title} from 'native-base'
import SignInForm from './SignInForm';

export default class SignUp extends Component {
    render() {
        return (
          <React.Fragment>
              <Header>
                  <Body>
                      <Title>Sign in</Title>
                  </Body>
              </Header>
              <SignInForm/>
          </React.Fragment>
        );
    }
}

const styles = StyleSheet.create({

});
