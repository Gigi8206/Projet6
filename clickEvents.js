var images = document.querySelectorAll('img');

images.forEach(function(element) {
    element.addEventListener("click", function(event) {
        console.log(event);
    });
});

console.log(images)