// screen elements
const homeScreen = document.querySelector('#screen1');
const fastConnectionScreen = document.querySelector('#screen2');
// const JSONConnectionScreen = document.querySelector('#screen3');

// link
const linkToHomeScreen = document.querySelector('#linkto-homescreen');
const linkToFastConnectionScreen = document.querySelector('#linkto-fastconnectionscreen');
// const linkToJSONConnectionScreen = document.querySelector('#linkto-jsonconnection');

// menu mange elements
const menuElement = document.querySelector('#menu');
const menuOpenElement = document.querySelector('#menuopen');
const menuCloseElement = document.querySelector('#closemenu');

// screens
const screens = [homeScreen, fastConnectionScreen];

// menu
export function closeMenu() {
    menuElement.style.left = '100%';
}

export function openMenu() {
    menuElement.style.left = 0;
}

export function manageScreen(screens, id) {
    let needScreen;
    if (screens.length - 1 < id) {
        needScreen = screens[0];
    } else {
        needScreen = screens[id];
    }

    linkToHomeScreen.classList.remove("menu-item_active")
    linkToFastConnectionScreen.classList.remove("menu-item_active")
    // linkToJSONConnectionScreen.classList.remove("menu-item_active")

    switch (id) {
        case 0:
            linkToHomeScreen.classList.add("menu-item_active");
            break;
        case 1:
            linkToFastConnectionScreen.classList.add("menu-item_active");
            break;
        // case 2:
        //     linkToJSONConnectionScreen.classList.add("menu-item_active");
        //     break;
    }

    screens.map(item => item.style.display = "none");
    needScreen.style.display = "flex";
    closeMenu();
}

manageScreen(screens, 0)

menuOpenElement.addEventListener('click', openMenu);
menuCloseElement.addEventListener('click', closeMenu);

linkToHomeScreen.addEventListener('click', _ => manageScreen(screens, 0))
linkToFastConnectionScreen.addEventListener('click', _ => manageScreen(screens, 1))
// linkToJSONConnectionScreen.addEventListener('click', _ => manageScreen(screens, 2))