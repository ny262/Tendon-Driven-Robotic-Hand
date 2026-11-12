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
  const total = carousel.children.length - 1; // Excludes the duplicate slide
  let index = 0;

  function moveSlide(step) {
    if (index === 0 && step === -1) {
      // Jump instantly to the duplicate at the end, then slide left to the last image
      carousel.style.transition = 'none';
      index = total;
      carousel.style.transform = `translateX(-${index * 100}%)`;
      carousel.offsetHeight; // Forces browser to register the instant jump
    }

    index += step;
    carousel.style.transition = 'transform 0.4s ease-in-out';
    carousel.style.transform = `translateX(-${index * 100}%)`;

    // Once it finishes sliding onto the duplicate first image, snap invisibly back to index 0
    if (index === total) {
      setTimeout(() => {
        carousel.style.transition = 'none';
        index = 0;
        carousel.style.transform = `translateX(0%)`;
      }, 400);
    }
  }
