import React from "react";
import { View, Image, StyleSheet, Platform, TouchableOpacity, Dimensions, Text } from "react-native";
import { clock_image, ring_image, man_image } from "../images";
import { SCREEN_PERCENTAGE } from "../dimentions";

const SCREEN_WIDTH = Dimensions.get("screen").width


function LeftComponent(params) {
  return(
      <View style={styles.leftComponentContainer} >
          <Image style={styles.icon} source={clock_image} />
          <Image style={styles.icon} source={ring_image} />
      </View>
  )
}


function RightComponent(params) {
    return(
        <View>
            <Image style={styles.icon} source={man_image} />
        </View>
    )
  }

export function Header({
    leftComponent,
    rigthComponent,
    onLeftPress,
    onRigthPress,
    title,
    centerComponent,
    style
}) {
    return(
       <>
            <View style={[styles.container, style]} >
                <View style={styles.innerContainer}>
                    <TouchableOpacity onPress={onLeftPress} style={styles.iconsContainer} >
                        <LeftComponent/>
                    </TouchableOpacity>
                    <View style={styles.titleContainer} >
                        {/* {title ? <Text style={styles.header} >
                            {title}
                        </Text>:
                        centerComponent} */}
                    </View>
                    <TouchableOpacity onPress={onRigthPress} style={styles.iconsContainer} >
                        <RightComponent/>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.orangContainer} >

            </View>
       </>
    );
}

const styles = StyleSheet.create({
    icon: {
        width: 38,
        height: 38
    },
    orangContainer: {
        height: SCREEN_PERCENTAGE * 159,
        backgroundColor: "#E43A2E",
        borderBottomEndRadius: 16,
        borderBottomStartRadius: 16
      },
    container: {
        height: Platform.OS === "android" ? 44 : 88,
        backgroundColor: "#E43A2E",
        justifyContent: "flex-end",
        paddingHorizontal: 16,
        width: SCREEN_WIDTH
    },
    leftComponentContainer: {
        flexDirection: "row"
    },
    iconsContainer:{
        height: 44,
        // flex: 2,
        alignItems: "center",
        justifyContent: "center",
        minWidth: 22
    },
    titleContainer:{
        minHeight: 44,
        flex: 5,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 16
    },
    innerContainer: {
        flexDirection: "row",
        alignItems:"center"
    },
    header: {
        fontWeight: "bold",
        color: "#fff",
        fontSize: 16,
        textAlign: "center",
        width: SCREEN_WIDTH / 2
    }
});