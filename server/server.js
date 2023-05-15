require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const db = require('./db');

const app = express();

app.use(cors());
app.use(express.json());
uuidv4();

//create a school
app.post('/api/v1/schools', async (req,res) => {

    try{

        const results = await db.query('INSERT INTO school (school_name) VALUES ($1) returning *', [req.body.school_name]);

        res.status(201).json({
            status: 'success',
            data: {
                schools: results.rows[0]
            },
        });
    } catch(err){
        console.log(err.message);
    }
});

//gets all schools
app.get('/api/v1/schools', async (req,res) => {

    try{
        const results = await db.query('SELECT * FROM school');

        res.status(200).json({
            status: 'success',
            results: results.rows.length,
            data: {
                schools: results.rows
            }, 
        });
    } catch(err){
        console.log(err.message);
    }
});

//gets one school
app.get('/api/v1/schools/:id', async (req,res) => {

    try{
        const results = await db.query('SELECT school_name FROM school WHERE school_id = $1', [req.params.id]);

        res.status(200).json({
            status: 'success',
            data: {
                schools: results.rows[0]
            }, 
        });
    } catch(err){
        console.log(err.message);
    }
});

//update a school
app.put('/api/v1/schools/:id', async (req,res) => {

    try{
        const results = await db.query('UPDATE school SET school_name = $1 WHERE school_id = $2 returning *', 
            [req.body.school_name, req.params.id]);

        res.status(200).json({
            status: 'success',
            data: {
                schools: results.rows[0]
            }, 
        });
    } catch(err){
        console.log(err.message);
    }
});

//delete a school
app.delete('/api/v1/schools/:id', async (req,res) => {

    try{
        const results = await db.query('DELETE FROM school WHERE school_id = $1', [ req.params.id]);

        res.status(204).json({
            status: 'success'
        });
    } catch(err){
        console.log(err.message);
    }
});

const port = process.env.PORT || 3005;
app.listen(port, () => {
    console.log(`server port ${port}`);
});