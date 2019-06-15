// @login & register
const express = require('express')
const router = express.Router()
const Profile = require('../../models/Profile')



router.get('/test',(req, res) => {
  res.json({
    msg: "profile is works"
  })
})
router.post('/add',(req,res) => {
  const profileFields={};
  if(req.body.type) profileFields.type = req.body.type
  if(req.body.describe) profileFields.describe = req.body.describe
  if(req.body.income) profileFields.income = req.body.income
  if(req.body.expend) profileFields.expend = req.body.expend
  if(req.body.cash) profileFields.cash = req.body.cash
  if(req.body.remark) profileFields.remark = req.body.remark
  new Profile(profileFields).save().then(profile => {
    res.json(profile)
  })
})
router.get('/',(req, res) => {
  Profile.find()
  .then(profile => {
    if(!profile){
      return res.status(404).json('没有内容')
    }
    else{
      res.json(profile)
    }
  })
  .catch(err => res.status(404).json(err))
})

router.get('/:id',(req, res) => {
  Profile.findOne({_id: req.params.id})
  .then(profile => {
    if(!profile){
      return res.status(404).json('没有内容')
    }
    else{
      res.json(profile)
    }
  })
  .catch(err => res.status(404).json(err))
})
router.post('/edit/:id',(req,res) => {
  const profileFields={};
  if(req.body.type) profileFields.type = req.body.type
  if(req.body.describe) profileFields.describe = req.body.describe
  if(req.body.income) profileFields.income = req.body.income
  if(req.body.expend) profileFields.expend = req.body.expend
  if(req.body.cash) profileFields.cash = req.body.cash
  if(req.body.remark) profileFields.remark = req.body.remark
  Profile.findByIdAndUpdate({_id: req.params.id},{$set:profileFields},{new:true})
  .then(profile => {
    res.json(profile)
  })
})
router.delete('/delete/:id',(req, res) => {
  Profile.findOneAndRemove({_id: req.params.id}).then(profile => {
    profile.save().then(profile => res.json(profile))
  })
  .catch(err => res.status(404).json('删除失败'))
})

module.exports = router