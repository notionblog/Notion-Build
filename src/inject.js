let buildHookUrl;

chrome.storage.sync.get(['link'], function (result) {
  buildHookUrl = result.link
  if (buildHookUrl) {
    const buttonDiv = document.createElement('DIV')
    buttonDiv.setAttribute("id", "trigger_build")
    buttonDiv.innerHTML = `
            <iframe width="0" height="0" border="0" name="frm" id="frm" style="display: none;"></iframe>
            <form action="${result.link}" target="frm" method="post">
                <button style="background:blue; color:white" type="submit">Deploy</button>
            </form>`
    const observer = new MutationObserver(function () {
      let toolbar = document.getElementsByClassName('notion-page-controls')[0]
      let button = document.getElementById("trigger_build")
      if (toolbar && !button) toolbar.appendChild(buttonDiv)
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


