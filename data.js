const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    
    phone:{
        type: String,
        validate: {
          validator: function(v) {
            return /^((\+)?(\d{2}[-]))?(\d{10}){1}?$/.test(v);
          },
          message: props => `${props.value} is not a valid phone number!`
        },
        required: [true, 'User phone number required']
    },

    email:{

        required: true,
        type: String
    },

    password:{
        required: true,
        type: String
    }
});
module.exports = mongoose.model("datas", productSchema);
