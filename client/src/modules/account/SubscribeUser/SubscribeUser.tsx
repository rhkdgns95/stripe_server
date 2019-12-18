import React from "react";
import StripeCheckout, { Token } from "react-stripe-checkout";
import { useMutation } from "react-apollo";
import { gql } from "apollo-boost";
import { CreateSubscription, CreateSubscriptionVariables } from "../../../types/schemaTypes";
const STRIPE_KEY_TMP: string = "pk_test_AZWjyctSgrIe47FYHV3LQGlp00fJERaRig";

const createSubscriptionQuery = gql`
    mutation CreateSubscription($source: String!) {
        createSubscription(source: $source) {
            id
            email
            stripeId
            type
        }
    }
`;

export default () => {
    const [ createSubscription ] = useMutation<CreateSubscription, CreateSubscriptionVariables>(createSubscriptionQuery, {
        onCompleted: data => {
            if(data.createSubscription) {
                
            } else {

            }
            console.log("createSubscription onCompleted: ", data);
        }, 
        onError: data => {
            console.log("createSubscription onError: ", data);
        }
    });
    const onToken = (token: Token) => {
        const { id, type } = token;
        console.log("onToken: ", id, type);
        createSubscription({
            variables: {
                source: id
            }
        });
    }
    return (
        <StripeCheckout
            token={onToken}
            stripeKey={process.env.STRIPE_PUBLIC_KEY || STRIPE_KEY_TMP}
        />
    );
}