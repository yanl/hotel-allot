var app = angular.module('demoApp',['ui'] ); //, ['ui']

app.value('ui.config', {
   select2: {
      allowClear: true
   }
});