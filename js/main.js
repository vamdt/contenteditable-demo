(function(root) {
  var editable, document = root.document;


  function fire_event(elemnet, event) {
    var evt;
    if (document.createEventObject) {
      evt = document.createEventObject();
      return elemnet.fireEvent('on'+event, evt);
    } else {
      evt = document.createEvent('HTMLEvents');
      evt.initEvent(event, true, true);
      return !elemnet.dispatchEvent(evt);
    }
  }


  function set_caret_position(elem, event) {
      var sel = root.getSelection(),
          range = document.createRange(),
          last_child = elem.childNodes[elem.childNodes.length-1];
      range.setStart(last_child, 0);
      range.collapse(true);
      sel.removeAllRanges();
      sel.addRange(range);
  }

  editable = document.querySelector('div[contenteditable="true"]');
  editable.addEventListener('focus', function(event) {
    set_caret_position(this, event);
  });
  
  fire_event(editable, 'focus');

})(window);