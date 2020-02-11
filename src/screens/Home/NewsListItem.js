import React from 'react';
import {Text,Image} from 'react-native';
import {ListItem,Left,Right,Icon} from 'native-base';

import NavigationService from '../../NavigationService';

const NewsListItem = ({item}) => (
    <ListItem selected onPress={()=>NavigationService.navigate('Detail',{item})}>
        <Left>

            <Text>{item.title}</Text>
        </Left>
        <Right>
            <Icon name="arrow-forward" />
        </Right>
    </ListItem>
);

export default NewsListItem;
