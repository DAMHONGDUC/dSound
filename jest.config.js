module.exports = {
  // preset: "react-native",
  // moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  // setupFilesAfterEnv: ["@testing-library/jest-native/extend-expect"],
  transformIgnorePatterns: [
    "node_modules/(?!(@react-native|react-native|react-native-vector-icons|react-native-social-buttons)/)",
  ],
  // reporters: [
  //   "default",
  //   [
  //     "jest-html-reporters",
  //     {
  //       filename: "jest.report.html",
  //       expand: true,
  //     },
  //   ],
  //],
  preset: "react-native",
  setupFilesAfterEnv: ["@testing-library/jest-native/extend-expect"],
};
