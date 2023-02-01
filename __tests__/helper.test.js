import { durationFormat, randomInRange, getData } from "helper";
import { expect, jest, test } from "@jest/globals";
import AsyncStorage from "@react-native-async-storage/async-storage";

test("durationFormat 196, result = 03:16", () => {
  expect(durationFormat(196)).toBe("03:16");
});

test("randomInRange [0, 10] = x, result = x, 0 <= x <= 10", () => {
  expect(randomInRange(0, 10)).toBeGreaterThanOrEqual(0);
  expect(randomInRange(0, 10)).toBeLessThanOrEqual(10);
});

it("Verifying AsyncStorage getData function ", async () => {
  await getData("SOME_KEY");
  expect(AsyncStorage.getItem).toBeCalledWith("SOME_KEY");
});
