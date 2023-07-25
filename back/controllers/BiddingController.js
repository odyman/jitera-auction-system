'use strict'
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');
const response = require('../utils/response');
const dtoken = require('../utils/helpers');
const conn = require('../config/connection'); 
const knex = conn.knex;
const model_users = require ('../models/users');
const model_products = require ('../models/products');
const model_bidhistory = require ('../models/bidhistory');
const bookshelf = conn.bookshelf;
const moment = require('moment');

/*
* GET List Bidding Products
*/
/**
 * @swagger
 * /api/bid/ongoing:
 *   post:
 *     summary: Api get list bidding products
 *     tags : [Bidding]
 *     description: endpoint for acccess api grid list bidding products
 *     produces:
 *       - application/json
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               tab:
 *                 type: string
 *                 example: 'ongoing'
 *               pageIndex:
 *                 type: number
 *                 required: true
 *                 example: 1
 *               pageSize:
 *                 type: number
 *                 required: true
 *                 example: 10
 *               query:
 *                 type: string
 *                 example: ''
 *               sort:
 *                   type: object
 *                   properties:
 *                     order:
 *                       type: string
 *                       example: 'asc'
 *                     key:
 *                       type: string
 *                       example: ''
 *     responses:
 *       200:
 *         description: Data successfully displayed.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status: 
 *                       type: boolean
 *                       example: true
 *                 respondeCode : 
 *                       type: string
 *                       example: 200
 *                 message : 
 *                       type: string
 *                       example: Data successfully displayed.
 *                 total : 
 *                       type: integer
 *                       example: 5
 *                 pageIndex : 
 *                       type: integer
 *                       example: 1
 *                 pageSize : 
 *                       type: integer
 *                       example: 10
 *                 data:
 *                   type: object
 *                   properties:
 *                     productID:
 *                       type: integer
 *                       example: 1
 *                     name:
 *                       type: string
 *                       example: White Sneaker
 *                     price:
 *                       type: number
 *                       example: 250
 *                     publish:
 *                       type: integer
 *                       example: 1
 *                     completed:
 *                       type: integer
 *                       example: 1
 *                     userID:
 *                       type: integer
 *                       example: 1
 *       400:
 *         description: Data failed to display.
*/
exports.get_list_bidding = function(req, res) {
    return new Promise(async function (resolve, reject) {
        /*
        * validate param pagging
        */
        const pageIndex = req.body.pageIndex == undefined ? 1 : req.body.pageIndex;
        const pageSize = req.body.pageSize == undefined ? 10 : req.body.pageSize;

        if( (!isFinite(pageIndex) && isNaN(parseFloat(pageIndex))) || (!isFinite(pageSize) && isNaN(parseFloat(pageSize))) ){
            return res.status(400).send(response.cekPaggingNumeric());
        }

        try{
            if(req.body.sort){
                var { order, key } = req.body.sort
            }
            
            var fetchData = await model_products.collection().query(function (qb) {
                /* order by */
                var orderBy = 'duration';
                var orderType = 'DESC';
                if(key){
                    if(order) orderType = order
                    orderBy = key
                    qb.orderBy(orderBy, orderType)
                }else{
                    qb.orderBy(orderBy, orderType)
                }

                /* searching based on params column name */
                if(req.body.query){
                    qb.where(function() {
                        this.where(knex.raw("lower(name) like '%"+(req.body.query).toLowerCase()+"%'"))
                    })
                }
                qb.select()
                qb.where("publish", 2)
                if(req.body.tab){
                    var statusCompleted = req.body.tab === 'ongoing' ? 1 : 2
                    qb.where({completed: statusCompleted})
                }

            }).fetchPage({
                pageSize: pageSize,
                page: pageIndex
            })

            var countData = await model_products.query(function (qb) {
                /* searching based on params column name */
                if(req.body.query){
                    qb.where(function() {
                        this.where(knex.raw("lower(name) like '%"+(req.body.query).toLowerCase()+"%'"))
                    })
                }
                qb.where("publish", 2)
                if(req.body.tab){
                    var statusCompleted = req.body.tab === 'ongoing' ? 1 : 2
                    qb.where({completed: statusCompleted})
                }

            }).count().then();

            var data = {
                "total" : countData,
                "pageIndex" : pageIndex,
                "pageSize" : pageSize,
                "data" : fetchData
                }
            return res.status(200).send(response.ResponseGetSuccess(data));
        }catch(e){
            console.log(e);
            return res.status(400).send(response.ResponseGetFailure());
        }
    });
}

/*
* GET List Bid History by User
*/
/**
 * @swagger
 * /api/bid/bidhistory:
 *   get:
 *     summary: Api get list bid history by user login
 *     tags : [Bidding]
 *     description: endpoint for get api access list bid history by user login
 *     parameters:
 *       - in: query
 *         name: page
 *         required: true
 *         description: page number.
 *         schema:
 *           type: integer
 *       - in: query
 *         name: per_page
 *         required: true
 *         description: record by page.
 *         schema:
 *           type: integer
 *       - in: query
 *         name: orderby
 *         description: ordering based on column.
 *         schema:
 *           type: string
 *       - in: query
 *         name: order
 *         description: asc/desc.
 *         schema:
 *           type: string
 *       - in: query
 *         name: search_param
 *         description: Params by column name.
 *         schema:
 *           type: string
 *       - in: query
 *         name: search
 *         description: Search Key.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Data successfully displayed.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status: 
 *                       type: boolean
 *                       example: true
 *                 respondeCode : 
 *                       type: string
 *                       example: 200
 *                 message : 
 *                       type: string
 *                       example: Data successfully displayed.
 *                 total : 
 *                       type: integer
 *                       example: 5
 *                 current_page : 
 *                       type: integer
 *                       example: 1
 *                 per_page : 
 *                       type: integer
 *                       example: 10
 *                 data:
 *                   type: object
 *                   properties:
 *                     productID:
 *                       type: integer
 *                       example: 1
 *                     name:
 *                       type: string
 *                       example: White Sneaker
 *                     price:
 *                       type: number
 *                       example: 250
 *                     bidPrice:
 *                       type: number
 *                       example: 450
 *                     publish:
 *                       type: integer
 *                       example: 1
 *                     completed:
 *                       type: integer
 *                       example: 1
 *                     userID:
 *                       type: integer
 *                       example: 1
 *       400:
 *         description: Data failed to display.
*/
exports.get_list_bidhistory = function(req, res) {
    return new Promise(async function (resolve, reject) {
        /*
        * validate param pagging
        */
        const page = req.query.pageIndex == undefined ? 1 : req.query.page;
        const per_page = req.query.per_page == undefined ? 10 : req.query.per_page;

        if( (!isFinite(page) && isNaN(parseFloat(page))) || (!isFinite(per_page) && isNaN(parseFloat(per_page))) ){
            return res.status(400).send(response.cekPaggingNumeric());
        }

        try{
            var dataToken = dtoken.decodeToken(req)
            var fetchData = await model_bidhistory.collection().query(function (qb) {
                /* order by */
                var order = 'ASC';
                if(req.query.orderby){
                    if(req.query.order) {
                        order = req.query.order
                    }
                    qb.orderBy(req.query.orderby, order)
                }

                /* searching based on params column name */
                if(req.query.search_param){
                    qb.where(function() {
                        this.where(knex.raw("lower("+req.query.search_param+") like '%"+(req.query.search).toLowerCase()+"%'"))
                    })
                }
                qb.select()
                qb.where("userID", dataToken.userID)

            }).fetchPage({
                pageSize: per_page, 
                page: page,
                withRelated: [{
                    users: (qb2) => {
                        qb2.select("users.*");
                    },
                    products: (qb3) => {
                        qb3.select('products.*');
                    }
                }]
            })

            var countData = await model_bidhistory.query(function (qb) {
                /* searching based on params column name */
                if(req.query.search_param){
                    qb.where(function() {
                        this.where(knex.raw("lower("+req.query.search_param+") like '%"+(req.query.search).toLowerCase()+"%'"))
                    })
                }
                qb.where("userID", dataToken.userID)

            }).count().then();

            var data = {
                "total" : countData,
                "current_page" : page,
                "per_page" : per_page,
                "data" : fetchData
                }
            return res.status(200).send(response.ResponseGetSuccess(data));
        }catch(e){
            console.log(e);
            return res.status(400).send(response.ResponseGetFailure());
        }
    });
}

/*
* GET Retrive User Bid
*/
/**
 * @swagger
 * /api/bid/user_bid:
 *   get:
 *     summary: Api get bid history data by userID.
 *     tags : [Bidding]
 *     description: endpoint for get api bid history data by userID.
 *     parameters:
 *       - in: query
 *         name: userID
 *         required: true
 *         description: userID.
 *         schema:
 *           type: integer
 *       - in: query
 *         name: productID
 *         required: true
 *         description: productID.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Data successfully displayed.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status: 
 *                       type: boolean
 *                       example: true
 *                 respondeCode : 
 *                       type: string
 *                       description: respond code.
 *                       example: 200
 *                 message : 
 *                       type: string
 *                       example: Data successfully displayed.
 *                 data:
 *                   type: object
 *                   properties:
 *                     productID:
 *                       type: integer
 *                       example: 1
 *                     name:
 *                       type: string
 *                       example: White Sneaker
 *                     price:
 *                       type: number
 *                       example: 250
 *                     bidPrice:
 *                       type: number
 *                       example: 450
 *                     publish:
 *                       type: integer
 *                       example: 1
 *                     completed:
 *                       type: integer
 *                       example: 1
 *                     userID:
 *                       type: integer
 *                       example: 1
 *       400:
 *         description: Data failed to display.
*/
exports.get_user_bid = function(req, res) {
    return new Promise(async function (resolve, reject) {
        try{      
            if(!req.query.userID && !req.query.productID){
                return res.status(400).send(response.ResponseGetFailure());
            }
            var fetchData = await model_bidhistory.query(function (qb) {
                    qb.select()
                    qb.where({userID: req.query.userID})
                    qb.where({productID: req.query.productID})
                    qb.orderBy('bidPrice', 'desc')
                })
                .fetch({ 
                    require:true,
                    withRelated: [{
                        users: (qb2) => {
                            qb2.select("users.*");
                        },
                        products: (qb3) => {
                            qb3.select('products.*');
                        }
                    }]
                })
                .then((v)=>{
                    const data = v.toJSON()
                    return data
                })
                .catch((err)=>{
                    console.log(err)
                });
                
            var data = {
                "data" : fetchData
                }
            return res.status(200).send(response.ResponseGetSuccess(data));
        }catch(e){
            return res.status(400).send(response.ResponseGetFailure());
        }
    })
}

/*
* GET List Products by User Login
*/
/**
 * @swagger
 * /api/bid/products:
 *   post:
 *     summary: Api get list products by user login
 *     tags : [Bidding]
 *     description: endpoint for get api access list products by user login
 *     produces:
 *       - application/json
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userID:
 *                 type: number
 *                 example: 1
 *               pageIndex:
 *                 type: number
 *                 required: true
 *                 example: 1
 *               pageSize:
 *                 type: number
 *                 required: true
 *                 example: 10
 *               query:
 *                 type: string
 *                 example: ''
 *               sort:
 *                   type: object
 *                   properties:
 *                     order:
 *                       type: string
 *                       example: 'asc'
 *                     key:
 *                       type: string
 *                       example: ''
 *     responses:
 *       200:
 *         description: Data successfully displayed.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status: 
 *                       type: boolean
 *                       example: true
 *                 respondeCode : 
 *                       type: string
 *                       example: 200
 *                 message : 
 *                       type: string
 *                       example: Data successfully displayed.
 *                 total : 
 *                       type: integer
 *                       example: 5
 *                 pageIndex : 
 *                       type: integer
 *                       example: 1
 *                 pageSize : 
 *                       type: integer
 *                       example: 10
 *                 data:
 *                   type: object
 *                   properties:
 *                     productID:
 *                       type: integer
 *                       example: 1
 *                     name:
 *                       type: string
 *                       example: White Sneaker
 *                     price:
 *                       type: number
 *                       example: 250
 *                     publish:
 *                       type: integer
 *                       example: 1
 *                     completed:
 *                       type: integer
 *                       example: 1
 *                     userID:
 *                       type: integer
 *                       example: 1
 *       400:
 *         description: Data failed to display.
*/
exports.get_list_products = function(req, res) {
    return new Promise(async function (resolve, reject) {
        /*
        * validate param pagging
        */
        const pageIndex = req.body.pageIndex == undefined ? 1 : req.body.pageIndex;
        const pageSize = req.body.pageSize == undefined ? 10 : req.body.pageSize;

        if( (!isFinite(pageIndex) && isNaN(parseFloat(pageIndex))) || (!isFinite(pageSize) && isNaN(parseFloat(pageSize))) ){
            return res.status(400).send(response.cekPaggingNumeric());
        }

        try{
            if(req.body.sort){
                var { order, key } = req.body.sort
            }
            
            var dataToken = dtoken.decodeToken(req)
            console.log('dataToken:', dataToken);
            var fetchData = await model_products.collection().query(function (qb) {
                /* order by */
                var orderBy = 'duration';
                var orderType = 'DESC';
                if(key){
                    if(order) orderType = order
                    orderBy = key
                    qb.orderBy(orderBy, orderType)
                }else{
                    qb.orderBy(orderBy, orderType)
                }

                /* searching based on params column name */
                if(req.body.query){
                    qb.where(function() {
                        this.where(knex.raw("lower(name) like '%"+(req.body.query).toLowerCase()+"%'"))
                    })
                }
                qb.select()
                if(req.body.userID){
                    qb.where("userID", req.body.userID)
                }

            }).fetchPage({
                pageSize: pageSize,
                page: pageIndex
            })

            var countData = await model_products.query(function (qb) {
                /* searching based on params column name */
                if(req.body.query){
                    qb.where(function() {
                        this.where(knex.raw("lower(name) like '%"+(req.body.query).toLowerCase()+"%'"))
                    })
                }
                if(req.body.userID){
                    qb.where("userID", req.body.userID)
                }

            }).count().then();

            var data = {
                "total" : countData,
                "pageIndex" : pageIndex,
                "pageSize" : pageSize,
                "data" : fetchData
                }
            return res.status(200).send(response.ResponseGetSuccess(data));
        }catch(e){
            console.log(e);
            return res.status(400).send(response.ResponseGetFailure());
        }
    });
}

/*
* GET Retrive Product
*/
/**
 * @swagger
 * /api/bid/product:
 *   get:
 *     summary: Api get product data by productID.
 *     tags : [Bidding]
 *     description: endpoint for get api product data by productID.
 *     parameters:
 *       - in: query
 *         name: productID
 *         required: true
 *         description: productID.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Data successfully displayed.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status: 
 *                       type: boolean
 *                       example: true
 *                 respondeCode : 
 *                       type: string
 *                       description: respond code.
 *                       example: 200
 *                 message : 
 *                       type: string
 *                       example: Data successfully displayed.
 *                 data:
 *                   type: object
 *                   properties:
 *                     productID:
 *                       type: integer
 *                       example: 1
 *                     name:
 *                       type: string
 *                       example: White Sneaker
 *                     price:
 *                       type: number
 *                       example: 250
 *                     publish:
 *                       type: integer
 *                       example: 1
 *                     completed:
 *                       type: integer
 *                       example: 1
 *                     userID:
 *                       type: integer
 *                       example: 1
 *       400:
 *         description: Data failed to display.
*/
exports.get_product = function(req, res) {
    return new Promise(async function (resolve, reject) {
        try{      
            if(!req.query.productID){
                return res.status(400).send(response.ResponseGetFailure());
            }
            var fetchData = await model_products.query(function (qb) {
                    qb.select()
                    qb.where({productID: req.query.productID})
                })
                .fetch({ 
                    require:true
                })
                .then((v)=>{
                    const data = v.toJSON()
                    return data
                })
                .catch((err)=>{
                    console.log(err)
                });
                
            var data = {
                "data" : fetchData
                }
            return res.status(200).send(response.ResponseGetSuccess(data));
        }catch(e){
            return res.status(400).send(response.ResponseGetFailure());
        }
    })
}

/*
* POST Delete Product
*/
/**
 * @swagger
 *
 * /api/bid/products/delete:
 *   post:
 *     summary: Remove product data
 *     tags : [Bidding]
 *     description: Remove product data by productID
 *     produces:
 *       - application/json
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productID:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       200:
 *         description: Data deleted successfully
 *       400:
 *         description: Data failed to delete
 */
exports.delete_product = function(req, res) {
    return new Promise(async function (resolve, reject) {
        try{
            /*
            * delete database
            */
            var filter = { productID : req.body.productID }
            model_products.forge(filter).fetch({require: true}).then(function (post) {
                if (!post) {
                    return res.status(404).json({ error: true, message: 'Product not found' })
                }
                post.destroy();
                return res.status(200).send(response.ResponseDELETESuccess(post.toJSON()));
                
            }).catch(function (err) {
                return res.status(400).send(response.ResponseDELETEFailure('Product failed to delete'));
            });

        }catch(e){
            return res.status(400).send(response.ResponseDELETEFailure('Product failed to delete'));
        }
    })
}

/*
* POST Update Product
*/
/**
 * @swagger
 *
 * /api/bid/products/update:
 *   post:
 *     summary: Update product
 *     tags : [Bidding]
 *     description: Update product
 *     produces:
 *       - application/json
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productID:
 *                 type: integer
 *                 required: true
 *                 example: 1
 *               name:
 *                 type: string
 *                 example: White Sneaker
 *               price:
 *                 type: number
 *                 example: 250
 *               publish:
 *                 type: integer
 *                 example: 1
 *               completed:
 *                 type: integer
 *                 example: 1
 *               duration:
 *                 type: integer
 *                 example: 1689605964
 *     responses:
 *       201:
 *         description: Data successfully updated.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status: 
 *                       type: boolean
 *                       description: Status respond true or false.
 *                       example: true
 *                 respondeCode : 
 *                       type: string
 *                       example: 201
 *                 message : 
 *                       type: string
 *                       example: Data successfully updated
 *                 data:
 *                   type: object
 *                   properties:
 *                     productID:
 *                       type: integer
 *                       example: 1
 *                     name:
 *                       type: string
 *                       example: White Sneaker
 *                     price:
 *                       type: number
 *                       example: 250
 *                     publish:
 *                       type: integer
 *                       example: 1
 *                     completed:
 *                       type: integer
 *                       example: 1
 *                     userID:
 *                       type: integer
 *                       example: 1
 *                     duration:
 *                       type: integer
 *                       example: 1689605964
 *       400:
 *         description: Data failed to update
 */
exports.update_product = function(req, res) {
    return new Promise(async function (resolve, reject) {
        try{
            // validate form
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).send(response.ResponsePOSTFailure(errors.array()));
            }
    
            if(!req.body.productID){
                return res.status(400).send(response.ResponseGetFailure());
            }
            /*
            * save database
            */
            var data = {
                    productID: '', 
                    name: '', 
                    price: '', 
                    duration: '',
                    publish: '', 
                    completed: ''
            }
    
            var newObject = {}
            Object.keys(data).map((key)=>{
                if(req.body[key]){
                    newObject[key] = req.body[key]  
                }
            });
            
            if(newObject.length === 0){
                return res.status(400).send(response.ResponseGetFailure());
            }
    
            if(req.body.productID){
                // update data
                bookshelf.transaction((t) => {
                    return new model_products(newObject).save(null, { method: 'update' }, {transacting: t})
                }).then((library) => {
                    return res.status(201).send(response.ResponsePOSTSuccess(library));
                }).catch((err) => {
                    console.log('error' , err)
                    return res.status(400).send(response.ResponsePOSTFailure('Update product failed'));
                })
            }
    
        }catch(e){
            return res.status(400).send(response.ResponsePOSTFailure('Update product failed'));
        }
    })
}

/*
* POST Insert Data Product
*/
/**
 * @swagger
 *
 * /api/bid/products/create:
 *   post:
 *     summary: Insert data product
 *     tags : [Bidding]
 *     description: Insert data product
 *     produces:
 *       - application/json
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 required: true
 *                 example: White Sneaker
 *               price:
 *                 type: number
 *                 required: true
 *                 example: 250
 *               duration:
 *                 type: integer
 *                 required: true
 *                 example: 1689605964
 *     responses:
 *       201:
 *         description: Data successfully saved.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status: 
 *                       type: boolean
 *                       description: Status respond true or false.
 *                       example: true
 *                 respondeCode : 
 *                       type: string
 *                       example: 201
 *                 message : 
 *                       type: string
 *                       example: Data successfully saved
 *                 data:
 *                   type: object
 *                   properties:
 *                     productID:
 *                       type: integer
 *                       example: 1
 *                     name:
 *                       type: string
 *                       example: White Sneaker
 *                     price:
 *                       type: number
 *                       example: 250
 *                     publish:
 *                       type: integer
 *                       example: 1
 *                     completed:
 *                       type: integer
 *                       example: 1
 *                     userID:
 *                       type: integer
 *                       example: 1
 *                     duration:
 *                       type: integer
 *                       example: 1689605964
 *       400:
 *         description: Data failed to save
 */
exports.create_product = function(req, res) {
    return new Promise(async function (resolve, reject) {
        try{
            // validate form
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).send(response.ResponsePOSTFailure(errors.array()));
            }
            /*
            * save database
            */
            var dataToken = dtoken.decodeToken(req)
            var data = {
                    name: '', 
                    price: '', 
                    duration: '',
                    publish: '', 
                    completed: '',
                    userID: ''
                }

            var newObject = {}
            Object.keys(data).map((key)=>{
                if(req.body[key]){
                    newObject[key] = req.body[key]  
                }
            });
            newObject.userID = dataToken.userID

            if(newObject.length === 0){
                return res.status(400).send(response.ResponseGetFailure());
            }

            // insert data
            bookshelf.transaction(async (t) => {
                return new model_products(newObject).save(null, { method: 'insert' }, {transacting: t})
            }).then((library) => {
                return res.status(201).send(response.ResponsePOSTSuccess(library));
            }).catch((err) => {
                console.log('error' , err)
                return res.status(400).send(response.ResponsePOSTFailure('Add new product failed'));
            })
        }catch(e){
            return res.status(400).send(response.ResponsePOSTFailure('Add new product failed'));
        }
    })
}

/*
* POST Insert Data Bid History
*/
/**
 * @swagger
 *
 * /api/bid/bidhistory/create:
 *   post:
 *     summary: Insert data bid history
 *     tags : [Bidding]
 *     description: Insert data bid history
 *     produces:
 *       - application/json
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productID:
 *                 type: integer
 *                 required: true
 *                 example: 1
 *               userID:
 *                 type: integer
 *                 required: true
 *                 example: 1
 *               bidPrice:
 *                 type: number
 *                 required: true
 *                 example: 120
 *     responses:
 *       201:
 *         description: Data successfully saved.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status: 
 *                       type: boolean
 *                       description: Status respond true or false.
 *                       example: true
 *                 respondeCode : 
 *                       type: string
 *                       example: 201
 *                 message : 
 *                       type: string
 *                       example: Data successfully saved
 *                 data:
 *                   type: object
 *                   properties:
 *                     productID:
 *                       type: integer
 *                       example: 1
 *                     userID:
 *                       type: integer
 *                       example: 1
 *                     bidPrice:
 *                       type: number
 *                       example: 120
 *       400:
 *         description: Data failed to save
 */
exports.create_bidhistory = function(req, res) {
    return new Promise(async function (resolve, reject) {
        try{
            // validate form
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).send(response.ResponsePOSTFailure(errors.array()));
            }
            /*
            * save database
            */
            var data = {
                    productID: '',
                    userID: '',
                    bidPrice: '', 
                }

            var newObject = {}
            Object.keys(data).map((key)=>{
                if(req.body[key]){
                    newObject[key] = req.body[key]  
                }
            });

            if(newObject.length === 0){
                return res.status(400).send(response.ResponseGetFailure());
            }

            // insert data
            bookshelf.transaction(async (t) => {
                return new model_bidhistory(newObject).save(null, { method: 'insert' }, {transacting: t})
            }).then((library) => {
                return res.status(201).send(response.ResponsePOSTSuccess(library));
            }).catch((err) => {
                console.log('error' , err)
                return res.status(400).send(response.ResponsePOSTFailure('Add new bid history failed'));
            })
        }catch(e){
            return res.status(400).send(response.ResponsePOSTFailure('Add new bid history failed'));
        }
    })
}