let menuList = [
    {id: 1, name: 'Menu 1', url: '/content1.html'},
    {id: 2, name: 'Menu 2', url: '/content2.html'},
    {id: 3, name: 'Menu 3', url: '/content3.html'}];

const menuElem = document.getElementById("menu");
menuList.forEach(item => {
    menuElem.innerHTML += '<div class="menu-item" id="menu-' + item.id + '" url="' + item.url + '">' + item.name + '</div>'
});

loadTabAndPage("menu-" + menuList[0].id, menuList[0].name, menuList[0].url);

document.body.addEventListener('click', function (event) {
    console.log("click event target: ", event.target)
    if (event.target && event.target.matches && event.target.matches(".menu-item")) {
        console.log("click menu ", event.target.id)
        let menuId = event.target.id;
        let url = event.target.getAttribute("url");
        loadTabAndPage(menuId, event.target.innerHTML, url);
    }
    if (event.target && event.target.matches && event.target.matches(".tab-item-content")) {
        console.log("click tab item: ", event.target)
        let tabItem = findParentByClass(event.target, ".tab-item");
        console.log("tab item: ", tabItem)
        switchTab(tabItem.id);
    }
    if (event.target && event.target.matches && event.target.matches(".tab-item-close")) {
        event.stopPropagation();
        console.log("close tab ", event.target.parentElement.id)
        let tabId = event.target.parentElement.id;
        closeTab(tabId);
    }
});

function findParentByClass(node, cls) {
    while (node && !node.matches(cls)) {
        node = node.parentNode;
    }
    return node;
}

function loadTabAndPage(menuId, menuName, url) {
    Array.from(document.getElementsByClassName("menu-item"))
        .forEach(item => item.classList.remove("menu-item-active"));
    document.getElementById(menuId).classList.add("menu-item-active");
    Array.from(document.getElementsByClassName("my-page"))
        .forEach(item => item.style.display = "none");
    let tabId = 'tab-' + menuId.split("-")[1];
    addTabIfNotExist(tabId, menuName);
    reloadPage('page-'+menuId.split("-")[1], url);
}

function addTabIfNotExist(tabId, tabName) {
    if (document.getElementById(tabId) !== null) {
        return false;
    }
    console.log("addTabItem ", tabId, tabName)
    const tabElem = document.getElementById("tab");
    tabElem.innerHTML += '<div id="' + tabId + '" class="tab-item"><div class="tab-item-content">' + tabName + '</div><div class="tab-item-close">×</div></div>';
}

async function reloadPage(pageId, url) {
    document.getElementsByClassName("loader")[0].style.display = "block";
    await delay(300);
    console.log("url: ", url)
    request(url, "GET", null, function (res) {
        document.getElementsByClassName("loader")[0].style.display = "none";
        console.log("res: ", res)
        // 1. remove old page
        if (document.getElementById(pageId) !== null) {
            document.getElementById(pageId).remove();
        }
        // 2. append new page
        document.getElementById("content").innerHTML += ('<div id="' + pageId + '" class="my-page">' + res.currentTarget.responseText + '</div>');
        switchTab("tab-" + pageId.split("-")[1]);
    });
}

function request(url, method, body, callback) {
    console.log("request url: ", url)
    const baseUri = "/management-system-framework";
    var oReq = new XMLHttpRequest();
    oReq.addEventListener("load", callback);
    oReq.open(method, baseUri + url);
    oReq.send();
}

function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}

function switchTab(tabId) {
    // 1. active tab
    console.log("switchTab to ", tabId)
    const allTabs = document.getElementsByClassName("tab-item");
    Array.from(allTabs).forEach(item => item.classList.remove("tab-item-active"));
    const currentTab = document.getElementById(tabId);
    currentTab.classList.add("tab-item-active");

    // 2. active page
    const allPages = document.getElementsByClassName("my-page");
    // for (let i = 0 ;i < allPages.length; i++) {
    //     allPages[i].style.display = "none";
    // }
    Array.from(allPages).forEach(item => item.style.display = "none");
    document.getElementById("page-" + tabId.split("-")[1]).style.display = "block"
}

function closeTab(tabId) {
    // 1. remove tab
    let currentTab = document.getElementById(tabId);
    let isCurrTabActive = currentTab.classList.contains("tab-item-active");
    currentTab.remove();
    // 2. remove page
    let pageId = "page-" + tabId.split("-")[1];
    document.getElementById(pageId).remove();
    // 3. if the closed tab is active, then to active first tab from the remaining tabs
    if (isCurrTabActive) {
        let tabItems = document.getElementsByClassName("tab-item");
        if (tabItems.length > 0) {
            const tabId = tabItems[0].id;
            switchTab(tabId);
        }
    }
}
