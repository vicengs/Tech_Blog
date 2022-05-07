/* ------------------------- */
/* Project  : Tech Blog      */
/* File     : Comment.js     */
/* Author   : Vicente Garcia */
/* Date     : 05/06/2022     */
/* Modified : 05/06/2022     */
/* ------------------------- */
// Sequelize model
const { Model, DataTypes } = require('sequelize');
// Access to db connection
const sequelize = require('../config/connection');
// Create Comment model
class Comment extends Model {}
// Define comment table
Comment.init({
    // Define id column
    id: {
        type:          DataTypes.INTEGER
       ,primaryKey:    true
       ,autoIncrement: true
    },
    // Define comment text column
    comment_text: {
        type:      DataTypes.STRING
       ,allowNull: false
       ,validate: {
            len: [1]
        }
    },
    // Define post owner column (fk)
    user_id: {
        type:      DataTypes.INTEGER
       ,allowNull: false
       ,references: {
            model: 'user'
           ,key:   'id'
        }
    },
    // Define post commented column (fk)
    post_id: {
        type:      DataTypes.INTEGER
       ,allowNull: false
       ,references: {
            model: 'post'
           ,key: 'id'
        }
    }
},
{
    sequelize
   ,freezeTableName: true
   ,underscored:     true
   ,modelName:       'comment'
});
// Export class Comment
module.exports = Comment;