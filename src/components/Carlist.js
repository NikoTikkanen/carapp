import React, {useState, useEffect} from 'react';

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import { AgGridReact } from 'ag-grid-react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import AddCar from './AddCar';
import {API_URL} from '../constants'
import EditCar from './EditCar';

function Carlist(){

const [cars, setCars] = useState([]);
const [open, setOpen] = useState(false);
const [msg, setMsg] = useState([]);

const [columnDefs] = useState([
    {field: 'brand', sortable: true, filter:true},
    {field: 'model', sortable: true, filter:true},
    {field: 'color', sortable: true, filter:true, width: 150},
    {field: 'fuel', sortable: true, filter:true, width:150},
    {field: 'year', sortable: true, filter:true, width:100},
    {field: 'price', sortable: true, filter:true, width: 150},
    {
        cellRenderer: params =>
        <EditCar updateCar = {updateCar} params={params.data}/>, 
        width:120
    },

    //cellRenderere, voi renderoidä minkä tahansa propsin taulukkoon.
    {cellRenderer: params => 
        <Button size="small" color="error" onClick={() => deleteCar(params)}>
            Delete</Button>, 
        width: 120}
    ])
    
    //haetaan autot sivua ladatessa käyttäen getCars funktiota.
    useEffect(() =>{
    getCars()
    },[]);
    
    //luodaan getCars funktio että voidaan hakea autot sivu ladatessa ja 
    //uudestaan auto poistettaessa.
const getCars = () => {
    fetch(API_URL)
    .then(response => response.json())
    .then(data => setCars(data._embedded.cars))
    .catch(err => console.error(err))
}


const deleteCar = (params) => {
    //varmistetaan poisto window.confirm toiminnolla.
    if (window.confirm('Are you sure')){
    fetch(params.data._links.car.href, { method: 'DELETE'})
    .then(response => {
        if (response.ok){
            setMsg('Car deleted succesfully');
            setOpen(true);
            //haetaan uudet autot
            getCars();
        }
        else
        alert('Something went wrong in deletion: ' + response.status);
    })
    .catch(err => console.error(err))
    }
}

    const addCar = (car) => {
        fetch(API_URL, {
            method: 'POST',
            headers: {'Content-type':'application/json'},
            body: JSON.stringify(car)
        })
        .then(response => {
            if(response.ok)
            getCars();
            else
                alert ('Something went wrong.');
        })
        .catch(err => console.error(err))
    }

    const updateCar = (url, updatedCar) => {
        fetch(url, {
            method: 'PUT',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify(updatedCar)
        })
        .then(response => {
            if(response.ok){
                setMsg('Car edited');
                setOpen(true);
                getCars();
            }
            else
                alert('SOmething went wrong in edit:' + response.statusText);
        })
        .catch(err => console.error(err))
    }

    return(
        <div className='ag-theme-material' 
        style={{height:600, width: '90%', margin: 'auto'}}>
                <AddCar addCar={addCar}/>
                
                <AgGridReact 
                pagination ={true}
                paginationPageSize={10}
                rowData={cars}
                
                columnDefs={columnDefs}
                />
            
                
                
                <Snackbar
                open={open}
                autoHideDuration={3000}
                onClose={() => setOpen(false)}
                message= {msg}
                />
                </div>
          
    );
}

export default Carlist;