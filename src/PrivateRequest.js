import axios from "axios";
import { URL } from "./constants/configure";
import AsyncStorage from '@react-native-async-storage/async-storage';

const getToken = async()=>{
    var token =  await AsyncStorage.getItem('token');
   
     return token
}

export const privateService = axios.create({
    baseURL: URL.BASE_URL
  })


  privateService.interceptors.request.use((request)=>{
    //   const token = getToken()
    var token =   AsyncStorage.getItem('token');
      console.log('token', token)
    request.headers.common.Authorization = `Bearer ${token}`
    console.log('URL.BASE_URL', URL.BASE_URL)
    return request
})
//   privateService.interceptors.response.use((request)=>{
//     console.log('request', request)
// })
      
      