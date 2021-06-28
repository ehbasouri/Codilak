import React, { Component } from 'react';
import { 

StyleSheet,
View,
Text,
PanResponder,
Animated,
Dimensions
} from 'react-native';

class AnimatedTest extends Component {
    constructor(props){
        super(props);
    
        this.state = {
            pan     : new Animated.ValueXY({x:0, y: 0})   //Step 1
        };
    
        this.panResponder = PanResponder.create({    //Step 2
            // onStartShouldSetPanResponder : () => true,
            onMoveShouldSetPanResponder: () => true,
            onPanResponderGrant:  () => {
                this.state.pan.setOffset({
                    x: this.state.pan.x._value,
                    y: this.state.pan.y._value
                });
            },
            onPanResponderMove: (e, gestureState) => {
                // console.log(gestureState.moveX)
                this.state.pan.x.setValue(gestureState.dx);
                this.state.pan.y.setValue(gestureState.dy);
            },
            onPanResponderRelease           : () => {
                this.state.pan.flattenOffset();
            } //Step 4
        });
    }

    render(){
        return (
           
        <View style={styles.draggableContainer}>
            <Animated.View 
                {...this.panResponder.panHandlers}                      
                style={[this.state.pan.getLayout(), styles.circle]}>   
                <Text style={styles.text}>Drag me!</Text>
            </Animated.View>
        </View>
        );
    }
}

export default AnimatedTest;

let CIRCLE_RADIUS = 36;
let Window = Dimensions.get('window');
let styles = StyleSheet.create({
    mainContainer: {
        flex    : 1
    },
    dropZone    : {
        height         : 100,
        backgroundColor:'#2c3e50'
    },
    text        : {
        marginTop   : 25,
        marginLeft  : 5,
        marginRight : 5,
        textAlign   : 'center',
        color       : '#fff'
    },
    draggableContainer: {
        position    : 'absolute',
        top         : Window.height/2 - CIRCLE_RADIUS,
        left        : Window.width/2 - CIRCLE_RADIUS,
    },
    circle      : {
        backgroundColor     : '#1abc9c',
        width               : CIRCLE_RADIUS*2,
        height              : CIRCLE_RADIUS*2,
        borderRadius        : CIRCLE_RADIUS
    }
});