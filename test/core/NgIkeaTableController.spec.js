describe('NgIkeaTableController', function() {
    var controller;
    var $log;
    var teunSort;
    var cityData;
    var noop = function() {};

    beforeEach(module('ng.ikeaTable.core'));

    beforeEach(inject(function(_$controller_, _$log_, _teunSort_) {
        var $controller = _$controller_;
        $log = _$log_;
        teunSort = _teunSort_;

        spyOn($log,'warn');

        controller = $controller('NgIkeaTableController', {$log: $log, teunSort: teunSort});

        cityData = [
            { id: 7, name:  "Amsterdam", population: 750000, country: "Netherlands" },
            { id: 12, name: "The Hague", population: 450000, country: "Netherlands" },
            { id: 43, name: "Rotterdam", population: 600000, country: "Netherlands" },
            { id: 5, name:  "Berlin", population: 3000000, country: "Germany" },
            { id: 42, name: "Düsseldorf", population: 550000, country: "Germany" },
            { id: 44, name: "Stuttgard", population: 600000, country: "Germany" }
        ];

        controller.rows = cityData;
    }));

    describe('sort function', function() {
        it('should be a noop if no column name is specified', function() {
            controller.sort({});
            expect($log.warn).toHaveBeenCalledWith("Calling sort without any column arg is a no-op.");
        });
        it('should sort by property name', function() {
            controller.sort({}, 'id');
            expect(cityData[1].name).toBe("Amsterdam");
            expect(cityData[4].name).toBe("Rotterdam");
        });
        it('should sort by unary function', function() {
            controller.sort({}, function(v) {return v.id});
            expect(cityData[1].name).toBe("Amsterdam");
            expect(cityData[4].name).toBe("Rotterdam");
        });
        it('should sort by function', function() {
            controller.sort({}, function(v1, v2) {return v1.id - v2.id});
            expect(cityData[1].name).toBe("Amsterdam");
            expect(cityData[4].name).toBe("Rotterdam");
        });
        it('should sort by multiple columns if event.shiftKey is true', function() {
            controller.sort({}, 'country');
            controller.sort({shiftKey: true}, 'population');
            expect(cityData[0].name).toBe("Düsseldorf");
            expect(cityData[5].name).toBe("Amsterdam");
        });
        it('should sort by multiple columns if event.ctrlKey is true', function() {
            controller.sort({}, 'country');
            controller.sort({ctrlKey: true}, 'population');
            expect(cityData[0].name).toBe("Düsseldorf");
            expect(cityData[5].name).toBe("Amsterdam");
        });
        it('should go back to sorting by single column if event.shiftKey is true then false', function() {
            controller.sort({}, 'country');
            controller.sort({ctrlKey: true}, 'population');
            expect(cityData[0].name).toBe("Düsseldorf");
            expect(cityData[5].name).toBe("Amsterdam");
            controller.sort({}, 'id');
            expect(cityData[0].name).toBe("Berlin");
            expect(cityData[5].name).toBe("Stuttgard");
        });
    });
});