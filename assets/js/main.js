document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click', function(e){
    const id = this.getAttribute('href');
    if(id.length>1){
      const el = document.querySelector(id);
      if(el){ e.preventDefault(); el.scrollIntoView({behavior:'smooth', block:'start'}); }
    }
    document.querySelector('.links').classList.remove('open');
  });
});

const reviewCarousel = document.getElementById('reviewCarousel');
if(reviewCarousel){
  const scrollByCard = () => {
    const card = reviewCarousel.querySelector('.review-card');
    return card ? card.getBoundingClientRect().width + 24 : 300;
  };
  document.getElementById('reviewNext').addEventListener('click', () => {
    reviewCarousel.scrollBy({left: scrollByCard(), behavior: 'smooth'});
  });
  document.getElementById('reviewPrev').addEventListener('click', () => {
    reviewCarousel.scrollBy({left: -scrollByCard(), behavior: 'smooth'});
  });
}
