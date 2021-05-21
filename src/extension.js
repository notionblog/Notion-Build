document.addEventListener("DOMContentLoaded", () => {
    var button = document.getElementById("setTrigger")
    var buildHook = document.getElementById("buildHook")

    button.addEventListener("click", (e) => {
        chrome.storage.sync.set({ link: buildHook.value }, function () {
            console.log('seee!')
        });
    })
})
