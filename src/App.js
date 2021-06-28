import React, { Component } from 'react';
import { 
  View,
  Text,
  StyleSheet,
  StatusBar,
 } from 'react-native';
import { Header } from './component/Header';
import CirclSwipComponent from './component/CirclSwipComponent';
import AnimatedTest from './component/AnimatedTest';
import Board from './component/Board';
import { SCREEN_PERCENTAGE } from './dimentions';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      xValue: null
    };
  }

  onAnimation = xValue => {
    this.setState({ xValue })
  }

  render() {
    return (
      <View style={styles.container} >
        <StatusBar backgroundColor={"#E43A2E"} />
        <Header
          title={"hello"}
        />
        <Board
          onAnimation={this.onAnimation}
          xValue={this.state.xValue}
        />
        <View style={styles.redeemContainer} >
          <CirclSwipComponent
            onAnimation={this.onAnimation}
            xValue={this.state.xValue}
          />
        </View>
      </View>
    );
  }
}

export default App;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "gray", 
    flex:1
  },
  redeemContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: SCREEN_PERCENTAGE * -35
  }
})
