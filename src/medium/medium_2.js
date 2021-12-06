import mpg_data from "./data/mpg_data.js";
import {getStatistics} from "./medium_1.js";

/*
This section can be done by using the array prototype functions.
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array
see under the methods section
*/


/**
 * This object contains data that has to do with every car in the `mpg_data` object.
 *
 *
 * @param {allCarStats.avgMpg} Average miles per gallon on the highway and in the city. keys `city` and `highway`
 *
 * @param {allCarStats.allYearStats} The result of calling `getStatistics` from medium_1.js on
 * the years the cars were made.
 *
 * @param {allCarStats.ratioHybrids} ratio of cars that are hybrids
 */
export const allCarStats = {
    avgMpg: {
        city: mpg_data.reduce((a,b) => a + b.city_mpg, 0)/mpg_data.length,
        highway: mpg_data.reduce((a,b) => a + b.highway_mpg, 0)/mpg_data.length
    },
    allYearStats: getStatistics(mpg_data.map(({year}) => year)),
    ratioHybrids: mpg_data.filter(obj => obj.hybrid).length/mpg_data.length,
};


/**
 * HINT: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce
 *
 * @param {moreStats.makerHybrids} Array of objects where keys are the `make` of the car and
 * a list of `hybrids` available (their `id` string). Don't show car makes with 0 hybrids. Sort by the number of hybrids
 * in descending order.
 *
 *[{
 *     "make": "Buick",
 *     "hybrids": [
 *       "2012 Buick Lacrosse Convenience Group",
 *       "2012 Buick Lacrosse Leather Group",
 *       "2012 Buick Lacrosse Premium I Group",
 *       "2012 Buick Lacrosse"
 *     ]
 *   },
 *{
 *     "make": "BMW",
 *     "hybrids": [
 *       "2011 BMW ActiveHybrid 750i Sedan",
 *       "2011 BMW ActiveHybrid 750Li Sedan"
 *     ]
 *}]
 *
 *
 *
 *
 * @param {moreStats.avgMpgByYearAndHybrid} Object where keys are years and each year
 * an object with keys for `hybrid` and `notHybrid`. The hybrid and notHybrid
 * should be an object with keys for `highway` and `city` average mpg.
 *
 * Only years in the data should be keys.
 *
 * {
 *     2020: {
 *         hybrid: {
 *             city: average city mpg,
 *             highway: average highway mpg
 *         },
 *         notHybrid: {
 *             city: average city mpg,
 *             highway: average highway mpg
 *         }
 *     },
 *     2021: {
 *         hybrid: {
 *             city: average city mpg,
 *             highway: average highway mpg
 *         },
 *         notHybrid: {
 *             city: average city mpg,
 *             highway: average highway mpg
 *         }
 *     },
 *
 * }
 */
export const moreStats = {
    makerHybrids: mpg_data.filter(obj => obj.hybrid).sort((a,b) => (a.make > b.make) ? 1:-1).reduce(function (prev, obj) {
        if (!prev[0]) {
          prev[0] = {make: '', hybrids:''};
          prev[0].make = obj.make;
          prev[0].hybrids = [obj.id];
        } else {
            if (prev[prev.length-1].make === obj.make) {
                prev[prev.length-1].hybrids.push(obj.id);
            } else {
                prev.push({make: obj.make, hybrids: [obj.id]});
            }
        }
        
        return prev;
    }, []).sort((a,b) => (a.hybrids.length < b.hybrids.length) ? 1:-1),
    avgMpgByYearAndHybrid: mpg_data.reduce(function(prev, obj) {
        let key = obj.year
        if (!prev[key]) {
            prev[key] = {
                hybrid: {
                    city: mpg_data.filter((item) => item.year === key).reduce((a,b) => (b.hybrid) ? a+b.city_mpg : a, 0)/
                        mpg_data.filter((item) => item.year === key).filter((item) => item.hybrid).length,
                    highway: mpg_data.filter((item) => item.year === key).reduce((a,b) => (b.hybrid) ? a+b.highway_mpg : a, 0)/
                        mpg_data.filter((item) => item.year === key).filter((item) => item.hybrid).length
                },
                notHybrid: {
                    city: mpg_data.filter((item) => item.year === key).reduce((a,b) => (!b.hybrid) ? a+b.city_mpg : a, 0)/
                        mpg_data.filter((item) => item.year === key).filter((item) => !item.hybrid).length,
                    highway: mpg_data.filter((item) => item.year === key).reduce((a,b) => (!b.hybrid) ? a+b.highway_mpg : a, 0)/
                        mpg_data.filter((item) => item.year === key).filter((item) => !item.hybrid).length
                }
            }
        }
        return prev
    }, {})
};
