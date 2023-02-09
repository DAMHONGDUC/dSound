// import SearchPage from "screens/search/searchPage";
// import { render, fireEvent } from "@testing-library/react-native";

// const mockDispatch = jest.fn();
// const mockSelector = jest.fn();

// jest.mock("react-redux", () => ({
//   ...jest.requireActual("react-redux"),
//   useDispatch: () => mockDispatch,
//   useSelector: () => mockSelector,
// }));
// jest.mock("react-native/Libraries/EventEmitter/NativeEventEmitter");

// jest.mock("react-native-track-player", () => {
//   return {
//     usePlaybackState: jest.fn(),
//     State: jest.fn(),
//   };
// });

// test("test search page", () => {
//   const navigation = jest.fn();

//   const { getByTestId } = render(<SearchPage navigation={navigation} />);

//   const searchButton = getByTestId("searchButton");

//   fireEvent.changeText(getByTestId("searchText"), "content=searchText");
//   fireEvent.press(searchButton);
// });

import Example from "screens/search/Example";
import { render, screen, fireEvent } from "@testing-library/react-native";

test("examples of some things", async () => {
  const expectedUsername = "Ada Lovelace";

  render(<Example />);

  fireEvent.changeText(screen.getByTestId("input"), expectedUsername);
  fireEvent.press(screen.getByText("Print Username"));

  // Using `findBy` query to wait for asynchronous operation to finish
  const usernameOutput = await screen.findByTestId("printed-username");

  // Using `toHaveTextContent` matcher from `@testing-library/jest-native` package.
  expect(usernameOutput).toHaveTextContent(expectedUsername);

  expect(screen.toJSON()).toMatchSnapshot();
});
