const {CategoryFromModel}=require('./Model')  //schema k acording data leny wala variable template
// for database connection hum ab kuch cheezain import krengy
const {connect} = require('mongoose')
require('dotenv').config()  //for mongourl 


// get
const getAllCategories=async (req, res) => {

    try {
        await connect(process.env.MONGO_URI)  //connect hoga db idher

        const sariCategories=await CategoryFromModel.find()
                res.json({
                    
                    Categories:sariCategories

                })
    
        
    } catch (error) {
        req.status(400).json({
            message:"controller ka catch function chal raha yani error aya hai",
            messagedusra:error.message
        })
        
    }
  }

// get
  const getCategoryByID=async (req, res) => {

    const {_id}=req.query

    try {
     await connect(process.env.MONGO_URI)
     const categoryById=await CategoryFromModel.findOne({_id})
     res.json({categoryById})
        
    } catch (error) {
        req.status(400).json({
            message:"controller ka catch function chal raha yani error aya hai",
            messagedusra:error.message
        })
        
    }
  }

//   post
  const CreateCategory=async (req, res) => {
    const {CategoryName,CategoryImage}=req.body;


    // agar koi field missing hogi to woh mongo ki taraf jayega hi nahi
    if (!CategoryName || !CategoryImage){
        res.status(403).json({
            message:"Missing Required Fields"
        })
    }else{
        try {
            await connect(process.env.MONGO_URI)
            // res.json({
            //     message:"database connected"
            // })

            // agar DB main jo user category name likh kr bhej raha wo  category already moujood hai toh error dedo 400 
            const checkExistance= await CategoryFromModel.exists({ CategoryName })
            if(checkExistance){
                res.status(400).json({
                    message:"category already exists"
                })
            }
            else{
                await CategoryFromModel.create({CategoryName,CategoryImage})
                const sariCategories=await CategoryFromModel.find()
                res.json({
                    message:"new Category Created",
                    dodata:sariCategories

                })
            }
        
        }    catch (error) {
            res.status(400).json({
                message:"controller ka catch function chal raha yani error aya hai",
                messagedusra:error.message
            })
            
        }
    }

    
  }
// put
  const UpdateCategory=async (req, res) => {
    // user se teeno cheezain main se jo bhi de kr krna chahy

    const {_id,CategoryName,CategoryImage}=req.body
     
    
    const filter = { _id };
    const update = { CategoryName,CategoryImage };

    try {
        //db connection
        await connect(process.env.MONGO_URI)  //connect hoga db idher
        await CategoryFromModel.findOneAndUpdate(filter, update, {
            new: true
          });

        //   sara lany k liye
        const categoryUpdate= await CategoryFromModel.find()

        res.json({
            message:"updating hogyi ha successfully",
            categoryUpdate
        })

        
    } catch (error) {
        req.status(400).json({
            message:"controller ka catch function chal raha yani error aya hai",
            messagedusra:error.message
        })
        
    }
  }
//   delete
  const DeleteCategory=async (req, res) => {

    const {_id}=req.body

    try {
     await connect(process.env.MONGO_URI)   //mongo connection
     //pehly find to karo k wo chez db mai hai bhi ya nahi
     if (_id){
            await CategoryFromModel.deleteOne({_id})      //api call hony pe delete hojayegi
            const categoryById=await CategoryFromModel.find()      //ek variable main baki ki mungwali
            res.status(200).json({
                message:"deleted succesfully",
                categoryById
            })
        } else{

            re.json({
                message:"The id you are trying to delete do not exists"
            })


        }



    
  
        
    }catch (error) {
        req.status(400).json({
            message:"controller ka catch function chal raha yani error aya hai",
            messagedusra:error.message
        })
        
    }
  }

//   in sab ko delete kiya ha bus
module.exports={getAllCategories, getCategoryByID, CreateCategory,UpdateCategory,DeleteCategory}