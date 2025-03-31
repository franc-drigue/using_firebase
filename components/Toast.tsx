import { View, Text } from 'react-native';
import * as Animatable from 'react-native-animatable';
import React, { useEffect, useState } from 'react';

type toastProps = {
    msgToast: string;
    clearMsgToast: (text: string) => void;
}

export default function Toast({msgToast, clearMsgToast}: toastProps) {
  const [showToast, setShowToast] = useState(false);
  const [animation, setAnimation] = useState("bounceIn");

  useEffect(() => {
    if (msgToast) {
      setShowToast(true);
      setAnimation("bounceIn");

      const timer = setTimeout(() => {
        setAnimation("bounceOut");
      }, 1500);

      return () => clearTimeout(timer); 
    }
  }, [msgToast]);
    
  return (
    <>
      {
        showToast && 
        <Animatable.View 
        className={
            msgToast == "Usuário cadastrado com sucesso" 
            ? styles.bgToastSuccess : styles.bgToastError
        }
        animation={animation}
        duration={animation === "bounceIn" ? 1000 : 500} 
        onAnimationEnd={() => {
            if (animation === "bounceOut") {
              setShowToast(false);
              clearMsgToast("");
            }
          }}
        >
            <Text className={styles.textToast}>{msgToast}</Text>
        </Animatable.View>
      }
    </>
  )
}

const styles = {
  bgToastError: `bg-[#FF0000] fixed w-[90%] bottom-[-140px] self-center p-[10px] rounded rounded-md`,
  bgToastSuccess: `bg-[#32CD32] fixed w-[90%] bottom-[-140px] self-center p-[10px] rounded rounded-md`,
  textToast: `text-[#fff] text-center font-bold`
}