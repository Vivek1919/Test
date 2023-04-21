// We want to see some non-trivial Javascript code
// At a minimum, you should demonstrate a few simple uses of event-driven JavaScript for DOM manipulation
// You should use ES6 syntax throughout: e.g. don't use "var", use the modern tools (template literals, arrow functions).
// There should be no JavaScript errors in the browser console

// For more marks, we like to see a bit more complex use of JavaScript, perhaps some looping and/or more complex DOM manipulation.
// Accessing APIs is a great option if it fits with your project, or you can work with your own, local data.
// Your code should be DRY, if you have repeated code, consider refactoring as a function with arguments for example.
// We like to see what you can do. Be creative.

const prevButton = document.querySelector('#prev-btn');
const nextButton = document.querySelector('#next-btn');
const galleryImgs = document.querySelectorAll('.gallery-img-container');
let currentIndex = 0;

// Show the first image
galleryImgs[currentIndex].classList.add('active');

// Handle next button
nextButton.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % galleryImgs.length;
  transitionImage();
});

// Handle previous button
prevButton.addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + galleryImgs.length) % galleryImgs.length;
  transitionImage();
});

// Auto change image every 3 seconds
setInterval(() => {
  currentIndex = (currentIndex + 1) % galleryImgs.length;
  transitionImage();
}, 8000);

function transitionImage() {
    const prevIndex = (currentIndex - 1 + galleryImgs.length) % galleryImgs.length;
    const nextIndex = (currentIndex + 1) % galleryImgs.length;
    galleryImgs.forEach((img) => {
      img.classList.remove('prev', 'active', 'next');
    });
    galleryImgs[prevIndex].classList.add('prev');
    galleryImgs[currentIndex].classList.add('active');
    galleryImgs[nextIndex].classList.add('next');
  }
  
window.addEventListener("scroll", () => {
    const sections = document.querySelectorAll("section");
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
        let sectionHeight = current.offsetHeight;
        let sectionTop = current.offsetTop - 50;
        let id = current.getAttribute("id");

        if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
            document.querySelector(".nav-items a[href*=" + id + "]").classList.add("active");
        }
        else {
            document.querySelector(".nav-items a[href*=" + id + "]").classList.remove("active");

        }
    });

});

const menuBtn = document.querySelector(".nav-menu-btn");
const closeBtn = document.querySelector(".nav-close-btn");
const navigation = document.querySelector(".navigation");
const navItems = document.querySelectorAll(".nav-items a");


menuBtn.addEventListener("click", () => {
    navigation.classList.add("active");
});

closeBtn.addEventListener("click", () => {
    navigation.classList.remove("active");
});

navItems.forEach((navItem) => {
    navItem.addEventListener("click", () => {
        navigation.classList.remove("active");
    });
});


document.addEventListener("DOMContentLoaded", function() {
  const track = document.getElementById("image-track");

  window.onmousedown = e => {
    track.dataset.mouseDownAt = e.clientX;
  };
  
  window.onmouseup = () => {
    track.dataset.mouseDownAt = "0";
    track.dataset.prevPercentage = track.dataset.percentage;
  };

  window.onmousemove = e => {
    if (track.dataset.mouseDownAt === "0") return;

    const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX;
    const maxDelta = window.innerWidth * 0.9;

    let percentage = (mouseDelta / maxDelta) * -100;
    let nextPercentage = parseFloat(track.dataset.prevPercentage) + percentage;

   // set the end point of the track
const endPoint = -((track.children.length - 1) * 45);

// set the max value for nextPercentage
const maxNextPercentage = 100;

// stop dragging when reaching the end of the track or the max value
if (nextPercentage > 0) {
  nextPercentage = 0;
} else if (nextPercentage < endPoint || nextPercentage < -maxNextPercentage) {
  nextPercentage = Math.max(endPoint, -maxNextPercentage);
}

    track.dataset.percentage = nextPercentage;
    track.style.transform = `translate(${nextPercentage}%, -50%)`;

    track.animate(
      { transform: `translate(${nextPercentage}%, -80%)` },
      { duration: 1200, fill: "forwards" }
    );

    for (const image of track.getElementsByClassName("image")) {
      image.style.objectPosition = `${nextPercentage + 100}% 100%`;
      
      image.animate(
        { objectPosition: `${80 + nextPercentage}% center` },
        { duration: 1600, fill: "forwards" }
      );
    }
  };
});


