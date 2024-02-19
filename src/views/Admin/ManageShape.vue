<template>
    <div class="container">
        <div class="card">
            <div class="card-header">
                <h4>
                    List of Shapes
                    <RouterLink to="/admin/shapes/create" class="btn btn-primary float-end">
                        Add Shape
                    </RouterLink>
                </h4>
            </div>
            <div class="card-body">
                <div class="overflow-auto">
                <table class="table table-bordered">
                    <thead>
                        <tr>
                            <th>Timestamp</th>
                            <th>Name</th>
                            <th>Shape</th>
                            <th>Color</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody v-if="this.shapes.length > 0">
                        <tr v-for="(shape, index) in this.shapes" :key="index">
                            <td>{{ shape.timestamp }}</td>
                            <td>{{ shape.name }}</td>
                            <td>{{ shape.shape }}</td>
                            <td> <span class="color-circle" :style="{ backgroundColor: shape.color }"></span></td>
                            <td>
                                <RouterLink :to="{path: '/admin/shapes/' +shape.id+'/edit'}" class="btn btn-success">
                                    Edit
                                </RouterLink>
                                <button type="button" @click="deleteShape(shape.id)" class="btn btn-danger">Delete</button>
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
  .color-circle {
    display: inline-block;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    margin-top: 7%;
}
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
        // console.log('i am here')
        this.getShapes();
    },
    methods: {
        getShapes(){
            axios.get(API_LOCATION + '/shapes').then(res=>{
                this.shapes = res.data.data;
            });
        },
        deleteShape(shapeId){
            if(confirm('Are you sure, you want to delete this data?')){
                axios.delete(API_LOCATION + `/shapes/${shapeId}`).then(res=>{
                    
                    alert('Shape delete successfully!');
                    this.getShapes();
                })
                .catch(function(error){
                    if(error.response){
                        if(error.response.status == 404){
                            alert(error.response.data.data);
                        }
                    }
                });
            }
        }
    }
}
</script>