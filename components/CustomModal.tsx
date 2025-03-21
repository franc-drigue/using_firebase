import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import {MaterialIcons} from "@expo/vector-icons"
import { userCardProps } from './CardUsers'

type modalDeleteProps = userCardProps & {
   closeModal: () => void;
   modalDeleteUser: boolean;
}

export default function CustomModal({closeModal, age, city, name, modalDeleteUser, handleDeleteUser,closeForm}: modalDeleteProps) {
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
              <TouchableOpacity onPress={closeModal} className={style.buttonsDialog}>
                <Text className={style.textButtonCancelar}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity className={style.buttonsDialog} onPress={handleDeleteUser}>
                <Text className={style.textButtonDeletar}>Deletar</Text>
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
                <Text className={style.labelTextInfo}>Idade:</Text> {age} {age == "1" ? "ano" : "anos"} 
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
    container: `flex flex-1 bg-[rgba(0,0,0,0.81)] items-center justify-center`,
    conatinerInfoModal: `bg-[#F8F8FF] w-[70%] h-[40%] rounded-lg justify-center p-[15px]`,
    buttonCloseModal: `self-end`,
    textInfo: `mb-[20px] text-[18px]`,
    labelTextInfo: `font-bold`,
    title: `mb-10 self-center text-[20px] font-bold`,
    containerButtonsModalDelete: `flex-row gap-2 justify-center`,
    containerModalDelete: `flex flex-1  justify-between py-[20px]`,
    buttonsDialog: `w-[50%] p-[10px] items-center rounded-md border border-[#DCDCDC] bg-[#fff]`,
    textButtonCancelar: `text-[#00008B] font-bold text-[16px]`,
    textButtonDeletar: `font-bold text-[#FF0000] text-[16px]`,
    descriptionDeleteModal: `text-[18px] self-center text-center`,
    titleDeleteModal: `text-[20px] text-center font-bold`
}