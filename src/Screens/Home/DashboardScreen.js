import { Dimensions, SafeAreaView, StyleSheet, Text, View, FlatList, Image } from 'react-native';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { mapDispatchToProps, mapStateToProps } from '../../Redux';
import LinearGradient from 'react-native-linear-gradient';
import { Colors, Strings, Spinner, Images } from '../../common/App';
import LottieView from 'lottie-react-native';

const screenWidth = Dimensions.get('window').width;

const DATA = [
  { id: '1', value: 50, image: Images.water50ml },
  { id: '2', value: 100, image: Images.water100ml },
  { id: '3', value: 150, image: Images.water150ml },
  { id: '4', value: 200, image: Images.water50ml },
  { id: '5', value: 250, image: Images.water100ml },
  { id: '6', value: 300, image: Images.water150ml },
  // Add more items as needed
];

const Item = ({ value, image, opacity }) => (
  <View style={[styles.itemContainer, { opacity }]}>
    <Text style={styles.itemText}>{value} ml</Text>
    <Image source={image} style={styles.itemImage} />
  </View>
);

function DashboardScreen(props) {
  const [selectedIndex, setSelectedIndex] = useState(1);
  const [selectedMl, setSelectedMl] = useState(DATA[1].value);

  const handleScroll = (event) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / (screenWidth * 0.3));
    setSelectedIndex(index);
    setSelectedMl(DATA[index].value); // Update the selected ml value
  };

  return (
    <LinearGradient colors={[Colors.primaryColor, Colors.secondaryColor]} style={styles.gradient}>
      <SafeAreaView style={styles.mainContainer}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerTitle}>Daily Water Intake</Text>
          <LottieView
            source={Images.dashboarAnime}
            autoPlay
            loop
            style={styles.lottieAnimation}
          />
          <View style={styles.intakeView}>
            <Text style={styles.intakeValue}>{selectedMl}</Text>
            <Text style={styles.intakeUnit}>ml</Text>
          </View>
          <Text style={styles.goalText}>out of 2200 ml</Text>
        </View>

        <View style={styles.sliderContainer}>
          <FlatList
            data={DATA}
            renderItem={({ item, index }) => (
              <Item
                value={item.value}
                image={item.image}
                opacity={index === selectedIndex ? 1 : 0.5}
              />
            )}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            snapToAlignment="center"
            decelerationRate="fast"
            snapToInterval={screenWidth * 0.3}
            onScroll={handleScroll}
            contentContainerStyle={styles.listContainer}
          />
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  mainContainer: {
    flex: 1,
    alignItems: 'center',
  },
  headerContainer: {
    alignItems: 'center',
    paddingTop: 80,
    flex: 0.4,
  },
  headerTitle: {
    fontSize: 36,
    color: Colors.textColor,
    fontWeight: '700',
    textAlign: 'center',
    fontFamily: 'Poppins-Bold',
    marginBottom: 10,
  },
  intakeView: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginTop: 10,
  },
  intakeValue: {
    fontSize: 64,
    color: Colors.accentColor,
    fontWeight: '800',
    textAlign: 'center',
    fontFamily: 'Poppins-Bold',
  },
  intakeUnit: {
    fontSize: 24,
    color: Colors.subtleTextColor,
    fontWeight: '400',
    textAlign: 'center',
    fontFamily: 'Poppins-Medium',
    marginLeft: 5,
  },
  goalText: {
    fontSize: 18,
    color: Colors.subtleTextColor,
    fontWeight: '400',
    textAlign: 'center',
    marginTop: 10,
    fontFamily: 'Poppins-Medium',
  },
  lottieAnimation: {
    width: screenWidth - 50,
    height: screenWidth - 50,
    marginTop: 20,
  },
  sliderContainer: {
    position: 'absolute',
    bottom: 20,
    width: screenWidth,
    alignItems: 'center',
  },
  listContainer: {
    paddingHorizontal: (screenWidth - screenWidth * 0.3) / 2,
  },
  itemContainer: {
    width: screenWidth * 0.3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemText: {
    fontSize: 24,
    color: Colors.textColor,
    marginBottom: 10,
    fontFamily: 'Poppins-Bold',
  },
  itemImage: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(DashboardScreen);
