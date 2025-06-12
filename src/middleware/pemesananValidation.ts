import { StatusBooking } from '@prisma/client';
import { NextFunction, Request, Response } from 'express';
import Joi from 'joi'

// Create Schema detail for order list
const orderListSchema = Joi.object({
    room_id: Joi.number().required(),
    room_number: Joi.number().required(),
    price: Joi.number().required(),
    room_capacity: Joi.number().required(),
    metode_pembayaran: Joi.string().valid("Transfer", "Qris","Ewallet").required(),    
    id_user: Joi.string().required(),
    StatusBooking: Joi.number().required(),
 })

//  Input order
const addDataSchema = Joi.object({
    userId: Joi.number().required(),
    kamarId: Joi.number().min(0).required(),
    price: Joi.number().required(),
    metode_pembayaran: Joi.string().valid("Transfer", "Qris","Ewallet").required(),
    // status_booking: Joi.string().valid("Menunggu", "SudahDibayar", "BelumDibayar").uppercase().required(),
    tanggal_mulai: Joi.date().required(),
    tanggal_akhir: Joi.date().required(),
    user: Joi.optional()
    // orderlists: Joi.array().items(orderListSchema).min(1).required(),
 })


 export const verifyAddBooking = (request: Request, response: Response, next: NextFunction) => {
    /** validate a request body and grab error if exist */
    const { error } = addDataSchema.validate(request.body, { abortEarly: false })
 
 
    if (error) {
        return response.status(400).json({
            status: false,
            message: error.details.map(it => it.message).join()
        })
    }
    return next()
 }
 
//  Order Status
 const editDataSchema = Joi.object({
    status: Joi.string().valid("Menunggu", "SudahDibayar", "BelumDibayar").uppercase().required(),
    user: Joi.optional()
 })
 
//  Edit Status Order
export const verifyEditStatus = (request: Request, response: Response, next: NextFunction) => {
    const { error } = editDataSchema.validate(request.body, { abortEarly: false })
 
 
    if (error) {
        return response.status(400).json({
            status: false,
            message: error.details.map(it => it.message).join()
    })
}
return next()
}
