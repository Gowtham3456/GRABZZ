//import React from 'react'
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import { data } from "react-router-dom";

export const PaypalButton = ({amount,onSuccess,onError}) => {
  return (
    <PayPalScriptProvider options={{"client-id":"AcIPtSUmubUnw1D1VrAT6bMhUN0A_1Eq0f6M4NFFAYXsvzbNZENpca0b44ikcAyt0iHS2wKlzyirIEhO"}}>
        <PayPalButtons style={{layout:"vertical"}} createOrder={(data,actions)=>{
            return actions.order.create({
                purchase_units:[{amount:{value:amount}}]
            })
        }}
        onApprove={(data,actions)=>{
            return actions.order.capture().then(onSuccess)
        }}
        onError={onError}></PayPalButtons>
    </PayPalScriptProvider>
  )
}
export default PaypalButton;
