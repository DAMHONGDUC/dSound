import renderer from "react-test-renderer";
import MainHeader from "components/MainHeader";

it("BottomPlayer Snapshot ", () => {
  const tree = renderer.create(<MainHeader />).toJSON();
  expect(tree).toMatchSnapshot();
});
