(function() {
    let canvas = document.getElementById("fourier"),
        ctx = canvas.getContext("2d"),
        width = canvas.width = 200,
        height = canvas.height = 200;


    // canvas styling
    // canvas.style.position = "absolute";
    // canvas.style.left = "0px";
    // canvas.style.top = "0px";

    //document.getElementById("page-container").appendChild(canvas);

    // BackgroundAnimation
    let backgroundAnimation = new BackgroundAnimation(canvas, width, height);
}());