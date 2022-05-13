/* -------------------------- */
/* Project  : Tech Blog       */
/* File     : helpers.test.js */
/* Author   : Vicente Garcia  */
/* Date     : 05/06/2022      */
/* Modified : 05/10/2022      */
/* -------------------------- */
const {format_date, format_plural} = require('../utils/helpers');
test('Check format date', () => {
    const date = new Date('2020-03-20 16:12:03');
    expect(format_date(date)).toBe('3/20/2020');
});
test("Check pluralize", () => {
    expect(format_plural('Point', 2)).toBe('Points');
    expect(format_plural('Point', 1)).toBe('Point');
    expect(format_plural('Comment', 2)).toBe('Comments');
    expect(format_plural('Comment', 1)).toBe('Comment');
});