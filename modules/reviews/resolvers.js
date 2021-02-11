const Review = require('./model');

async function Reviews(parent, args, context, info) {
    const {
        filter = null,
        skip = null,
        limit = null
    } = args.body.variables?.options || {}

    const {
        name = null,
        createdAt = null,
        updatedAt = null
    } = filter


    Object.keys(name).forEach(key => {
        name[`$${key}`] = name[key]
        delete name[key]
    })
    Object.keys(createdAt).forEach(key => {
        createdAt[`$${key}`] = createdAt[key]
        delete createdAt[key]
    })
    Object.keys(updatedAt).forEach(key => {
        updatedAt[`$${key}`] = updatedAt[key]
        delete updatedAt[key]
    })

    const items = await Review.find(
        {
            name: {...name},
            createdAt: {...createdAt},
            updatedAt: {...updatedAt}
        },
        null,
        {skip,limit}
        )
    const totalItems = Object.keys(items).length

    return {
        items,
        totalItems
    }
}

async function addReview(parent, args, context, info) {
    const input = args.body.variables.createreviewInput
    const review = await Review.create(input)
    await review.save()
    return review
}

async function updateReview(parent, args, context, info) {
    const input = args.body.variables.updatereviewInput
    const review = await Review.findById(input.id)
    review.set(input)
    await review.save()
    return review
}

async function deleteReview(parent, args, context, info) {
    const id = args.body.variables.id
    const review = await Review.findById(id)
    if(!review)return false;
    await review.remove()
    return true
}


module.exports = {
    Reviews,
    addReview,
    updateReview,
    deleteReview
}