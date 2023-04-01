//DROP-DOWN MENU FUNCTION
const boton_nav = document.querySelector('.gear_icon')
const menu = document.querySelector('.setup_menu')


boton_nav.addEventListener('click', ()=>{
    menu.classList.toggle("spread")
})

window.addEventListener('click', e =>{
    if(menu.classList.contains('spread') 
        && e.target != menu && e.target != boton_nav){
        console.log('cerrar')
        menu.classList.toggle("spread")
    }
})


