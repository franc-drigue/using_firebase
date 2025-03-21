import { 
    View, 
    Text,
    TextInput,
    TouchableOpacity
} from 'react-native'
import React from 'react'
import {FontAwesome, MaterialIcons, Ionicons} from "@expo/vector-icons"

type modalEditUser = {
    closeModal: () => void;
}

export default function CustomModalEditUser({closeModal} :modalEditUser) {
  return (
    <View className={styles.container}>
     <View className={styles.conatinerContents}>
        <View className='flex-row items-center mb-[25px] justify-between'>
          <Text className={styles.textTitle}>Edite o usuário</Text> 
          <MaterialIcons name='arrow-drop-down-circle' size={32} onPress={closeModal}/>
        </View>
        <Text>Nome:</Text>
        <TextInput
         className={styles.inputText}
         placeholder='Digite um nome'
        />
        <Text>Idade:</Text>
        <TextInput
         className={styles.inputText}
         placeholder='Digite a idade'
        />
        <Text>Cidade:</Text>
        <TextInput
         className={styles.inputText}
         placeholder='Digite uma cidade'
        />
        <TouchableOpacity className={styles.button}>
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
    inputText: `border-b-[1px] border-[#4F4F4F] mb-[17px]`,
    button: `bg-[#000] mb-[20px] justify-center items-center py-[10px] rounded rounded-lg mt-[20px]`,
    textButton: `text-[#fff] text-[18px]`
}