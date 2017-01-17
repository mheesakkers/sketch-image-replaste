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
      for (var i = 0; i < layersCount; i++){
        
        // To do: Check if layer is a shape or an image and fill or set image accordingly

        if (imgData) {
          replaceImage(selectedLayers[i], imgData);        
        } else if (imgTiffData) {
          replaceImage(selectedLayers[i], imgTiffData);  
        }
      }
    } else {
      sketch.message('No image in Clipboard');
    }

  } else {
    sketch.message('Please select some objects.');
    return;
  }
};

function replaceImage(_layer, _imageData) {
  var layer = _layer
  var image = [[NSImage alloc] initWithData:_imageData];
  var replaceAction = MSReplaceImageAction.alloc().init();
  if (replaceAction) {
    [replaceAction applyImage:image tolayer:layer];
    // resize image accordingly
    sketch.message('Replaste!');
  }
}

  // if(layer.isKindOfClass(MSBitmapLayer)) {
  //   sketch.message('This is an image yes.');
  // } else {
  //   sketch.message('This only works with an image.');
  // }
