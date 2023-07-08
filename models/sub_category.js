// const mongoose = require('mongoose');

// const Schema = mongoose.Schema;

// const subcategorySchema = new Schema({
//   name: {
//     type: String,
//     required: true
//   },
//   description: {
//     type: String,
//     required: true
//   },
//   userId: {
//     type: Schema.Types.ObjectId,
//     ref: 'User',
//     required: true
//   }
// });

// module.exports = mongoose.model('SubCategory', subcategorySchema);


const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const subcategorySchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  //   category: {
  //     name: {
  //       type: String,
  //       required: true
  //     },
  categoryId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'category'
  }
  //   }
});

module.exports = mongoose.model('Subcategory', subcategorySchema);