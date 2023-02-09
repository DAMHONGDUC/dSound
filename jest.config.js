module.exports = {
  preset: "react-native",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  setupFilesAfterEnv: ["@testing-library/jest-native/extend-expect"],
  setupFiles: ["./jest.setup.js"],

  transformIgnorePatterns: [
    "node_modules/(?!(@react-native|react-native" +
      "|react-native-vector-icons" +
      "|react-native-popover-view" +
      "|@react-native-firebase" +
      ")/)",
  ],
};
