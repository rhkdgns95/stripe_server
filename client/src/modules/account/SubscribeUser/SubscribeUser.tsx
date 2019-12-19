import React from "react";
import StripeCheckout, { Token } from "react-stripe-checkout";
import { useMutation } from "react-apollo";
import { gql } from "apollo-boost";
import { CreateSubscription, CreateSubscriptionVariables } from "../../../types/schemaTypes";
import { userFragment } from "../../../graphql/fragments/userFragment";

export const STRIPE_KEY_TMP: string = "pk_test_AZWjyctSgrIe47FYHV3LQGlp00fJERaRig";

const createSubscriptionQuery = gql`
    mutation CreateSubscription($source: String!, $ccLast4: String!) {
        createSubscription(source: $source, ccLast4: $ccLast4) {
            ...UserInfo
        }
    }
    ${userFragment}
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
         const { id, card: { last4 }} = token;
        createSubscription({
            variables: {
                source: id,
                ccLast4: last4
            }
        });
    }
    return (
        <StripeCheckout
            token={onToken}
            stripeKey={process.env.STRIPE_PUBLIC_KEY || STRIPE_KEY_TMP}
            amount={10000}
        />
    );
}