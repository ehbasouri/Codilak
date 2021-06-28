import React, { Component } from 'react';
import { 
    View,
    Text,
    Image,
    PanResponder,
    Animated,
    Dimensions,
    StyleSheet,
    ImageBackground
 } from 'react-native';
import { redeem_image } from '../images';
import { SCREEN_PERCENTAGE } from '../dimentions';


//15 = -78
//25 = -29
//40 = 25
//55 = 78
//65 = 129

function getXValue(xValue) {
    if (xValue < -58) {
        return -78;
    } else if (xValue > -49 && xValue < -9) {
        return -29;
    } else if (xValue > 5 && xValue < 45) {
        return 25;
    } else if(xValue > 58 && xValue < 98) {
        return 78;
    } else if(xValue > 109){
        return 129;
    }else{
        return null;
    }
}

class CirclSwipComponent extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            redeemColorStyle: {
                
            }
         };
        this.xValue = 0;
        this.yValue = 0;
        this.state = {
            pan     : new Animated.Value(0)   //Step 1
        };
        this.panResponder = PanResponder.create({    //Step 2
            onMoveShouldSetPanResponder : () => true,
            onPanResponderGrant:  () => {
                this.state.pan.setOffset(this.state.pan._value);
            },
            onPanResponderMove: (e, gestureState) => {
                // console.log(gestureState.moveX)
                this.state.pan.setValue(gestureState.dx);
            },
            onPanResponderRelease        : (e, gesture) => {
                this.state.pan.flattenOffset();
                this.xValue = this.xValue + gesture.dx;
                console.log("this.xValue = ",this.xValue);
                console.log("==============")

                const xValue = getXValue(this.xValue);

                if (typeof xValue === "number") {
                    this.props.onAnimation(xValue);
                    Animated.spring(
                        this.state.pan,
                        {
                            toValue: xValue
                        }
                    ).start();
                } else{
                    this.props.onAnimation(null);
                }


                if (this.xValue > 139 || this.xValue < -139) {
                    this.xValue = 0;
                    Animated.spring(
                        this.state.pan,
                        {
                            toValue: 0
                        }
                    ).start();
                    this.props.onAnimation(null);
                }
                
                // this.state.pan.setValue(gesture.dx);
            } //Step 4
        });
    }

    componentDidUpdate =(preProps)=>{
        if (preProps.xValue !== this.props.xValue && this.props.xValue) {
            Animated.spring(
                this.state.pan,
                {
                    toValue: this.props.xValue
                }
            ).start();
        }
    }

    snapOffset = (offset) => Math.round(offset / 200) * 200;

    getAmountForNextSlice = (dx, offset) => {
        // This just rounds to the nearest 200 to snap the circle to the correct thirds
        const snappedOffset = this.snapOffset(offset);
        // Depending on the direction, we either add 200 or subtract 200 to calculate new offset position.
        const newOffset = dx > 0 ? snappedOffset + 200 : snappedOffset - 200;
        return newOffset;
        };

    render() {

        const animationRotate = this.state.pan.interpolate({ inputRange: [-200, 0, 200], outputRange: ['-120deg', '0deg', '120deg']});

        return (
            <View>
                <Animated.View
                style={[{transform: [{ rotate: animationRotate}]}, styles.circle]}
                {...this.panResponder.panHandlers}
                >
                    <View
                        style={styles.reddemContainer}
                    >
                        <ImageBackground
                            source={redeem_image}
                            style={styles.redeem}
                        >
                            <Text style={styles.text} >
                                Redeem
                            </Text>
                        </ImageBackground>
                    </View>

                </Animated.View>
            </View>
        );
    }
}

export default CirclSwipComponent;

let CIRCLE_RADIUS = 36;
let Window = Dimensions.get('window');
let styles = StyleSheet.create({
    mainContainer: {
        flex    : 1
    },
    draggableContainer: {
        position    : 'absolute',
        top         : Window.height/2 - CIRCLE_RADIUS,
        left        : Window.width/2 - CIRCLE_RADIUS,
    },
    circle      : {
        // backgroundColor     : '#1abc9c',
        width               : SCREEN_PERCENTAGE * 200,
        height              : SCREEN_PERCENTAGE * 200,
        borderRadius        : SCREEN_PERCENTAGE * 100,
        alignItems: "center",
        justifyContent: "center"
    },
    reddemContainer: {
        backgroundColor: "#fff",
        width: SCREEN_PERCENTAGE * 100,
        height: SCREEN_PERCENTAGE * 100,
        borderRadius: SCREEN_PERCENTAGE * 70,
        alignItems: "center",
        justifyContent: "center"
    },
    redeem: {
        width: SCREEN_PERCENTAGE * 129,
        height: SCREEN_PERCENTAGE * 129,
        alignItems: "center",
        justifyContent: "center"
    },
    text: {
        color: "#fff",
    }
});