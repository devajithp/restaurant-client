
import { CREATE_PRODUCT, GET_PRODUCTS,DELETE_PRODUCT, GET_PRODUCT,EDIT_PRODUCT, EMPTY_PRODUCT } from "../constants/productConstants";

const INITIAL_STATE={
   products:[],
   product:{}
}

const productReducer=(state=INITIAL_STATE,action)=>
{
    switch(action.type)
    {
        case CREATE_PRODUCT:
            {
                return{
                    ...state,
                    products:[...state.products,action.payload]
                }

            }
        case GET_PRODUCTS:
            {
                return{
                    ...state,
                    products:[...action.payload]
                }
            }
        case DELETE_PRODUCT:
            {
                return{
                    ...state,
                    products: state.products.filter((p)=>
                    {
                        return (p._id!==action.payload._id)
                    })
                }
            }
        case GET_PRODUCT:
            {
                return{
                   ...state,
                   product:JSON.parse(JSON.stringify(action.payload))
                }
            }  
        case EDIT_PRODUCT:
            {
                return{
                    ...state,
                    products:[...action.payload]
                }
            }
        case EMPTY_PRODUCT:
            {
                return{
                    ...state,
                    product:{}
                }
            }     

        default:
               return state
    }
}

export default productReducer