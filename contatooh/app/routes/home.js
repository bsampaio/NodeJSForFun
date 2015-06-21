module.exports = function(app) {
  var controller = app.controllers.home;
  app.get('/index', controller.index);
  app.get('/', controller.index);
  app.get('/next', controller.next);
};
