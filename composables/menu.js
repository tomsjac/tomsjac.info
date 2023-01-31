export const state = reactive({
    menu : [
        {
          title    : 'Index',
          to       : '/',
          isActive : false,
        },
        {
          title    : 'About',
          to       : '/about',
          isActive : false,
        }
    ]
})


export const menuTrait = () => {
   
    const handleNavClick = (item) => {
        state.menu.forEach(el => {
            el.isActive = false;
        })
        state.menu[item].isActive = true;    
    }


    return {
        handleNavClick,
    }
}
