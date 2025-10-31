// JS for optional animation on hover reveal
const headings = document.querySelectorAll(".cv-heading");
headings.forEach((heading) => {
  heading.addEventListener("mouseenter", () => {
    heading.nextElementSibling.style.maxHeight = "300px";
    heading.nextElementSibling.style.opacity = "1";
    heading.nextElementSibling.style.padding = "20px";
  });
  heading.addEventListener("mouseleave", () => {
    heading.nextElementSibling.style.maxHeight = "0";
    heading.nextElementSibling.style.opacity = "0";
    heading.nextElementSibling.style.padding = "0 20px";
  });
});
