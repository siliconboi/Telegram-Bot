import React, {useState} from 'react';
import './ProductList.css';
import ProductItem from "../ProductItem/ProductItem";
import {useTelegram} from "../../hooks/useTelegram";
import {useCallback, useEffect} from "react";

const products = [
    {id: '1', title: 'Classic', price: 255, image: 'https://im.whatshot.in/img/2019/Sep/shutterstock-675084019-1-cropped-1567681752.jpg'},
    {id: '2', title: 'Chocolate Tea', price: 245, image: 'https://4.bp.blogspot.com/--wNLJD2OHe4/WgSQEQGSxaI/AAAAAAAAIis/BkVMcgM7J7ESTHS-2IhSZW9NWy1WoM6QwCLcBGAs/s1600/Caribbean-Cocoa-Tea.jpg' },
    {id: '3', title: 'Boba Tea', price: 230, image: 'https://thenovicechefblog.com/wp-content/uploads/2020/03/Boba-Tea-5.jpg'},
    {id: '4', title: 'Amritulya Chai', price: 260, image: 'https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/guj0n72uulxgknxsnxsl'},
    {id: '5', title: 'Cappuccino', price: 250, image: 'https://th.bing.com/th/id/OIP.zBhnw1zH8lnSABXPCORfQgHaEK?pid=ImgDet&rs=1'},
    {id: '6', title: 'Blue Lagoon Mocktail', price: 600, image: 'https://saltandbaker.com/wp-content/uploads/2021/08/Blue-Lagoon-Mocktail-featured.jpg'},
    {id: '7', title: 'Caramel Macchiato', price: 250, image: 'https://bing.com/th?id=OSK.24f7e031c8a02b44d388e96d5919999b'},
    {id: '8', title: 'Hazelnut Coffee', price: 245, image: 'https://bing.com/th?id=AMMS_db5f3cf338ba6ba82eaec23b377cf026'},
    {id: '9', title: 'Toffee Coffee', price: 250, image: 'https://2.bp.blogspot.com/-0z5lPeb159g/UR1lTyk1N6I/AAAAAAAAGOs/_aHgFFUTrGg/s1600/Biltmore+Toffee+Coffee.jpg'},
    {id: '10', title: 'Ice Tea', price: 1, image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/Iced_Tea_from_flickr.jpg/1200px-Iced_Tea_from_flickr.jpg'},
]

const getTotalPrice = (items = []) => {
    return items.reduce((acc, item) => {
        return acc += item.price
    }, 0)
}

const ProductList = () => {
    const [addedItems, setAddedItems] = useState([]);
    const {tg, queryId} = useTelegram();

    const onSendData = useCallback(() => {
        const data = {
            products: addedItems,
            totalPrice: getTotalPrice(addedItems),
            queryId,
        }
        fetch('http://85.119.146.179:8000/web-data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
    }, [addedItems])

    useEffect(() => {
        tg.onEvent('mainButtonClicked', onSendData)
        return () => {
            tg.offEvent('mainButtonClicked', onSendData)
        }
    }, [onSendData])

    const onAdd = (product) => {
        const alreadyAdded = addedItems.find(item => item.id === product.id);
        let newItems = [];

        if(alreadyAdded) {
            newItems = addedItems.filter(item => item.id !== product.id);
        } else {
            newItems = [...addedItems, product];
        }

        setAddedItems(newItems)

        if(newItems.length === 0) {
            tg.MainButton.hide();
        } else {
            tg.MainButton.show();
            tg.MainButton.setParams({
                text: `Total ${getTotalPrice(newItems)}`
            })
        }
    }

    return (
        <div className={'list'}>
            {products.map(item => (
                <ProductItem
                    product={item}
                    onAdd={onAdd}
                    className={'item'}
                />
            ))}
        </div>
    );
};

export default ProductList;
