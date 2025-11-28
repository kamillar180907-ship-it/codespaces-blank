// мобильное меню
const toggle = document.getElementById('nav-toggle');
const navList = document.getElementById('nav-list');
toggle.innerHTML = '<span></span><span></span><span></span>'; // иконка гамбургер
toggle.addEventListener('click', () => navList.classList.toggle('open'));

// подменю на мобиле
document.querySelectorAll('.has-sub').forEach(li => {
  li.addEventListener('click', function (e) {
    if (window.innerWidth <= 767) {
      e.preventDefault();
      this.classList.toggle('open');
    }
  });
});

// простейший слайдер (без сторонних библиотек)
const slides = document.querySelectorAll('.swiper-slide');
const prev = document.querySelector('.swiper-btn-prev');
const next = document.querySelector('.swiper-btn-next');
const dots = document.querySelector('.swiper-pagination');
let cur = 0;

function show(index) {
  slides.forEach((s, i) => s.style.display = i === index ? 'flex' : 'none');
  if (dots) dots.innerHTML = Array.from({length: slides.length}, (_, i) =>
    `<span class="dot ${i === index ? 'active' : ''}" data-i="${i}"></span>`).join('');
}
function nextSlide() {
  cur = (cur + 1) % slides.length;
  show(cur);
}
function prevSlide() {
  cur = (cur - 1 + slides.length) % slides.length;
  show(cur);
}
show(cur);
next.addEventListener('click', nextSlide);
prev.addEventListener('click', prevSlide);
if (dots) dots.addEventListener('click', e => {
  if (e.target.classList.contains('dot')) {
    cur = +e.target.dataset.i;
    show(cur);
  }
});
let auto = setInterval(nextSlide, 6000);
document.querySelector('.swiper').addEventListener('mouseenter', () => clearInterval(auto));
document.querySelector('.swiper').addEventListener('mouseleave', () => auto = setInterval(nextSlide, 6000));

// плавный скролл по якорям
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', function (e) {
    const dest = document.querySelector(this.getAttribute('href'));
    if (dest) {
      e.preventDefault();
      dest.scrollIntoView({ behavior: 'smooth', block: 'start' });
      // закрываем мобильное меню после клика
      navList.classList.remove('open');
    }
  });
});

// фиксированный хедер при скролле
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 20);
});

// простая отправка формы (заглушка)
document.getElementById('cta-form').addEventListener('submit', function (e) {
  e.preventDefault();
  alert('Спасибо! Мы свяжемся в ближайшее время.');
  this.reset();
});