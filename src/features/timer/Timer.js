import React, { useState } from "react";
import { View, StyleSheet, Text, Vibration, Platform } from "react-native";
import { colors } from "../../utils/color";
import { spacing } from "../../utils/sizes";
import { Countdown } from "../../components/Countdown";
import { RoundedButton } from "../../components/RoundedButton";
import { ProgressBar } from "react-native-paper";
import { Timing } from "./timing";

const DEFAULT_TIME=0.1;
export const Timer = ({ focusSubject,onTimerEnd, clearSubject}) => {
    const [minutes,setMinutes] = useState(DEFAULT_TIME);
    const [isStarted, setIsStarted] = useState(null);
    const [progress,setProgress] = useState(1);

    const onProgress= (progress) => {
        setProgress(progress);
    }
    const changeTime =(min)=>{
        setMinutes(min);
        
        setProgress(1);
        setIsStarted(false);
    }
    const onEnd=()=>{
        vibrate();
         setMinutes(DEFAULT_TIME);
         setProgress(1);
         setIsStarted(false);
         onTimerEnd();
        
    }
    const vibrate=()=>{
        if(Platform.OS==='ios'){
        const interval= setInterval(()=>Vibration.vibrate(),1000);
        setTimeout(()=>clearInterval(interval,10000));
        }
        else{
            //Vibration.vibrate(10000)
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.countdown}>
                <Countdown 
                minutes={minutes} 
                isPaused={!isStarted} 
                onProgress={onProgress}
                    onEnd={onEnd}
                />
            </View>
            <View>
                <Text style={styles.title}>Focusing on:</Text>
                <Text style={styles.task}>{focusSubject}</Text>
            </View>
            <View style={{paddingTop: spacing.sm}}>
                <ProgressBar 
                    progress={progress}
                    color="#5E84E2"
                    style={{height:10}}
                    
                />
            </View>
            <View style={styles.buttonWrapper}>
            <Timing onChangeTime={changeTime} />

            </View>

            <View style={styles.buttonWrapper}>
            {isStarted ? 
                <RoundedButton title="pause"  onPress={()=> setIsStarted(false)}/>
            
            :
            <RoundedButton title="start"  onPress={()=> setIsStarted(true)}/>
            }
           
            </View>
            <View style={styles.clearSubject}>
                <RoundedButton title="-" size={50} onPress={()=> clearSubject()}/>
            </View>
        </View>
    ); 
};

const styles = StyleSheet.create({
    container: {
        flex: 1,


    },
    title: {
        color: colors.white,
        textAlign: 'center'
    },
    task: {
        color: colors.white,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    countdown: {
        flex: 0.3,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonWrapper:{
        flex:0.3,
        flexDirection:"row",
        padding:15,
        justifyContent:'center',
        alignItems:'center'
    },
    clearSubject:{
        paddingBottom:25,
        paddingLeft:25,
        
    }
})