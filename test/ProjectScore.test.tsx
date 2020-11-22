/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ProjectScore.test.tsx                              :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jaeskim <jaeskim@student.42seoul.kr>       +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/11/22 03:06:26 by jaeskim           #+#    #+#             */
/*   Updated: 2020/11/22 17:34:36 by jaeskim          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import React from "react";
import { render } from "@testing-library/react";
import fs from "fs";
import ProjectScore from "../src/components/ProjectScore";

describe("test ProjectScore", () => {
  it("render Succes : ", () => {
    const data = {
      id: 2004626,
      occurrence: 1,
      final_mark: 107,
      status: "in_progress",
      "validated?": true,
      current_team_id: 3340416,
      project: {
        id: 1327,
        name: "get_next_line",
        slug: "42cursus-get_next_line",
        parent_id: null,
      },
      cursus_ids: [21],
      marked_at: "2020-10-09T13:15:28.135Z",
      marked: true,
      retriable_at: "2020-10-10T13:15:28.259Z",
    };

    const { container } = render(<ProjectScore data={data} />);

    expect(container.querySelector("[data-testid='type']").textContent).toBe(
      "Succes"
    );
    expect(
      container.querySelector("[data-testid='final_mark']").textContent
    ).toBe("107");
  });

  it("render fail : ", () => {
    const data = {
      id: 2004626,
      occurrence: 1,
      final_mark: 20,
      status: "in_progress",
      "validated?": false,
      current_team_id: 3340416,
      project: {
        id: 1327,
        name: "get_next_line",
        slug: "42cursus-get_next_line",
        parent_id: null,
      },
      cursus_ids: [21],
      marked_at: "2020-10-09T13:15:28.135Z",
      marked: true,
      retriable_at: "2020-10-10T13:15:28.259Z",
    };

    const { container } = render(<ProjectScore data={data} />);

    expect(container.querySelector("[data-testid='type']").textContent).toBe(
      "Fail"
    );
    expect(
      container.querySelector("[data-testid='final_mark']").textContent
    ).toBe("20");
  });

  it("render Subscribed : ", () => {
    const data = {
      id: 2004626,
      occurrence: 1,
      final_mark: 0,
      status: "in_progress",
      "validated?": null,
      current_team_id: 3340416,
      project: {
        id: 1327,
        name: "get_next_line",
        slug: "42cursus-get_next_line",
        parent_id: null,
      },
      cursus_ids: [21],
      marked_at: "2020-10-09T13:15:28.135Z",
      marked: true,
      retriable_at: "2020-10-10T13:15:28.259Z",
    };

    const { container } = render(<ProjectScore data={data} />);

    expect(container.querySelector("[data-testid='type']").textContent).toBe(
      "Subscribed"
    );
    expect(container.querySelector("[data-testid='final_mark']")).toBeNull();
  });
});
