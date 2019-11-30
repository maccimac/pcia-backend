const express = require('express');
const router = express.Router();

const { getMembers, getOneMember, verifyMember, getIndTypeValues, addMember, deleteMember, updateMember, findThis }  =  require('./controllers/member');



router.get('/getMembers', getMembers)
router.post('/findMember', findThis)
router.get('/getOneMember/:memberId', getOneMember)
router.get('/industryValues',getIndTypeValues )
router.put('/verifyMember', verifyMember)
router.put('/updateMember', updateMember)
router.post('/addMember',addMember )
router.delete('/deleteMember', deleteMember)

router.param('memberId', getOneMember);


module.exports = router;
