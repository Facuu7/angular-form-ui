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
                var labelBind = attrs.ngModel;
                if (angular.isDefined(attrs.objLabel)) {
                    labelBind += "['" + attrs.objLabel + "']";
                }
                if (!angular.isDefined(attrs.optExp)) {
                    throw new Error("A comprehension expression must be defined with the attribute optExp for selectBox");
                }
                var html = '<div class="ngSelectBox' + ((angular.isDefined(attrs.class)) ? ' ' + attrs.class : '') + '">' +
                        '<span>{{ ' + labelBind + ' || "' + attrs.label + '" }}</span>' +
                        '<select ng-model="' + attrs.ngModel + '" ng-options="' + attrs.optExp + '"' + ((attrs.required) ? ' required' : '') + '' + ((angular.isDefined(attrs.id)) ? ' id="'+attrs.id+'"' : '') + '' + ((attrs.name) ? ' name="' + attrs.name + '"' : '') + '></select>' +
                    '</div>';
                return html;
            }
        };
    });