// import Feature from "../models/Feature";

// // get all 
// export const getFeature = async (req,res)=>{
//     try{
//         const features = await Feature.find({isActive:true});

//         res.status(200).json(features);
//     }catch(error){
//         res.status(500).json({message:error.message,})
//     }
// }

// export const createFeature = async(req,res)=>{
// try {
//     const feature = await Feature.create(req.body);
//     res.status(201).json(feature);
// } catch (error) {
//     res.status(500).json({
//         message:error.message,
//     });
// }
// };


// backend/src/controllers/featureController.js
import Feature from "../models/Feature.js";

// GET all active features
export const getFeature = async (req, res) => {
  try {
    const features = await Feature.find({ isActive: true });
    res.status(200).json(features);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// CREATE new feature
export const createFeature = async (req, res) => {
  try {
    const feature = await Feature.create(req.body);
    res.status(201).json(feature);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//UPDATE feature
export const updateFeature = async(req,res)=>{
   try {
     const { id } = req.params;
     const { title, description, isActive } = req.body;
     const feature = await Feature.findById(id);
     if (!feature) {
       return res.status(404).json({ message: "Feature not found" });
     }
     feature.title = title || feature.title;
     feature.description = description || feature.description;
     feature.isActive = isActive !== undefined ? isActive : feature.isActive;

     await feature.save();
     res.json(feature);
    
   } catch (error) {
    res.status(500).json({message:error.message});
   }
}
//DELETE feature
export const deleteFeature = async(req,res)=>{
   try {
     const { id } = req.params;
     const feature = await Feature.findById(id);
     if (!feature) {
       return res.status(404).json({ message: "Feature not found" });
     }
    

     await Feature.findByIdAndDelete(id)
     res.json({message:"Feature deleted successfully"});
    
   } catch (error) {
    res.status(500).json({message:error.message});
   }
}