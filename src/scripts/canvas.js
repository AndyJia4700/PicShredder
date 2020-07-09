class canvas{

    constructor(){
        this.canvas = document.getElementById('image');
        this.ctx = this.canvas.getContext('2d');
        this.chooseImage();
    }

    chooseImage(){
        const img = document.getElementById('parent-img');
        // debugger;
        img.addEventListener('change', function(){
            Window.localStorage.setItem('setImg', img.src);
        });

        let src = localStorage.getItem('setImg');
        if (src) img.src = src;
        
        this.ctx.drawImage(img, 0, 0, 500, 500);

        if (img.src) {
            this.chooseGrid();
        }
    }

    chooseGrid(){
        const grid = document.getElementById("grid");
        grid.addEventListener("change", function () {
            localStorage.setItem("selValue", grid.value);
        });

        let val = localStorage.getItem("selValue");
        if (val) grid.value = val;

        this.clickCropImage(val);
    }

    
    clickCropImage(grid){
        const dalta = 0;
        const canvasH = this.canvas.clientHeight;
        const canvasW = this.canvas.clientWidth;
        
        let i = 0;
        
        const ul = document.createElement('ul')
        ul.id = "child-img-ul"
        
        document.getElementById("dashboard").append(ul);
        
        
        for (let x = 0; x < grid; x++) {
            for (let y = 0; y < grid; y++) {
                this.cropImage(this.canvas, (x * canvasW/grid) - dalta, (y * canvasH/grid) - dalta, canvasW/grid, canvasH/grid, i);
                i++;
            }
        } 

        this.buttons();
        this.shuffle();
        document.getElementById("shuffle-btn").addEventListener("click", () => {
            location.reload();
            return false;
        });
        this.clicks();
    }

    buttons(){

        const qbtn = document.createElement("BUTTON");
        qbtn.innerHTML = "QUICK SORT";
        qbtn.id = "quick-btn";
        qbtn.className="sort-btns";
        document.getElementById("sort-btns").appendChild(qbtn);

        const bbtn = document.createElement("BUTTON");
        bbtn.innerHTML = "BUBBLE SORT";
        bbtn.id = "bubble-btn";
        bbtn.className = "sort-btns";
        document.getElementById("sort-btns").appendChild(bbtn);

        const mbtn = document.createElement("BUTTON");
        mbtn.innerHTML = "MERGE SORT";
        mbtn.id = "merge-btn";
        mbtn.className = "sort-btns";
        document.getElementById("sort-btns").appendChild(mbtn);
    }

    clicks(){
        let arr = [];
        let shuffled = [];
        shuffled = document.querySelectorAll("img");
        for (let idx = 1; idx < shuffled.length; idx++) {
          arr = arr.concat([[shuffled[idx].className, shuffled[idx]]]);
        }
        
        const bgm = document.getElementById("bgm");
        document.getElementById("quick-btn").addEventListener("click", () => {
            this.quickSort(arr);
            bgm.play();
        });

        document.getElementById("bubble-btn").addEventListener("click", () => {
            this.bubbleSort(arr);
            bgm.play();
        });

        document.getElementById("merge-btn").addEventListener("click", () => {
            this.mergeSort(arr);
            bgm.play();
        });
    }


    callback(x, y) {
       if(x < y) return -1;
        return 1;
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

    bubbleSort(arr){
        if (arr.length < 2) return arr;

        let sorted = false;
        while (!sorted) {
          sorted = true;
          for (let i = 0; i < arr.length - 1; i++) {
            if (this.callback( parseInt(arr[i]), parseInt(arr[i + 1]) ) === 1) {
              sorted = false;
              [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
            }
          }
        }
        this.restore(arr);
        return arr;
    }

    mergeSort(arr){
        if (arr.length < 2) return arr;
        const midpoint = Math.floor(arr.length/2);
        const left = this.mergeSort(arr.slice(0, midpoint));
        const right = this.mergeSort(arr.slice(midpoint));

        return this.merge(left, right);
    }

    merge(left, right){
        let merged = [];
        while (left.length && right.length){
            switch (this.callback( parseInt(left[0][0]), parseInt(right[0][0]) )) {
                case -1:
                    merged.push(left.shift());
                    break;
                case 1:
                    merged.push(right.shift());
                    break;
            }
        }
        merged = merged.concat(left, right);
        this.restore(merged);
        
        return merged;
        // bgm.pause();
    }

    
    restore(arr){
        let rate = document.getElementById("speed").value;

        for (let idx = 0; idx < arr.length; idx++) {
            (function (ind) {
                setTimeout(function () {
                    const sortImg = document.getElementById("child-img-ul");                    
                    sortImg.append(arr[idx][1]);
                }, 100 + rate * ind);
            })(idx);
        }
    }

    shuffle(){
        
        const ul = document.querySelector('ul');
        for (let i = ul.children.length; i >= 0; i--) {
            ul.append(ul.children[Math.random() * i | 0]);
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