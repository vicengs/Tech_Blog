/* ------------------------- */
/* Project  : Tech Blog      */
/* File     : Post.js        */
/* Author   : Vicente Garcia */
/* Date     : 05/06/2022     */
/* Modified : 05/06/2022     */
/* ------------------------- */
// Sequelize model
const { Model, DataTypes } = require('sequelize');
// Access to db connection
const sequelize = require('../config/connection');
// Create Post model
class Post extends Model {
    /*static upvote(body, models) {
        return models.Vote.create({
            user_id: body.user_id,
            post_id: body.post_id
        })
        .then(() => {
            return Post.findOne({
                where: {
                    id: body.post_id
                },
                attributes: [
                    'id',
                    'post_url',
                    'title',
                    'created_at',
                    [
                        sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'),
                        'vote_count'
                    ]
                ]
            });
        });
    }*/
}
// Define post table
Post.init({
    // Define id column
    id: {
        type:          DataTypes.INTEGER
       ,allowNull:     false
       ,primaryKey:    true
       ,autoIncrement: true
    },
    // Define title column
    title: {
        type:      DataTypes.STRING
       ,allowNull: false
    },
    // Define post content column
    content_post: {
        type:      DataTypes.STRING
       ,allowNull: false
       ,validate: {
            len: [1]
        }
    },
    // Define post owner column (fk)
    user_id: {
        type: DataTypes.INTEGER
       ,references: {
            model: 'user'
           ,key:   'id'
        }
    }
},
{
    sequelize
   ,freezeTableName: true
   ,underscored:     true
   ,modelName:       'post'
});
// Export class Post
module.exports = Post;