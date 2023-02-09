import { render, screen, fireEvent } from "@testing-library/react-native";
import SearchPage from "screens/search/searchPage";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { createSlice } from "@reduxjs/toolkit";

jest.mock("axios");
import axios from "axios";

const navigation = jest.fn();

beforeAll(() => {
  axios.get.mockImplementation(() => Promise.resolve("whatever-get"));
  axios.post.mockImplementation(() => Promise.resolve("whatever-post"));
});

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useSelector: jest.fn(),
}));

test("test search page", async () => {
  const expectSearchText = "Son Tung";

  render(<SearchPage navigation={navigation} />);

  fireEvent.changeText(screen.getByTestId("searchText"), expectSearchText);
  fireEvent.press(screen.getByTestId("searchButton"));
});
