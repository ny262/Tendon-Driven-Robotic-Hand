var coll = document.getElementsByClassName("collapsible");
var i;

for (i = 0; i < coll.length; i++) {
    coll[i].addEventListener("click", function() {
        this.classList.toggle("active");
        var content = this.nextElementSibling;
        
        if (content.style.maxHeight){
            var heightToSubtract = content.scrollHeight;
            content.style.maxHeight = null;
            
            var parent = this.parentElement.closest('.content');
            while (parent) {
                if (parent.style.maxHeight) {
                    parent.style.maxHeight = (parseInt(parent.style.maxHeight) - heightToSubtract) + "px";
                }
                parent = parent.parentElement.closest('.content');
            }
        } else {
            content.style.maxHeight = content.scrollHeight + "px";
            var heightToAdd = content.scrollHeight;
            
            var parent = this.parentElement.closest('.content');
            while (parent) {
                if (parent.style.maxHeight) {
                    parent.style.maxHeight = (parseInt(parent.style.maxHeight) + heightToAdd) + "px";
                }
                parent = parent.parentElement.closest('.content');
            }
        }
    });
}

document.querySelectorAll('.remote-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = link.getAttribute('href').substring(1);
        const targetButton = document.getElementById(targetId);
        
        if (targetButton) {
            targetButton.scrollIntoView({ behavior: 'smooth', block: 'center' });
            
            if (!targetButton.classList.contains('active')) {
                targetButton.click();
            }
        }
    });
});

  const carousel = document.getElementById('carousel');
  const slides = Array.from(carousel.children);

  const firstClone = slides[0].cloneNode(true);
  const lastClone = slides[slides.length - 1].cloneNode(true);
  carousel.appendChild(firstClone);
  carousel.insertBefore(lastClone, slides[0]);

  let index = 1;
  let isMoving = false;

  carousel.style.transition = 'none';
  carousel.style.transform = 'translateX(-100%)';

  function moveSlide(step) {
    if (isMoving) return;
    isMoving = true;

    index += step;
    carousel.style.transition = 'transform 0.4s ease-in-out';
    carousel.style.transform = `translateX(-${index * 100}%)`;
  }

  carousel.addEventListener('transitionend', () => {
    if (index === slides.length + 1) {
      carousel.style.transition = 'none';
      index = 1;
      carousel.style.transform = 'translateX(-100%)';
    } else if (index === 0) {
      carousel.style.transition = 'none';
      index = slides.length;
      carousel.style.transform = `translateX(-${index * 100}%)`;
    }
    isMoving = false;
  });
