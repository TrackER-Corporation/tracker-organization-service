
import asyncHandler from 'express-async-handler'
import { ObjectId } from 'mongodb'
import { collections } from '../services/database.service'

// @desc    Get goals
// @route   GET /api/goals
// @access  Private
export const getOrganizationById = asyncHandler(async (req, res, next) => {
    const goal = await collections?.organizations?.findOne({ _id: new ObjectId(req.params.id) })
    if (goal)
        res.status(200).json({
            name: goal.name,
            icon: goal.icon,
            userId: goal.userId,
            customers: goal.customers,
            type: goal.type,
            _id: goal._id,
            details: goal.details,
            description: goal.description,
            createdAt: goal.createAt
        })
    else {
        throw new Error('Error')
    }
})

export const getOrganizationByUserId = asyncHandler(async (req, res, next) => {
    const goal = await collections?.organizations?.findOne({ userId: new ObjectId(req.params.id) })
    if (goal)
        res.status(200).json({
            name: goal.name,
            icon: goal.icon,
            userId: goal.userId,
            customers: goal.customers,
            type: goal.type,
            _id: goal._id,
            details: goal.details,
            description: goal.description,
            createdAt: goal.createAt
        })
    else {
        throw new Error('Error')
    }
})


export const getAll = asyncHandler(async (req, res, next) => {
    const goal = await collections?.organizations?.find({}).toArray()
    if (goal)
        res.status(200).json(goal)
    else {
        throw new Error('Organizations not found')
    }
})


// @desc    Set goal
// @route   POST /api/goals
// @access  Private
export const createOrganization = asyncHandler(async (req, res, next) => {
    if (!req.body.userId) {
        throw new Error('Error')
    }

    const preference = await collections?.organizations?.insertOne({
        name: req.body.name,
        icon: "",
        userId: req.body.userId,
        type: [],
        customers: [],
        description: "",
        details: {}
    })

    res.status(200).json(preference)
})

// @desc    Update goal
// @route   PUT /api/goals/:id
// @access  Private
export const updateOrganization = asyncHandler(async (req, res, next) => {
    const organization = await collections?.organizations?.findOne(new ObjectId(req.params.id))
    if (!organization) {
        throw new Error('Error')
    }

    if (!req.params.id) {
        throw new Error('Error')
    }

    const data = req.body;
    delete data._id


    const update = await collections.organizations?.findOneAndUpdate(
        { _id: new ObjectId(req.params.id) },
        { $set: { ...data } },
        { returnDocument: 'after' }
    )
    res.status(200).json(update?.value)
})

export const updateOrganizationResources = asyncHandler(async (req, res, next) => {
    const organization = await collections?.organizations?.findOne(new ObjectId(req.params.id))
    if (!organization)
        throw new Error('Error')
    if (!req.params.id) {
        throw new Error('Error')
    }

    const update = await collections?.organizations?.
        findOneAndUpdate(
            { _id: new ObjectId(req.params.id) },
            { $set: { ...req.body } },
            { returnDocument: 'after' }
        )
    res.status(200).json(update?.value)
})

export const deleteOrganization = asyncHandler(async (req, res, next) => {
    const preference = await collections?.organizations?.find({ _id: new ObjectId(req.params.id) })
    if (!preference) {
        throw new Error('Error')
    }
    if (!req.params.id) {
        throw new Error('Error')
    }

    const update = await collections?.organizations?.deleteOne(preference)
    res.status(200).json(update)
})

export const deleteOrganizationByUserId = asyncHandler(async (req, res, next) => {
    const preference = await collections?.organizations?.find({ userId: new ObjectId(req.params.id) })
    if (!preference) {

        throw new Error('Error')
    }
    if (!req.params.id) {
        throw new Error('Error')
    }

    const update = await collections?.organizations?.deleteOne({ userId: new ObjectId(req.params.id) })
    res.status(200).json(update)
})
