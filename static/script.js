document.addEventListener("DOMContentLoaded", () => {
    const wrapper1 = document.querySelector(".wrapper1");
    const carousel = document.querySelector(".carousel");
    const arrowsBtns = document.querySelectorAll(".wrapper1 i");
    const firstCardWidth = carousel.querySelector(".card").offsetWidth;
    const carouselChildren = [...carousel.children];

    let isDragging = false, startX, startScrollLeft, timeoutId;

    // Get the number of cards that fit in the carousel at once
    let cardsPerView = Math.round(carousel.offsetWidth / firstCardWidth);

    // Insert copies of the last few cards at the beginning of the carousel for infinite scrolling
    carouselChildren.slice(-cardsPerView).reverse().forEach(card => {
        carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
    });

    // Insert copies of the first few cards at the end of the carousel for infinite scrolling
    carouselChildren.slice(0, cardsPerView).forEach(card => {
        carousel.insertAdjacentHTML("beforeend", card.outerHTML);
    });

    arrowsBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            const scrollAmount = btn.id === "left" ? -firstCardWidth : firstCardWidth;
            carousel.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        });
    });

    const dragStart = (e) => {
        isDragging = true;
        carousel.classList.add("dragging");
        startX = e.pageX;
        startScrollLeft = carousel.scrollLeft;
    };

    const dragging = (e) => {
        if (!isDragging) return;
        carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
    };

    const dragStop = () => {
        isDragging = false;
        carousel.classList.remove("dragging");
    };

    const autoPlay = () => {
        if (window.innerWidth < 800) return; // Return if window is smaller than 800
        clearInterval(timeoutId); 
        timeoutId = setInterval(() => {
            carousel.scrollLeft += firstCardWidth;
        }, 2500);
    };

    const infiniteScroll = () => {
        if (carousel.scrollLeft === 0) {
            carousel.classList.add("no-transition");
            carousel.scrollLeft = carousel.scrollWidth - (2 * carousel.offsetWidth);
            carousel.classList.remove("no-transition");
        } else if (Math.ceil(carousel.scrollLeft + carousel.offsetWidth) >= carousel.scrollWidth) {
            carousel.classList.add("no-transition");
            carousel.scrollLeft = carousel.offsetWidth;
            carousel.classList.remove("no-transition");
        }
    };

    // Initialize autoplay
    autoPlay();

    // Attach event listeners
    carousel.addEventListener("mousedown", dragStart);
    carousel.addEventListener("mousemove", dragging);
    document.addEventListener("mouseup", dragStop);
    carousel.addEventListener("scroll", infiniteScroll);
    wrapper1.addEventListener("mouseenter", () => clearInterval(timeoutId));
    wrapper1.addEventListener("mouseleave", autoPlay);
});

// Subscription logic
document.addEventListener("DOMContentLoaded", function() {
    const isSubscribed = false; // Change this based on actual subscription status
    const subscriptionContent = document.querySelector('.subscription-content');
    const lockNotice = document.querySelector('.subscription-lock');

    if (isSubscribed) {
        subscriptionContent.classList.remove('hidden');
        lockNotice.style.display = 'none'; // Hide the lock notice
    } else {
        subscriptionContent.classList.add('hidden');
        lockNotice.style.display = 'block'; // Show the lock notice
    }
});
