(function () {
    "use strict";

    var viewer = new Cesium.Viewer('cesiumContainer', {
        scene3DOnly: true,
        selectionIndicator: false,
        baseLayerPicker: false
    });


    var initialPosition = new Cesium.Cartesian3.fromDegrees(117.16, 32.71, 100000);
    var initialOrientation = new Cesium.HeadingPitchRoll.fromDegrees(7.1077496389876024807, -31.987223091598949054, 0.025883251314954971306);
    var homeCameraView = {
        destination : initialPosition,
        orientation : {
            heading : initialOrientation.heading,
            pitch : initialOrientation.pitch,
            roll : initialOrientation.roll
        }
    };

    viewer.scene.camera.setView(homeCameraView);

    homeCameraView.duration = 2.0;
    homeCameraView.maximumHeight = 2000;
    homeCameraView.pitchAdjustHeight = 2000;
    homeCameraView.endTransform = Cesium.Matrix4.IDENTITY;
    

    var city = viewer.scene.primitives.add(new Cesium.Cesium3DTileset({ url: Cesium.IonResource.fromAssetId(75343) }));

    var defaultStyle = new Cesium.Cesium3DTileStyle({
        color : "color('white')",
        show : true
    });

    city.style = defaultStyle;

    var l4;
    var l5;
    var l6;
    var l7;
    var l8;
    var l9;
    var myJson;
    const userAction = async () => {
        const response = await fetch('http://localhost:8080/data');
        const myJson = await response.json(); 
        console.log(myJson);



      l4=myJson[0]['longitude'];
      //l4=-0.118092;

      l5=myJson[0]['latitude'];
      //l5=51.509865;
  
      l6=myJson[0]['height'];
      //l6=5000.0;
    


     l7=parseFloat(myJson[1]['longitude']);
     //l7= 79.8612;
   
     l8 =parseFloat(myJson[1]['latitude']);
     //l8 =6.92708;
    
      l9=parseFloat(myJson[1]['height']);
      //l9=5000.0;
    }
    userAction();
    


    function flyToRectangle() {
        var l1 = l4;
        var l2 = l5;
        var l3 = l6;
      
        var rectangle = Cesium.Cartesian3.fromDegrees(
          l1,
          l2,
          l3
        );
      
        viewer.camera.flyTo({
          destination: rectangle,
        });
      }

      function flyToRectangle2() {
        var l1 = l7;
        var l2 = l8;
        var l3 = l9;
      
        var rectangle = Cesium.Cartesian3.fromDegrees(
          l1,
          l2,
          l3
        );
      
        viewer.camera.flyTo({
          destination: rectangle,
        });
      }



    var tileStyle = document.getElementById('tileStyle');
    function set3DTileStyle() {
        var selectedStyle = tileStyle.options[tileStyle.selectedIndex].value;
        if (selectedStyle === 'none') {
            city.style = defaultStyle;
        } else if (selectedStyle === 'london') {
            flyToRectangle();
        } else if (selectedStyle === 'colombo') {
            flyToRectangle2();
        }
    }
    tileStyle.addEventListener('change', set3DTileStyle);
}());
