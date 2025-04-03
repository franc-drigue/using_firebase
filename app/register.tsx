import {useState} from "react";
import { 
  TouchableOpacity, 
  Text, 
  View,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import {auth} from "firebaseConfig";
import {AuthErrorCodes, createUserWithEmailAndPassword} from "firebase/auth"
import {router} from "expo-router"
import {StatusBar} from "react-native";
import {MaterialIcons} from "@expo/vector-icons"
import Toast from "~/components/Toast";


export default function Register() {

  const [isShowPassword, setIsShowPassword] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msgInputEmpty, setMsgInputEmpty] = useState("");
  const [msgToast, setMsgToast] = useState("");

  const handleShowPassword = () => {
    setIsShowPassword(!isShowPassword);
  }

  const handleCreateUser = () => {

    if (email == "" || password == "") {
      setMsgInputEmpty("Preencha o campo");
      return
    }

     createUserWithEmailAndPassword(auth, email, password)
     .then(() => {
        setEmail("");
        setPassword("");
        setMsgInputEmpty("");
        setMsgToast("Usuário cadastrado com sucesso");
     })
     .catch((err) => {
      console.log(err)

      switch(err.code) {
         case AuthErrorCodes.EMAIL_EXISTS: 
           setMsgToast("E-mail já existe");
           break;
         case AuthErrorCodes.WEAK_PASSWORD:
           setMsgToast("A senha precisa ter no mínimo 6 dígitos");
           break;
         case AuthErrorCodes.INVALID_EMAIL:
           setMsgToast("E-mail Inválido");
           break; 
      }
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
               <TouchableOpacity className={styles.button} onPress={handleCreateUser}>
                 <Text className={styles.textButton}>Cadastrar</Text>
               </TouchableOpacity>

           
               <TouchableOpacity 
                 className="flex-row items-center gap-1 mt-7" 
                 onPress={() => {
                  router.replace("/");
                  setEmail("");
                  setPassword("");
                  setMsgInputEmpty("")
                }}
                 >
                    <MaterialIcons name="arrow-back" size={30}/>
                    <Text>Fazer login</Text>
               </TouchableOpacity>

               <Toast
                msgToast={msgToast}
                clearMsgToast={setMsgToast}
               />
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