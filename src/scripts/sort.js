class BubbleSort{
    callback(x, y){
        (x < y) ? -1 : 1
    }

    bubbleSort(){
        if (this.length < 2) return this;
        let that = this.slice();
        let sorted = false;
        while (!sorted){
            sorted = true;
            for (let i = 0; i < that.length - 1; i++) {
                that.callback(that[i], that[i+1]) = 1
                sorted = false
                [that[i], that[i + 1]] = [that[i + 1], that[i]]
            }
        }
        return that
    }
}

export default BubbleSort;


class QuickSort{

 setup() {
    createCanvas(windowWidth, windowHeight);
     let values = [];
     let w = 10;
     let states = [];
    values = new Array(floor(width / w));
    for (let i = 0; i < values.length; i++) {
        values[i] = random(height);
        states[i] = -1;
    }
    quickSort(values, 0, values.length - 1);
}
    
    async quickSort(arr, start, end) {
        if (start >= end) {
            return;
        }
        let index = await partition(arr, start, end);
        states[index] = -1;

        await Promise.all([
            quickSort(arr, start, index - 1),
            quickSort(arr, index + 1, end)
        ]);
    }


    async  partition(arr, start, end) {

        for (let i = start; i < end; i++) {
            states[i] = 1;
        }

        let pivotValue = arr[end];
        let pivotIndex = start;
        states[pivotIndex] = 0;
        for (let i = start; i < end; i++) {
            if (arr[i] < pivotValue) {
                await swap(arr, i, pivotIndex);
                states[pivotIndex] = -1;
                pivotIndex++;
                states[pivotIndex] = 0;
            }
        }

        await swap(arr, pivotIndex, end);
        for (let i = start; i < end; i++) {
            if (i != pivotIndex) {
                states[i] = -1;
            }
        }
        return pivotIndex;
    }

    draw() {
        background(0);

        for (let i = 0; i < values.length; i++) {
            noStroke();
            if (states[i] == 0) {
                fill('#E0777D');
            } else if (states[i] == 1) {
                fill('#D6FFB7');
            } else {
                fill(255);
            }
            rect(i * w, height - values[i], w, values[i]);
        }
    }

    async  swap(arr, a, b) {
        await sleep(50);
        let temp = arr[a];
        arr[a] = arr[b];
        arr[b] = temp;
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
        
}

export default QuickSort;