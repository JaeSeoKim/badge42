/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   Stats-PrivacyEmail.test.tsx                        :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jaeskim <jaeskim@student.42seoul.kr>       +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/11/20 01:46:11 by jaeskim           #+#    #+#             */
/*   Updated: 2020/11/20 03:49:47 by jaeskim          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import React from "react";
import { render } from "@testing-library/react";
import fs from "fs";
import Stats from "../src/components/Stats";

describe("sample-jeaskim-2020-11-05 Stats", () => {
  /* SAMPLE DATA */
  const userData = JSON.parse(
    fs.readFileSync("test/sample-jeaskim-2020-11-05.json").toString()
  );
  const logo = "";

  const privacyEmail = true;

  it("render Stats Container : ", () => {
    const { container } = render(
      <Stats
        logo={logo}
        privacyEmail={privacyEmail}
        userData={userData}
        cursusName={null}
      />
    );

    expect(container.querySelector("[data-testid='header']").textContent).toBe(
      "jaeskim's 42Seoul Stats"
    );

    expect(container.querySelector("[data-testid='cursus']").textContent).toBe(
      "42cursus!"
    );

    expect(
      container.querySelector("[data-testid='logo']").getAttribute("href")
    ).toBe(logo);

    expect(
      container.querySelector("[data-testid='information-grade']").textContent
    ).toBe("Grade- Learner");

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
    ).toBe("136 days left!");

    expect(container.querySelector("[data-testid='level']").textContent).toBe(
      "level 1 - 66%"
    );

    expect(
      container
        .querySelector("[data-testid='svg-container']")
        .getAttribute("fill")
    ).toBe("#ffc221");
  });
});
