const Reviews = require('../models/review');
const Doctor = require('../models/doctor');

exports.addReview= async(req,res,next)=>
{
const doctorId = req.params.doctorId
    const spesficDoc = await Doctor
    .findById(doctorId)
    .populate('reviews','user rating')

    const newReview = new Reviews({
        rating:Math.round(req.body.rating),
        comment:req.body.comment,
        user:req.userId,
        //time:moment(Date.now()).format('L')
    })
    try
    {
        // Don't allow the doctor to post a review on himself.
        if(req.userId.toString() === spesficDoc._id.toString())
        {
            return res.status(401).json({
                message:"Sorry, you can't rating"})
        }
        spesficDoc.reviews.push(newReview)
        spesficDoc.numReviews = spesficDoc.reviews.length
        for(var i=0;i<spesficDoc.reviews.length;i++)
        {
            spesficDoc.raiting = spesficDoc.reviews
            .reduce((acc,item)=> acc + item.rating,0) /
            spesficDoc.reviews.length
        }
        await spesficDoc.save()
        await newReview.save()
        res.status(201).json({ 
            message: "Well, the rating has been added"})
    }
    catch(err){
        if(!err.statuscode)
        {
            err.statuscode = 500
        }
        next(err)
    }
}