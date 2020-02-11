import React, {Component} from 'react';
import {observable, action, configure, runInAction} from 'mobx';
import axios from 'axios';
import {API_BASE} from '../constants';

configure({
    enforceActions: 'observed',
});
import AuthStore from './AuthStore';
import AsyncStorage from '@react-native-community/async-storage';
import NavigationService from '../NavigationService';

class NewsStore {
    @observable news = [];
    @observable loading= false;

    @action async getNews() {
        this.loading = true;
        try {

            const {data} = await axios.get(`https://newsapi.org/v2/top-headlines?country=tr&apiKey=015a6c28d104425eab7b87671cb86d9e`);
            runInAction(()=>{
                this.news=data.articles;
                this.loading = false;
            })
        } catch (e) {
            console.log(e);
        }
    }
}


export default new NewsStore();
