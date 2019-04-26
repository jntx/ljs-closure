document.addEventListener("DOMContentLoaded", e => {
	window.slideController = slideController(document.querySelector(".slides"), ".slide");
});

function slideController(container, slideSelector) {
	let host = container;
	let slides = document.querySelectorAll(slideSelector) || [];
	let position = 0;
	let controls = {
		prev : null,
		count : null,
		next : null
	}

	let slidePrev = e => {
		if (position == 0) {
			return;
		}

		setActiveSlide(--position);
	};

	let slideNext = e => {
		if (position == slides.length - 1) {
			return;
		}

		setActiveSlide(++position);
	};

	let setActiveSlide = n => {
		if (!(n in slides)) {
			return;
		}

		slides.forEach(slide => {
			slide.classList.add("hide");
			slide.classList.remove("show");
		});

		if (n == 0) {
			controls.prev.classList.add("disabled");
			controls.prev.classList.remove("enabled");
		} else {
			controls.prev.classList.add("enabled");
		}

		if (n == slides.length - 1) {
			controls.next.classList.add("disabled");
			controls.next.classList.remove("enabled");
		} else {
			controls.next.classList.add("enabled");
		}

		slides[n].classList.remove("hide");
		slides[n].classList.add("show");

		controls.count.innerHTML = `${n + 1} / ${slides.length}`;
	}

	let setup = () => {
		let html = `
			<div class="sc--control sc--prev">&lt;</div>
			<div class="sc--control sc--position">${position + 1} / ${slides.length}</div>
			<div class="sc--control sc--next">&gt;</div>
		`;

		let d = document.createElement("div");
		d.classList.add("sc--controls");
		d.innerHTML = html;
		
		controls.prev = d.querySelector(".sc--prev");
		controls.count = d.querySelector(".sc--position");
		controls.next = d.querySelector(".sc--next");

		controls.prev.addEventListener("click", slidePrev);
		controls.next.addEventListener("click", slideNext);

		host.appendChild(d);

		// 

		setActiveSlide(0);
		// slides.forEach(slide => {
		// 	slide.classList.add("hide");
		// 	slide.classList.remove("show");
		// });
	};

	setup();
}