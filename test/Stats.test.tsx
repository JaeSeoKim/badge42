import React from "react";
import { render } from "@testing-library/react";
import fs from "fs";
import Stats from "../src/components/Stats";

describe("sample-jeaskim-2020-11-05 Stats", () => {
  /* SAMPLE DATA */
  const userData = JSON.parse(
    fs.readFileSync("test/sample-jeaskim-2020-11-05.json").toString()
  );
  
  it("render Stats Container : ", () => {
    const { container } = render(
      <Stats logo="" privacyEmail={null} userData={userData} />
    );

    expect(container.querySelector("[data-testid='header']").textContent).toBe(
      "jaeskim's 42Seoul Stats"
    );
    expect(container.querySelector("[data-testid='cursus']").textContent).toBe(
      "42cursus!"
    );
    expect(container.querySelector("[data-testid='header']").textContent).toBe(
      "jaeskim's 42Seoul Stats"
    );
    expect(container.querySelector("[data-testid='header']").textContent).toBe(
      "jaeskim's 42Seoul Stats"
    );
  });
});
