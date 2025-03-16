import {useState} from "react"
import {
    View,
    Text,
    TouchableOpacity,
    Modal
} from "react-native";
import {Ionicons, FontAwesome, MaterialIcons} from "@expo/vector-icons";
import CustomModal from "./CustomModal";

export interface userCardProps {
    name: string;
    city: string;
    age: string;
    handleDeleteUser: () => void;
}

export default function CardUsers({name, handleDeleteUser, city, age}: userCardProps) {

   const [showModal, setShowModal] = useState(false)
   const [isShowModalDeleteUser, setIsShowModalDeleteUser] = useState(false)

   const handleShowModalDeleteUser = () => {
    setShowModal(true)
    setIsShowModalDeleteUser(true)
   }

   const handleShowModalInfoUser = () => {
      setShowModal(true)
      setIsShowModalDeleteUser(false)
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
               handleDeleteUser={handleDeleteUser}
              />
           </Modal>
        </View>
    )
}


const styles = {
    containerCard: `py-[8px] flex-row justify-between bg-[#DCDCDC] my-[7px] px-[8px] items-center rounded`,
    containerButtons: `flex flex-row gap-4`,
}