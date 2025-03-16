import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import {MaterialIcons} from "@expo/vector-icons"
import { userCardProps } from './CardUsers'

type modalDeleteProps = userCardProps & {
   closeModal: () => void;
   modalDeleteUser: boolean;
}

export default function CustomModal({closeModal, age, city, name, modalDeleteUser, handleDeleteUser}: modalDeleteProps) {
  return (
    <View className={style.container}>
      <View className={style.conatinerInfoModal}>
        {
          modalDeleteUser ?
          <View className={style.containerModalDelete}>
            <Text className={style.titleDeleteModal}>Deletar usuário</Text>
            <Text className={style.descriptionDeleteModal}>
                Realmente deseja apagar o usuário {name}?
            </Text>
            <View className={style.containerButtonsModalDelete}>
              <TouchableOpacity onPress={closeModal} className={style.buttonCancel}>
                <Text className={style.textButton}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity className={style.buttonDelete} onPress={handleDeleteUser}>
                <Text className={style.textButton}>Deletar</Text>
              </TouchableOpacity>
            </View>
          </View>
          :
          <View>
            <MaterialIcons 
             name='cancel' 
             size={32}
             color={"#FF0000"} 
             onPress={closeModal} 
             className={style.buttonCloseModal}/>
            <Text className={style.title}>Mais detalhes</Text>
            <Text className={style.textInfo}>
                <Text className={style.labelTextInfo}>Nome:</Text> {name}
            </Text>
            <Text className={style.textInfo}>
                <Text className={style.labelTextInfo}>Idade:</Text> {age}
            </Text>
            <Text className={style.textInfo}>
                <Text className={style.labelTextInfo}>Cidade:</Text> {city}
            </Text>
          </View>
        }
      </View> 
    </View>
  )
}

const style = {
    container: `flex flex-1 bg-[rgba(0,0,0,0.91)] items-center justify-center`,
    conatinerInfoModal: `bg-[#fff] w-[70%] h-[40%] rounded-lg justify-center p-[15px]`,
    buttonCloseModal: `absolute top-[-15px] right-[-5px]`,
    textInfo: `mb-[20px] text-[18px]`,
    labelTextInfo: `font-bold`,
    title: `mb-10 self-center text-[20px] font-bold mt-[20px]`,
    containerButtonsModalDelete: `flex flex-row gap-2`,
    containerModalDelete: `flex flex-1  justify-between py-[20px]`,
    buttonDelete: `bg-[#FF0000] w-[50%] p-[10px] items-center rounded-md`,
    textButton: `text-[#fff] font-bold`,
    buttonCancel: `bg-[#00008B] w-[50%] p-[10px] items-center rounded-md`,
    descriptionDeleteModal: `text-[18px] self-center text-center`,
    titleDeleteModal: `text-[20px] text-center font-bold`
}
