var App=angular.module('app', ['ngMaterial']);
App.controller("HomeController",['$scope','$mdDialog',function($scope,$mdDialog){
    const {BrowserWindow} = require('electron').remote;

    $scope.page={
        title:"Test2"
    };
    this.openMenu = function($mdMenu, ev) {
      originatorEv = ev;
      $mdMenu.open(ev);
    };

    this.notificationsEnabled = true;
    this.toggleNotifications = function() {
      this.notificationsEnabled = !this.notificationsEnabled;
    };

    this.redial = function() {
      $mdDialog.show(
        $mdDialog.alert()
          .targetEvent(originatorEv)
          .clickOutsideToClose(true)
          .parent('body')
          .title('Suddenly, a redial')
          .textContent('You just called a friend; who told you the most amazing story. Have a cookie!')
          .ok('That was easy')
      );

      originatorEv = null;
    };
    
    this.checkVoicemail = function() {
      // This never happens.
    };
    this.close=function(){
        var window = BrowserWindow.getFocusedWindow();
                    window.close();
    }

}]);