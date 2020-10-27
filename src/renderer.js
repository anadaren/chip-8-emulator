class Renderer {
    constructor(scale) {
        this.cols = 64;
        this.rows = 32;

        this.scale = scale;

        this.canvas = document.querySelector('canvas');
        this.ctx = this.canvas.getContext('2d');

        this.canvas.width = this.cols * this.scale;
        this.canvas.height = this.rows * this.scale;

        this.display = new Array(this.cols * this.rows);
    }

    setPixel(x,y) {
        if (x > this.cols) {
            x -= this.cols;
        } else if (x < 0) {
            x += this.cols;
        }

        if (y > this.rows) {
            y -= this.rows;
        } else if (y < 0) {
            y += this.rows;
        }

        let pixelLoc = x + (y * this.cols);
        this.display[pixelLoc] ^= 1;

        return !this.display[pixelLoc];
    }

    renderer() {
        // Clears display every render cycle
        this.cts.clearRect(0, 0, this.canvas.width, this.canvas.height);

        //Loop through display array
        for (let i = 0; i < this.cols * this.rows; i++) {
            //Gets the x position of each pixel
            let x = (i % this.cols) * this.scale;

            //Gets the y position of each pixel
            let y = Math.floor(i / this.cols) * this.scale;

            //If the display == 1, then draw pixel
            if (this.display[i]) {
                //Set pixel color
                this.ctx.fillStyle = '#000000';

                //Put pixel at an (x,y) position
                this.ctx.fillRect(x, y, this.scale, this.scale);
            }
        }
    }

    testRender() {
        this.setPixel(0,0);
        this.setPixel(5,2);
    }

    clear() {
        this.display = new Array(this.cols * this.rows);
    }
}

export default Renderer;