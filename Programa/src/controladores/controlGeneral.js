const Product = require('../models/products');
const ListOrders = require('../models/listOrders');
const ShopBag = require('../models/shopBags');
const User = require('../models/user')

async function addToTotal(idProduct, amount) {
    const numLO = await ListOrders.count();
    const listOrderTemp = await ListOrders.find({
        idLOrders: "LO" + numLO
    }).limit(1);
    const productTemp = await Product.find({
        idProduct: idProduct
    }).limit(1);
    //agregamos al total de la factura ERROR
    const operation = (productTemp[0].price * amount);
    const newTotal = listOrderTemp[0].total + operation;
    await ListOrders.updateOne({
        idLOrders: listOrderTemp[0].idLOrders
    }, {
        "$set": {
            total: newTotal
        }
    });
    //agregamos el dinero al vendedor y al admin y se lo restamos al comprador
    const ownerTemp = await User.find({
        idUser: productTemp[0].idOwner
    }).limit(1);

    const adminTemp = await User.find({
        idUser: 'E1'
    }).limit(1);

    const buyer = await User.find({
        idUser: listOrderTemp[0].idUser
    }).limit(1);

    console.log(ownerTemp[0].idUser);
    console.log(ownerTemp[0].wallet + (operation * 0.95));
    await editMoney(ownerTemp[0].idUser, (ownerTemp[0].wallet + (operation * 0.95)));
    await editMoney(adminTemp[0].idUser, (adminTemp[0].wallet + (operation * 0.05)));
    await editMoney(buyer[0].idUser, (buyer[0].wallet - operation));
}

async function editMoney(idUsers, newWallet) {

    await User.updateOne({
        idUser: idUsers
    }, {
        "$set": {
            wallet: newWallet
        }
    });
}

function getProductsSB(idUsers) {
    return ShopBag.find({ idUser: idUsers });
}

async function deleteShopBag(idUs) {
    await ShopBag.deleteMany({
        idUser: idUs
    });
}

module.exports = {
    addToTotal,
    deleteShopBag,
    getProductsSB
};