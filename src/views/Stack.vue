<template>
    <b-container class="bv-example-row stack bv-example-row-flex-cols">
        <br/>
        <b-row class="justify-content-md-center">
            <b-col>
                <b-form inline>
                    <b-input v-model="charToPush" class="mb-2 mr-sm-2 mb-sm-0"></b-input>
                    <b-button @click="pushToStack" variant="outline-success">Push</b-button>
                </b-form>
            </b-col>
            <b-col col lg="2">
                <b-button @click="popFromStack" variant="danger">Pop</b-button>
                |
                <b-button @click="clearStack" variant="warning">Clear</b-button>
            </b-col>
        </b-row>
        <br/>
        <b-row v-if="error" class="justify-content-md-center">
            <b-col>
                <b-alert show variant="danger">{{error}}</b-alert>
            </b-col>
        </b-row>
        <b-row>
            <b-container fluid id="visual">
                <h1>
                    <template v-for="(data) in this.data">
                        <b-badge class="mb-2 mr-sm-2 mb-sm-0" :variant="data.variant">{{data.value}}</b-badge>
                    </template>
                </h1>
            </b-container>
        </b-row>
        <br/>
        <b-row v-if="stackState() === -1">
                <b-col>
                    <b-alert show variant="info">{{validNeutral}}</b-alert>
                </b-col>
        </b-row>
        <template v-else>
            <b-row v-if="stackState() === 1" class="justify-content-md-center">
                <b-col>
                    <b-alert show variant="success">{{validTrue}}</b-alert>
                </b-col>
            </b-row>
            <b-row v-else class="justify-content-md-center">
                <b-col>
                    <b-alert show variant="danger">{{validFalse}}</b-alert>
                </b-col>
            </b-row>
        </template>
    </b-container>
</template>

<script>
    import Pairing from '../constants.js'

    export default {
        name: 'stack',
        /*mounted: function () {
            this.vis = this.renderSVG();
        },*/
        data() {
            return {
                charToPush: '',
                data: [],
                PUSH_ERROR: 'Please enter one of "[, ], {, }, (, )"',
                POP_ERROR: 'Cannot remove element from an empty Stack!',
                error: '',
                validTrue: 'Stack is valid :)',
                validFalse: 'Stack is not valid :(',
                validNeutral: 'Stack is empty! :|'
            }
        },
        methods: {
            /*renderSVG: function () {
                let svg = d3.select('#visual').append('svg');
                let options = {fontsize: 12};
                return AV.illustrateArray([], svg, options);
            },*/
            pushToStack: function () {
                if (this.isCorrect(this.charToPush)) {
                    this.data.push(this.getPair(this.charToPush));
                    this.error = '';
                } else {
                    this.error = this.PUSH_ERROR;
                }
            },
            popFromStack: function () {
                this.error = '';
                if (this.data.pop() === undefined) {
                    this.error = this.POP_ERROR;
                }
            },
            clearStack: function () {
                this.error = '';
                this.data = [];
            },
            isCorrect: function (ch) {
                return ch === '{' || ch === '}' || ch === '[' || ch === ']' || ch === '(' || ch === ')';
            },
            getRandomVariant: function () {
                let choices = ["light", "dark", "primary", "success", "danger", "info", "secondary", "warning"];
                return choices[Math.floor(Math.random() * choices.length)];
            },
            getPair: function (ch) {
                return {value: ch, variant: Pairing.PAIR[ch]};
            },
            isValid: function () {
                if (this.data.length === 0) {
                    return null;
                }
                let stack = [];
                for (let i = 0; i < this.data.length; i++) {
                    if (this.data[i].value === '(' || this.data[i].value === '[' || this.data[i].value === '{') {
                        stack.push(this.data[i].value);
                    } else {
                        let top = stack.pop();
                        if (top === undefined) {
                            return false;
                        } else {
                            if (!((top === '(' && this.data[i].value === ')') || (top === '[' && this.data[i].value === ']') || (top === '{' && this.data[i].value === '}'))) {
                                return false;
                            }
                        }
                    }
                }
                return 0 === stack.length;
            },
            stackState: function () {
               if (this.isValid() === null) {
                   return -1;
               } else if (this.isValid()) {
                   return 1;
               } return 0;
            }
        }
    }
</script>
