import React, {Component} from 'react';
import {
    StyleSheet,
    FlatList,
    View,
    Text,
} from 'react-native';
import LogoutButton from '../../components/LogoutButton';
import NewsListItem from './NewsListItem';
import { Content, List,Spinner} from 'native-base';
import {inject, observer} from 'mobx-react';
import {action} from 'mobx';
import AsyncStorage from '@react-native-community/async-storage';

@inject('NewsStore')
@observer
class Home extends Component {
    static navigationOptions = {
        headerLeft: () => <LogoutButton/>,
    };

    componentDidMount() {
        this.props.NewsStore.getNews();
    }

    render() {
        const {NewsStore} = this.props;
        return (
            <Content>
                {NewsStore.loading && <Spinner size={"small"} color={"#333"}/>}
                <List>
                    <FlatList
                        data={NewsStore.news}
                        keyExtractor={(item)=>item._id}
                        renderItem={({item}) => <NewsListItem item={item}/>}
                    />
                </List>
            </Content>
        );
    }
}

export default Home;
