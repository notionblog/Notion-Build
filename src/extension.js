
document.addEventListener("DOMContentLoaded", () => {
    chrome.storage.sync.get(['link', 'badge'], function (result) {
        // Grab build hook and badge links from storage
        let { link, badge } = result;
        // grab inputs and trigger button
        const buildHook = document.querySelector('#buildHook')
        const statusbadge = document.querySelector('#statusbadge')
        const setTrigger = document.querySelector('#setTrigger');
        // edit() convert the view to Edit Mode
        const edit = () => {
            buildHook.disabled = true;
            statusbadge.disabled = true;
            setTrigger.value = "Edit";
        }
        // save() convert the view to Save Mode
        const save = () => {
            buildHook.disabled = false;
            statusbadge.disabled = false;
            setTrigger.value = "Save";
        }
        // check if the form is already filled and put data in inputs otherwise keep the save mode
        if (link !== undefined) {
            buildHook.value = link
            statusbadge.value = badge
            edit()
        } else
            save()

        // add click event listener to trigger button
        setTrigger.addEventListener("click", (e) => {
            // if the button is save: add input data to storage
            if (setTrigger.value === "Save") {
                chrome.storage.sync.set({ link: buildHook.value, badge: statusbadge.value }, function () {

                    edit()
                });
            }// switch to save mode
            else {
                save()
            }
        })
    })
})
