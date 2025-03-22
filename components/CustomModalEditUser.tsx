import { 
    View, 
    Text,
    TextInput,
    TouchableOpacity
} from 'react-native'
import React, {useState} from 'react'
import {FontAwesome, MaterialIcons, Ionicons} from "@expo/vector-icons"
import { db } from "firebaseConfig";
import {doc, setDoc} from "firebase/firestore"

type modalEditUser = {
    name: string;
    age: string;
    city: string;
    id: string
    renderUserUpdate: () => void
    closeModal: (closed: boolean) => void;
}

export default function CustomModalEditUser({closeModal, age, city, name, id, renderUserUpdate} :modalEditUser) {

  const [nameEdit, setNameEdit] = useState(name)
  const [cityEdit, setCityEdit] = useState(city)
  const [ageEdit, setAgeEdit] = useState(age)
  const [renderMsgInputEmpty, setRenderMsgInputEmpty] = useState("")
  

  const updateUser = async (id: string) => {

    if(nameEdit == "" || ageEdit == "" || cityEdit == "") {
      setRenderMsgInputEmpty("Preencha o campo")
      return
    }else if(nameEdit === name && ageEdit === age && cityEdit === city){
      closeModal(false)
      return
    }

   await setDoc(doc(db, "users", id), {
       age: ageEdit,
       city: cityEdit,
       name: nameEdit
     }).then(() => {
       setAgeEdit("")
       setCityEdit("")
       setNameEdit("")
       closeModal(false)
       setRenderMsgInputEmpty("")
       renderUserUpdate()
       console.log("Cadastrado com sucesso");
     }).catch((err) => {
      console.log("erro:", err);
    });
  }

  return (
    <View className={styles.container}>
     <View className={styles.conatinerContents}>
        <View className='flex-row items-center mb-[15px] justify-between'>
          <Text className={styles.textTitle}>Edite o usuário</Text> 
          <MaterialIcons name='arrow-drop-down-circle' size={32} onPress={() => closeModal(false)}/>
        </View>
        <Text className={styles.labels}>Nome:</Text>
        <TextInput
         value={nameEdit}
         onChangeText={(text) => setNameEdit(text)}
         className={styles.inputText}
         placeholder='Digite um nome'
        />
        <Text style={{color: "#FF0000",display: `${nameEdit.length != 0 ? "none" : renderMsgInputEmpty  == "" ? "none" : "flex"}`}}>{renderMsgInputEmpty}</Text>

        <Text className={styles.labels}>Idade:</Text>
        <TextInput
         value={ageEdit}
         onChangeText={(text) => setAgeEdit(text)}
         className={styles.inputText}
         placeholder='Digite a idade'
        />
         <Text style={{color: "#FF0000",display: `${ageEdit.length != 0 ? "none" : renderMsgInputEmpty  == "" ? "none" : "flex"}`}}>{renderMsgInputEmpty}</Text>

        <Text className={styles.labels}>Cidade:</Text>
        <TextInput
         value={cityEdit}
         onChangeText={(text) => setCityEdit(text)}
         className={styles.inputText}
         placeholder='Digite uma cidade'
        />
         <Text style={{color: "#FF0000",display: `${cityEdit.length != 0 ? "none" : renderMsgInputEmpty  == "" ? "none" : "flex"}`}}>{renderMsgInputEmpty}</Text>

        <TouchableOpacity className={styles.button} onPress={() => {
          updateUser(id)
        }}>
            <Text className={styles.textButton}>
                Enviar
            </Text>
        </TouchableOpacity>
     </View>
    </View>
  )
}

const styles = {
    container: `flex-1`,
    conatinerContents: `bg-[#FFF] h-[60%] absolute w-[100%] bottom-0 rounded rounded-s-3xl p-[20px] shadow shadow-xl border border-[#D3D3D3]`,
    textTitle: `text-[25px] font-sans`,
    inputText: `border-b-[1px] border-[#4F4F4F] mb-[5px]`,
    button: `bg-[#000] mb-[20px] justify-center items-center py-[10px] rounded rounded-lg mt-[20px]`,
    textButton: `text-[#fff] text-[18px]`,
    labels: "mt-[10px]"
}