import React, { Component } from 'react';
import './sortingVisualizer.css';

class SortingVisualizer extends Component {
    state = { 
        bars: [],
        temp: [],
        x: 0,
        y: 0,
        m: 0,
        isLoading: true
    }
    
    randomIntFromInterval(min, max) {
        // min and max included
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    resetArray = () => {
        //const bars = [...this.state.bars];
        if (this.state.x !== 0 || this.state.y !== 0)
        {
            this.setState({ x: 0 });
            this.setState({ y: 0 });
            window.location.reload();
        }
        const bars = [];
        const temp = [];
        for(var i = 0; i < 40; i++)
        {
            let x = this.randomIntFromInterval(1, 40);
            bars.push({ sel: false, val: x });
            temp.push({ sel: false, val: x });
        }
        this.setState({ bars: bars });
        this.setState({ temp: temp });
        this.setState({ x: 0 });
        this.setState({ y: 0 });
    }

    bubbleSort = (id) => {
        //bars = bars.sort((a, b) => a - b);
        let bars = [...this.state.bars];
        for (var i = this.state.x; i < 40; i++){
            var f = 0;
            if (i === 39) {
                clearInterval(id);
                this.setState({ x: 0 });
                this.setState({ y: 0 });
                this.setState({ temp: bars });
                break;
            }
            for (var j = this.state.y; j < 40 - i - 1; j++){
                if (bars[j].val > bars[j + 1].val)
                { 
                    let t = bars[j].val;
                    bars[j].val = bars[j + 1].val;
                    bars[j + 1].val = t;
                    this.setState({ bars: bars });
                    if (j === 40 - i - 2) {
                        this.setState({ x: i + 1 });
                        this.setState({ y: 0 });
                    }
                    else
                    { 
                        this.setState({ x: i });
                        this.setState({ y: j + 1 });
                    }
                    f = 1;
                    break;
                }
            }
            if (f === 1)
                break;
            this.setState({ x: i + 1 });
            this.setState({ y: 0 });
            break;
        }
    }

    selectionSort = (id) => {
        let bars = [...this.state.bars];
        for (var k = 0; k < 40; k++) {
            bars[k].sel = false;
        }
        for (var i = this.state.x; i < 40; i++){
            if (i === 39) {
                clearInterval(id);
                this.setState({ x: 0 });
                this.setState({ y: 0 });
                this.setState({ m: 0 });
                this.setState({ temp: bars });
                break;
            }
            var m = this.state.m;
            var f = 0;
            for (var j = this.state.y + 1; j < 40; j++){
                if (bars[j].val < bars[m].val)
                    m = j;
                bars[m].sel = true;
                bars[j].sel = true;
                f = 1;
                this.setState({ y: j })
                this.setState({ m: m });
                break;
            }
            if (f === 1)
            {
                break;
            }
            var t = bars[i].val;
            bars[i].val = bars[m].val;
            bars[m].val = t;
            this.setState({ bars: bars });
            this.setState({ x: i + 1 });
            this.setState({ y: i + 1 });
            this.setState({ m: i + 1 });
            break;
        }
    }

    merge = (bars, temp, from, mid, to) => {
        var k = from, i = from, j = mid + 1;
        while (i <= mid && j <= to) { 
            if (bars[i].val < bars[j].val)
                temp[k++].val = bars[i++].val;
            else
                temp[k++].val = bars[j++].val;
        }
        while (i < 40 && i <= mid) { 
            temp[k++].val = bars[i++].val;
        }
        for (j = from; j <= to; j++)
            bars[j].val = temp[j].val;
    }

    mergeSort = (id) => {
        var low = 0;
        var high = 39;
        let bars = [...this.state.bars];
        let temp = [...this.state.temp];
        for (var m = this.state.x + 1; m <= high - low; m = 2 * m)
        {
            var f = 0;
            for (var i = this.state.y; i < high; i += 2 * m)
            {
                //console.log(bars);
                console.log(m, i);
                var from = i;
                var mid = i + m - 1;
                var to = Math.min(i + 2 * m - 1, high);
                this.merge(bars, temp, from, mid, to);
                this.setState({ x: m - 1 });
                this.setState({ y: i + 2 * m });
                this.setState({ bars: bars });
                this.setState({ temp: temp });
                f = 1;
                break;
            }
            if (f === 1)
                break;
            this.setState({ y: 0 });
            if (m * 2 > high - low) {
                clearInterval(id);
                this.setState({ x: 0 });
            }
        }
    }

    insertionSort = (id) => {
        let bars = [...this.state.bars];
        let temp = [...this.state.temp];
        if (this.state.x + 1 === 40)
        {
            this.setState({ x: 0 });
            this.setState({ y: 0 });
            this.setState({ temp: bars });
            clearInterval(id);
            return;
        }
        //console.log(this.state.x + 1);
        for (var i = this.state.x + 1; i < 40; i++)
        {
            var key = temp[i].val;
            var j = this.state.y;
            var f = 0;
            while (j >= 0 && bars[j].val > key)
            {
                //console.log(i, j);
                var t = bars[j + 1].val;
                bars[j + 1].val = bars[j].val;
                bars[j].val = t;
                bars[j].sel = true;
                this.setState({ bars: bars });
                this.setState({ y: j - 1 });
                f = 1;
                break;
            }
            for (var k = 0; k < 40; k++)
                bars[k].sel = false;
            if (f === 1)
                break;
            //bars[j + 1].val = key;
            this.setState({ bars: bars });
            this.setState({ x: i });
            this.setState({ y: i  });
            break;
        }
    }

    sort1 = () => {
        var id = setInterval(() => this.bubbleSort(id), 50);
    }

    sort2 = () => {
        var id = setInterval(() => this.selectionSort(id), 50);
    }

    sort3 = () => {
        var id = setInterval(() => this.mergeSort(id), 300);
    }
    
    sort4 = () => {
        var id = setInterval(() => this.insertionSort(id), 100);
    }

    componentDidMount() {
        setTimeout(() => this.setState({ isLoading: false }), 1500);
        this.resetArray();
    }

    //<button className="btn btn-warning m-2" onClick={() => this.mergeSort(0, 39)}>MergeSort</button>
    render() { 
        return ( 
            this.state.isLoading ?
                <div>
                    <p className="load1">Sorting Visualizer</p>
                    <div className="spinner-border text-primary load"></div>
                </div>
                :
            <div>
                {this.state.bars.map((bar, idx) => bar.sel === false ?
                    (<div key={idx} className="bar1" style={{ height: `${bar.val * 12}px` }}></div>)
                    : (<div key={idx} className="bar2" style={{ height: `${bar.val * 12}px` }}></div>)
                    )}
                <br />
                <button className="btn btn-primary m-2" onClick={this.resetArray}>Get Random Array</button>
                <button className="btn btn-danger m-2" onClick={this.sort1}>BubbleSort</button>
                <button className="btn btn-success m-2" onClick={this.sort2}>SelectionSort</button>
                <button className="btn btn-warning m-2" onClick={this.sort3}>MergeSort</button>
                <button className="btn btn-info m-2" onClick={this.sort4}>InsertionSort</button>
            </div>
         );
    }
}

export default SortingVisualizer;
