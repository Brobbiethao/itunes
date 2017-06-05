angular.module('itunes').controller('mainCtrl', function($scope, itunesService){
  //This is setting up the default behavior of our ng-grid. The important thing to note is the 'data'
  //property. The value is 'songData'. That means ng-grid is looking for songData on $scope and is putting
  //whatever songData is into the grid.
  //This means when you make your iTunes request, you'll need to get back the information, parse it accordingly,
  //then set it to songData on the scope -> $scope.songData = ...
  $scope.gridOptions = {
      data: 'songData',
      height: '110px',
      sortInfo: {fields: ['Song', 'Artist', 'Collection', 'Type'], directions: ['asc']},
      columnDefs: [
        {field: 'Play', displayName: 'Play', width: '40px', cellTemplate: '<div class="ngCellText" ng-class="col.colIndex()"><a href="{{row.getProperty(col.field)}}"><img src="http://www.icty.org/x/image/Miscellaneous/play_icon30x30.png"></a></div>'},
        {field: 'Artist', displayName: 'Artist'},
        {field: 'Song', displayName: 'Song Title'},
        {field: 'Collection', displayName: 'Collection'},
        {field: 'AlbumArt', displayName: 'Album Art', width: '110px', cellTemplate: '<div class="ngCellText" ng-class="col.colIndex()"><img src="{{row.getProperty(col.field)}}"></div>'},
        {field: 'Type', displayName: 'Type'},
        {field: 'CollectionPrice', displayName: 'Collection Price'},
      ]
  };

  //Our controller is what's going to connect our 'heavy lifting' itunesService with our view (index.html)
  //so our user can see the results they get back from itunes.

  //First inject itunesService into your controller.
  $scope.getSongData = function(artist) {
    itunesService.getArtist(artist).then(function(result) {
      $scope.songData = itunesService.formatArtistData(result);
    });
  };



});
