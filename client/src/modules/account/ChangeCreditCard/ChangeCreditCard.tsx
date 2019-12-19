import React from "react";
import { useMutation } from "react-apollo";
import { gql } from "apollo-boost";
import { ChangeCreditCard, ChangeCreditCardVariables } from "../../../types/schemaTypes";
import { meQuery } from "../../../graphql/queries/me";
import StripeCheckout, { Token } from "react-stripe-checkout";
import { userFragment } from "../../../graphql/fragments/userFragment";

export const STRIPE_KEY_TMP: string = "pk_test_AZWjyctSgrIe47FYHV3LQGlp00fJERaRig";

const changeCreditCardQuery = gql`
    mutation ChangeCreditCard($source: String!, $ccLast4: String!) {
        changeCreditCard(source: $source, ccLast4: $ccLast4) {
            ...UserInfo
        }
    }
    ${userFragment}
`;

export default () => {
    const [ changeCreditCard ] = useMutation<ChangeCreditCard, ChangeCreditCardVariables>(changeCreditCardQuery, {
        update: (cache, { data }) => {
            if(data && data.changeCreditCard) {
                cache.writeQuery({
                    query: meQuery,
                    data: {
                        me: { ...data.changeCreditCard }
                    }
                });
            }
        },
        onCompleted: data => {
            console.log("changeCreditCard onCompleted: ", data);
        },
        onError: data => {
            console.log("changeCreditCard onError: ", data);
        }
    });
    const handleChangeCreditCard = (token: Token) => {
        const { id, card: { last4 } } = token;
        changeCreditCard({
            variables: {
                source: id,
                ccLast4: last4
            }
        });
    }
    return (
        <StripeCheckout 
            stripeKey={STRIPE_KEY_TMP}
            token={handleChangeCreditCard}
        /> 
    );
};