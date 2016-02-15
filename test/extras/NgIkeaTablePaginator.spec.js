describe('NgIkeaTablePaginator', function() {
    var vm;
    var $log;
    var cityData;
    var noop = function() {};

    beforeEach(module('ng.ikeaTable.extras'));

    beforeEach(inject(function(_$controller_, _$log_) {
        var $controller = _$controller_;
        $log = _$log_;

        vm = $controller('NgIkeaTablePaginator', {$log: $log, $controller: $controller});

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

    describe('pagination controller', function() {
        it('should have a setRows function', function() {
            console.log("vm is", vm);
            vm.setRows(cityData);
            expect(vm.rows[0].id).toBe(7);
        })
    });
});