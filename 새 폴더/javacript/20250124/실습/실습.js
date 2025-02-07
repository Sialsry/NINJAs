let lastScrollTop = 0;
const delta = 5;
const elementsToAnimate = document.querySelectorAll(".ccc, .detail, .ddd, .eee, .xxx, .detail2");

const ddd = document.querySelector(".ddd");
const eee = document.querySelector(".eee");

let isHidden = false;

window.addEventListener("scroll", function() {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (Math.abs(lastScrollTop - scrollTop) <= delta)
        return;

    if (scrollTop > lastScrollTop) {
        
        if (!isHidden) { 
            elementsToAnimate.forEach(el => {
                const rect = el.getBoundingClientRect();
                if (rect.top < window.innerHeight) {
                    el.classList.add("is-active");
                }
            });
        }
    } else {
        
        if (!isHidden) { 
            elementsToAnimate.forEach(el => {
                const rect = el.getBoundingClientRect();
                if (rect.top >= window.innerHeight) {
                    el.classList.remove("is-active");
                }
            });
        }
    }

    lastScrollTop = scrollTop;
});

eee.addEventListener("click", function() {
    const ccc = document.querySelector(".ccc");
    const detail = document.querySelector(".detail");
    const xxx = document.querySelector(".xxx");
    const detail2 = document.querySelector(".detail2");

    ccc.classList.remove("is-active");
    detail.classList.remove("is-active");

    xxx.classList.add("is-active");
    detail2.classList.add("is-active");

    isHidden = true; 
});

ddd.addEventListener("click", function() {
    const ccc = document.querySelector(".ccc");
    const detail = document.querySelector(".detail");
    const xxx = document.querySelector(".xxx");
    const detail2 = document.querySelector(".detail2");

    ccc.classList.add("is-active");
    detail.classList.add("is-active");

    xxx.classList.remove("is-active");
    detail2.classList.remove("is-active");

    isHidden = false; 
});
