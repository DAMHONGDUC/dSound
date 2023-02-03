import { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableHighlight,
} from "react-native";
import { firebase } from "@react-native-firebase/auth";
import { COLORS } from "constants/theme";
import Loading from "components/Loading";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "constants/values";
import { setShowBottomPlay } from "redux/slices/playerSlide";
import { useDispatch } from "react-redux";
import TrackPlayer from "react-native-track-player";

const FieldInfor = ({ iconName, content }) => {
  return (
    <View style={styles.row}>
      <MaterialIcons name={iconName} color={COLORS.primary} size={25} />
      <Text style={styles.mainText}>{content}</Text>
    </View>
  );
};

export default function LibraryPage() {
  const [user, setUser] = useState();
  const navigation = useNavigation();
  const { handleAfterSignOut } = useContext(AuthContext);
  const dispatch = useDispatch();

  useEffect(() => {
    const res = firebase.auth().currentUser;

    if (res?.providerData[0]) {
      setUser(res.providerData[0]);
    }
  }, []);

  // useEffect(() => {
  //   throw new Error("We crashed again!!!!!");
  //   // crashlytics().crash();
  // }, []);

  const onLogout = async () => {
    await TrackPlayer.pause();
    dispatch(setShowBottomPlay(false));

    await firebase.auth().signOut();
    await handleAfterSignOut();

    navigation.navigate("AuthenticationStack", { screen: "SignIn" });
  };

  return (
    <View style={styles.container}>
      {user ? (
        <>
          <View style={styles.imageContainer}>
            <Image style={styles.image} source={{ uri: user.photoURL }} />
          </View>
          <View style={styles.contentContainer}>
            {user.displayName && (
              <FieldInfor
                iconName={"drive-file-rename-outline"}
                content={user.displayName}
              />
            )}
            {user.email && (
              <FieldInfor iconName={"email"} content={user.email} />
            )}
            {user.phoneNumber && (
              <FieldInfor iconName={"phone"} content={user.phoneNumber} />
            )}
          </View>
          <TouchableHighlight
            style={styles.logoutContainer}
            underlayColor={COLORS.grey}
            onPress={onLogout}
          >
            <View style={styles.logout}>
              <Text style={styles.text}>Logout</Text>

              <MaterialIcons name={"logout"} color={COLORS.primary} size={30} />
            </View>
          </TouchableHighlight>
        </>
      ) : (
        <Loading />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    flexDirection: "column",
  },
  imageContainer: {
    width: "100%",
    height: 150,
    backgroundColor: "#AEE2FF",
    alignItems: "flex-start",
    flexDirection: "row",
  },
  row: {
    marginBottom: 20,
    flexDirection: "row",
    alignSelf: "flex-start",
  },
  contentContainer: {
    flexDirection: "column",
    marginTop: 100,
    padding: 15,
  },
  image: {
    marginTop: 100,
    marginLeft: 25,
    height: 110,
    width: 110,
    borderRadius: 55,
  },
  text: {
    fontSize: 20,
    color: COLORS.black,
    fontWeight: "500",
    marginRight: 5,
  },
  mainText: {
    marginLeft: 13,
    color: COLORS.black,
    fontSize: 16,
  },
  logoutContainer: {
    position: "absolute",
    alignSelf: "center",
    bottom: 80,
  },
  logout: {
    flexDirection: "row",
  },
});
