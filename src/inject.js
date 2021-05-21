let buildHookUrl;

chrome.storage.sync.get(['link'], function (result) {
  buildHookUrl = result.link
  if (buildHookUrl) {
    const buttonDiv = document.createElement('DIV')
    buttonDiv.setAttribute("id", "trigger_build")
    buttonDiv.innerHTML = `
            <iframe width="0" height="0" border="0" name="frm" id="frm" style="display: none;"></iframe>
            <form style="" action="${result.link}" target="frm" method="post">
                <button style="color: white;
                line-height: 1.2;
                background: rgb(0, 150, 109);
                padding-left: 8px;
                padding-right: 8px;
                font-size: 14px;
                font-weight: 500;
                height: 26px;
                border: none;
                margin-right: 12px;
                border-radius: 2px;" type="submit">Deploy</button>
            </form>`
    const observer = new MutationObserver(function () {
      let toolbar = document.getElementsByClassName('notion-collection-view-item-add')[0]
      let button = document.getElementById("trigger_build")
      if (toolbar && !button) toolbar.prepend(buttonDiv)
    });
    const observerConfig = {
      attributes: true,
      childList: true,
      characterData: true,
      subtree: true
    }
    observer.observe(document, observerConfig)
  }
});


