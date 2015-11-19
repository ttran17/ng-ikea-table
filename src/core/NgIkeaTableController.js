(function() {

    /**
     * @description
     * Here be dragons.
     *
     * @type {Object} this.teunSort
     *      angular's built in orderBy filter for sorting lacks capability for multiple reverse
     *      so use microlibrary by Teun Duynstee {@link https://github.com/teun} instead
     *
     * @type {Array} this.rows
     *      the underlying array for the table
     *
     * @type {Array} this.renderableRows
     *      the array that is actually rendered on-screen in the table
     *
     * @type {{columns: {}, predicates: Array}} this.sortable
     *      columns is an objec that holds column-specific state & info
     *      predicates is the current (modifiable) list of predicates used to sort 'this.rows'
     *
     * @param $log
     * @param teunSort
     * @constructor
     */
    var NgIkeaTableController = function($log, teunSort) {
        this.$log = $log.getLogger ? $log.getLogger('NgIkeaTableController') : $log;

        this.teunSort = teunSort;

        this.rows = [];

        this.renderableRows = [];

        this.sortable = {
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
        if (arguments.length < 2) {
            this.$log.warn("Calling sort without any column arg is a no-op.");
            return;
        }
        predicate0 = predicate0 || (this.sortable.columns[column0] ? (this.sortable.columns[column0].predicate || column0) : column0);

        if (!(event.shiftKey || event.ctrlKey)) {
            this.sortable.predicates = [];
        }
        this.sortable.predicates.push(predicate0);

        var self = this;
        var s;
        this.sortable.predicates.forEach(function(p,i) {
            if (i === 0) {
                s = self.teunSort.firstBy(p);
            } else {
                s = s.thenBy(p);
            }
        });

        this.$log.debug("predicates",this.sortable.predicates);
        this.$log.debug("s",s);

        this.rows.sort(s);
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