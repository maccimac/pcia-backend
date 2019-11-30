//THIS IS OUR USER SCHEMA
const mongoose = require('mongoose')
const crypto = require('crypto')
const uuidv1 = require('uuid/v1')
const { ObjectId } = mongoose.Schema


const memberSchema = new mongoose.Schema({
  companyname: {
    type: String,
    maxlength: 32,
    required: true
  },
  contact: {
    type: [
      {
        contactperson: String,
        address: String,
        mobile: String,
        fax: String,
        email: String
      }
    ],
  },
  industrytype: {
    type: String,
    default: "Others...",
    enum: [
      "Others...",
      "Ready Mix Concrete",
      "Engineering",
      "Contractor",
      "Concrete Block",
      "Cement Manufacturer / Aggregate",
      "Architect",
      "Consultant",
      "Prestess / Precast",
      "Chemical Admixtures",
      "Testing Laboratory",
      "Mineral Admixtures",
      "Equipment Distributor / Trader"
     ]

  },
  membershiptype: {
    type: String,
    enum: [
      "Corporate",
      "Individual"
    ]
  },
  years:
    {type: [Number]},

  applicationtype: String,
  remarks: String
},
{timestamps: true}
)

//VIRTUAL FIELD
// userSchema
//   .virtual("password")
//   .set(function(password) {
//     this._password = password;
//     this.salt = uuidv1(); //creates random string?
//     this.hashed_password = this.encryptPassword(password)
//   })
//   .get(function() {
//     return this._password
//   })
//
// userSchema.methods = {
//   authenticate: function(plainText){
//     return this.encryptPassword(plainText) === this.hashed_password;
//   },
//   encryptPassword: function(password){
//     if(!password) return "";
//     try{
//       return crypto
//         .createHmac("sha1", this.salt)
//         .update(password)
//         .digest("hex")
//     } catch (err){
//       return "";
//       // return err;
//     }
//   }
// }

module.exports = mongoose.model("Member", memberSchema);
