
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
}, 3000);

// Define a function to transition between gallery images
function transitionImage() {
  // Calculate the index of the previous and next images in the gallery
  const prevIndex = (currentIndex - 1 + galleryImgs.length) % galleryImgs.length;
  const nextIndex = (currentIndex + 1) % galleryImgs.length;

  // Remove the 'prev', 'active', and 'next' classes from all gallery images
  galleryImgs.forEach((img) => {
    img.classList.remove('prev', 'active', 'next');
  });

  // Add the 'prev' class to the previous image, 'active' to the current image, and 'next' to the next image
  galleryImgs[prevIndex].classList.add('prev');
  galleryImgs[currentIndex].classList.add('active');
  galleryImgs[nextIndex].classList.add('next');
}

// Add a scroll event listener to the window to update the active navigation item based on the current section
window.addEventListener("scroll", () => {
  const sections = document.querySelectorAll("section");
  const scrollY = window.pageYOffset;

  // Loop through each section to determine which one is currently in view
  sections.forEach(current => {
    let sectionHeight = current.offsetHeight;
    let sectionTop = current.offsetTop - 50;
    let id = current.getAttribute("id");

    // If the current section is in view, add the 'active' class to the corresponding navigation item
    if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
      document.querySelector(".nav-items a[href*=" + id + "]").classList.add("active");
    }
    // Otherwise, remove the 'active' class from the corresponding navigation item
    else {
      document.querySelector(".nav-items a[href*=" + id + "]").classList.remove("active");
    }
  });
});

// Get references to the menu button, close button, navigation container, and navigation items
const menuBtn = document.querySelector(".nav-menu-btn");
const closeBtn = document.querySelector(".nav-close-btn");
const navigation = document.querySelector(".navigation");
const navItems = document.querySelectorAll(".nav-items a");

// Add a click event listener to the menu button to open the navigation container
menuBtn.addEventListener("click", () => {
  navigation.classList.add("active");
});

// Add a click event listener to the close button to close the navigation container
closeBtn.addEventListener("click", () => {
  navigation.classList.remove("active");
});

// Add a click event listener to each navigation item to close the navigation container when a navigation item is clicked
navItems.forEach((navItem) => {
  navItem.addEventListener("click", () => {
    navigation.classList.remove("active");
  });
});

// Wait for the DOM content to load before executing the code
document.addEventListener("DOMContentLoaded", function() {
  const track = document.getElementById("image-track");

  // Add a mousemove event listener to the track element
  track.addEventListener('mousemove', function(e) {
    // Get all HTML elements with a class of "image" inside the track element
    const images = track.getElementsByClassName("image");
    // Calculate the maximum delta value for the mouse movement based on the window width
    const maxDelta = window.innerWidth * 0.9;
    // Calculate the endpoint for the mouse movement based on the number of images and a fixed value
    const endPoint = -((images.length - 1) * 25);
    // Set a maximum percentage for the next image position
    const maxNextPercentage = 20;

    // Loop through all the images and update their object position based on the mouse position
    for (let i = 0; i < images.length; i++) {
      // Get the current image element in the loop
      const image = images[i];
      // Get the bounding rectangle for the current image
      const imageRect = image.getBoundingClientRect();
      // Calculate the mouse delta for the current image
      const mouseDelta = e.clientX - (imageRect.left + imageRect.width / 2);
      // Calculate the percentage of the mouse delta relative to the maximum delta
      const percentage = (mouseDelta / maxDelta) * -100;

      // Calculate the next percentage for the next image position
      let nextPercentage = parseFloat(track.dataset.prevPercentage) + percentage;

      // Ensure the next percentage is within bounds
      if (nextPercentage > 0) {
        nextPercentage = 0;
      } else if (nextPercentage < endPoint || nextPercentage < -maxNextPercentage) {
        nextPercentage = Math.max(endPoint, -maxNextPercentage);
      }

      // Set the object position for the current image based on the next percentage
      image.style.objectPosition = `${nextPercentage + 100}% 100%`;
      
      // Animate the current image to its new object position
      image.animate(
        { objectPosition: `${60 + nextPercentage}% center` },
        { duration: 200, fill: "forwards" }
      );
    }
  });

  // Add a mouseleave event listener to reset the object position for all images when the mouse leaves the track element
  track.addEventListener('mouseleave', function() {
    const images = track.getElementsByClassName("image");
    for (let i = 0; i < images.length; i++) {
      const image = images[i];
      image.style.objectPosition = "center bottom";
    }
  });
});





