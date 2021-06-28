import React, { Component } from 'react';
import { View, Text, Image, ImageBackground, StyleSheet, Dimensions, Platform, TouchableOpacity } from 'react-native';
import { chartValue_image, chart_image } from '../images';
import { SCREEN_PERCENTAGE, SCREEN_WIDTH } from '../dimentions';

let Window = Dimensions.get('window')

function ChartColumn({
    title,
    rotate,
    onPress,
    selected
}) {
    return(
        <View style={[styles.columns,{
            transform: [{ rotate}]
        }]} >
            <TouchableOpacity onPress={onPress} style={styles.innerColumn} >
                <Text style={[styles.chartText, {color: selected ? "#E43A2E" : "#000"}]} >
                    {title}
                </Text>
            </TouchableOpacity>
            <View style={styles.innerColumn} />
        </View>
    )
}

export default function Board({
    onAnimation,
    xValue
}) {
    return(
        <View style={styles.container} >
            <Text>
                Your Current Points
            </Text>
            <ImageBackground
                source={chart_image}
                style={styles.chartImage}
            >
                <Image
                    style={styles.chartValueImage}
                    source={chartValue_image}
                />
            </ImageBackground>
            <View
                style={styles.chartNumbers}
            >

                <ChartColumn
                    onPress={()=>onAnimation(-78)}
                    title={"$15"}
                    rotate={"43deg"}
                    selected={xValue == -78}
                />
                <ChartColumn
                    onPress={()=>onAnimation(-29)}
                    title={"$25"}
                    rotate={"72.5deg"}
                    selected={xValue == -29}
                />
                <ChartColumn
                    onPress={()=>onAnimation(25)}
                    title={"$40"}
                    rotate={"105deg"}
                    selected={xValue == 25}
                />
                <ChartColumn
                    onPress={()=>onAnimation(78)}
                    title={"$55"}
                    rotate={"137deg"}
                    selected={xValue == 78}
                />
                <ChartColumn
                    onPress={()=>onAnimation(129)}
                    title={"$65"}
                    rotate={"167.5deg"}
                    selected={xValue == 129}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: Window.width - 32,
        height: SCREEN_PERCENTAGE * 218,
        backgroundColor: "#fff",
        position: "absolute",
        top: Platform.OS === "android" ? 50 : 94 ,
        left: 16,
        borderRadius: 16,
        alignItems: "center",
        justifyContent: "space-between",
        paddingTop: 16,
    },
    chartImage: {
        width: SCREEN_PERCENTAGE * 313,
        height: SCREEN_PERCENTAGE * 183,
    },
    chartValueImage: {
        width: SCREEN_PERCENTAGE * 153,
        height: SCREEN_PERCENTAGE * 123,
        position: "absolute",
        bottom: SCREEN_PERCENTAGE * 20,
        left: SCREEN_PERCENTAGE * 15
    },
    chartNumbers: {
        width: SCREEN_WIDTH - 32,
        height: SCREEN_WIDTH - 32,
        // backgroundColor: "red",
        borderRadius: SCREEN_WIDTH / 2,
        // position: "absolute",
        marginTop: -(SCREEN_WIDTH - 32) / 2,
        // zIndex: -1
    },
    columns: {
        width: SCREEN_WIDTH - 32,
        height: 25,
        // backgroundColor: "red",
        position: "absolute",
        top: ((SCREEN_WIDTH - 32) / 2) - 13,
        flexDirection:"row"
    },
    chartText: {
        transform: [{rotate: "-90deg"}],
        width: 30,
        marginLeft: -10
    },
    innerColumn: {
        width: (SCREEN_WIDTH - 32) / 2,
        // backgroundColor: "yellow"
    }
})