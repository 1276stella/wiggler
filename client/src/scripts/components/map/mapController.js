;
(function() {
  'use strict';
  angular.module('app.map', [])
    .controller('MapController', ['$location','RouteService', function($location, RouteService) {
      var vm = this;
      var polyline;

      vm.callback = function(map) {
        RouteService.map = map;
        vm.map = map;
        map.setView([37.774, -122.496], 13);
      };

      // functions for 3d map rotation

      //scope variables
      vm.angle = 0;
      vm.xdrag = 0;
      vm.isDown = false;
      vm.xpos = 0;

      var mapRot = angular.element(document.querySelector('#maprotor'));
      var mapEl = angular.element(document.querySelector('#map'));

      var tiltCheck= false;

      vm.mouseDown = function(e){
        if (tiltCheck){
          vm.xpos = e.pageX;
          vm.isDown = true;
        }
      }

      vm.mouseMove = function(e){
        if (tiltCheck) {
          if (vm.isDown) {
            var elevMarker = angular.element(document.querySelectorAll('.elevmarker'));
            // console.log(elevMarker);

            vm.xdrag = (vm.xpos - e.pageX) / 4;
            mapEl.attr('style', '-webkit-transform:rotateZ(' + (vm.angle + vm.xdrag) % 360 + 'deg)');
            elevMarker.attr('style', '-webkit-transform:rotateX(90deg) rotateY(' + (vm.angle + vm.xdrag) * (-1) % 360 + 'deg)');
          }
        }
      }

      vm.mouseUp = function(e){
        if (tiltCheck){
          vm.isDown = false;
          vm.angle = vm.angle + vm.xdrag;
        }
      }

      // rotate (tilt) map
      vm.tiltMap = function() {
        // vm.map.fitBounds(vm.map.featureLayer.setGeoJSON(turf.linestring(vm.resampledRoute)).getBounds(), {
        //   paddingTopLeft: [150, 50],
        //   paddingBottomRight: [150, 50]
        // });
        if (tiltCheck) {
          tiltCheck = false;
          mapRot.removeClass("tilted");
          vm.map.dragging.enable(); 
        } else {
          tiltCheck = true;
          vm.map.dragging.disable(); 
          mapRot.addClass("tilted");
        }
      }
    }])
})();
