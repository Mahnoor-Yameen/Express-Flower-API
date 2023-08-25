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

    try {
        res.send('catogory controller kam kr raha!')
        
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

    try {
        res.send('catogory controller kam kr raha!')
        
    } catch (error) {
        req.status(400).json({
            message:"controller ka catch function chal raha yani error aya hai",
            messagedusra:error.message
        })
        
    }
  }
//   delete
  const DeleteCategory=async (req, res) => {

    try {
        res.send('catogory controller kam kr raha!')
        
    } catch (error) {
        req.status(400).json({
            message:"controller ka catch function chal raha yani error aya hai",
            messagedusra:error.message
        })
        
    }
  }

//   in sab ko delete kiya ha bus
module.exports={getAllCategories, getCategoryByID, CreateCategory,UpdateCategory,DeleteCategory}