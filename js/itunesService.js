angular.module('itunes').service('itunesService', function($http, $q){


  this.getArtist = function(artist) {

    var deferred = $q.defer();

    $http.jsonp('https://itunes.apple.com/search?term=' + artist + '&callback=JSON_CALLBACK')
      .then(function(response) {
        var data = response.data.results;

        deferred.resolve(data);
      });

    return deferred.promise;

  };

  this.formatArtistData = function (result) {
    var parsedResults = [];

    for(var i = 0; i < result.length; i++) {
      var newObj = {
        AlbumArt : result[i].artworkUrl100,
        Artist : result[i].artistName,
        Collection : result[i].collectionCensoredName,
        CollectionPrice : result[i].collectionPrice,
        Play : result[i].previewUrl,
        Type : result[i].kind
      };

      parsedResults.push(newObj);
    }

    return parsedResults;

  };

});
