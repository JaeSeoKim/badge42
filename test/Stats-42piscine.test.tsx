/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   Stats-42piscine.test.tsx                           :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jaeskim <jaeskim@student.42seoul.kr>       +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/11/20 01:46:11 by jaeskim           #+#    #+#             */
/*   Updated: 2020/11/21 10:27:50 by jaeskim          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import React from "react";
import { render } from "@testing-library/react";
import fs from "fs";
import Stats from "../src/components/Stats";

describe("sample-jeaskim-2020-11-05 Stats", () => {
  /* SAMPLE DATA */
  const userData = JSON.parse(
    fs.readFileSync("test/sample-jeaskim-piscine.json").toString()
  );
  const logo = "";

  const privacyEmail = false;

  it("render Stats Container : ", () => {
    const { container } = render(
      <Stats
        logo={logo}
        privacyEmail={privacyEmail}
        userData={userData}
        cursusName={"c-piscine"}
      />
    );

    expect(container.querySelector("[data-testid='header']").textContent).toBe(
      "jaeskim's 42Seoul Stats"
    );

    expect(container.querySelector("[data-testid='cursus']").textContent).toBe(
      "C Piscine!"
    );

    expect(container.querySelector("[data-testid='logo']")).toBeNull();

    expect(
      container.querySelector("[data-testid='information-grade']").textContent
    ).toBe("Grade- Novice");

    expect(
      container.querySelector("[data-testid='information-name']").textContent
    ).toBe("Name- Jaeseo Kim");

    if (privacyEmail) {
      expect(
        container.querySelector("[data-testid='information-email']")
      ).toBeNull();
    } else {
      expect(
        container.querySelector("[data-testid='information-email']").textContent
      ).toBe("Email- jaeskim@student.42seoul.kr");
    }

    expect(
      container.querySelector("[data-testid='blackhole']").textContent
    ).toBe("2020-06-29 ~ 2020-07-24");

    expect(container.querySelector("[data-testid='level']").textContent).toBe(
      "level 9 - 51%"
    );

    expect(
      container
        .querySelector("[data-testid='svg-container']")
        .getAttribute("fill")
    ).toBe("#00BABC");
  });
});
