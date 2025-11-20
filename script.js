// Dropdown hover and leave behavior
(function(){
  const servicesItem = document.getElementById('services-item');
  const servicesDropdown = document.getElementById('services-dropdown');

  if(servicesItem && servicesDropdown){
    // Use mouseenter/mouseleave to add/remove class so the dropdown will show on hover
    servicesItem.addEventListener('mouseenter', ()=>{
      servicesItem.classList.add('open');
      servicesDropdown.setAttribute('aria-hidden','false');
    });

    servicesItem.addEventListener('mouseleave', ()=>{
      servicesItem.classList.remove('open');
      servicesDropdown.setAttribute('aria-hidden','true');
    });

    // Also close if focus leaves (keyboard users)
    servicesItem.addEventListener('focusout', (e)=>{
      // if the newly focused element is outside servicesItem, close
      if(!servicesItem.contains(e.relatedTarget)){
        servicesItem.classList.remove('open');
        servicesDropdown.setAttribute('aria-hidden','true');
      }
    });
  }

  // Modal behavior for contact
  const contactBtns = document.querySelectorAll('#contactBtn, #heroContact');
  const modalOverlay = document.getElementById('modalOverlay');
  const modalClose = document.getElementById('modalClose');
  const modalCancel = document.getElementById('modalCancel');
  const contactForm = document.getElementById('contactForm');

  function openModal(){
    modalOverlay.classList.add('is-open');
    modalOverlay.setAttribute('aria-hidden','false');
    document.body.style.overflow = 'hidden';
    // focus first input
    const first = modalOverlay.querySelector('input, textarea, button');
    if(first) first.focus();
  }
  function closeModal(){
    modalOverlay.classList.remove('is-open');
    modalOverlay.setAttribute('aria-hidden','true');
    document.body.style.overflow = '';
  }

  contactBtns.forEach(btn => btn && btn.addEventListener('click', (e)=>{ e.preventDefault(); openModal(); }))
  modalClose && modalClose.addEventListener('click', closeModal);
  modalCancel && modalCancel.addEventListener('click', closeModal);

  // clicking outside modal closes
  modalOverlay && modalOverlay.addEventListener('click', (e)=>{
    if(e.target === modalOverlay){
      closeModal();
    }
  });

  // Escape key closes
  document.addEventListener('keydown', (e)=>{
    if(e.key === 'Escape' && modalOverlay && modalOverlay.classList.contains('is-open')){
      closeModal();
    }
  });

  // handle form submit (demo: just close and show message)
  if(contactForm){
    contactForm.addEventListener('submit', (e)=>{
      e.preventDefault();
      // simple success feedback for demo
      const submit = contactForm.querySelector('button[type="submit"]');
      submit.textContent = 'Sending...';
      setTimeout(()=>{
        submit.textContent = 'Send';
        closeModal();
        alert('Message sent (demo).');
        contactForm.reset();
      }, 800);
    });
  }

  // set current year in footer
  const yearEl = document.getElementById('year');
  if(yearEl) yearEl.textContent = new Date().getFullYear();
})();


const mobileMenuBtn = document.getElementById("mobileMenuBtn");
const mainNav = document.querySelector(".main-nav");

mobileMenuBtn.addEventListener("click", () => {
  mainNav.classList.toggle("active");
});
