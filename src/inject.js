let buildHookUrl;

chrome.storage.sync.get(['link', 'badge'], function (result) {
  buildHookUrl = result.link
  if (buildHookUrl) {
    const buttonDiv = document.createElement('DIV')
    buttonDiv.setAttribute("id", "trigger_build")
    buttonDiv.innerHTML = `
                <button id="buildButton" style="
                color: white;
                line-height: 1.2;
                background: rgb(0, 150, 109);
                padding-left: 8px;
                padding-right: 8px;
                font-size: 14px;
                font-weight: 500;
                height: 26px;
                border: none;
                margin-right: 7px;
                margin-left: 11px;
                border-radius: 2px;" type="submit">🚀 Publish changes</button>
            `
    let imgbadge = document.createElement('img');
    imgbadge.setAttribute('id', "imageBadge")
    if (result.badge) {
      imgbadge.src = result.badge
    }

    const observer = new MutationObserver(function () {
      let toolbar = document.getElementsByClassName('notion-collection-view-item-add')[0]
      let button = document.getElementById("trigger_build")
      if (toolbar && !button) {
        toolbar.prepend(buttonDiv)
        if (result.badge) toolbar.prepend(imgbadge)
        let buildButton = document.getElementById('buildButton')

        buildButton.addEventListener('click', async function () {
          await fetch(buildHookUrl, { method: "POST" })

          setTimeout(() => {

            imgbadge.src = result.badge + "?t=" + new Date().getTime();
          }, 500)

          const t = setInterval(() => {
            imgbadge.src = result.badge + "?t=" + new Date().getTime();;
          }, 10000)
          setTimeout(() => {
            clearInterval(t)
          }, 180000)
        })

      }


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


