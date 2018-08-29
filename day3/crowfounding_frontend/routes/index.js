var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Decentralized Kickstarter', active: 'home' });
});

router.get('/create', function(req, res, next) {
  res.render('create', { active: 'create' });
});

router.get('/projects', function(req, res, next) {
  res.render('projects', { active: 'projects' });
});

router.get('/projects/:id', function(req, res, next) {
  res.render('projectDetails', { active: 'projects', id: req.param('id') });
});

module.exports = router;
