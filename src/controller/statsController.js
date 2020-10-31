/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   statsController.js                                 :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jaeskim <jaeskim@student.42seoul.kr>       +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/10/15 22:00:30 by jaeskim           #+#    #+#             */
/*   Updated: 2020/10/31 21:04:11 by jaeskim          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { get42User } from "../api/api42";
import ReactDomServer from "react-dom/server";

import Stats from "../component/Stats";
import Error from "../component/Error";
import getImageToBase64 from "../util/getImageToBase64";

export const getUserStats = async (req, res) => {
  const {
    params: { user_name },
    cacheStore,
  } = req;

  res.setHeader("Content-Type", "image/svg+xml");

  try {
    let logo = "";
    const user_data = await get42User(user_name, cacheStore);
    if (cacheStore.has(user_data.image_url))
      logo = cacheStore.get(user_data.image_url);
    else {
      logo = await getImageToBase64(user_data.image_url);
      // Cache 5day!
      cacheStore.set(user_data.image_url, logo, (86400 * 14));
    }

    // Sample Data
    // const user_data = JSON.parse(
    //   `{"coalition_name":"Gun","coalition_slug":"gun","image_url":"https://cdn.intra.42.fr/coalition/image/85/gun-svg-svg.svg","cover_url":"https://cdn.intra.42.fr/coalition/cover/85/gun_cover.jpg","color":"#ffc221","level":1.6600000000000001,"grade":"Learner","blackholed_at":"2021-04-05T01:00:00.000Z","begin_at":"2020-09-28T01:00:00.000Z","end_at":null,"cursus_name":"42cursus","cursus_slug":"42cursus","login":"jaeskim","first_name":"Jaeseo","last_name":"Kim","id":74960,"email":"jaeskim@student.42seoul.kr","capus":{"id":29,"name":"Seoul"}}`
    // );

    res.send(
      ReactDomServer.renderToStaticMarkup(
        <Stats userData={user_data} logo={logo} />
      )
    );
  } catch (error) {
    cacheStore.del(user_name);
    res.setHeader("Cache-Control", "max-age=0");
    res.send(ReactDomServer.renderToStaticMarkup(<Error />));
  }
};
