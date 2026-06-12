import Feature from "../models/Feature";

// get all 
export const getFeature = async (req,res)=>{
    try{
        const features = await Feature.find({isActive:true});

        res.status(200).json(features);
    }catch(error){
        res.status(500).json({message:error.message,})
    }
}

export const createFeature = async(req,rea)=>{
try {
    const feature = await Feature.create(req,body);
    res.status(201).json(feature);
} catch (error) {
    res.status(500).json({
        message:error.message,
    });
}
};