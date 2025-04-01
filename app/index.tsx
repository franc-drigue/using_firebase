import {useEffect, useState} from "react";
import { 
  TouchableOpacity, 
  Text, 
  View,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { auth } from "firebaseConfig";
import {signInWithEmailAndPassword, onAuthStateChanged, AuthErrorCodes} from "firebase/auth";
import { useRouter } from "expo-router";
import { StatusBar } from "react-native";
import {MaterialIcons} from "@expo/vector-icons";
import Toast from "~/components/Toast";


export default function Login() {

  const router = useRouter();

  const [isShowPassword, setIsShowPassword] = useState(true);
  const [msgInputEmpty, setMsgInputEmpty] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msgToast, setMsgToast] = useState("");


  const handleShowPassword = () => {
    setIsShowPassword(!isShowPassword);
  }

  const handleLogin =  () => {
    if (email.trim() === "" || password.trim() === "") {
      setMsgInputEmpty("Preencha todos os campos");
      return;
    }

    signInWithEmailAndPassword(auth, email, password)
      .then((user) => {
        if(user.user) {
          router.replace("/home")
        }
      })
      .catch((error) => {
          console.log(error)
          if(error.code === AuthErrorCodes.INVALID_LOGIN_CREDENTIALS) {
            setMsgToast("Credenciais inválidas")
          }
          else if(error.code == AuthErrorCodes.TOO_MANY_ATTEMPTS_TRY_LATER) {
            setMsgToast("Muitas tentativas, tente mais tarde!")
          }
      })
  }


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        router.replace("/home");
      }
    });

    return () => unsubscribe(); 
  }, []);


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
              <TouchableOpacity className={styles.button} onPress={handleLogin}>
                 <Text className={styles.textButton}>Entrar</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                onPress={() => {
                   setMsgInputEmpty("")
                   router.replace("/register")
                 }
                }
                >
                  <Text className="self-end color-blue-600" >Não tem um cadastro? cadastre-se.</Text>
              </TouchableOpacity>
              
              <Toast msgToast={msgToast} clearMsgToast={setMsgToast}/>
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
  containerInputPassword: `flex-row border-b-[1px] border-[#4F4F4F] items-center`,
  textButton: `text-[#fff] text-[18px]`,
}