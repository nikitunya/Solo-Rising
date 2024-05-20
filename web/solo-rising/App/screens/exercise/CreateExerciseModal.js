import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { Modal, StyleSheet, Text, View } from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { COLORS, PRIMARY_MUCLES, ROUTES, TYPES } from "../../constants";
import { Dropdown } from "react-native-element-dropdown";
import { auth } from "../../../services/firebase.config";
import DismissKeyboard from "../../components/DismissKeyboard";
import { createCustomExercise } from "../../../services/exerciseService";

const CreateExerciseModal = ({ visible, onClose }) => {
  const navigation = useNavigation();
  const [equipment, setEquipment] = useState("Darbell");
  const [exercise_type, setExerciseType] = useState("");
  const [experience, setExperience] = useState("Intermediate");
  const [force_type, setForceType] = useState("Pull");
  const [mechanics, setMechanics] = useState("Compound");
  const [name, setName] = useState("Nikita");
  const [primary_muscles, setPrimaryMuscles] = useState("");

  const handleCreateCustomExercise = () => {
    if (
      !name ||
      !primary_muscles ||
      !exercise_type ||
      !experience ||
      !force_type ||
      !mechanics
    ) {
      alert("All fields are required.");
      return;
    }
    const exercise = {
      name: name,
      primary_muscles: primary_muscles,
      secondary_mucles: [],
      exercise_type: exercise_type,
      experience: experience,
      force_type: force_type,
      mechanics: mechanics,
      user: auth?.currentUser?.uid,
      type: "Custom"
    };
    createCustomExercise(exercise).then(() => {
        onClose();
    });
  };

  return (
    <DismissKeyboard>
      <Modal
        visible={visible}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={onClose}
      >
        <View className="flex-1 bg-neutral-900">
          <View className="bg-zinc-800 p-6 rounded-3xl mt-5 mx-4">
            <View className="form space-y-2">
              <Text className="text-white ml-4">Name</Text>
              <TextInput
                className="p-4 bg-neutral-900 text-white rounded-2xl mb-3"
                placeholder="Enter Name"
                value={name}
                onChangeText={setName}
                placeholderTextColor={COLORS.white}
              />
              <Text className="text-white ml-4">Primary Muscle</Text>
              <Dropdown
                style={styles.dropdown}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={PRIMARY_MUCLES}
                search
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={"Choose Primary Muscle"}
                searchPlaceholder="Search..."
                value={primary_muscles}
                onChange={(item) => {
                  setPrimaryMuscles(item.value);
                }}
                renderLeftIcon={() => (
                  <AntDesign
                    style={styles.icon}
                    color={COLORS.primaryBlue}
                    name="Safety"
                    size={20}
                  />
                )}
              />
              <Text className="text-white ml-4">Type</Text>
              <Dropdown
                style={styles.dropdown}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={TYPES}
                search
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={"Choose Type"}
                searchPlaceholder="Search..."
                value={exercise_type}
                onChange={(item) => {
                  setExerciseType(item.value);
                }}
                renderLeftIcon={() => (
                  <AntDesign
                    style={styles.icon}
                    color={COLORS.primaryBlue}
                    name="Safety"
                    size={20}
                  />
                )}
              />
              <Text className="text-white ml-4">Experience</Text>
              <TextInput
                className="p-4 bg-neutral-900 text-white rounded-2xl mb-3"
                placeholder="Enter Experience"
                value={experience}
                onChangeText={setExperience}
                placeholderTextColor={COLORS.white}
              />
              <Text className="text-white ml-4">Force Type</Text>
              <TextInput
                className="p-4 bg-neutral-900 text-white rounded-2xl mb-3"
                placeholder="Enter Force Type"
                value={force_type}
                onChangeText={setForceType}
                placeholderTextColor={COLORS.white}
              />
              <Text className="text-white ml-4">Mechanics</Text>
              <TextInput
                className="p-4 bg-neutral-900 text-white rounded-2xl mb-3"
                placeholder="Enter Mechanics"
                value={mechanics}
                onChangeText={setMechanics}
                placeholderTextColor={COLORS.white}
              />
            </View>
            <TouchableOpacity
              onPress={() => {
                handleCreateCustomExercise();
              }}
            >
              <View className="flex justify-center items-center bg-blue-700 py-1 rounded-3xl my-4 mx-6">
                <Text className="text-lg text-white font-bold">Create</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </DismissKeyboard>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 16,
  },
  dropdown: {
    height: 50,
    borderRadius: 15,
    paddingHorizontal: 8,
    backgroundColor: COLORS.primaryBackground,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: "absolute",
    backgroundColor: "white",
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
    color: "white",
  },
  selectedTextStyle: {
    fontSize: 16,
    color: "white",
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});

export default CreateExerciseModal;
