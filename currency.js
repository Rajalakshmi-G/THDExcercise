/* Angular module definition */
var app = angular.module("myApp", []);

/* Sets the currency select field values */
function getCurrencies() {
    var a =
        [{
            currency: 'CAD',
            value: 1
        },
        {
            currency: 'USD',
            value: 0.015
        },
        {
            currency: 'EUR',
            value: 0.014
        }];
    return a;
}

/* Angular controllers definition */
app.controller('CurrencyConverter', function ($scope, $filter) {
    $scope.currencies = getCurrencies();
    $direction = 0;

    /* Currency convert function goes here */
    $scope.convert = function (from, to, amount) {
        var fromFound = $filter('filter')($scope.currencies, { currency: from }, true);
        var toFound = $filter('filter')($scope.currencies, { currency: to }, true);
        var IndianAmount = 0;
        if (fromFound.length)
            IndianAmount = amount / fromFound[0].value;
        var toAmount = toFound[0].value * IndianAmount
        return toAmount;
    }

    /* Target to the currency converted amount goes here */
    $scope.updateTarget = function () {
        $scope.to.amount =
            $scope.convert(
                $scope.from.selectedcurrency.currency,
                $scope.to.selectedcurrency.currency,
                $scope.from.amount)
        if ($scope.to.amount == 0)
            $scope.to.amount = '';
    }

    /* Target to the currency amount goes here */
    $scope.updateSource = function () {
        $scope.from.amount =
            $scope.convert(
                $scope.to.selectedcurrency.currency,
                $scope.from.selectedcurrency.currency,
                $scope.to.amount)
        if ($scope.from.amount == 0)
            $scope.from.amount = '';
    }

    $scope.from = { selectedcurrency: $scope.currencies[0] };

    $scope.to = { selectedcurrency: $scope.currencies[1] };

    /* Enter the currency value goes here */
    $scope.$watch('from.amount', function (newValue, oldValue) {
        if ($scope.direction == 0)
            $scope.updateTarget();
    });

    $scope.$watch(function () {
        return $scope.from.selectedcurrency.currency;
    }, function (newValue, oldValue) {
        if ($scope.direction == 0)
            $scope.updateTarget();
    });

    /* Get the currency converted value goes here */
    $scope.$watch(function () {
        return $scope.to.selectedcurrency.currency;
    }, function (newValue, oldValue) {
        if ($scope.direction == 0)
            $scope.updateTarget();
    });

    $scope.$watch(function () {
        return $scope.to.amount;
    }, function (newValue, oldValue) {
        if ($scope.direction == 1)
            $scope.updateSource();
    });
});

/* Define the html template directive */
app.directive('currencycontrol', function () {
    return {
        scope: {
            currencyobject: '=',
            currencies: '=',
            direction: '=',
            source: '='
        },

        restrict: "E",

        templateUrl: "currencycontrol.html",

        controller: function ($scope) {
            $scope.changeDirection = function (source) {
                if (source == 0) {
                    $scope.direction = 1;
                }
                else {
                    $scope.direction = 0;
                }
            }
        }
    };
});
