describe('NgIkeaTableController', function() {
    var vm;
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

        vm = $controller('NgIkeaTableController', {$log: $log, teunSort: teunSort});

        cityData = [
            { id: 7, name:  "Amsterdam", population: 750000, country: "Netherlands" },
            { id: 12, name: "The Hague", population: 450000, country: "Netherlands" },
            { id: 43, name: "Rotterdam", population: 600000, country: "Netherlands" },
            { id: 5, name:  "Berlin", population: 3000000, country: "Germany" },
            { id: 42, name: "Düsseldorf", population: 550000, country: "Germany" },
            { id: 44, name: "Stuttgard", population: 600000, country: "Germany" }
        ];

        vm.rows = cityData;

        vm.sortable.columns = {
            'id': {direction: undefined},
            'name': {direction: undefined},
            'population': {direction: undefined},
            'country': {direction: undefined}
        }
    }));

    describe('sort function', function() {
        it('should be a noop if missing or incorrect column name is specified', function() {
            vm.sort({});
            expect($log.warn).toHaveBeenCalledWith("Calling sort without any column arg is a no-op.");
            vm.sort({}, function(v) {return v.id});
            expect($log.warn).toHaveBeenCalledWith("Calling sort without specifying a column arg is a no-op.");
            vm.sort({},'foobar');
            expect($log.warn).toHaveBeenCalledWith("Calling sort with an unknown column arg is a no-op.");
        });
        it('should sort by property name', function() {
            vm.sort({}, 'id');
            expect(vm.sortable.columns['id'].direction).toBe(true);
            expect(vm.sortable.columns['id'].class["glyphicon glyphicon-minus"]).toBe(false);
            expect(vm.sortable.columns['id'].class["glyphicon glyphicon-chevron-up"]).toBe(true);
            expect(cityData[1].name).toBe("Amsterdam");
            expect(cityData[4].name).toBe("Rotterdam");
        });
        it('should sort by unary function', function() {
            vm.sort({}, 'id', function(v) {return v.id});
            expect(cityData[1].name).toBe("Amsterdam");
            expect(cityData[4].name).toBe("Rotterdam");
        });
        it('should sort by function', function() {
            vm.sort({}, 'id', function(v1, v2) {return v1.id - v2.id});
            expect(cityData[1].name).toBe("Amsterdam");
            expect(cityData[4].name).toBe("Rotterdam");
        });
        it('should sort by multiple columns if event.shiftKey is true', function() {
            vm.sort({}, 'country');
            vm.sort({shiftKey: true}, 'population');
            expect(cityData[0].name).toBe("Düsseldorf");
            expect(cityData[5].name).toBe("Amsterdam");
        });
        it('should sort by multiple columns if event.ctrlKey is true', function() {
            vm.sort({}, 'country');
            vm.sort({ctrlKey: true}, 'population');
            expect(cityData[0].name).toBe("Düsseldorf");
            expect(cityData[5].name).toBe("Amsterdam");
        });
        it('should go back to sorting by single column if event.shiftKey is true then false', function() {
            vm.sort({}, 'country');
            vm.sort({ctrlKey: true}, 'population');
            expect(cityData[0].name).toBe("Düsseldorf");
            expect(cityData[5].name).toBe("Amsterdam");
            vm.sort({}, 'id');
            expect(cityData[0].name).toBe("Berlin");
            expect(cityData[5].name).toBe("Stuttgard");
        });
        it('should sort by property name ascending; then by property name descending', function() {
            vm.sort({}, 'id');
            expect(vm.sortable.columns['id'].direction).toBe(true);
            expect(cityData[1].name).toBe("Amsterdam");
            expect(cityData[4].name).toBe("Rotterdam");
            vm.sort({}, 'id');
            expect(vm.sortable.columns['id'].direction).toBe(false);
            expect(cityData[4].name).toBe("Amsterdam");
            expect(cityData[1].name).toBe("Rotterdam");
        });
        it('should sort by property name ascending; then by property name descending when event.shiftKey is true', function() {
            vm.sort({}, 'id');
            expect(vm.sortable.columns['id'].direction).toBe(true);
            expect(vm.sortable.columns['id'].class["glyphicon glyphicon-minus"]).toBe(false);
            expect(vm.sortable.columns['id'].class["glyphicon glyphicon-chevron-up"]).toBe(true);
            expect(cityData[1].name).toBe("Amsterdam");
            expect(cityData[4].name).toBe("Rotterdam");
            vm.sort({shiftKey: true}, 'id');
            expect(vm.sortable.columns['id'].direction).toBe(false);
            expect(vm.sortable.columns['id'].class["glyphicon glyphicon-minus"]).toBe(false);
            expect(vm.sortable.columns['id'].class["glyphicon glyphicon-chevron-down"]).toBe(true);
            expect(cityData[4].name).toBe("Amsterdam");
            expect(cityData[1].name).toBe("Rotterdam");
        });
        it('should sort by id ascending; then by name ascending', function() {
            vm.sort({}, 'id');
            expect(vm.sortable.columns['id'].direction).toBe(true);
            expect(cityData[1].name).toBe("Amsterdam");
            expect(cityData[4].name).toBe("Rotterdam");
            vm.sort({}, 'name');
            expect(vm.sortable.columns['name'].direction).toBe(true);
            expect(cityData[1].name).toBe("Berlin");
            expect(cityData[5].name).toBe("The Hague");
        });
        it('should sort by country then population; finally by population then descending country', function() {
            vm.sort({}, 'country');
            expect(vm.sortable.columns['country'].direction).toBe(true);
            expect(vm.sortable.columns['country'].class["glyphicon glyphicon-minus"]).toBe(false);
            expect(vm.sortable.columns['country'].class["glyphicon glyphicon-chevron-down"]).toBe(false);
            vm.sort({shiftKey: true}, 'population');
            expect(cityData[0].name).toBe("Düsseldorf");
            expect(cityData[5].name).toBe("Amsterdam");
            expect(vm.sortable.columns['country'].direction).toBe(true);
            expect(vm.sortable.columns['country'].class["glyphicon glyphicon-minus"]).toBe(false);
            expect(vm.sortable.columns['country'].class["glyphicon glyphicon-chevron-down"]).toBe(false);
            vm.sort({shiftKey: true}, 'country');
            expect(cityData[0].name).toBe("The Hague");
            expect(cityData[2].name).toBe("Rotterdam");
            expect(cityData[3].name).toBe("Stuttgard");
            expect(vm.sortable.columns['country'].direction).toBe(false);
            expect(vm.sortable.columns['country'].class["glyphicon glyphicon-minus"]).toBe(false);
            expect(vm.sortable.columns['country'].class["glyphicon glyphicon-chevron-down"]).toBe(true);
        });
    });
});