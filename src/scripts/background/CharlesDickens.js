class BackgroundImage {
    constructor(c, src) {
        //let src = "https://m.media-amazon.com/images/M/MV5BNGQ1NGQxNjMtNGQzMi00MzU1LTgyOGUtN2ZhNTYwZDI1Mzc3L2ltYWdlL2ltYWdlXkEyXkFqcGdeQXVyMTc4MzI2NQ@@._V1_.jpg";

        let fakeCanvas = document.createElement("canvas"),
            path = "https://m.media-amazon.com/images/M/MV5BNGQ1NGQxNjMtNGQzMi00MzU1LTgyOGUtN2ZhNTYwZDI1Mzc3L2ltYWdlL2ltYWdlXkEyXkFqcGdeQXVyMTc4MzI2NQ@@._V1_.jpg",
            ctx = fakeCanvas.getContext("2d"),
            imageObject = new Image,
            data = null;

        fakeCanvas.style.display = "none";
        imageObject.style.display = "none";


        imageObject.addEventListener("load", (e) => {
            fakeCanvas.width = e.target.width;
            fakeCanvas.height = e.target.height;
            document.body.appendChild(fakeCanvas);
            ctx.drawImage(e.target, 0, 0);
            let raw = ctx.getImageData(0, 0, e.target.width, e.target.height),
                data = raw.data,
                width = raw.width,
                height = raw.height,
                jsonData = [];
            
            for(let i = 0; i < data.length; i+=4) {
                let r = data[i],
                    g = data[i+1],
                    b = data[i+2],
                    a = data[i+3],
                    mean = (r + g + b) / 3;

                if(mean > 150) {
                    data[i+3] = 0;
                } else {
                    data[i] = 0;
                    data[i+1] = 0;
                    data[i+2] = 0;
                    data[i+3] = 1;
                }
            }

            console.log(raw);
            c.putImageData(raw, 0, 0);

        });


        imageObject.crossOrigin = "";
        imageObject.src = path;
        document.body.appendChild(imageObject);
    }
}