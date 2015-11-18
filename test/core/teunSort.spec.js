/**
 * These unit tests are taken directly from teun @ https://github.com/Teun/thenBy.js/blob/master/tests/thenby.tests.js
 *
 * Instead of mocha & chai we've translated them to use karma & jasmine. That is all. No credit or warranties, expressed or implied,
 * should be inferred.
 */

describe('teunSort', function() {
    var teunSort;
    var cityData;

    beforeEach(module('ng.ikeaTable.core'));
    beforeEach(inject(function(_teunSort_) {
        teunSort = _teunSort_
    }));
    beforeEach(function() {
        cityData = [
            { id: 7, name:  "Amsterdam", population: 750000, country: "Netherlands" },
            { id: 12, name: "The Hague", population: 450000, country: "Netherlands" },
            { id: 43, name: "Rotterdam", population: 600000, country: "Netherlands" },
            { id: 5, name:  "Berlin", population: 3000000, country: "Germany" },
            { id: 42, name: "Düsseldorf", population: 550000, country: "Germany" },
            { id: 44, name: "Stuttgard", population: 600000, country: "Germany" }
        ];
    });

    it('should have a "firstBy" function', function() {
        expect(teunSort.firstBy).toBeDefined();
    });

    describe('sorting with functions', function() {
        it('should sort by country, then by population', function () {
            var s = teunSort.firstBy(function (v1, v2) { return v1.country < v2.country ? -1 : (v1.country > v2.country ? 1 : 0); })
                .thenBy(function (v1, v2) { return v1.population - v2.population; });
            cityData.sort(s);
            expect(cityData[5].name).toBe("Amsterdam");
            expect(cityData[0].name).toBe("Düsseldorf");
        });
        it('should sort by country, then by population, using unary functions', function() {
            var s = teunSort.firstBy(function(v) { return v.country; })
                .thenBy(function(v) { return v.population; });
            cityData.sort(s);
            expect(cityData[5].name).toBe("Amsterdam");
            expect(cityData[0].name).toBe("Düsseldorf");
        });
        it('should sort by length of name, then by population, then by ID', function () {
            var s = teunSort.firstBy(function (v1, v2) { return v1.name.length - v2.name.length; })
                .thenBy(function (v1, v2) { return v1.population - v2.population; })
                .thenBy(function (v1, v2) { return v1.id - v2.id; });
            cityData.sort(s);
            // shortest name
            expect(cityData[0].name).toBe("Berlin");
            // longest name
            expect(cityData[5].name).toBe("Düsseldorf");

            // expect Stutgard just after Rotterdam, same name length, same population, higher ID
            expect(cityData[2].name).toBe("Rotterdam");
            expect(cityData[3].name).toBe("Stuttgard");
        });
        it('should sort by length of name, then by population, then by ID, using unary functions', function () {
            var s = teunSort.firstBy(function (v) { return v.name.length; })
                .thenBy(function (v) { return v.population; })
                .thenBy(function (v) { return v.id; });
            cityData.sort(s);
            // shortest name
            expect(cityData[0].name).toBe("Berlin");
            // longest name
            expect(cityData[5].name).toBe("Düsseldorf");

            // expect Stutgard just after Rotterdam, same name length, same population, higher ID
            expect(cityData[2].name).toBe("Rotterdam");
            expect(cityData[3].name).toBe("Stuttgard");
        });
    });

    describe('sorting with property names', function () {
        it('should sort by country, then by population', function () {
            var s = teunSort.firstBy("country")
                .thenBy("population");
            cityData.sort(s);
            expect(cityData[5].name).toBe("Amsterdam");
            expect(cityData[0].name).toBe("Düsseldorf");
        });
        it('should sort by country desc, then by population', function () {
            var s = teunSort.firstBy("country", -1)
                .thenBy("population");
            cityData.sort(s);
            expect(cityData[5].name).toBe("Berlin");
            expect(cityData[0].name).toBe("The Hague");
        });
        it('should sort by country, then by population desc', function () {
            var s = teunSort.firstBy("country")
                .thenBy("population", -1);
            cityData.sort(s);
            expect(cityData[5].name).toBe("The Hague");
            expect(cityData[0].name).toBe("Berlin");
        });
    });

    describe('sorting with functions and property names together', function () {
        it('should sort by name length, then by population', function () {
            var s = teunSort.firstBy(function (v1, v2) { return v1.name.length - v2.name.length; })
                .thenBy("population");
            cityData.sort(s);
            expect(cityData[0].name).toBe("Berlin");
            expect(cityData[5].name).toBe("Düsseldorf");
        });
        it('should sort by name length using a unary function, then by population', function () {
            var s = teunSort.firstBy(function (v) { return v.name.length; })
                .thenBy("population");
            cityData.sort(s);
            expect(cityData[0].name).toBe("Berlin");
            expect(cityData[5].name).toBe("Düsseldorf");
        });
        it('should sort by name length desc, then by population', function () {
            var s = teunSort.firstBy(function (v1, v2) { return v1.name.length - v2.name.length; }, -1)
                .thenBy("population");
            cityData.sort(s);
            expect(cityData[4].name).toBe("Amsterdam");
            expect(cityData[1].name).toBe("The Hague");
        });
        it('should sort by name length desc using a unary function, then by population', function () {
            var s = teunSort.firstBy(function (v) { return v.name.length; }, -1)
                .thenBy("population");
            cityData.sort(s);
            expect(cityData[4].name).toBe("Amsterdam");
            expect(cityData[1].name).toBe("The Hague");
        });
        it('should sort by name length, then by population desc', function () {
            var s = teunSort.firstBy(function (v1, v2) { return v1.name.length - v2.name.length; })
                .thenBy("population", -1);
            cityData.sort(s);
            expect(cityData[4].name).toBe("The Hague");
            expect(cityData[1].name).toBe("Amsterdam");
        });
        it('should sort by name length using a unary function, then by population desc', function () {
            var s = teunSort.firstBy(function (v) { return v.name.length; })
                .thenBy("population", -1);
            cityData.sort(s);
            expect(cityData[1].name).toBe("Amsterdam");
            expect(cityData[4].name).toBe("The Hague");
        });
    });
});


