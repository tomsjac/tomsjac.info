import gsap from "~/node_modules/gsap";

export const cursor = () => {
    let pointer = document.querySelector('#cursor');

    /*
    const applyForElement = (item) => {
        item.forEach((item) => {
            
            item.addEventListener("mouseover", (e) => {
              if(e.target.classList.contains('withLink')){
                  cursor().cursorHoverLink(e);
              }else{
                  cursor().cursorHover(e);
              }
            })
      
            item.addEventListener("mouseout", (e) => {
                cursor().cursorDefault(e);
            })
        });
    }
    */


    const cursorMover = (e) => {
        gsap.to( pointer, {
            x : e.clientX ,
            y : e.clientY,
            stagger:.002
        })
    };

    const cursorHover = (e) => {
        gsap.to( pointer,{
            scale:1.2,
            opacity:1
        })
    };

    const cursorHoverLink = (e) => {
        gsap.to( pointer,{
            scale:1.2,
            opacity:1,
            borderColor: '#0072ff'
        })
    };


    const cursorDefault = (e) => {
        gsap.to( pointer, {
            scale:1,
            opacity:.6,
            borderColor: '#fff'
        })
    };

    return {
        //applyForElement,
        cursorMover,
        cursorHover,
        cursorHoverLink,
        cursorDefault,
    }
}