import { useEffect, useState } from "react";
import { 
  TouchableOpacity, 
  Text, 
  View,
  TextInput,
  FlatList
} from "react-native";
import { Stack, Link } from 'expo-router';
import { Button } from '~/components/Button';
import { Container } from '~/components/Container';
import { ScreenContent } from '~/components/ScreenContent';
import { db } from "firebaseConfig";
import {doc, getDoc, setDoc, collection, addDoc, getDocs, deleteDoc} from "firebase/firestore"
import CardUsers from "~/components/CardUsers";

 type userType = {
  id: string;
  age: string;
  city: string;
  name: string
}

export default function Home() {

  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [city, setCity] = useState("");
  const [isToggleForm, setIsToggleForm] = useState(true);
  const [users, setUsers] = useState<userType[]>([])


   const fetchUser = async () => {

    const userRef = collection(db, "users");

    getDocs(userRef)
    .then((users) => { 

      let lista:userType[] = []
      
      users.forEach((user) => {
        lista.push({
          id: user.id,
          age: user.data().age,
          name: user.data().name,
          city: user.data().city
        })
      })
      setUsers(lista)
    }).catch((erro) => {
        console.log("Erro ao buscar usuários", erro)
    })
  }

  const handleDeleteUser = async (id: string) => {
        const userRef = doc(db, "users", id);
        try {
          await deleteDoc(userRef)
          fetchUser()
          console.log('Usuário deletado com sucesso!');
        }catch (error) {
          console.error('Erro ao deletar usuário: ', error);
        }
  }
  
  /**
   Realizar cadastro de um usuário, e atualizar a lista com o novo usuário
   **/
   const handleRegister = async () => {

    if (name == "" && age == ""  && city == "") return

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

     fetchUser()

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

  useEffect(() => {
    /*const docRef = doc(db, "users", "1");
     
    getDoc(docRef).then((snapshot) => {
      setName(snapshot.data()?.name);
    }).catch((erro) => {
      console.log("Error:", erro);
    });*/
    fetchUser()
  }, []);


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
         <View className="flex-shrink">
           <Text className={styles.label}>Usuários:</Text>
           <FlatList
             showsVerticalScrollIndicator={false}
             className={styles.flatListStyle}
             data={users}
             keyExtractor={(user) => user.id}
             renderItem={({item}) => 
               <CardUsers 
                 name={item.name} 
                 city={item.city}
                 age={item.age}
                 handleDeleteUser={() => handleDeleteUser(item.id)}/>
              }
           />
          </View>
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
  textButtonToggleDisable: `font-semibold text-[#fff]`,
  toggleFormEnable: `bg-green-700 w-[150px] p-[5px] justify-center items-center rounded-lg self-end`,
  textButtonToggleEnable: `font-semibold text-white`,
  flatListStyle: `bg-[#F8F8FF] px-[8px] rounded border border-[#D3D3D3]` 
}