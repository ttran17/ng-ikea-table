angular.module('ng.ikeaTable.example.bjursta')
    .directive('bjurstaTableFa',[function() {
        return {
            restrict: 'EA',
            scope: {},
            controller: 'NgIkeaTableController',
            controllerAs: 'vm',
            templateUrl: 'bjurstaFa.html',
            link: function(scope, iElem, iAttrs) {
                scope.vm.rows = [
                    {name: 'Évariste Galois', age: 20, nationality: 'French', canon: 'Galois Theory', death: 'untimely'},
                    {name: 'Józef Marcinkiewicz', age: 30, nationality: 'Polish', canon: 'Marcinkiewicz interpolation theorem', death: 'untimely'},
                    {name: 'Niels Abel', age: 26, nationality: 'Norwegian', canon: 'abelian', death: 'untimely'},
                    {name: 'Alexander Grothendieck', age: 86, nationality: 'French', canon: 'Fields Medal', death: 'natural'},
                    {name: 'Stanislaw Ulam', age: 75, nationality: 'Polish', canon: 'Borsuk-Ulam Theorem', death: 'natural'},
                    {name: 'Atle Selberg', age: 90, nationality: 'Norwegian', canon: 'Fields Medal', death: 'natural'}
                ];

                // Override prototype definition
                scope.vm.setIconClass = function(sorting, sorting_asc, sorting_desc) {
                    return {
                        "fa fa-sort": sorting,
                        "fa fa-sort-asc": sorting_asc,
                        "fa fa-sort-desc": sorting_desc
                    }
                };

                scope.vm.sortable.columns = {
                    'name': scope.vm.initSortStatus(),
                    'age': scope.vm.initSortStatus(),
                    'nationality': scope.vm.initSortStatus(),
                    'canon': scope.vm.initSortStatus(),
                    'death': scope.vm.initSortStatus()
                }
            }
        }
    }]);