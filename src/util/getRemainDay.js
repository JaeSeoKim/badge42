/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   getRemainDay.js                                    :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jaeskim <jaeskim@student.42seoul.kr>       +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/10/17 19:16:05 by jaeskim           #+#    #+#             */
/*   Updated: 2020/10/17 19:17:00 by jaeskim          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

const getRemainDay = (end) => {
  const startDate = new Date();
  const endDate = new Date(end);

  const Difference_In_Time = endDate.getTime() - startDate.getTime();

  return Math.floor(Difference_In_Time / (1000 * 3600 * 24));
};

export default getRemainDay;
