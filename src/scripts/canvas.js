class canvas{

    constructor(){
        this.canvas = document.getElementById('image');
        this.ctx = this.canvas.getContext('2d');
        this.img = document.getElementById('parent-img');
        this.ctx.drawImage(this.img, 0, 0, 500, 500);
        this.clickCropImage();
        // this.restore = this.restore.bind(this);
    }

    
    clickCropImage(){
        // debugger;
        const grid = 12;
        const dalta = 0;
        const canvasH = this.canvas.clientHeight;
        const canvasW = this.canvas.clientWidth;
        
        let i = 0;
        
        const ul = document.createElement('ul')
        ul.id = "child-img-ul"
        document.body.append(ul);
        
        for (let x = 0; x < grid; x++) {
            for (let y = 0; y < grid; y++) {
                this.cropImage(this.canvas, (x * canvasW/grid) - dalta, (y * canvasH/grid) - dalta, canvasW/grid, canvasH/grid, i);
                i++;
            }
        } 
        this.shuffle();

        let arr = [];
        let shuffled = [];
        shuffled = document.querySelectorAll("img");
        for (let idx = 1; idx < shuffled.length; idx++) {
            arr = arr.concat([[shuffled[idx].className, shuffled[idx]]])
            // document.body.append(shuffled[idx]);
        }        
        this.quickSort(arr); 
    }


    quickSort(arr){
        if (arr.length < 2) return arr;
        const pivot = arr[0];
        let left = arr.slice(1).filter((el) => this.callback(parseInt(el[0]), parseInt(pivot[0])) === -1);
        let right = arr.slice(1).filter((el) => this.callback(parseInt(el[0]), parseInt(pivot[0])) !== -1);
        left = this.quickSort(left);
        right = this.quickSort(right);

        const sorted = left.concat([pivot]).concat(right);
        this.restore(sorted);
        return sorted
    }
    
    
    restore(arr){
        for (let idx = 0; idx < arr.length; idx++) {
            (function (ind) {
                setTimeout(function () {
                    const sortImg = document.getElementById("child-img-ul");                    
                    sortImg.append(arr[idx][1]);              
                }, 100 + 100 * ind);
            })(idx);
        }
    }

    callback(x, y) {
       if(x < y) return -1;
        return 1;
    }

    shuffle(){
        const ul = document.querySelector('ul');
        for (let i = ul.children.length; i >= 0; i--) {
            ul.appendChild(ul.children[Math.random() * i | 0]);
        }
    }

    cropImage(targetCanvas, y, x, width, height, i){
        const targetctx = targetCanvas.getContext('2d');
        const targetctxImageData = targetctx.getImageData(x, y, width, height);
        const c = document.createElement('canvas');
        const ctx = c.getContext('2d');
        c.width = width;
        c.height = height;
        ctx.rect(0, 0, width, height);
        ctx.fillStyle = 'white';
        ctx.fill();
        ctx.putImageData(targetctxImageData, 0, 0);
        const img = document.createElement('img');
        img.src = c.toDataURL('image/jpeg', 0.5);
        img.id = "child-img";
        img.className += i;
        document.getElementById('child-img-ul').appendChild(img);
    }
}

export default canvas;