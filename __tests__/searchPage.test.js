import { render, screen, fireEvent } from "@testing-library/react-native";
import SearchPage from "screens/search/searchPage";

const navigation = jest.fn();

test("test search page", async () => {
  const expectSearchText = "Son Tung";

  render(<SearchPage navigation={navigation} />);

  fireEvent.changeText(screen.getByTestId("searchText"), expectSearchText);
  fireEvent.press(screen.getByTestId("searchButton"));
});
