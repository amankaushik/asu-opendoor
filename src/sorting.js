function bubbleSort(data) {
    for (let low = 1; low < data.length; low++) {
        for (let high = data.length - 1; high >= low; high--) {
            if (data[high - 1] > data[high]) {
                let temp = data[high - 1];
                data[high - 1] = data[high];
                data[high] = temp;
            }
        }
    }
    return data;
}

function selectionSort(data) {
    for (let bottom = 0; bottom < data.length; bottom++) {
        let midIndex = bottom;
        for (let i = bottom + 1; i < data.length; i++) {
            if (data[i] < data[midIndex]) {
                midIndex = i;
            }
        }
        let temp = data[bottom];
        data[bottom] = data[midIndex];
        data[midIndex] = temp;
    }
    return data;
}

function insertionSort(data) {
    for (let currPos = 1; currPos < data.length; currPos++) {
        let insPos = findInsPosition(data, currPos - 1, data[currPos]);
        insertAtPosition(data, insPos, currPos);
    }
    return data;
}

function findInsPosition(data, range, pos) {
    let i = 0, k = -1, index = -1;
    let j = range;
    do {
        k = Math.floor((i + j) / 2);
        if (pos >= data[k]) {
            i = k + 1;
        } else {
            j = k - 1;
        }
    } while (i <= j);
    if (pos >= data[k]) {
        index = k + 1;
    } else {
        index = k;
    }
    return index;
}

function insertAtPosition(data, insPos, fromPos) {
    if (insPos === fromPos)
        return;
    let temp = data[fromPos];
    for (let i = fromPos; i > insPos; i--) {
        data[i] = data[i - 1];
    }
    data[insPos] = temp;
}

// REF: https://khan4019.github.io/front-end-Interview-Questions/sort.html#mergeSort
function mergeSort(data) {
    if (data.length === 1) {
        return data;
    }
    let middle = Math.floor(data.length / 2);
    let left = data.slice(0, middle);
    let right = data.slice(middle);
    return merge(mergeSort(left), mergeSort(right));
}

function merge(left, right) {
    let i = 0, j = 0;
    let rtr = [];
    while (i < left.length && j < right.length) {
        if (left[i] < right[j]) {
            rtr.push(left[i++]);
        } else {
            rtr.push(right[j++]);
        }
    }
    return rtr.concat(left.slice(i)).concat(right.slice(j));
}

export default {bubbleSort, selectionSort, insertionSort, mergeSort}
