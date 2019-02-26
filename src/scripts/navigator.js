class Navigator {
    constructor(node) {
        let canvas = document.createElement("canvas"),
            ctx = canvas.getContext("2d"),
            width = canvas.width = 100, // window.innerWidth,
            height = canvas.height = 100, // window.innerHeight;
            hidden = false;

        canvas.style.position = "absolute";
        canvas.style.left = "0px";
        canvas.style.top = "0px";
        
        node.appendChild(canvas);

        function toCornerNav() {
            animateCanvasSize(100, 100);
        }

        function toCenterNav() {
            animateCanvasSize(window.innerWidth, window.innerHeight)
        }

        function animateCanvasSize(tw, th) {
            let targetWidth = tw,
                targetHeight = th,
                diffW = canvas.width - targetWidth,
                diffH = canvas.height - targetHeight,
                incW = Math.abs(diffW)/ 100,
                incH = Math.abs(diffH) / 100,
                stW = canvas.width,
                stH = canvas.height,
                i = 0,
                doneW = false,
                doneH = false;
        
            let anim = setInterval(function() {

                if(doneW && doneH) {
                    console.log("done'0;")
                    clearInterval(anim);
                    return;
                }
                if(Math.abs(canvas.width - targetWidth) <= incW) {
                    canvas.width = targetWidth;
                    console.log("okgg")
                    doneW = true;
                } else {
                    canvas.width = stW - Math.sin(i) * diffW;//-(Math.abs(diffW) / diffW) * incW;
                }

                if(Math.abs(canvas.height - targetHeight) <= incH) {
                    canvas.height = targetHeight;
                    doneH = true;
                } else {
                    canvas.height = stH - Math.sin(i) * diffH;// -(Math.abs(diffH) / diffH) * incH;
                }

                i += 0.01;
            }, 10 );
        }

        render();

        toCenterNav();

        function render() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = "rgba(10, 10, 10, 0.9)";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            

            requestAnimationFrame(render);
        }
    }
}