angular.module('angular-form-ui').
    /**
     * <select-box ng-model="model.property" options="models" obj-label="name" opt-exp="t.name for t in options"></select-box>
     * Required attribute: ng-model="[expression]"
     * Required attribute: opt-exp="[comprehension_expression]"
     * Optional attribute: obj-label="xxxx" (used if ng-model is an object)
     * Optional attribute: name="xxxx"
     * Optional attribute: label="xxxx" (used if ng-model is undefined or null)
     *
     */
    directive('selectBox', function () {
        return {
            replace: true,
            restrict: 'E',
            scope: false,
            template: function (el, attrs) {
                if (!angular.isDefined(attrs.label)) {
                    attrs.label = "";
                }
                if (!angular.isDefined(attrs.optExp)) {
                    throw new Error("A comprehension expression must be defined with the attribute optExp for selectBox");
                }
                var html = '<div class="ngSelectBox' + ((angular.isDefined(attrs.class)) ? ' ' + attrs.class : '') + '">' +
                        '<span>{{ selectedOption || "' + attrs.label + '" }}</span>' +
                        '<select ng-model="' + attrs.ngModel + '" ng-options="' + attrs.optExp + '"' + ((attrs.required) ? ' required' : '') + '' + ((angular.isDefined(attrs.id)) ? ' id="'+attrs.id+'"' : '') + '' + ((attrs.name) ? ' name="' + attrs.name + '"' : '') + '></select>' +
                    '</div>';
                return html;
            },
            link: function(scope, element, attrs) {
                scope.$watch(attrs.ngModel, function () {
                    var select = element[0].children[1];
                    //when value changes, update the selectBox text)
                    if (angular.isElement(element[0].firstChild) && angular.isDefined(select.options[select.selectedIndex])) {
                        scope.selectedOption = angular.element(select.options[select.selectedIndex]).text();
                    }
                });
            }
        };
    });