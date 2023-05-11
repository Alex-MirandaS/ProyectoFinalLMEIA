const express = require('express');
const Orders = require('../models/orders');
const ListOrders = require('../models/listOrders');
const Catalogues = require('../models/catalogues');
const router = express.Router();
//POST : INSERTAR COSAS
router.get('/getReport/:idReport', async function(request, response) {

    const idReport = request.params.idReport;
    let results = [];
    switch (idReport) {
        case 'R1':
            results = await Orders.aggregate([{
                    $lookup: {
                        from: "products",
                        localField: "idProduct",
                        foreignField: "idProduct",
                        as: "product"
                    }
                },
                { $unwind: "$product" },
                {
                    $group: {
                        _id: "$idProduct",
                        nameProduct: { $first: "$product.productName" },
                        maxAmount: { $sum: "$amount" },
                    }
                },
                { $sort: { maxAmount: -1 } },
                { $limit: 10 }
            ])
            break;

        case 'R3':
            results = await Orders.aggregate([{
                    $lookup: {
                        from: "products",
                        localField: "idProduct",
                        foreignField: "idProduct",
                        as: "product"
                    }
                },
                {
                    $unwind: "$product"
                },
                {
                    $lookup: {
                        from: "users",
                        localField: "product.idOwner",
                        foreignField: "idUser",
                        as: "user"
                    }
                },
                {
                    $unwind: "$user"
                },
                {
                    $group: {
                        _id: "$user.name",
                        numProducts: {
                            $sum: 1
                        },
                        totalAmount: {
                            $sum: "$amount"
                        }
                    }
                },
                {
                    $sort: {
                        numProducts: -1,
                        totalAmount: -1
                    }
                },
                {
                    $limit: 5
                }
            ])

            break;

        case 'R4':
            results = await ListOrders.aggregate([{
                    $group: {
                        _id: "$idUser",
                        count: {
                            $sum: 1
                        }
                    }
                },
                {
                    $sort: {
                        count: -1
                    }
                },
                {
                    $limit: 10
                },
                {
                    $lookup: {
                        from: "users",
                        localField: "_id",
                        foreignField: "idUser",
                        as: "user"
                    }
                },
                {
                    $unwind: "$user"
                },
                {
                    $project: {
                        _id: 0,
                        idUser: "$_id",
                        name: "$user.name",
                        count: 1
                    }
                }
            ])
            break;

        case 'R5':
            results = await Catalogues.aggregate([{
                    $match: { status: "accepted" }
                },
                {
                    $group: {
                        _id: "$idProduct",
                        count: { $sum: 1 }
                    }
                },
                {
                    $lookup: {
                        from: "products",
                        localField: "_id",
                        foreignField: "idProduct",
                        as: "product"
                    }
                },
                {
                    $unwind: "$product"
                },
                {
                    $lookup: {
                        from: "users",
                        localField: "product.idOwner",
                        foreignField: "idUser",
                        as: "user"
                    }
                },
                {
                    $unwind: "$user"
                },
                {
                    $group: {
                        _id: "$user.idUser",
                        name: { $first: "$user.name" },
                        count: { $sum: "$count" }
                    }
                },
                {
                    $sort: { count: -1 }
                },
                {
                    $limit: 10
                }
            ]);

            break;
    }
    response.json(results);
});

module.exports = router;