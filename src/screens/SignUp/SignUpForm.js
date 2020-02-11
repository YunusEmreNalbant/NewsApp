import React, {Component} from 'react';

import {Button, Container, Content, Input, Item, Spinner, Text} from 'native-base';
import {Formik} from 'formik';
import {API_BASE} from '../../constants';
import axios from 'axios';
import validations from './validations';
import firebase from 'react-native-firebase';
import AsyncStorage from '@react-native-community/async-storage';

export default class SignupForm extends Component {
    state:{
        machine_token:null;
    };

    componentDidMount() {
        const messaging = firebase.messaging();
        messaging.getToken().then(machine_token => {
            this.setState({machine_token: machine_token});


        });

    }

    _handleSubmit = async (values, bag) => {
        try {
            const {data} = await axios.post(`${API_BASE}/register`, {
                name: values.name,
                email: values.email,
                password: values.password,
                machine_token: this.state.machine_token,
            });
            bag.setSubmitting(false);

            if (data.success==false) { //errors diye bir field ı var ise...
                bag.setErrors(data.message);
                alert(data.message);
                return false;
            }
            this.props.navigation.navigate('SignIn');
        } catch (e) {
            bag.setSubmitting(false);
            bag.setErrors(e);
        }

    };
    render() {
        return (
            <Formik
                initialValues={{name: '', email: '', password: ''}}
                onSubmit={this._handleSubmit}
                validationSchema={validations}

            >
                {({values, handleChange, handleSubmit, errors, touched, setFieldTouched, isValid, isSubmitting}) => (
                    <Content style={{padding: 10}}>
                        <Item errors={errors.name && touched.name}>

                            <Input
                                onChangeText={handleChange('name')}
                                value={values.name}
                                placeholder={'name'}
                                onBlur={() => setFieldTouched('name')}
                                autoCapitalize={'none'}

                            />
                            {(errors.name && touched.name) && <Text style={{color: 'red'}}>{errors.name}</Text>}
                        </Item>
                        <Item errors={errors.email && touched.email}>

                            <Input
                                onChangeText={handleChange('email')}
                                value={values.email}
                                placeholder={'email'}
                                onBlur={() => setFieldTouched('email')}
                                autoCapitalize={'none'}
                                keyboardType={'email-address'}

                            />
                            {(errors.email && touched.email) && <Text style={{color: 'red'}}>{errors.email}</Text>}
                        </Item>
                        <Item errors={errors.password && touched.password}>
                            <Input
                                onChangeText={handleChange('password')}
                                value={values.password}
                                placeholder={'password'}
                                onBlur={() => setFieldTouched('password')}
                                secureTextEntry={true}
                            />
                            {(errors.password && touched.password) &&
                            <Text style={{color: 'red'}}>{errors.password}</Text>}
                        </Item>
                        <Button
                            disabled={!isValid || isSubmitting}
                            onPress={handleSubmit}
                            block
                            style={{marginTop: 10}}>
                            {isSubmitting && <Spinner size={'small'} colo={'white'}/>}
                            <Text>REGISTER</Text>
                        </Button>

                    </Content>
                )}
            </Formik>
        );
    }
}
