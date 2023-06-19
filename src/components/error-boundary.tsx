import React from "react";
import crashlytics from "@react-native-firebase/crashlytics";
import SomethingWrong from "./something-wrong";

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      error: undefined,
    };
  }

  componentDidCatch(error) {
    console.log(error);
    this.setState({ error });
    crashlytics().recordError(error);
  }

  render() {
    if (!this.state.error) {
      return this.props.children;
    }

    return <SomethingWrong />;
  }
}
