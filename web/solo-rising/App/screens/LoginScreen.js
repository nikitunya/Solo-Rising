import React from 'react'
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { themeColors } from '../utils/colors'
import { SafeAreaView } from 'react-native-safe-area-context'
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

function LoginScreen() {
  const navigation = useNavigation();
  return (
    <View className="flex-1 bg-white" style={{backgroundColor: themeColors.background}}>
      <SafeAreaView className="flex">
        <View className="flex-row justify-start">
          <TouchableOpacity onPress={() => navigation.goBack()} className="p-2 rounded-tr-2xl rounded-bl-2xl ml-4" style={{backgroundColor: themeColors.mainGreen}}>
              <AntDesign name="arrowleft" size={20} color="white" />
          </TouchableOpacity>
        </View>
        <View className="flex-row justify-center">
          <Image source={require('../utils/images/logo.png')} style={{width: 250, height: 250}}/>
        </View>
      </SafeAreaView>
      <View className="flex-1 bg-white px-8 pt-8" style={{borderTopLeftRadius: 50, borderTopRightRadius: 50}}>
        <View className="form space-y-2">
          <Text className="text-gray-700 ml-4">Email Address</Text>
          <TextInput className="p-4 bg-gray-100 rounded-2xl mb-3" style={{color: themeColors.textColor}} placeholder="email" value="john@gmail.com" />

          <Text className="text-gray-700 ml-4">Password</Text>
          <TextInput className="p-4 bg-gray-100 rounded-2xl" style={{color: themeColors.textColor}} secureTextEntry placeholder="password" value="test12345" />

          <TouchableOpacity className="flex items-end">
            <Text className="mb-5" style={{color: themeColors.textColor}}>Forgot Password?</Text>
          </TouchableOpacity>
          <TouchableOpacity className="py-3 rounded-xl" style={{backgroundColor: themeColors.mainGreen}}>
            <Text className="text-xl font-bold text-center" style={{color: themeColors.textColor}}>
              Login
            </Text>
          </TouchableOpacity>
        </View>

        <Text className="text-xl font-bold text-center py-5" style={{color: themeColors.textColor}}>
          Or
        </Text>

        <View className="flex-row justify-center space-x-12">
            <TouchableOpacity className="p-2 rounded-2xl" style={{backgroundColor: themeColors.iconBackground}}>
              <Image source={require('../utils/images/google.png')} className="w-10 h-10" />
            </TouchableOpacity>
            <TouchableOpacity className="p-2 rounded-2xl" style={{backgroundColor: themeColors.iconBackground}}>
              <Image source={require('../utils/images/apple.png')} className="w-10 h-10" />
            </TouchableOpacity>
            <TouchableOpacity className="p-2 rounded-2xl" style={{backgroundColor: themeColors.iconBackground}}>
              <Image source={require('../utils/images/facebook.png')} className="w-10 h-10" />
            </TouchableOpacity>
          </View>
          <View className="flex-row justify-center mt-7">
              <Text className="font-semibold" style={{color: themeColors.textColor}}>
                  Don't have an account?
              </Text>
              <TouchableOpacity onPress={()=> navigation.navigate('SignUp')}>
                  <Text className="font-semibold" style={{color: themeColors.mainGreen}}> Sign Up</Text>
              </TouchableOpacity>
          </View>
      </View>
    </View>
  )
}

export default LoginScreen