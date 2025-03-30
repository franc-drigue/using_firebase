import { useEffect, useState } from "react";
import { 
  TouchableOpacity, 
  Text, 
  View,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { db, auth } from "firebaseConfig";
import {createUserWithEmailAndPassword} from "firebase/auth"
import {Link} from "expo-router"
import { StatusBar } from "react-native";
import {MaterialIcons, Fontisto} from "@expo/vector-icons"


export default function Register() {

  const [isShowPassword, setIsShowPassword] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleShowPassword = () => {
    setIsShowPassword(!isShowPassword)
  }

  const handleCreateUser = () => {
     createUserWithEmailAndPassword(auth, email, password)
     .then((user) => {
        console.log(user)
     })
     .catch((err) => {
        console.log(err)
     })
  }

  return (
    <>
     <StatusBar barStyle="light-content" backgroundColor="#1C1C1C" />
     <KeyboardAvoidingView 
     className={styles.container}
     behavior={Platform.OS === "ios" ? "padding" : "height"}
     >
        <View className={styles.containerHeader}>
          <Text className={styles.title}>Realize seu cadastro</Text>
          <View>
            <Text className={styles.subTitleOne}>Crie uma conta e acesse</Text>
            <View className="flex-row">
              <Text className={styles.subTiTleTwo}>cadastre e veja detalhes dos usuários</Text>
              <MaterialIcons name="anchor" color={"#fff"} size={20}/>
            </View>
          </View>
        </View>
        <View className={styles.containerForm}>
            <Text>Email:</Text>
            <TextInput
             value={email}
             onChangeText={(text) => setEmail(text)}
             className={styles.textInput}
             placeholder="Digite seu email"
            />

            <Text>Senha:</Text>
            <View className={styles.containerInputPassword}>
              <TextInput
                value={password}
                onChangeText={(text) => setPassword(text)}
                className={styles.textInputPassword}
                placeholder="Informe sua senha"
                secureTextEntry={isShowPassword}
               />
              <TouchableOpacity onPress={handleShowPassword}>
                <MaterialIcons name={isShowPassword ? "visibility-off" : "visibility"} size={25}/>
              </TouchableOpacity>
            </View>
              <TouchableOpacity className={styles.button} onPress={handleCreateUser}>
                <Text className={styles.textButton}>Cadastrar</Text>
              </TouchableOpacity>
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
  containerInputPassword: `flex-row border-b-[1px] border-[#4F4F4F] mb-[30px] items-center`,
  textButton: `text-[#fff] text-[18px]`,
}