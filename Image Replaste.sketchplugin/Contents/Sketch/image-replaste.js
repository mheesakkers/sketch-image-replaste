// Image Replaste, by Misha Heesakkers — Source code available at ....

// ## Code
// ### Defining The Run Handler
//
// In the manifest, we told Sketch that every time the "Image Replaste!" menu is selected,
// we want to execute  a javascript handler called `onRun`.
//
// So now we need to put some code into the `image-replaste.js` file to implement that command.

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
