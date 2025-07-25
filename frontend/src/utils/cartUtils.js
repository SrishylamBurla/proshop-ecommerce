export const addDecimals = (num) =>{
    return (Math.round(num * 100)/100).toFixed(2)
}

export const updateCart = (state) =>{
     
            //itemsPrice
            state.itemsPrice = addDecimals(state.cartItems.reduce((acc, item) => (acc+item.price * item.qty),0))
            //shippingPrice
            state.shippingPrice = addDecimals(state.itemsPrice > 100 ? 0 : 10)
            //taxPrice 
            state.taxPrice = addDecimals(Number(0.15*state.itemsPrice).toFixed(2))

            //totalPrice

            state.totalPrice = (
                Number(state.itemsPrice)+
                Number(state.taxPrice)+
                Number(state.shippingPrice)
            ).toFixed(2)

            // localStorage.setItem('cart', JSON.stringify({ cartItems: state.cartItems }))
            localStorage.setItem('cart', JSON.stringify(state))
           
            
            return state

}