<template>
    <b-container class="bv-example-row bv-example-row-flex-cols">
        <b-row aligh-v="start">
            <b-col>
                <b-button v-b-toggle.collapse1 variant="primary" class="m-1" @click="toggleRandom(true)">Use Random data
                </b-button>
                <b-button v-b-toggle.collapse1 variant="primary" class="m-1" @click="toggleRandom(false)">Enter Data
                </b-button>
                <b-collapse id="collapse1" class="mt-2">
                    <b-card>
                        <b-input-group v-if="isRandom">
                            <b-button-group>
                                <b-button @click="generateRandomData(10)" :pressed.sync="myToggle">10 Elements
                                </b-button>
                                <b-button @click="generateRandomData(20)" :pressed.sync="myToggle">20 Elements
                                </b-button>
                                <b-button @click="generateRandomData(50)" :pressed.sync="myToggle">50 Elements
                                </b-button>
                                <b-dropdown split :text="selectedAlgo" slot="append"
                                            @click="sortInput(selectedAlgo, 'random')"
                                            variant="outline-success">
                                    <!--<template v-for="algo in algoTypes">
                                        <b-dropdown-item @click="changeDropdownText(algo)">{{algo}}</b-dropdown-item>
                                    </template>-->
                                </b-dropdown>
                            </b-button-group>
                            <!--<b-btn variant="outline-success" slot="append" @click="sortInput()">Run</b-btn>-->
                        </b-input-group>
                        <b-input-group v-else>
                            <!--<b-form-select v-model="selectedAlgo" :options="algoTypes" class="m-md-2"></b-form-select>-->
                            <b-form-input v-model="workingInput" type="text"
                                          placeholder="Enter a list of numbers separated by commas or space"
                            ></b-form-input>
                            <b-dropdown split :text="selectedAlgo" slot="append"
                                        @click="sortInput(selectedAlgo, 'user')"
                                        variant="outline-success">
                                <!--<template v-for="algo in algoTypes">
                                    <b-dropdown-item @click="changeDropdownText(algo)">{{algo}}</b-dropdown-item>
                                </template>-->
                            </b-dropdown>
                        </b-input-group>
                    </b-card>
                </b-collapse>
            </b-col>
        </b-row>
        <b-row aligh-v="start" v-if="error">
            <b-col>
                <template>
                    <b-alert show variant="danger" fade>{{error}}</b-alert>
                </template>
            </b-col>
        </b-row>
        <b-row aligh-v="start" v-if="showOutput">
            <b-col>
                <b-card title="Input Elements">
                    <column-chart :data="barGraphInput" :stacked="true"></column-chart>
                </b-card>
            </b-col>
        </b-row>
        <b-row aligh-v="start" v-if="showOutput">
            <b-col>
                <b-card :title="bubble">
                    <column-chart :data="bubbleOutput" :stacked="true"></column-chart>
                </b-card>
            </b-col>
            <b-col>
                <b-card :title="selection">
                    <column-chart :data="selectionOutput" :stacked="true"></column-chart>
                </b-card>
            </b-col>
            <div class="w-100"></div>
            <b-col>
                <b-card :title="insertion">
                    <column-chart :data="insertionOutput" :stacked="true"></column-chart>
                </b-card>
            </b-col>
            <b-col>
                <b-card :title="merge">
                    <column-chart :data="mergeOutput" :stacked="true"></column-chart>
                </b-card>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
    import AlgoTypeMappings from '../constants.js'
    import SortingObject from '../sorting.js'

    export default {
        data() {
            return {
                name: 'Sort',
                algoTypes: this.getAlgoTypes(),
                barGraphInput: '',
                barGraphOutput: '',
                workingInput: '',
                error: '',
                ERROR: "Please enter the correct input",
                SELECT_ERROR: 'Please select an algorithm',
                selectedAlgo: 'Run Sorting',
                isRandom: true,
                showOutput: false,
                myToggle: false,
                merge: "Merge Sort",
                insertion: "Insertion Sort",
                selection: "Selection Sort",
                bubble: "Bubble Sort",
                mergeOutput: [],
                selectionOutput: [],
                insertionOutput: [],
                bubbleOutput: [],
                barWidth: 4
            }
        },
        methods: {
            sortInput: function (name, source) {
                if (this.selectedAlgo === this.SELECT_ERROR) {
                    this.error = this.SELECT_ERROR;
                    return;
                }
                if (source === "random") {
                    this.barGraphInput = this.formatOutput(this.workingInput);
                    this.performSort(this.workingInput, null);
                    this.showOutput = true;
                    this.error = '';
                } else {
                    if (this.workingInput === '') {
                        this.error = this.ERROR;
                    } else {
                        try {
                            this.workingInput = this.workingInput.split(/[ ,]+/).filter(Boolean).map(Number);
                            this.barGraphInput = this.formatOutput(this.workingInput);
                            this.performSort(this.workingInput, null);
                            this.showOutput = true;
                            this.error = ''
                        } catch (e) {
                            console.log(e);
                            this.error = this.ERROR
                        }
                    }
                }
            },
            changeDropdownText: function (name) {
                this.showOutput = false;
                this.selectedAlgo = "Run " + name;
            },
            getAlgoTypes: function () {
                let algoTypes = [];
                for (let id in AlgoTypeMappings.ALGOTYPEMAPPING) {
                    if (AlgoTypeMappings.ALGOTYPEMAPPING.hasOwnProperty(id)) {
                        algoTypes.push(id)
                    }
                }
                return algoTypes;
            },
            generateRandomData: function (inputSize) {
                this.showOutput = false;
                this.workingInput = [];
                for (let i = inputSize; i > 0; i--) {
                    this.workingInput.push((Math.floor(Math.random() * 1000) + 100));
                }
            },
            toggleRandom: function (state) {
                this.showOutput = false;
                this.workingInput = '';
                this.error = '';
                this.isRandom = state;
            },
            formatOutput: function (data) {
                let aux = {};
                for (let i = 0; i < data.length; i++) {
                    aux[(i + 1).toString()] = data[i];
                }
                return aux;
            },
            performSort: function (data, type) {
                if (type === null) { // perform all sorts
                    this.bubbleOutput = this.formatOutput(SortingObject.bubbleSort(data.slice(0)));
                    this.selectionOutput = this.formatOutput(SortingObject.selectionSort(data.slice(0)));
                    this.mergeOutput = this.formatOutput(SortingObject.mergeSort(data.slice(0)));
                    this.insertionOutput = this.formatOutput(SortingObject.insertionSort(data.slice(0)));
                } else { // perform a single type of sort
                    console.log("Single sort");
                }
            }
        },
    }
</script>
