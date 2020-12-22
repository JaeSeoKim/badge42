/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   Stats-42cursus.test.tsx                            :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jaeskim <jaeskim@student.42seoul.kr>       +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/11/20 01:46:11 by jaeskim           #+#    #+#             */
/*   Updated: 2020/12/23 01:48:59 by jaeskim          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import React from "react";
import { render } from "@testing-library/react";
import fs from "fs";
import Stats from "../src/components/Stats";

describe("test StatsComponents!", () => {
  it("normal data", () => {
    const logo = `data:image/svg+xml;base64,${fs
      .readFileSync(`src/img/logo/piscine.svg`)
      .toString("base64")}`;
    const cover = `data:image/jpeg;base64,${fs
      .readFileSync(`src/img/cover/piscine.jpg`)
      .toString("base64")}`;

    const color = "#424242";
    const data = {
      campus: "seoul",
      cursus: "42cursus",
      email: "jaeskim@student.42seou.kr",
      grade: "Learner",
      id: "jaeskim",
      name: "Jaeseo Kim",
      level: 42.42,
    };

    const { container } = render(
      <Stats
        data={data}
        color={color}
        darkmode={false}
        logo={logo}
        cover={cover}
      />
    );

    expect(container.querySelector("[data-testid='header']").textContent).toBe(
      `${data.id}'s${data.campus} Stats`
    );

    expect(container.querySelector("[data-testid='cursus']").textContent).toBe(
      `${data.cursus}!`
    );

    expect(
      container.querySelector("[data-testid='logo']").getAttribute("href")
    ).toBe(logo.replace("ZmlsbD0iIzAwMDAwMCI", "ZmlsbD0iI0ZGRkZGRiI"));

    expect(
      container.querySelector("[data-testid='information-grade']").textContent
    ).toBe(data.grade);

    expect(
      container.querySelector("[data-testid='information-name']").textContent
    ).toBe(data.name);

    expect(
      container.querySelector("[data-testid='information-email']").textContent
    ).toBe(data.email);

    expect(container.querySelector("[data-testid='level']").textContent).toBe(
      `level ${Math.floor(data.level)} - ${(
        parseFloat((data.level % 1).toFixed(2)) * 100
      ).toFixed(0)}%`
    );
  });

  it("disable email", () => {
    const logo = `data:image/svg+xml;base64,${fs
      .readFileSync(`src/img/logo/piscine.svg`)
      .toString("base64")}`;
    const cover = `data:image/jpeg;base64,${fs
      .readFileSync(`src/img/cover/piscine.jpg`)
      .toString("base64")}`;

    const color = "#424242";
    const data = {
      campus: "seoul",
      cursus: "42cursus",
      email: null,
      grade: "Learner",
      id: "jaeskim",
      name: "Jaeseo Kim",
      level: 42.42,
    };

    const { container } = render(
      <Stats
        data={data}
        color={color}
        darkmode={false}
        logo={logo}
        cover={cover}
      />
    );

    expect(container.querySelector("[data-testid='header']").textContent).toBe(
      `${data.id}'s${data.campus} Stats`
    );

    expect(container.querySelector("[data-testid='cursus']").textContent).toBe(
      `${data.cursus}!`
    );

    expect(
      container.querySelector("[data-testid='logo']").getAttribute("href")
    ).toBe(logo.replace("ZmlsbD0iIzAwMDAwMCI", "ZmlsbD0iI0ZGRkZGRiI"));

    expect(
      container.querySelector("[data-testid='information-grade']").textContent
    ).toBe(data.grade);

    expect(
      container.querySelector("[data-testid='information-name']").textContent
    ).toBe(data.name);

    expect(
      container.querySelector("[data-testid='information-email']")
    ).toBeNull();

    expect(container.querySelector("[data-testid='level']").textContent).toBe(
      `level ${Math.floor(data.level)} - ${(
        parseFloat((data.level % 1).toFixed(2)) * 100
      ).toFixed(0)}%`
    );
  });

  it("darkmode test", () => {
    const logo = `data:image/svg+xml;base64,${fs
      .readFileSync(`src/img/logo/piscine.svg`)
      .toString("base64")}`;
    const cover = `data:image/jpeg;base64,${fs
      .readFileSync(`src/img/cover/piscine.jpg`)
      .toString("base64")}`;

    const color = "#424242";
    const data = {
      campus: "seoul",
      cursus: "42cursus",
      email: null,
      grade: "Learner",
      id: "jaeskim",
      name: "Jaeseo Kim",
      level: 42.42,
    };

    const { container } = render(
      <Stats
        data={data}
        color={color}
        darkmode={true}
        logo={logo}
        cover={cover}
      />
    );

    expect(container.querySelector("[data-testid='header']").textContent).toBe(
      `${data.id}'s${data.campus} Stats`
    );

    expect(container.querySelector("[data-testid='cursus']").textContent).toBe(
      `${data.cursus}!`
    );

    expect(
      container.querySelector("[data-testid='logo']").getAttribute("href")
    ).toBe(logo.replace("ZmlsbD0iIzAwMDAwMCI", "ZmlsbD0iI0ZGRkZGRiI"));

    expect(
      container.querySelector("[data-testid='information-grade']").textContent
    ).toBe(data.grade);

    expect(
      container.querySelector("[data-testid='information-name']").textContent
    ).toBe(data.name);

    expect(
      container.querySelector("[data-testid='information-email']")
    ).toBeNull();

    expect(container.querySelector("[data-testid='level']").textContent).toBe(
      `level ${Math.floor(data.level)} - ${(
        parseFloat((data.level % 1).toFixed(2)) * 100
      ).toFixed(0)}%`
    );
  });
});
