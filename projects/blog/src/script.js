const mainMenu = document.querySelector("#main-menu");

function mainMenuItemSelected(e) {
    let mainMenuItems = Array.from(mainMenu.children);
    for(let i=0; i<mainMenuItems.length; i++){
        mainMenuItems[i].children[1].classList.remove("selected")
    }
    e.currentTarget.children[1].classList.add("selected");
}

for(let i=0; i<Array.from(mainMenu.children).length; i++){
    Array.from(mainMenu.children)[i].addEventListener("click", mainMenuItemSelected)
}
