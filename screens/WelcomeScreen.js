import React , {Component} from 'react';
import {View,StyleSheet,Text,Image,TouchableOpacity,TextInput,Alert,ScrollView,Modal, KeyboardAvoidingView} from 'react-native';
import db from '../config';
import firebase from 'firebase';
import SantaAnimation from '../components/SantaClaus';
import {encode,decode} from "base-64"


if (!global.btoa) {
  global.btoa = encode;
}

if (!global.atob) {
  global.atob = decode;
}

export default class WelcomeScreen extends Component{
    constructor(){
        super();
        this.state={
            emailId:'',
            password:'',
            isModalVisible:false,
            firstName:'',
            lastName:'',
            address:'',
            contact:'',
            confirmPassword:''
        }
    }
    userLogin=async(emailId,password)=>{
        firebase.auth().signInWithEmailAndPassword(emailId,password).then(
            ()=>{
              this.props.navigation.navigate('DonateBooks')
            }
        ).catch((error)=>{
            var errorCode=error.code
            var errorMessage=error.message
            return Alert.alert(errorMessage);
        });
    }
    userSignUp=async(emailId,password,confirmPassword)=>{
      if(password!=confirmPassword){
        return(
          Alert.alert('Password does not match')
        )
      }  
      else{
        firebase.auth().createUserWithEmailAndPassword(emailId,password).then(
          (response)=>{
            db.collection('Users').add({
              first_name:this.state.firstName,
              last_name:this.state.lastName,
              contact:this.state.contact,
              address:this.state.address,
              email:this.state.emailId,
              IsBookRequestActive : false
            })
              return Alert.alert('Sign up Successful')
          }
      ).catch((error)=>{
          var errorCode=error.code
          var errorMessage=error.message
          return Alert.alert(errorMessage);
      });
      }
    }
    showModale=()=>{
        return(
            <Modal animationType="fade" transparent={true} visible={this.state.isModalVisible}>
                <View style={styles.modalContainer}>
                  <ScrollView style={{width:'100%'}}>
                    <KeyboardAvoidingView style={styles.keyboardAvoidingView}>
                      <Text style={styles.modalTitle}>Registration</Text>
                      <TextInput style={styles.formTextInput} 
                        placeholder='First Name' 
                        placeholderTextColor='blue'
                        maxLength={10}
                        onChangeText={(text)=>{
                            this.setState({
                                firstName:text
                            }) 
                        }}></TextInput>
                        <TextInput style={styles.formTextInput} 
                        placeholder='Last Name' 
                        placeholderTextColor='blue'
                        maxLength={10}
                        onChangeText={(text)=>{
                            this.setState({
                                lastName:text
                            }) 
                        }}></TextInput>
                        <TextInput style={styles.formTextInput} 
                        placeholder='Contact' 
                        placeholderTextColor='blue'
                        maxLength={10}
                        keyboardType='numeric'
                        onChangeText={(text)=>{
                            this.setState({
                                contact:text
                            }) 
                        }}></TextInput>
                        <TextInput style={styles.formTextInput} 
                        placeholder='Adress' 
                        placeholderTextColor='blue'
                        multiline={true}
                        onChangeText={(text)=>{
                            this.setState({
                                address:text
                            }) 
                        }}></TextInput>
                        <TextInput style={styles.loginBox} 
                        placeholder='Example@booksanta.com' 
                        placeholderTextColor='blue'
                        keyboardType='email-address'
                        onChangeText={(text)=>{
                            this.setState({
                                emailId:text
                            }) 
                        }}></TextInput>
                     <TextInput style={styles.loginBox} 
                        placeholder='Password' 
                        placeholderTextColor='blue'
                        secureTextEntry={true}
                        onChangeText={(text)=>{
                            this.setState({
                                password:text
                            }) 
                        }}></TextInput>
                         <TextInput style={styles.loginBox} 
                        placeholder='Confirm Password' 
                        placeholderTextColor='blue'
                        secureTextEntry={true}
                        onChangeText={(text)=>{
                            this.setState({
                                confirmPassword:text
                            }) 
                        }}></TextInput>
                        <View>
                          <TouchableOpacity style={styles.registerButton} onPress={()=>{
                         this.userSignUp(this.state.emailId,this.state.password,this.state.confirmPassword)
                     }}>
                       <Text style={styles.registerButtonText}>Register</Text>
                          </TouchableOpacity>
                        </View>

                        <View>
                          <TouchableOpacity style={styles.cancelButton} onPress={()=>{
                        this.setState({
                          'isModalVisible':false
                        })
                     }}>
                       <Text style={{color:'#ff5722'}}>Cancel</Text>
                          </TouchableOpacity>
                        </View>
                    </KeyboardAvoidingView>
                  </ScrollView>
                </View>
            </Modal>
        )
    }
    render(){
        return(
            
            <View style={styles.container}>
            {
              this.showModale()
            }
            
                <View style={styles.profileContainer}>
                   
                    <Text style={styles.title}>Book Santa</Text>
                </View>
                <View style={styles.buttonContainer}>
                    <TextInput style={styles.loginBox} 
                        placeholder='Example@booksanta.com' 
                        placeholderTextColor='blue'
                        keyboardType='email-address'
                        onChangeText={(text)=>{
                            this.setState({
                                emailId:text
                            }) 
                        }}></TextInput>
                     <TextInput style={styles.loginBox} 
                        placeholder='Password' 
                        placeholderTextColor='blue'
                        secureTextEntry={true}
                        onChangeText={(text)=>{
                            this.setState({
                                password:text
                            }) 
                        }}></TextInput>
                     <TouchableOpacity style={[styles.button,{marginBottom:20,marginTop:20}]}
                     onPress={()=>{
                         this.userLogin(this.state.emailId,this.state.password)
                     }}>
                        <Text style={styles.buttonText}>Login</Text>   
                     </TouchableOpacity>
                     <TouchableOpacity style={styles.button}
                     onPress={()=>{
                        this.setState({
                          'isModalVisible':true
                        })
                     }}>
                        <Text style={styles.buttonText}>Sign Up</Text>   
                     </TouchableOpacity>
                </View>
               

                
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container:{
     flex:1,
     backgroundColor:'#F8BE85',
     alignItems: 'center',
     justifyContent: 'center'
   },
   profileContainer:{
     flex:1,
     justifyContent:'center',
     alignItems:'center',
   },
   title :{
     fontSize:65,
     fontWeight:'300',
     paddingBottom:30,
     color : '#ff3d00'
   },
   loginBox:{
     width: 300,
     height: 40,
     borderBottomWidth: 1.5,
     borderColor : '#ff8a65',
     fontSize: 20,
     margin:10,
     paddingLeft:10
   },
   keyboardAvoidingView:{
     flex:1,
     justifyContent:'center',
     alignItems:'center'
   },
   modalTitle :{
     justifyContent:'center',
     alignSelf:'center',
     fontSize:30,
     color:'#ff5722',
     margin:50
   },
   modalContainer:{
     flex:1,
     borderRadius:20,
     justifyContent:'center',
     alignItems:'center',
     backgroundColor:"#ffff",
     marginRight:30,
     marginLeft : 30,
     marginTop:80,
     marginBottom:80
   },
   formTextInput:{
     width:"75%",
     height:35,
     alignSelf:'center',
     borderColor:'#ffab91',
     borderRadius:10,
     borderWidth:1,
     marginTop:20,
     padding:10
   },
   registerButton:{
     width:200,
     height:40,
     alignItems:'center',
     justifyContent:'center',
     borderWidth:1,
     borderRadius:10,
     marginTop:30
   },
   registerButtonText:{
     color:'#ff5722',
     fontSize:15,
     fontWeight:'bold'
   },
   cancelButton:{
     width:200,
     height:30,
     justifyContent:'center',
     alignItems:'center',
     marginTop:5,
   },
  
   button:{
     width:300,
     height:50,
     justifyContent:'center',
     alignItems:'center',
     borderRadius:25,
     backgroundColor:"#ff9800",
     shadowColor: "#000",
     shadowOffset: {
        width: 0,
        height: 8,
     },
     shadowOpacity: 0.30,
     shadowRadius: 10.32,
     elevation: 16,
     padding: 10
   },
   buttonText:{
     color:'#ffff',
     fontWeight:'200',
     fontSize:20
   },
   buttonContainer:{
    flex:1,
    alignItems:'center'
  }
  })