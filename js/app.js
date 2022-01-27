// This is the js file for functionality of whole website

console.log("included")

// consts
const header = document.querySelector("#header");

window.addEventListener("scroll", (e) => {
    console.log(window.scrollY)
    if (window.scrollY >= 417) {
        header.classList.add("head-scrolled");
        header.classList.remove("head-not-scrolled")

        

    } else if (window.scrollY < 417) {
        
        header.classList.remove("head-scrolled");
        header.classList.add("head-not-scrolled")

    }
})