/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   [user_name].js                                     :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jaeskim <jaeskim@student.42seoul.kr>       +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/10/15 22:00:30 by jaeskim           #+#    #+#             */
/*   Updated: 2020/10/17 19:18:05 by jaeskim          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { get42User } from "../../../src/api/api42";
import ReactDomServer from "react-dom/server";

import Main from "../../../src/component/Main";
import getImageToBase64 from "../../../src/util/getImageToBase64";

export default async (req, res) => {
  const {
    query: { user_name },
  } = req;

  const user_data = await get42User(user_name);

  // Sample Data
  // const user_data = JSON.parse(
  //   `{"coalition_name":"Gun","coalition_slug":"gun","image_url":"https://cdn.intra.42.fr/coalition/image/85/gun-svg-svg.svg","cover_url":"https://cdn.intra.42.fr/coalition/cover/85/gun_cover.jpg","color":"#ffc221","grade":"Learner","blackholed_at":"2021-04-05T01:00:00.000Z","begin_at":"2020-09-28T01:00:00.000Z","end_at":null,"cursus_name":"42cursus","cursus_slug":"42cursus","login":"jaeskim","first_name":"Jaeseo","last_name":"Kim","id":74960,"email":"jaeskim@student.42seoul.kr","capus":{"id":29,"name":"Seoul"}}`
  // );

  res.setHeader("Content-Type", "image/svg+xml");
  res.setHeader("Cache-Control", "s-maxage=3600, stale-while-revalidate");

  const logo = await getImageToBase64(user_data.image_url);

  res.send(
    ReactDomServer.renderToStaticMarkup(
      <Main userData={user_data} logo={logo} />
    )
  );
};
