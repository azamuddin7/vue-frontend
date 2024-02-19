<template>
    <div class="container mt-5">
        <div class="card">
            <div class="card-header">
                <h4>Edit Shape</h4>
            </div>
            <div class="card-body">
                <ul class="alert alert-warning" v-if="Object.keys(this.errorList).length > 0">
                    <li class="mb-0 ms-3" v-for="(error, index) in this.errorList" :key="index">
                        {{ error[0] }}
                    </li>
                </ul>
                <div class="mb-3">
                    <label for="">Name</label>
                    <input type="text" v-model="model.shape.name" class="form-control" />
                </div>
                <div class="mb-3">
                    <label for="">Shape</label>
                    <select class="form-select"  v-model="model.shape.shape" aria-label="Default select example">
                        <option value="circle">Circle</option>
                        <option value="rectangle">Rectangle</option>
                        <option value="square">Square</option>
                        <option value="star">Star</option>
                        <option value="triangle">Triangle</option>
                    </select>
                </div>
                <div class="mb-3">
                    <label for="">Color</label>
                    <input type="color" class="form-control form-control-color" v-model="model.shape.color" title="Choose your color">
                </div>
                <div class="mb-3">
                    <label for="">Timestamp</label>
                    <VueDatePicker v-model="model.shape.timestamp"></VueDatePicker>
                </div>
                <div class="mb-3">
                    <button type="button" @click="updateShape" class="btn btn-primary">Update</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from '@/axios-config';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import { API_LOCATION } from '@/config/index.js';

export default {
    name: 'editShape',
    components: { VueDatePicker },
    data(){
        return {
            shapeId: '',
            errorList: '',
            model: {
                shape: {
                    name: '',
                    shape: '',
                    color: '',
                    timestamp: ''
                }
            }
        }
    },
    mounted(){

        // to get id from url params
        // console.log(this.$route.params.id);
        this.shapeId = this.$route.params.id;
        this.getShapeData(this.$route.params.id);
    },
    methods:{
        getShapeData(shapeId){
            axios.get(API_LOCATION + `/shapes/${shapeId}`)
            .then(res=>{
                this.model.shape = res.data.data;
            })
            .catch(function(error){
                if(error.response){
                    // if fails 404, will shows popup error message
                    if(error.response.status == 404){
                        alert(error.response.data.data);
                    }
                }
            });
        },
        updateShape(){
            var mythis = this;
            // Convert timestamp to Date object
            const date = new Date(this.model.shape.timestamp);
            // Add 8 hours (8 * 60 * 60 * 1000 milliseconds) to the timestamp
            date.setTime(date.getTime() + (8 * 60 * 60 * 1000));
            // Convert the adjusted timestamp to ISO format
            const timestamp = date.toISOString().slice(0, 19).replace('T', ' ');
            this.model.shape.timestamp = timestamp;
            axios.put(API_LOCATION + `/shapes/${this.shapeId}`, this.model.shape)
            .then(res=>{
                alert("Successfully update shape!");

                // clear errorList when record is successfully updated
                this.errorList = ''
            })
            .catch(function(error){
                if(error.response){
                    // if fails 422, will shows validation error message
                    if(error.response.status == 422){
                        mythis.errorList = error.response.data.data;
                    }
                    // if fails 404, will shows popup error message
                    if(error.response.status == 404){
                        alert(error.response.data.data);
                    }
                }
            })
        }
    }
}
</script>