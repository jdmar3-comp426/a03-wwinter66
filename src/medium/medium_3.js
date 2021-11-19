import mpg_data from "./data/mpg_data.js";

/*
mpg_data is imported for you but that is for testing purposes only. All of the functions should use
a car_data param that is supplied as the first parameter.

As you write these functions notice how they could possibly be chained together to solve more complicated
queries.
 */

/**
 * @param {array} car_data - an instance of mpg_data that should be used for filtering.
 * @param minHorsepower {number}
 * @param minTorque {number}
 *
 * @return {array} An array of car objects with horsepower >= minHorsePower and torque >= minTorque
 * sorted by horsepower in descending order.
 *
 */
export function searchHighPower(car_data, minHorsepower, minTorque) {
    return car_data.filter((item) => item.horsepower >= minHorsepower).
                    filter((item) => item.torque >= minTorque).
                    sort((a,b) => (a.horsepower < b.horsepower) ? 1:-1).
                    sort((a,b) => (a.id > b.id) ? 1:-1);
                    
}


/**
 * @param {array} car_data
 * @param minCity
 * @param minHighway
 *
 *
 * @return {array} An array of car objects with highway_mpg >= minHighway and city_mpg >= minCity
 * sorted by highway_mpg in descending order
 *
 */
export function searchMpg(car_data, minCity, minHighway) {
    return car_data.filter((item) => item.city_mpg >= minCity).
    filter((item) => item.highway_mpg >= minHighway).
    sort((a,b) => (a.highway_mpg < b.highway_mpg) ? 1:-1).
    sort((a,b) => (a.id < b.id) ? 1:-1)
}


/**
 * Find all cars where 'id' contains the search term below.
 * Sort the results so that if the term appears earlier in the string
 * it will appear earlier in the list. Make sure searching and sorting ignores case.
 * @param car_data
 * @param searchTerm A string to that is used for searching
 * @returns {[]} array of cars
 */
export function searchName(car_data, searchTerm) {
    return car_data.filter(function(obj) {
        return obj.id.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1
    }).sort((a,b) => (a.id.indexOf(searchTerm.toLowerCase()) > b.id.indexOf(searchTerm.toLowerCase()) ? 1:-1))
}


/**
 * Find all cars made in the years asked for.
 * Sort the results by year in descending order.
 *
 * @param car_data
 * @param {number[]} years - array of years to be included in the results e.g. [2010, 2012]
 * @returns {[]} an array of car objects
 */
export function searchByYear(car_data, years) {
    let ret = []
    years.forEach((num) => {
        ret.push(car_data.filter((item) => {
            return item.year === num
        }))
    })
    return ret.reduce((prev, curr) => {
        return prev.concat(curr)
    }, []).sort((a, b) => (a.year < b.year) ? 1:-1)
}