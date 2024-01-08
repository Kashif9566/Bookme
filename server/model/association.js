const User = require("./user.model");
const Property = require("./property.model");
const Reviews = require("./review.model");
const Reserve = require("./reserve.model");

User.hasMany(Property);
Property.belongsTo(User);

User.hasMany(Reviews);
Reviews.belongsTo(User);

Property.hasMany(Reviews);
Reviews.belongsTo(Property);

User.hasMany(Reserve);
Reserve.belongsTo(User);

Reserve.belongsTo(Property);
Property.hasMany(Reserve);
