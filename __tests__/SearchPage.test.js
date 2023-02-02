import SearchPage from "screens/search/searchPage";
import { render, screen, fireEvent } from "@testing-library/react-native";
import * as redux from "react-redux";

const mockDispatch = jest.fn();
const mockSelector = jest.fn();

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: () => mockDispatch,
  useSelector: () => mockSelector,
}));
jest.mock("react-native/Libraries/EventEmitter/NativeEventEmitter");

jest.mock("react-native-track-player", () => {
  return {
    usePlaybackState: jest.fn(),
    State: jest.fn(),
  };
});

test("test search page", () => {
  const navigation = jest.fn();

  const { getByTestId } = render(<SearchPage navigation={navigation} />);

  const searchButton = getByTestId("searchButton");

  fireEvent.changeText(getByTestId("searchText"), "content=searchText");
  fireEvent.press(searchButton);
});
