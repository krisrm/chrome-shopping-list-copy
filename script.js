

function getActiveShoppingListItems() {
    var activeList = document.body.getElementsByClassName('activeItems')[0];
    var activeListTitles = activeList.getElementsByClassName('listItemTitle');

    var stringTitleList = [];


    for (var i = 0; i < activeListTitles.length; i++){
        stringTitleList.push(activeListTitles[i].innerHTML.trim());
    }

    return stringTitleList;
}

window.onload = function() {
    chrome.tabs.executeScript({
        code: '('+getActiveShoppingListItems+')();'
    }, (listItems) => {
        var listCopy = document.getElementById('list-copy');

        if (!listItems || !listItems[0]) {
            var errDisplay = document.getElementById('err-display');
            errDisplay.innerHTML = 'Oops! I couldn\'t find any active shopping list items on the current page.';
            listCopy.style.display = 'none';
            return;
        }

        listCopy.innerHTML = listItems[0].join("\r\n");
        listCopy.select();
        document.execCommand('copy');
    });
};
