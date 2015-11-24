angular.module('ng.ikeaTable.example.bjursta')
    .directive('bjurstaTableDx',[function() {
        return {
            restrict: 'EA',
            scope: {},
            controller: 'NgIkeaTableController',
            controllerAs: 'vm',
            templateUrl: 'bjurstaDx.html',
            link: function(scope, iElem, iAttrs) {
                var rows = [
                    {name: 'Évariste Galois', age: 20, nationality: 'French', canon: 'Galois Theory', death: 'untimely'},
                    {name: 'Józef Marcinkiewicz', age: 30, nationality: 'Polish', canon: 'Marcinkiewicz interpolation theorem', death: 'untimely'},
                    {name: 'Niels Abel', age: 26, nationality: 'Norwegian', canon: 'abelian', death: 'untimely'},
                    {name: 'Alexander Grothendieck', age: 86, nationality: 'French', canon: 'Fields Medal', death: 'natural'},
                    {name: 'Stanislaw Ulam', age: 75, nationality: 'Polish', canon: 'Borsuk-Ulam Theorem', death: 'natural'},
                    {name: 'Atle Selberg', age: 90, nationality: 'Norwegian', canon: 'Fields Medal', death: 'natural'}
                ];

                var vm = scope.vm;
                var fm = scope.fm = {};

                vm.setRows(rows);

                // Override prototype definition
                vm.setIconClass = function(sorting, sorting_asc, sorting_desc) {
                    return {
                        "fa fa-sort": sorting,
                        "fa fa-sort-asc": sorting_asc,
                        "fa fa-sort-desc": sorting_desc
                    }
                };

                vm.initSortStatus('name');
                vm.initSortStatus('age');
                vm.initSortStatus('nationality');
                vm.initSortStatus('canon');
                vm.initSortStatus('death');

                vm.commit();

                vm.applyFilter = function(column0) {
                    vm.setFilter(column0,fm[column0]);
                    vm.filter();
                }
            }
        }
    }]);