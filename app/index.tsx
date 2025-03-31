import {useState} from "react";
import { 
  TouchableOpacity, 
  Text, 
  View,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { db, auth } from "firebaseConfig";
import {signInWithEmailAndPassword} from "firebase/auth";
import {Link} from "expo-router";
import { StatusBar } from "react-native";
import {MaterialIcons} from "@expo/vector-icons";


export default function Login() {

  const [isShowPassword, setIsShowPassword] = useState(true);
  const [msgInputEmpty, setMsgInputEmpty] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleShowPassword = () => {
    setIsShowPassword(!isShowPassword);
  }

  const handleLogin = () => {
    if(email == "" || password == "") {
      setMsgInputEmpty("Preencha o campo");
      return
    }

    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      console.log(userCredential);
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
             value={email}
             onChangeText={(text) => setEmail(text)}
             className={styles.textInput}
             placeholder="Digite seu email"
            />
            <Text style={{display: `${email.length != 0 ? "none" : msgInputEmpty == "" ? "none" : "flex" }`, color: "#FF0000"}}>{msgInputEmpty}</Text>

            <Text className="mt-[15px]">Senha:</Text>
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
            <Text style={{display: `${password.length != 0 ? "none" : msgInputEmpty == "" ? "none" : "flex" }`, color: "#FF0000"}}>{msgInputEmpty}</Text>
              <Link href="/" className={styles.button} onPress={handleLogin}>
                Entrar
              </Link>

              <Link href="/register" className="self-end color-blue-600" onPress={() => setMsgInputEmpty("")}>Não tem um cadastro? cadastre-se.</Link>
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
  textInput: `border-b-[1px] border-[#4F4F4F]`,
  textInputPassword: `flex-1`,
  button: `bg-[#000] mb-[20px] justify-center items-center py-[10px] rounded rounded-lg color-[#fff] text-center text-[18px] mt-[30px]`,
  containerInputPassword: `flex-row border-b-[1px] border-[#4F4F4F] items-center`
}