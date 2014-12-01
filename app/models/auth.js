/**
 * Created by mosluce on 14/12/1.
 */
var mongoose = require('mongoose');

exports = module.exports = mongoose.model("Auth", {
    username: String,
    display: String
});