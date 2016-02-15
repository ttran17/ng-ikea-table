(function() {

    /**
     * @description
     * Here be Ancalagon's kin.
     *
     */
    var NgIkeaTablePaginator = function($log, $controller) {
        var parentController = $controller('NgIkeaTableController');

        var vm = this;

        angular.extend(vm, parentController, Object.getPrototypeOf(parentController));

        vm.$log = $log.getLogger ? $log.getLogger('NgIkeaTablePaginator') : $log;

        vm.renderableRows = [];

        vm.pageInfo = {
            page: 1,
            pages: undefined,
            start: 1,
            end: undefined,
            length: 10,
            recordsTotal: undefined
        }

    };

    NgIkeaTablePaginator.prototype.getRows = function() {
        var vm = this;
        return vm.renderableRows;
    };

    NgIkeaTablePaginator.prototype.paginate = function() {
        var vm = this;

        var begin = (vm.pageInfo.page-1)*vm.pageInfo.length;
        var end = begin + vm.pageInfo.length;
        vm.renderableRows = vm.renderableRows.slice(begin,end);

        vm.pageInfo.start = begin + 1;
        vm.pageInfo.end = begin + vm.renderableRows.length;

        vm.pageInfo.recordsTotal = vm.rows.length;
    };

    ///////////////////////////////////////////////////////////////
    // Begin: define controller via angular controller service
    //

    NgIkeaTablePaginator.$inject = ['$log', '$controller'];

    angular.module('ng.ikeaTable.extras')
        .controller('NgIkeaTablePaginator', NgIkeaTablePaginator);

    //
    // End: define controller
    ///////////////////////////////////////////////////////////////
})();