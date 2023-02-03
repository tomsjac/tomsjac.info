export const txtRotate = () => {
   
    let toRotate = [] as Array<string>;
    let el = null as HTMLElement|null;
    let loopNum = 0 as number;
    let period = 2000 as number;
    let txt = '' as string;
    let isDeleting = false as boolean;

    const start = (element:HTMLElement, txtRotate:Array<string>, delay:string) => {
        toRotate = txtRotate;
        el = element;
        period = parseInt(delay, 10);
        tick();
    };

    const tick = () => {
        let i = loopNum % toRotate.length;
        let fullTxt = toRotate[i];

        if (isDeleting) {
            txt = fullTxt.substring(0, txt.length - 1);
        } else {
            txt = fullTxt.substring(0, txt.length + 1);
        }

        el.getElementsByClassName('wrap')[0].innerHTML = txt;

        let delta = 200 - Math.random() * 100;
        if (isDeleting) { delta /= 2; }
        if (!isDeleting && txt === fullTxt) {
            delta = period;
            isDeleting = true;
        } else if (isDeleting && txt === '') {
            isDeleting = false;
            loopNum++;
            delta = 100;
        }

        setTimeout (function () {
            tick();
        }, delta)
    };

    return {
        start,
    }
}