<template>
    <div class="container">
        <div class="card">
            <div class="card-header">
                <h4>List of Shapes</h4>
            </div>
            <div class="card-body">
                <div class="overflow-auto">
                    <table class="table table-bordered">
                        <thead>
                            <tr>
                                <th>Timestamp</th>
                                <th>Name</th>
                                <th>Shapecolor</th>
                            </tr>
                        </thead>
                        <tbody v-if="this.shapes.length > 0">
                            <tr v-for="(shape, index) in this.shapes" :key="index">
                                <td>{{ shape.timestamp }}</td>
                                <td>{{ shape.name }}</td>
                                <td>
                                    <div class="shape-color">
                                        <svg v-if="shape.shape === 'rectangle'" class="shape" viewBox="0 0 50 25" fill="black" stroke="black" :style="{ fill: shape.color, width: '50px', height: '25px' }">
                                            <rect width="50" height="25"/>
                                        </svg>
                                        <svg v-else-if="shape.shape === 'triangle'" class="shape" viewBox="0 0 50 50" fill="black" stroke="black" :style="{ fill: shape.color, width: '50px', height: '50px' }">
                                            <polygon points="25,0 50,50 0,50"/>
                                        </svg>
                                        <svg v-if="shape.shape === 'square'" class="shape" viewBox="0 0 50 50" fill="black" stroke="black" :style="{ fill: shape.color, width: '50px', height: '50px' }">
                                            <rect width="50" height="50"/>
                                        </svg>
                                        <svg v-if="shape.shape === 'star'" class="shape" viewBox="0 0 50 50" fill="black" stroke="black" :style="{ fill: shape.color, width: '50px', height: '50px' }">
                                            <polygon points="25,0 30.9,19.1 50,19.1 34.8,30.9 40.7,50 25,40.7 9.3,50 15.2,30.9 0,19.1 19.1,19.1"/>
                                        </svg>
                                        <svg v-if="shape.shape === 'circle'" class="shape" viewBox="0 0 50 50" fill="black" stroke="black" :style="{ fill: shape.color, width: '50px', height: '50px' }">
                                            <circle cx="25" cy="25" r="25"/>
                                        </svg>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                        <tbody v-else>
                            <tr>
                                <td colspan="5">Loading...</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
</style>

<script>
import axios from '@/axios-config';
import { API_LOCATION } from '@/config/index.js';

export default{
    name: 'shapes',
    data(){
        return {
            shapes: [],
            perPage:10,
            currentPage:1
        }
    },

    mounted(){
        this.getShapes();
    },
    methods: {
        getShapes(){
            axios.get(API_LOCATION + '/shapes').then(res=>{
                this.shapes = res.data.data;
            });
        }
    }
}
</script>