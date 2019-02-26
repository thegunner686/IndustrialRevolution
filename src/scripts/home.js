(function() {
    let canvas = document.createElement("canvas"),
        ctx = canvas.getContext("2d"),
        width = canvas.width = window.innerWidth,
        height = canvas.height = window.innerHeight;


    // canvas styling
    canvas.style.position = "absolute";
    canvas.style.left = "0px";
    canvas.style.top = "0px";

    document.getElementById("page-container").appendChild(canvas);

    // BackgroundAnimation
    let backgroundAnimation = new BackgroundAnimationHome(canvas, width, height);
}());