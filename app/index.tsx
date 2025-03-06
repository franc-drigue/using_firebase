import { useEffect, useState } from "react";
import { 
  TouchableOpacity, 
  Text, 
  View,
  TextInput 
} from "react-native";
import { Stack, Link } from 'expo-router';
import { Button } from '~/components/Button';
import { Container } from '~/components/Container';
import { ScreenContent } from '~/components/ScreenContent';
import { db } from "firebaseConfig";
import {doc, getDoc, setDoc, collection, addDoc} from "firebase/firestore"

export default function Home() {

  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [city, setCity] = useState("");
  const [isToggleForm, setIsToggleForm] = useState(true);

  /**
   realizando conexão com o banco de dados
   assim que o app iniciar 
   E buscar o nome do usuário 1
  **/ 
  /**useEffect(() => {
    const docRef = doc(db, "users", "1");
     
    getDoc(docRef).then((snapshot) => {
      setName(snapshot.data()?.name);
    }).catch((erro) => {
      console.log("Error:", erro);
    });
  }, []);**/


  /**
   Realizar cadastro de um usuário 
   **/
  const handleRegister = async () => {
     await addDoc(collection(db, "users",), {
       age: age,
       city: city,
       name: name
     }).then(() => {
       setAge("");
       setCity("")
       setName("");
       console.log("Cadastrado com sucesso");
     }).catch((err) => {
       console.log("erro:", err);
     });

     /**await setDoc(doc(db, "users", "4"), {
       age: "30",
       city: "Porto Alegre",
       name: "Franck"
     }).then(() => {
       console.log("Cadastrado com sucesso");
     }).catch((err) => {
      console.log("erro:", err);
    });**/
  }


  const handleToggleVisible = () => {
    setIsToggleForm(!isToggleForm);
  }

  return (
    <>
      <Stack.Screen options={{ title: '' }} />
      <View className={styles.container}>
        {
         isToggleForm && 
         <View>
           <Text className={styles.label}>Nome:</Text>
           <TextInput
            value={name}
            onChangeText={(text) => setName(text)}
            placeholder="Digite seu nome"
            className={styles.inputText}
           />
 
          <Text className={styles.label}>Idade:</Text>
          <TextInput
           value={age}
           onChangeText={(text) => setAge(text)}
           placeholder="Digite sua idade"
           className={styles.inputText}
          />
 
          <Text className={styles.label}>Cidade:</Text>
          <TextInput
           value={city}
           onChangeText={(text) => setCity(text)}
           placeholder="Digite o nome da sua cidade"
           className={styles.inputText}
          />
          <TouchableOpacity className={styles.button} onPress={handleRegister}>
            <Text className={styles.textButton}>
              Enviar
            </Text>
          </TouchableOpacity>
        </View>
        }
          <TouchableOpacity className={isToggleForm ? styles.toggleFormDisable : styles.toggleFormEnable} onPress={handleToggleVisible}>
           <Text className={isToggleForm ? styles.textButtonToggleDisable: styles.textButtonToggleEnable}>
             {isToggleForm ? "Desativar formulário" : "Ativar formulário"}
           </Text>
         </TouchableOpacity>
       </View> 
    </>
  );
}

const styles = {
  button: `bg-[#000] mb-[20px] justify-center items-center py-[10px] rounded rounded-lg mt-[20px]`,
  textButton: `text-[#fff] text-[18px]`,
  container: `flex-1 p-[10px]`,
  label: `font-semibold text-[18px] mb-[5px] mt-[15px]`,
  inputText: `border rounded border-gray-600 px-[10px] text-[16px]`,
  toggleFormDisable: `bg-red-500 w-[150px] p-[5px] justify-center items-center rounded-lg self-end`,
  textButtonToggleDisable: `font-semibold`,
  toggleFormEnable: `bg-green-700 w-[150px] p-[5px] justify-center items-center rounded-lg self-end`,
  textButtonToggleEnable: `font-semibold text-white`,
}