/* -------------------------- */
/* Project  : Tech Blog       */
/* File     : helpers.js      */
/* Author   : Vicente Garcia  */
/* Date     : 05/06/2022      */
/* Modified : 05/10/2022      */
/* -------------------------- */
// Methods to get differents formats
module.exports = {
    format_date: date => {
        return `${new Date(date).getMonth() + 1}/${new Date(date).getDate()}/${new Date(
            date
        ).getFullYear()}`;
    },
    format_plural: (word, amount) => {
        if (amount !== 1) {
          return `${word}s`;
        }
        return word;
    }
}