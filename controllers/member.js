const Member = require('../models/member');

exports.getMembers = (req, res) => {
  Member.find()
    .sort({companyname: 1})
    .exec((err, member)=>{
      if(err) {
        return res.status(400).json({
          error: 'member not found'
        })
      }
      res.send(member)
    })

}



exports.verifyMember = (req, res) => {
  Member.findOneAndUpdate(
    {_id: req.body._id},
    {$push: {
          years: req.body.years
        }
    },
    (err,member)=>{
      if(err){
        console.log(err.message)
      }
      res.json(member)
    }
  )
}

exports.updateMember = (req, res) => {
  Member.findOneAndUpdate(
    {_id: req.body._id},
    {$set: req.body },
    {upsert: true,
    new: true},
    (err,member)=>{
      if(err){
        console.log(err.message)
      }
      res.json(member)
    }
  )

}


exports.getIndTypeValues = (req, res) => {
  res.json(Member.schema.path('industrytype').enumValues)

}

exports.addMember = (req, res) => {
  console.log("req body: ", req.body)
  const newMember = new Member(req.body)

  newMember.save((err,data)=>{
    if(err){
      console.log(err)
      return err
    }
    res.json({
      data
    })
  })
}

exports.deleteMember = (req,res)=>{
  let memberId = req.body._id;
  Member.findOneAndRemove({
    _id: memberId
  }, (err,data)=>{
    if(err){
      console.log(err)
      return err
    }
    res.json({data})
  })

}

exports.getOneMember = (req, res, next, memberId) => {
  // let memberId = req.body._id;
  Member.findById(memberId)
  .exec((err,data)=>{
    if(err){
      console.log(err)
      return err
    }
    res.json({data})
  }
)
}

exports.findThis = (req, res) => {
  let searchDetails = req.body;

  Member.find(searchDetails)
    .exec(
      (err,data)=>{
        if(err){
          return err.message
        }
        console.log(data)
        res.send(data)
      }
    )
}
