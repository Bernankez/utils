import { describe, expect, it } from "vitest";
import { getInfoByIDNumber, getYearDiff } from "../functions";

describe("getYearDiff", () => {
  it("normal birthday", () => {
    expect(getYearDiff("1998-01-01", "2023-02-14")).toBe(25);
  });

  it("same day", () => {
    expect(getYearDiff("1998-01-01", "1998-01-01")).toBe(0);
  });

  it("one day after", () => {
    expect(getYearDiff("1998-01-01", "1998-01-02")).toBe(0);
  });

  it("before year is leap year", () => {
    expect(getYearDiff("2004-02-29", "2009-02-28")).toBe(4);
  });

  it("after year is leap year", () => {
    expect(getYearDiff("2003-02-28", "2008-02-29")).toBe(5);
  });

  it("both leap year", () => {
    expect(getYearDiff("2004-02-29", "2008-02-28")).toBe(3);
  });

  it("both leap year, the same day", () => {
    expect(getYearDiff("2004-02-29", "2008-02-29")).toBe(4);
  });
});

describe("getInfoByIDNumber", () => {
  it("18 digits", () => {
    expect(getInfoByIDNumber("110101199003076472")).toEqual({
      valid: true,
      sex: "male",
      birthday: "1990-03-07",
      age: 33,
    });
  });

  it("15 digits", () => {
    expect(getInfoByIDNumber("110101900307647")).toEqual({
      valid: true,
      sex: "male",
      birthday: "1990-03-07",
      age: 33,
    });
  });

  it("02-29", () => {
    expect(getInfoByIDNumber("110101200402296179")).toEqual({
      valid: true,
      sex: "male",
      birthday: "2004-02-29",
      age: 19,
    });
  });
});
