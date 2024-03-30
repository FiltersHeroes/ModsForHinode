function createuBOModal(url) {
    if(localStorage.getItem('showManualSubscribe') !== "false")
    {
        var clipboardBtn = `{{ partial "assets/button.html" (dict "id" "uBOSubClipboardBtn" "color" "info" "icon" "fas fa-clipboard" "outline" true) }}`;
        Swal.fire({
            title: '{{ i18n "manualSubscribePopupTitle" }}',
            html:
            '<p>{{ i18n "manualSubscribePopupDescription" | markdownify }}</p>'+
            '<div class="d-flex">'+
            '<input type="text" id="manualSubscribe" class="form-control me-2" readonly="true" value="'+url+'"/>'+
            clipboardBtn+
            '</div>'+
            '<div class="mt-4"><img class="img-fluid" src="/images/uBO_add1.png" alt="ubo-settings" title="{{ i18n "uBOInstructionPart1"}}"><img class="img-fluid" src="/images/uBO_add2.png" alt="ubo-settings2" title="{{ i18n "uBOInstructionPart2"}}"></div>',
            showCloseButton: true,
            showCancelButton: false,
            showDenyButton: true,
            focusConfirm: true,
            grow: 'row',
            confirmButtonText: '{{ i18n "close" }}',
            denyButtonText: '{{ i18n "noInstructionsAgain"}}',
            customClass: {
                confirmButton: "btn btn-secondary me-3",
                denyButton: "btn btn-danger me-3",
            },
            buttonsStyling: false
        }).then((result) => {
            if (result.isDenied) {
                localStorage.setItem('showManualSubscribe', 'false')
            }
        })
        document.querySelector("#uBOSubClipboardBtn").onclick = function(){copyToClipBoard("#manualSubscribe")};
    }
}

let subA = document.querySelectorAll("a[href]");
for(var i in subA){
    if(subA[i].href && subA[i].href.match('^abp:subscribe')) {
        subA[i].onclick = function()
        {
            createuBOModal(decodeURIComponent(this.href).replace("abp:subscribe?location=", "").replace(/&(amp;)?title=.*$/,""));
            return false;
        };
    }
}

function copyToClipBoard(element) {
    var copyText = document.querySelector(element);
    /* Select the text field */
    copyText.select();
    copyText.setSelectionRange(0, 99999); /*For mobile devices*/
	/* Copy the text inside the text field */
	if (typeof navigator.clipboard != undefined) {
		navigator.clipboard.writeText(copyText.value);
	}
	else {
		document.execCommand("copy");
	}
}
