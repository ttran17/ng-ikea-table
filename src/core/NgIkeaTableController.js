(function() {

    /**
     * @description
     * Here be dragons.
     *
     * @type {Object} vm.teunSort
     *      angular's built in orderBy filter for sorting lacks capability for multiple reverse
     *      so use microlibrary by Teun Duynstee {@link https://github.com/teun} instead
     *
     * @type {Array} vm.rows
     *      the underlying array for the table
     *
     * @type {Array} vm.renderableRows
     *      the array that is actually rendered on-screen in the table
     *
     * @type {{columns: {}, predicates: Array}} vm.sortable
     *      columns is an objec that holds column-specific state & info
     *      predicates is the current (modifiable) list of predicates used to sort 'vm.rows'
     *
     * @param $log
     * @param teunSort
     * @constructor
     */
    var NgIkeaTableController = function($log, teunSort) {
        var vm = this;

        vm.$log = $log.getLogger ? $log.getLogger('NgIkeaTableController') : $log;

        vm.teunSort = teunSort;

        vm.rows = [];

        vm.renderableRows = [];

        vm.sortable = {
            columns: {},
            predicates: []
        };
    };

    /**
     * For use with ng-click (e.g. ng-click="controller.sort($event, 'col0')").
     * Sorts the column whose key is 'column0'. If specified sorts using predicate0 else
     * sorts by default predicate if specified otherwise sorts by property 'column0'
     *
     * @param {Object} event jquery $event object
     * @param {string} column0 name of column to sort
     * @param {(string|Function)} predicate0 string or function used for sorting column0
     */
    NgIkeaTableController.prototype.sort = function(event, column0, predicate0) {
        var vm = this;

        if (arguments.length < 2) {
            vm.$log.warn("Calling sort without any column arg is a no-op.");
            return;
        }
        if (typeof column0 !== 'string') {
            vm.$log.warn("Calling sort without specifying a column arg is a no-op.");
            return;
        }
        var noop = true;
        angular.forEach(vm.sortable.columns, function(value, key) {
            if (key === column0) {
                noop = false;
            }
        });
        if (noop) {
            vm.$log.warn("Calling sort with an unknown column arg is a no-op.");
            return;
        }

        predicate0 = predicate0 || (vm.sortable.columns[column0] ? (vm.sortable.columns[column0].predicate || column0) : column0);

        if (!(event.shiftKey || event.ctrlKey)) {
            vm.sortable.predicates = [];
            angular.forEach(vm.sortable.columns, function(value,key) {
                if (key !== column0) {
                    value.direction = undefined;
                    value.class = {
                        "sorting": true,
                        "sorting_asc": false,
                        "sorting_desc": false
                    }
                }
            });
        }

        vm.sortable.columns[column0].direction = !vm.sortable.columns[column0].direction;
        vm.sortable.columns[column0].class = {
            "sorting": false,
            "sorting_asc": vm.sortable.columns[column0].direction,
            "sorting_desc": !vm.sortable.columns[column0].direction
        };

        vm.sortable.predicates = vm.sortable.predicates.filter(function(d) {
            return d.column !== column0;
        });
        vm.sortable.predicates.push({
            column: column0,
            predicate: predicate0,
            descending: vm.sortable.columns[column0].direction ? 1 : -1
        });

        var s;
        vm.sortable.predicates.forEach(function(d,i) {
            if (i > 0) {
                s = s.thenBy(d.predicate, d.descending);
            } else {
                s = vm.teunSort.firstBy(d.predicate, d.descending);
            }
        });
        vm.rows.sort(s);
    };

    /**
     * Convenience method.
     *
     * @returns {{direction: undefined, class: {sorting: boolean, sorting_asc: boolean, sorting_desc: boolean}}}
     */
    NgIkeaTableController.prototype.initSortStatus = function() {
        return {
            direction: undefined,
            class: {
                "sorting": true,
                "sorting_asc": false,
                "sorting_desc": false
            }
        }
    };

    ///////////////////////////////////////////////////////////////
     // Begin: define controller via angular controller service
     //

    NgIkeaTableController.$inject = ['$log','teunSort'];

    angular.module('ng.ikeaTable.core')
        .controller('NgIkeaTableController',NgIkeaTableController);

     //
     // End: define controller
    ///////////////////////////////////////////////////////////////
})();