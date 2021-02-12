const Review = require('./model');

async function Reviews(parent, args, context, info) {
    const {
        filter = null,
        skip = null,
        limit = null
    } = args.body.variables?.options || {}

    if(filter)
        Object.keys(filter).forEach(filterKey => {
            Object.keys(filter[filterKey]).forEach(key => {
                filter[filterKey][`$${key}`] = filter[filterKey][key]
                delete filter[filterKey][key]
            })
        })

    const items = await Review.find(
        filter,
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