require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const db = require('./db');

const app = express();

app.use(cors());
app.use(express.json());
uuidv4();


//create usr
app.post('/api/v1/SignUp', async (req,res) => {

    try{

        const results = await db.query('INSERT INTO usr (first_name, last_name, email, password) VALUES ($1, $2, $3, $4) returning *', [req.body.first_name, req.body.last_name, req.body.email, req.body.password]);

        res.status(201).json({
            status: 'success',
            data: {
                users: results.rows[0]
            },
        });
    } catch(err){
        console.log(err.message);
    }
});

//gets one usr
app.get('/api/v1/:email/:password', async (req,res) => {

    try{
        const results = await db.query('SELECT * FROM usr WHERE email = $1 AND password = $2', [req.params.email, req.params.password]);

        res.status(200).json({
            status: 'success',
            data: {
                users: results.rows[0]
            }, 
        });
    } catch(err){
        console.log(err.message);
    }
});

//create a school
app.post('/api/v1/:id/schools', async (req,res) => {

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
app.get('/api/v1/:id/schools/:id1', async (req,res) => {

    try{
        const results = await db.query('SELECT school_name FROM school WHERE school_id = $1', [req.params.id1]);

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
app.put('/api/v1/:id/schools/:id1', async (req,res) => {

    try{
        const results = await db.query('UPDATE school SET school_name = $1 WHERE school_id = $2 returning *', 
            [req.body.school_name, req.params.id1]);

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
app.delete('/api/v1/:id/schools/:id1', async (req,res) => {

    try{
        const results = await db.query('DELETE FROM school WHERE school_id = $1', [req.params.id1]);

        res.status(204).json({
            status: 'success'
        });
    } catch(err){
        console.log(err.message);
    }
});

//create a professor
app.post('/api/v1/:id/schools/:id1/professors', async (req,res) => {

    try{

        const results = await db.query('INSERT INTO professor (school_id, professor_name, department) VALUES ($1, $2, $3) returning *', [req.params.id1, req.body.professor_name, req.body.department]);

        res.status(201).json({
            status: 'success',
            data: {
                professors: results.rows[0]
            },
        });
    } catch(err){
        console.log(err.message);
    }
});

//get all professor for that school
app.get('/api/v1/:id/schools/:id1/professors', async (req,res) => {

    try{

        const results = await db.query('SELECT * FROM professor WHERE school_id = $1', [req.params.id1]);
        res.status(201).json({
            status: 'success',
            results: results.rows.length,
            data: {
                professors: results.rows
            },
        });
    } catch(err){
        console.log(err.message);
    }
});

//get a professor 
app.get('/api/v1/:id/schools/:id1/professors/:id2', async (req,res) => {

    try{
        const results = await db.query('SELECT * FROM professor WHERE professor_id = $1', [req.params.id2]);
        res.status(201).json({
            status: 'success',
            data: {
                professors: results.rows[0]
            },
        });
    } catch(err){
        console.log(err.message);
    }
});

//delete a professor
app.delete('/api/v1/:id/schools/:id1/professors/:id2', async (req,res) => {

    try{

        const results = await db.query('DELETE FROM professor WHERE professor_id = $1', [req.params.id2]);

        res.status(204).json({
            status: 'success',
        });
    } catch(err){
        console.log(err.message);
    }
});

//create a professor review
app.post('/api/v1/:id/schools/:id1/professors/:id2', async (req,res) => {

    try{

        const results = await db.query('INSERT INTO review (usr_id, professor_id, course_name, date, review_description, attendance, textbook, for_credit, would_take_again, quality, difficulty, rating) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) returning *', [req.params.id, req.params.id2, req.body.course_name, req.body.date, req.body.review_description, req.body.attendance, req.body.textbook, req.body.for_credit, req.body.would_take_again, req.body.quality, req.body.difficulty, req.body.rating]);

        res.status(201).json({
            status: 'success',
            data: {
                reviews: results.rows[0]
            },
        });
    } catch(err){
        console.log(err.message);
    }
});

//gets all professor reviews
app.get('/api/v1/:id/schools/:id1/professors/:id2/reviews', async (req,res) => {    

    try{
        const results = await db.query('SELECT * FROM review WHERE professor_id = $1', [req.params.id2]);

        res.status(200).json({
            status: 'success',
            results: results.rows.length,
            data: {
                reviews: results.rows
            }, 
        });
    } catch(err){
        console.log(err.message);
    }
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`server port ${port}`);
});