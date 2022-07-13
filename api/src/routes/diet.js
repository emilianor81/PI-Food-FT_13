const {Router} = require('express');
const router = Router();
const { Diet } = require('../db')


const dietTypes = router.get('/',async (req, res) =>{
       try {
        const dietsBD = await Diet.findAll()
        return res.json(dietsBD)
      }catch{
        console.log('hay un error en los types')
      }
});


module.exports =  dietTypes;