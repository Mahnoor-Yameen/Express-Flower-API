const express=require('express')
const router=express.Router()
const {getAllCategories, getCategoryByID, CreateCategory,UpdateCategory,DeleteCategory} =require('./Controller')


router.get('/get-all-categories',getAllCategories)
router.get('/get-category-by-id',getCategoryByID)
router.post('/create-category',CreateCategory)
router.put('/update-category',UpdateCategory)
router.delete('/delete-category',DeleteCategory)


module.exports=router