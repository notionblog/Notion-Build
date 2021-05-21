document.addEventListener("DOMContentLoaded", () => {
    var button = document.getElementById("setTrigger")
    var buildHook = document.getElementById("buildHook")
    var statusBadge = document.getElementById("statusbadge");

    button.addEventListener("click", (e) => {
        chrome.storage.sync.set({ link: buildHook.value, badge: statusBadge.value }, function () {
            console.log('seee!')
        });
    })
})
