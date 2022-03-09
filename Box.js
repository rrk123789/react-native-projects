import React from "react";
import { PropTypes} from "prop-types";
import { View, Text} from "react-native";
import styles from "./styles";

 export default function Box({children}) {
    return(
        <View style={styles.box}>
            <Text style={styles.boxText}>{children}</Text>
        </View>
    );
}
Box.propTypes ={
    children:PropTypes.node.isRequired
};


// import * as React from 'react';
// import { View, Text,Button ,TextInput } from 'react-native';
// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';

// function HomeScreen({navigation, route}) {
//   React.useEffect(()=>{
//     if(route.params?.post){

//     }

//   },[route.params?.post]);
//   return (
//     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//       <Text>Home Screen</Text>
//       <Button title="Create post"
//       onPress={()=>navigation.navigate('CreatePost')} />
//       <Text style={{margin:10}}>Post:{route.params?.post}</Text>
//     </View>
//   );
// }


// function CreatePostScreen({route,navigation}){

//   const [postText, setPostText] = React.useState('');
//   return(
//     <>
//       <TextInput 
//         multiline
//         placeholder=''
//       />
//     </>
//   )
// }

// const Stack = createNativeStackNavigator();

// function App() {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator>
//         <Stack.Screen name="Home" component={HomeScreen} />
//         <Stack.Screen name="Details" component={DetailsScreen} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }

// export default App;