/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import Router from './src/Router';
import 'react-native-gesture-handler';
import NavigationService from './src/NavigationService';
//mobx-store
import store from './src/store'
import {Provider} from 'mobx-react';

class App extends React.Component {
    render() {
        return (
            <Provider {...store}>
                <Router
                    ref={navigatorRef => {
                        NavigationService.setTopLevelNavigator(navigatorRef);
                    }}
                />
            </Provider>
        );
    }
}

export default App;

