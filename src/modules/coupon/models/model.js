'use strict';
// use model
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var CouponSchema = new Schema({
    // name: {
    //     type: String,
    //     required: 'Please fill a Coupon name',
    // },

    code: {
        type: String
    },
    amount: {
        type: String
    },
    discount_type: {
        type: String,
        enum: ["percent", "fixed_cart", "fixed_product"],
        default: "percent"
    },
    description: {
        type: String
    },
    usage_count: {
        type: Number
    },
    individual_use: {
        type: Boolean
    },
    product_ids: {
        type: Array
    },
    excluded_product_ids: {
        type: Array
    },
    usage_limit: {
        type: Number
    },
    usage_limit_per_user: {
        type: Number
    },
    limit_usage_to_x_items: {
        type: Number
    },
    free_shipping: {
        type: Boolean
    },
    product_categories: {
        type: Array
    },
    excluded_product_categories: {
        type: Array
    },
    exclude_sale_items: {
        type: Boolean
    },
    minimum_amount: {
        type: String
    },
    maximum_amount: {
        type: String
    },
    email_restrictions: {
        type: Array
    },
    used_by: {
        type: Array
    },

    created: {
        type: Date,
        default: Date.now
    },
    updated: {
        type: Date
    },
    created: {
        type: Date,
        default: Date.now
    },
    updated: {
        type: Date
    },
    createby: {
        _id: {
            type: String
        },
        username: {
            type: String
        },
        displayname: {
            type: String
        }
    },
    updateby: {
        _id: {
            type: String
        },
        username: {
            type: String
        },
        displayname: {
            type: String
        }
    }
});

// var CouponMetadataSchema = new Schema({
//     id: {
//         type: String
//     },
//     key: {
//         type: String
//     },
//     value: {
//         type: String
//     }
// });
mongoose.model("Coupon", CouponSchema);
// mongoose.model("Coupon", CouponMetadataSchema);