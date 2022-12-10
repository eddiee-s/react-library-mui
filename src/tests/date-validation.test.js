import { dateIsValid } from "../helpers/date-validation";

/********************* DATE VALIDATION FUNCTION TEST ****************/
//!MOCK TEST DATA
const mockTestData = [
  { input: "11000", output: false },
  { input: "Text", output: false },
  { input: "22-10-1991", output: false },
  { input: "1991-22-10", output: false },
  { input: "1991-10-22", output: true },
  { input: "2002-1-22", output: false },
  { input: "2002-01-2", output: false },
  { input: "2002-01-22", output: true },
  { input: "02-01-22", output: false },
];

mockTestData.forEach((data) => {
  test(`Date format "YYYY-MM-DD" Test`, () => {
    let measuresTest = dateIsValid(data.input);
    expect(measuresTest).toBe(data.output);
  });
});
