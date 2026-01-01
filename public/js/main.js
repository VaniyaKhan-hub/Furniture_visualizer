


const thumbnail = document.querySelectorAll('.prod-thumbnails img');
const mainimg = document.getElementById('main-image');

thumbnail.forEach(thumb =>{
    thumb.addEventListener('click' , ()=>{
        const newsrc = thumb.getAttribute('data-src');
        mainimg.setAttribute('src' , newsrc);
    });
});