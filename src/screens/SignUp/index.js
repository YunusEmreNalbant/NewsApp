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
import SignUpForm from './SignUpForm';
export default class SignUp extends Component {
    render() {
        return (
          <React.Fragment>
              <Header>
                  <Body>
                      <Title>Sign up</Title>
                  </Body>
              </Header>
              <SignUpForm navigation={this.props.navigation}/>
          </React.Fragment>
        );
    }
}

const styles = StyleSheet.create({

});
