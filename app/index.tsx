import { useEffect, useState } from "react";
import { 
  TouchableOpacity, 
  Text, 
  View,
  TextInput,
  FlatList,
  ActivityIndicator,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard
} from "react-native";
import CardUsers from "~/components/CardUsers";
import { Stack } from 'expo-router';
import { db } from "firebaseConfig";
import {Link} from "expo-router"
import { StatusBar } from "react-native";
import {MaterialIcons} from "@expo/vector-icons"


export default function Login() {

  const [isShowPassword, setIsShowPassword] = useState(true);

  const handleShowPassword = () => {
    setIsShowPassword(!isShowPassword)
  }

  return (
    <>
     <StatusBar barStyle="light-content" backgroundColor="#1C1C1C" />
     <KeyboardAvoidingView 
     className={styles.container}
     behavior={Platform.OS === "ios" ? "padding" : "height"}
     >
        <View className={styles.containerHeader}>
          <Text className={styles.title}>Faça o login</Text>
          <View>
            <Text className={styles.subTitleOne}>Acesse os usuários cadastrados</Text>
            <View className="flex-row">
              <Text className={styles.subTiTleTwo}>e administre-os com facilidade!</Text>
              <MaterialIcons name="emoji-objects" color={"#fff"} size={20}/>
            </View>
          </View>
        </View>
        <View className={styles.containerForm}>
            <Text>Email:</Text>
            <TextInput
             className={styles.textInput}
             placeholder="Digite seu email"
            />

            <Text>Senha:</Text>
            <View className={styles.containerInputPassword}>
              <TextInput
                className={styles.textInputPassword}
                placeholder="Informe sua senha"
                secureTextEntry={isShowPassword}
               />
              <TouchableOpacity onPress={handleShowPassword}>
                <MaterialIcons name={isShowPassword ? "visibility-off" : "visibility"} size={25}/>
              </TouchableOpacity>
            </View>
              <Link href="/home" className={styles.button}>
                Entrar
              </Link>
        </View> 
     </KeyboardAvoidingView> 
    </>
  );
}

const styles = {
  container: `flex-1 bg-[#1C1C1C]`,
  containerForm: `flex-1 bg-[#fff] rounded rounded-s-3xl px-[20px] pt-[50px] mt-[25px]`,
  title: `text-[30px] color-[#fff] font-bold mb-[30px]`,
  containerHeader: `px-[20px] pt-[40px]`,
  subTitleOne: `text-[19px] color-[#00BFFF]`,
  subTiTleTwo: `color-[#87CEFA] text-[17px] me-[5px]`,
  textInput: `border-b-[1px] border-[#4F4F4F] mb-[30px]`,
  textInputPassword: `flex-1`,
  button: `bg-[#000] mb-[20px] justify-center items-center py-[10px] rounded rounded-lg color-[#fff] text-center text-[18px]`,
  containerInputPassword: `flex-row border-b-[1px] border-[#4F4F4F] mb-[30px] items-center`
}