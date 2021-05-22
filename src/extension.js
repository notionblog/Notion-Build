
document.addEventListener("DOMContentLoaded", () => {
    chrome.storage.sync.get(['link', 'badge', 'tmpLink', 'tmpBadge'], function (result) {
        // Grab build hook and badge links from storage
        let { link, badge, tmpLink, tmpBadge } = result;
        // grab inputs and trigger button
        const buildHook = document.querySelector('#buildHook')
        const statusbadge = document.querySelector('#statusbadge')
        const setTrigger = document.querySelector('#setTrigger');
        // edit() convert the view to Edit Mode
        const edit = () => {
            buildHook.disabled = true;
            statusbadge.disabled = true;
            setTrigger.style.backgroundColor = "gray"
            setTrigger.value = "Edit";
        }
        // save() convert the view to Save Mode
        const save = () => {
            buildHook.disabled = false;
            statusbadge.disabled = false;
            setTrigger.style.backgroundColor = "black"
            setTrigger.value = "Save";
        }
        // check if the form is already filled and put data in inputs otherwise keep the save mode
        if (link !== undefined) {
            // check if the user changes something in the build input and didn't save and load the tmp data to input
            buildHook.value = tmpLink !== '' ? tmpLink : link
            // check if the user changes something in the statusbadge input and didn't save and load the tmp data to input
            statusbadge.value = tmpBadge !== '' ? tmpBadge : badge
            // if the user have unsaved data show save view else show edit view
            tmpLink !== '' || tmpBadge !== '' ? save() : edit()
        } else {
            // load unsaved data if exist or assing empty to inputs
            buildHook.value = tmpLink !== undefined ? tmpLink : ''
            statusbadge.value = tmpBadge !== undefined ? tmpBadge : ''
            //switch to save view
            save()
        }


        // add click event listener to trigger button
        setTrigger.addEventListener("click", (e) => {
            // if the button is save: add input data to storage and clear tmp variables
            if (setTrigger.value === "Save" && buildHook.value != '') {
                chrome.storage.sync.set({ link: buildHook.value, badge: statusbadge.value, tmpLink: '', tmpBadge: '' }, function () {
                    edit()
                });
            }// switch to save mode
            else {
                save()
            }
        })

        // To save user input when switching tabs
        // when build hook input change save the value to tmpLink
        buildHook.addEventListener("change", (e) => {
            chrome.storage.sync.set({ tmpLink: e.target.value }, function () {
            });
        })
        // when status badge input change save the value to tmpbadge
        statusbadge.addEventListener("change", (e) => {
            chrome.storage.sync.set({ tmpBadge: e.target.value }, function () {
            });
        })

    })
})
