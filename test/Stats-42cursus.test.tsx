/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   Stats-42cursus.test.tsx                            :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jaeskim <jaeskim@student.42seoul.kr>       +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/11/20 01:46:11 by jaeskim           #+#    #+#             */
/*   Updated: 2020/12/22 01:26:16 by jaeskim          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import React from "react";
import { render } from "@testing-library/react";
import fs from "fs";
import Stats from "../src/components/Stats";
import getRemainDay from "../src/util/getRemainDay";
import { get42UserData } from "../src/api/api42";

describe("test sample-jeaskim-2020-11-05 Stats", () => {
  /* SAMPLE DATA */
  const userData: get42UserData = JSON.parse(
    fs.readFileSync("test/sample-jeaskim-2020-11-05.json").toString()
  );
  const logo = "";

  it("render cursusName null : ", () => {
    const { container } = render(
      <Stats
        logo={logo}
        privacyEmail={false}
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

    expect(
      container.querySelector("[data-testid='information-email']").textContent
    ).toBe("Email- jaeskim@student.42seoul.kr");

    expect(
      container.querySelector("[data-testid='blackhole']").textContent
    ).toBe(`${getRemainDay(userData.cursus[0].blackholed_at)} days left!`);

    expect(container.querySelector("[data-testid='level']").textContent).toBe(
      "level 1 - 66%"
    );
  });

  it("render cursusName C Piscine : ", () => {
    const { container } = render(
      <Stats
        logo={logo}
        privacyEmail={true}
        userData={userData}
        cursusName={"C Piscine"}
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

    expect(
      container.querySelector("[data-testid='information-email']")
    ).toBeNull();

    expect(
      container.querySelector("[data-testid='blackhole']").textContent
    ).toBe("2020-06-29 ~ 2020-07-24");

    expect(container.querySelector("[data-testid='level']").textContent).toBe(
      "level 9 - 51%"
    );
  });

  it("render PrivacyEmail true : ", () => {
    const { container } = render(
      <Stats
        logo={logo}
        privacyEmail={true}
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

    expect(
      container.querySelector("[data-testid='information-email']")
    ).toBeNull();

    expect(
      container.querySelector("[data-testid='blackhole']").textContent
    ).toBe(`${getRemainDay(userData.cursus[0].blackholed_at)} days left!`);

    expect(container.querySelector("[data-testid='level']").textContent).toBe(
      "level 1 - 66%"
    );
  });
});
