import { Image, StyleSheet, Platform, View, Text } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Link } from 'expo-router';

export default function HomeScreen() {
  return (
    <View style={{ display:"flex", "flexDirection":"column", "alignItems":"center",justifyContent:"center",height:"100%", gap:20, }}>
      <Text style={{display:"flex", textAlign:"center", textAlignVertical:"center" ,color:"white",fontSize:24}}> 
        View Your notes by Clicking,  
      </Text>
      <Link href="/(tabs)/my-works" style={{display:"flex", textAlign:"center", textAlignVertical:"center" ,color:"green",fontSize:36}}> My Works </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
