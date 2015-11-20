/**
 * Inspired by the IKEA tärendö.
 */
angular.module('ng.ikeaTable.example.tärendö',['ng.ikeaTable.core'])
    .directive('tärendöTable',['$log', function($log) {
        $log = $log.getLogger ? $log.getLogger('tärendöTable') : $log;

        return {
            restrict: 'EA',
            scope: {},
            controller: 'NgIkeaTableController',
            controllerAs: 'vm',
            templateUrl: 'tärendö.html',
            link: function(scope, iElem, iAttrs) {
                scope.vm.rows = [
                    {name: 'Évariste Galois', age: 20, nationality: 'French', canon: 'Galois Theory', death: 'untimely'},
                    {name: 'Józef Marcinkiewicz', age: 30, nationality: 'Polish', canon: 'Marcinkiewicz interpolation theorem', death: 'untimely'},
                    {name: 'Niels Abel', age: 26, nationality: 'Norwegian', canon: 'abelian', death: 'untimely'},
                    {name: 'Alexander Grothendieck', age: 86, nationality: 'French', canon: 'Fields Medal', death: 'natural'},
                    {name: 'Stanislaw Ulam', age: 75, nationality: 'Polish', canon: 'Borsuk-Ulam Theorem', death: 'natural'},
                    {name: 'Atle Selberg', age: 90, nationality: 'Norwegian', canon: 'Fields Medal', death: 'natural'}
                ]
            }
        }
    }]);