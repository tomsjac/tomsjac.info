import gsap from "~/node_modules/gsap";

export const cursor = (element: Element) => {
    let pointer = element;

    const cursormover = (e) => {
        gsap.to( pointer, {
            x : e.clientX ,
            y : e.clientY,
            stagger:.002
        })
    };

    const cursorhover = (e) => {
        gsap.to( pointer,{
            scale:1.2,
            opacity:1
        })
    };

    const cursorhoverlink = (e) => {
        gsap.to( pointer,{
            scale:1.2,
            opacity:1,
            borderColor: '#0072ff'
        })
    };


    const cursor = (e) => {
        gsap.to( pointer, {
            scale:1,
            opacity:.6,
            borderColor: '#fff'
        })
    };

    return {
        cursormover,
        cursorhover,
        cursorhoverlink,
        cursor,
    }
}