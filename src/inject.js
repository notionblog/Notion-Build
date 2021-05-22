chrome.storage.sync.get(['link', 'badge'], function (result) {
  // Grab Buil Hook Url and Status badge image from Storage
  let { link, badge } = result;

  if (link) {
    // Create a Div Element to inject Trigger Build button into it
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
                border-radius: 2px;" type="submit">🚀 Publish Changes</button>
            `
    // Create Status Badge Tag If exists
    let statusBadge = document.createElement('img');
    if (badge) {
      statusBadge.setAttribute('id', "imageBadge")
      statusBadge.src = badge
    }

    // Create an observer to keep track of changes being made to the DOM (Notion is a REACT app)
    const observer = new MutationObserver(function () {
      // Grab notion Toolbar
      let toolbar = document.querySelector('.notion-collection-view-item-add')
      // Grab the Build Button
      let button = document.querySelector("#trigger_build")
      // Check If the build button not rendered in DOM Tree and prepend it before the toolBar
      if (toolbar && !button) {
        toolbar.prepend(buttonDiv)
        // Check if the status badge link exists and prepend it 
        if (badge) toolbar.prepend(statusBadge)
        // Addign click event listend
        let buildButton = document.querySelector('#buildButton')
        buildButton.addEventListener('click', async function () {
          // Trigger the hook using post method 
          await fetch(link, { method: "POST" })
          // If the user have set the badge icon it will shows the badge image
          if (badge) {
            // Update the badge status after click 500 ms
            setTimeout(() => {
              statusBadge.src = result.badge + "?t=" + new Date().getTime();
            }, 500)
            // Update the badge status each 10s to see if the build is completed
            const t = setInterval(() => {
              statusBadge.src = result.badge + "?t=" + new Date().getTime();;
            }, 10000)
            // clear the interval after 3 min
            setTimeout(() => {
              clearInterval(t)
            }, 180000)
          } else {
            // if the badge link not set a div is created to inform the user that the build is started
            let buildStatusDiv = document.createElement('div');
            buildStatusDiv.innerHTML = `<span style="background: orange;
            padding: 13px; ">⚙️ Building</span>`
            toolbar.prepend(buildStatusDiv)
            setTimeout(() => {
              buildStatusDiv.parentNode.removeChild(buildStatusDiv)
            }, 3000)
          }


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


