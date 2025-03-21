import {useState} from "react"
import {
    View,
    Text,
    TouchableOpacity,
    Modal
} from "react-native";
import {Ionicons, FontAwesome, MaterialIcons} from "@expo/vector-icons";
import CustomModal from "./CustomModal";
import CustomModalEditUser from "./CustomModalEditUser";

export interface userCardProps {
    name: string;
    city: string;
    age: string;
    closeForm: () => void;
    handleDeleteUser: () => void;
}

export default function CardUsers({name, handleDeleteUser, city, age, closeForm}: userCardProps) {

   const [showModal, setShowModal] = useState(false)
   const [isShowModalDeleteUser, setIsShowModalDeleteUser] = useState(false)
   const [modalEditUser, setModalEditUser] = useState(false)

   const handleShowModalDeleteUser = () => {
    setShowModal(true)
    setIsShowModalDeleteUser(true)
   }

   const handleShowModalInfoUser = () => {
      setShowModal(true)
      setIsShowModalDeleteUser(false)
   }

   const handleShowModalEditUser = () => {
     setModalEditUser(true)
     closeForm()
   }

    return(
        <View className={styles.containerCard}>
           <Text>
             {name}
           </Text>
           <View className={styles.containerButtons}>
             <TouchableOpacity onPress={handleShowModalInfoUser}>
                <MaterialIcons name="info" size={32} color={"#00008B"}/>
             </TouchableOpacity>
             <TouchableOpacity onPress={handleShowModalEditUser}>
               <Ionicons name="pencil" size={32} color={"#006400"}/>
             </TouchableOpacity>
             <TouchableOpacity onPress={handleShowModalDeleteUser}>
               <Ionicons name="trash" size={32} color={"#FF0000"}/>
             </TouchableOpacity>
           </View>
           <Modal visible={showModal} transparent>
              <CustomModal
               modalDeleteUser={isShowModalDeleteUser}
               age={age}
               city={city}
               name={name}
               closeModal={() => setShowModal(false)}
               closeForm={() => {}}
               handleDeleteUser={handleDeleteUser}
              />
           </Modal>
           <Modal visible={modalEditUser} transparent={true} animationType="slide">
               <CustomModalEditUser
                closeModal={() => setModalEditUser(false)}
               />
           </Modal>
        </View>
    )
}


const styles = {
    containerCard: `py-[8px] flex-row justify-between bg-[#DCDCDC] my-[7px] px-[8px] items-center rounded`,
    containerButtons: `flex flex-row gap-4`,
}