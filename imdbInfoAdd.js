'use strict';
(function () {
  var Emitter = require('wildemitter')
    , request = require('request')
    , domino = require('domino')
    , Zepto = require('zepto-node')
    , q = require('q')
  ;

  var ImdbInfoAdd = function () {
    Emitter.call(this);
  };

  ImdbInfoAdd.prototype = Object.create(Emitter.prototype, {
    constructor: {
      value: ImdbInfoAdd
    }
  });


  ImdbInfoAdd.prototype.getImdbInfo = function (movie) {
    var defer = q.defer();
    var url = 'http://www.imdb.com/title/' + movie.idImdb;
    var imdbInfos = {};
    request({'uri': url}, function (err, resp, body) {
      if(err){
        return defer.reject(err);
      }

      var window = domino.createWindow();
      var $ = Zepto(window);
      $('body').append(body);
      imdbInfos.rating = $('.star-box-giga-star').text();

      console.log(movie.title, movie.idImdb, imdbInfos.rating);

      return defer.resolve(imdbInfos);
    }.bind(this));

    return defer.promise;
  };

  module.exports = ImdbInfoAdd;
})();