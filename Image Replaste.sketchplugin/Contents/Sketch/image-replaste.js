// Image Replaste, by Misha Heesakkers

function onRun(context) {

  var sketch = context.api();
  var selectedLayers = context.selection;
  var layersCount = selectedLayers.count();
  
  if (layersCount > 0) {
    
    var pasteBoard = NSPasteboard.generalPasteboard();
    var pasteBoardItems = pasteBoard.pasteBoardItems;
    var imgData = pasteBoard.dataForType(NSPasteboardTypePNG);
    var imgTiffData = pasteBoard.dataForType(NSPasteboardTypeTIFF);

    if (imgData || imgTiffData) {
      for (var i = 0; i < layersCount; i++) {
        var layer = selectedLayers[i];
        var image;
        
        // Check if layer is a shape or image
        if (layer.class() == 'MSShapeGroup') {
          var fill = layer.style().fills().firstObject();
          fill.setFillType(4);

          if(imgData) {
            image = [[NSImage alloc] initWithData:imgData];
          } else if (imgTiffData) {
            image = [[NSImage alloc] initWithData:imgTiffData];
          }
          
          fill.setImage(MSImageData.alloc().initWithImage_convertColorSpace(image, false));
          layer.style().fills().firstObject().setPatternFillType(1);
        } else if (layer.class() == "MSBitmapLayer") {
          if (imgData) {
            replaceImage(selectedLayers[i], imgData);        
          } else if (imgTiffData) {
            replaceImage(selectedLayers[i], imgTiffData);  
          }
        } else {
          sketch.message('Selected layers cannot be replaced. Try selecting a shape or image.');
        }


      }
    } else {
      sketch.message('No image in Clipboard');
    }

  } else {
    sketch.message('Please select some objects.');
  }
};

function replaceImage(_layer, _imageData) {
  var layer = _layer
  var image = [[NSImage alloc] initWithData:_imageData];
  var replaceAction = MSReplaceImageAction.alloc().init();
  if (replaceAction) {
    [replaceAction applyImage:image tolayer:layer];
    // To do:resize image accordingly
    sketch.message('Replaste!');
  }
}

  // if(layer.isKindOfClass(MSBitmapLayer)) {
  //   sketch.message('This is an image yes.');
  // } else {
  //   sketch.message('This only works with an image.');
  // }
