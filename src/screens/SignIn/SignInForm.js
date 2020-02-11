import React, { Component } from 'react';

import {Button, Content, Input, Item, Spinner, Text} from "native-base";
import {Formik} from "formik";
import {API_BASE} from '../../constants';
import validations from './validations';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

import {inject} from 'mobx-react';
import firebase from "react-native-firebase";
import {action} from 'mobx';
import NavigationService from '../../NavigationService';
@inject('AuthStore')

export default class SignInForm extends Component {
    state:{
        machine_token:null;
    };

    componentDidMount() {

        const messaging = firebase.messaging();
        messaging.getToken().then(machine_token => {
            this.setState({machine_token: machine_token});
            console.log("MACHINE_TOKEN: " + this.state.machine_token);
            AsyncStorage.setItem('machine_token',this.state.machine_token);


        });

    }
    _handleSubmit = async (values, bag) => {
        try {
            const {data} = await axios.post(`${API_BASE}/login`,{email: values.email, password: values.password, machine_token: this.state.machine_token});
            console.log(data);
            bag.setSubmitting(false);

            if(data.success =='false'){
                alert(data.message);
                return false;
            }else{
                this.props.AuthStore.saveToken(data.data.token);
            }
        }catch (e) {
            bag.setSubmitting(false);
            bag.setErrors(e)
        }
    };

    render() {
        return (
            <Formik
                initialValues={{
                    email: '',
                    password: '',
                }}
                onSubmit={this._handleSubmit}
                validationSchema={validations}
            >
                {({
                      values,
                      handleChange,
                      handleSubmit,
                      errors,
                      touched,
                      setFieldTouched,
                      isValid,
                      isSubmitting
                  }) => (
                    <Content style={{padding: 10}}>
                        <Item error={errors.email && touched.email}>
                            <Input
                                returnKeyType={'next'}
                                onSubmitEditing={() => this.passwordRef._root.focus()}
                                onChangeText={handleChange('email')}
                                value={values.email}
                                placeholder='email'
                                onBlur={() => setFieldTouched('email')}
                                autoCorrect={false}
                                autoCapitalize={'none'}
                            />

                            { (errors.email && touched.email) && <Text style={{color: 'red'}}>{errors.email}</Text>}
                        </Item>

                        <Item error={errors.password && touched.password}>
                            <Input
                                ref={ref => this.passwordRef = ref}
                                returnKeyType={'go'}
                                onChangeText={handleChange('password')}
                                value={values.password}
                                placeholder='password'
                                onBlur={() => setFieldTouched('password')}
                                autoCapitalize={'none'}
                                secureTextEntry={true}
                            />

                            { (errors.password && touched.password) && <Text style={{color: 'red'}}>{errors.password}</Text>}
                        </Item>


                        <Button
                            block
                            disabled={isSubmitting}
                            onPress={handleSubmit}
                            style={{marginTop: 10}}>

                            { isSubmitting && <Spinner size={'small'} color={'white'} /> }
                            <Text>login</Text>
                        </Button>
                    </Content>
                )}
            </Formik>
        );
    }
}
