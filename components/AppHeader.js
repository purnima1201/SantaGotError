import React,{Component} from 'react';
import {Text, View } from 'react-native';
import {Header,Icon,Badge} from 'react-native-elements';
import db from '../config';

export default class MyHeader extends Component{
    constructor(props){
        super(props);
        this.state={
            value:''
        }
    }
    getNumberOfUnreadNotification(){
        db.collection('all_notifications').where('notification_status','==','unread').
        onSnapshot((data)=>{
            var unreadNotifications=data.docs.map((doc)=>{
                doc.data()
            })
            this.setState({
                value:unreadNotifications.length
            })
        })
    }
    componentDidMount(){
        this.getNumberOfUnreadNotification();
    }
    BellIconWithBadge=()=>{
        return(
            <View>
            <Icon name='bell' type='font-awesome' color='#696969' size={25}
        onPress={
            ()=>{
                this.props.navigation.navigate('Notification')
            }}></Icon>
            <Badge value={this.state.value} containerStyle={{position:'absolute',top:-4,right:-4}}></Badge>
            </View>

        )
    }
    render(){
         
    return(
        <Header leftComponent={<Icon name='bars' type='font-awesome' color='#696969' onPress={() => this.props.navigation.toggleDrawer()}/>}
        centerComponent={{text:this.props.title,style:{color:'#90A5A9',fontSize:20,fontWeight:'bold'}}}
        rightComponent={<this.BellIconWithBadge {...this.props}></this.BellIconWithBadge>}
        backgroundColor='#EAF8FE'>
        </Header>
    )
    }
}



