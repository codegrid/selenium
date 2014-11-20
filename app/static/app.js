(function() {

var app = angular.module('app', ['ngResource']);

app.controller('MainCtrl', function($scope, $window, $resource) {
  var Todo = $resource('/todo/:id', { id: '@_id' }, { update: { method: 'PUT' } });
  $scope.todoList = Todo.query();

  $scope.onSubmit = function($event) {
    $event.preventDefault();

    var todo = new Todo();
    todo.text = $scope.text;
    todo.$save().then(function() {
      $scope.text = '';
      $scope.todoList.unshift(todo);
    })
    .catch(function(err) {
      alert(err.data.error);
    });
  };

  $scope.onChange = function(todo) {
    todo.$update().catch(function(err) {
      alert(err.data.error);
    });
  };

  $scope.onClickRemove = function(todo) {
    if (!$window.confirm('削除しますか？')) return;

    todo.$delete().then(function() {
      $scope.todoList.splice($scope.todoList.indexOf(todo), 1);
    })
    .catch(function(err) {
      alert(err.data.error);
    });
  };
});

})();
