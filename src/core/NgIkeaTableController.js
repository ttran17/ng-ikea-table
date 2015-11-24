(function() {

    /**
     * @description
     * Here be dragons.
     *
     * @type {Object} vm.teunSort
     *      angular's built in orderBy filter for sorting lacks capability for multiple reverse
     *      so use microlibrary by Teun Duynstee {@link https://github.com/teun} instead
     *
     * @type {Array} vm.originalRows
     *      the underlying array for the table
     *
     * @type {Array} vm.rows
     *      the workspace array for sorting and filtering
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

        vm.originalRows = [];

        vm.rows = [];

        vm.renderableRows = [];

        vm.sortable = {
            columns: {},
            predicates: []
        };
    };

    NgIkeaTableController.prototype.setRows = function(rows0) {
        var vm = this;
        vm.originalRows = [].concat(rows0);
        vm.rows = [].concat(rows0);
    };

    /**
     * Commits changes to renderable rows.
     */
    NgIkeaTableController.prototype.commit = function() {
        var vm = this;
        vm.renderableRows = vm.rows;
    };

    /**
     * For use with ng-click (e.g. ng-click="controller.sort($event, 'col0')").
     * Sorts the column whose key is 'column0'. If specified sorts using predicate0 else
     * sorts by default predicate if specified otherwise sorts by property 'column0'
     *
     * @param {Object} event - jquery $event object
     * @param {string} column0 - name of column to sort
     * @param {(string|Function)} [predicate0] - string or function used for sorting column0
     */
    NgIkeaTableController.prototype.sort = function(event, column0, predicate0) {
        var vm = this;

        if (!isColumnArgDefined(vm, column0)) {
            return;
        }

        predicate0 = predicate0 || (vm.sortable.columns[column0] ? (vm.sortable.columns[column0].predicate || column0) : column0);

        if (!(event.shiftKey || event.ctrlKey)) {
            vm.sortable.predicates = [];
            angular.forEach(vm.sortable.columns, function(value,key) {
                if (key !== column0) {
                    value.direction = undefined;
                    value.class = vm.setIconClass(true, false, false, key);
                }
            });
        }

        vm.sortable.columns[column0].direction = !vm.sortable.columns[column0].direction;
        vm.sortable.columns[column0].class = vm.setIconClass(false, vm.sortable.columns[column0].direction, !vm.sortable.columns[column0].direction, column0);

        vm.sortable.predicates = vm.sortable.predicates.filter(function(d) {
            return d.column !== column0;
        });
        vm.sortable.predicates.push({
            column: column0, // TODO: why is this needed?
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

        vm.commit();
    };

    /**
     * Private method. Probably overkill.
     *
     * @param {Object} vm - ViewModel
     * @param {string} column0
     * @returns {boolean}
     */
    var isColumnArgDefined = function(vm, column0) {
        if (column0 === undefined) {
            vm.$log.warn("Calling sort without any column arg is a no-op.");
            return false;
        }
        if (typeof column0 !== 'string') {
            vm.$log.warn("Calling sort without specifying a column arg is a no-op.");
            return false;
        }
        var noop = true;
        angular.forEach(vm.sortable.columns, function(value, key) {
            if (key === column0) {
                noop = false;
            }
        });
        if (noop) {
            vm.$log.warn("Calling sort with an unknown column arg is a no-op.");
            return false;
        }

        return true;
    };

    /**
     * Convenience method.
     */
    NgIkeaTableController.prototype.initSortStatus = function(column0) {
        var vm = this;
        vm.sortable.columns[column0] = {
            direction: undefined,
            class: vm.setIconClass(true, false, false, column0)
        };
    };

    /**
     * Convenience method. Users should override this method to return their preferred icons.
     *
     * @param {boolean} sorting - display 'sorting available' icon if true
     * @param {boolean} sorting_asc - display 'sort ascending' icon if true
     * @param {boolean} sorting_desc - display 'sort descending' icon if true
     * @param {string} [column0] - hook to allow users to specify column-specific icon
     *
     * @returns {{glyphicon glyphicon-minus: boolean, glyphicon glyphicon-chevron-up: boolean, glyphicon glyphicon-chevron-down: boolean}}
     */
    NgIkeaTableController.prototype.setIconClass = function(sorting, sorting_asc, sorting_desc, column0) {
        return {
            "glyphicon glyphicon-minus": sorting,
            "glyphicon glyphicon-chevron-up": sorting_asc,
            "glyphicon glyphicon-chevron-down": sorting_desc
        }
    };

    /**
     * Convenience method.
     *
     * @param {string} column0
     * @returns {string}
     */
    NgIkeaTableController.prototype.getIconClass = function(column0) {
        var vm = this;
        return vm.sortable.columns[column0].class;
    };

    ///////////////////////////////////////////////////////////////
     // Begin: define controller via angular controller service
     //

    NgIkeaTableController.$inject = ['$log', 'teunSort'];

    angular.module('ng.ikeaTable.core')
        .controller('NgIkeaTableController', NgIkeaTableController);

     //
     // End: define controller
    ///////////////////////////////////////////////////////////////
})();