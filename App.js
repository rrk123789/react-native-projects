import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Platform, Image, AsyncStorage } from 'react-native';
import Svg, { Circle, SvgUri } from 'react-native-svg';
import { Focus } from './src/features/focus/Focus';
import { Timer } from './src/features/timer/Timer';
import { colors } from './src/utils/color';
import { spacing } from './src/utils/sizes';
import Frame from './src/utils/Frame.svg';
// import Frame from './src/utils/loading.';
import { FocusHistory } from './src/features/focus/FocusHistory';

const STATUSES ={
  COMPLETE: 1,
  CANCELLED: 2,
}
export default function App() {
  const [focusSubject, setFocusSubject] = useState(null);
  const [focusHistory, setFocusHistory] = useState([]);
  const addFocusHistorySubjectWithStatus= (subject, status) =>{
    setFocusHistory([...focusHistory, {key : String(focusHistory.length+1),subject, status}])
  }

  useEffect(() => {
    if (focusSubject) {
      setFocusHistory([...focusHistory, focusSubject])
    }
  }, [focusSubject/*if any time focus subject get changed */]);

  const onClear=() => {
    setFocusHistory([]);
  }
  const saveFocusHistory = async() => {
    try{
      await AsyncStorage.setItem("focusHistory", JSON.stringify(focusHistory));
    }catch(e){
      console.log(e);
    }
  };

  const loadFocusHistory =async() => {
    try {
      const history = await AsyncStorage.getItem("focusHistory");
      if(history && JSON.parse(history).length){
        setFocusHistory(JSON.parse(history));
      }
    }catch(e){
      console.log(e);
    }
  }

  useEffect(()=>{
    loadFocusHistory();
  },[/*no array item means run on mount */ ])

  useEffect(()=>{
    saveFocusHistory();
  },[focusHistory])

  console.log(focusHistory)



  return (
    <View style={styles.container}>
    {/* <Image source={require('./src/utils/giphy.gif')} />
    
      <View style={styles.logo}>
        <Svg height="40%" width="40%" viewBox='0 0 100 100'>
          <Circle cx="60" cy="50" r="50" stroke="purple" strokeWidth=".5" fill="violet" />
         
          <Frame width={100} height={100}/>
        </Svg>
      </View> */}
      {focusSubject ? (
        <Timer
          focusSubject={focusSubject}
          onTimerEnd={() => {

            addFocusHistorySubjectWithStatus(focusSubject,STATUSES.COMPLETE);
            setFocusSubject(null);
          }}
          
          clearSubject={() => {
            addFocusHistorySubjectWithStatus(focusSubject,STATUSES.CANCELLED);
          setFocusSubject(null)}}
        />

      ) : (
        <View style={{flex:1}}>
        <Focus addSubject={setFocusSubject} />
        
        <FocusHistory focusHistory={focusHistory} onClear={onClear} />

        </View>
      
      )}
      {/* <Text style={styles.text}>{focusSubject}</Text> */}
      
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? spacing.md : spacing.lg,
    backgroundColor: colors.darkBlue,

  },
  text: {
    color: "#fff",
    fontSize: 18,
  },
  logo:{
    flex:0.1,
  },
})