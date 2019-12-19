import React from "react";
import { gql } from "apollo-boost";
import { userFragment } from "../../../graphql/fragments/userFragment";
import { useMutation } from "react-apollo";
import { CancelSubscription } from "../../../types/schemaTypes";
const cancelSubscriptionQuery = gql`
    mutation CancelSubscription {
        cancelSubscription {
            ...UserInfo
        }
    }
    ${userFragment}
`;

export default () => {
    const [ cancelSubscription, { data } ] = useMutation<CancelSubscription, any>(cancelSubscriptionQuery, {
        onCompleted: data => {
            console.log("cancelSubscription onCompleted: ", data);
        },
        onError: data => {
            console.log("cancelSubscription onError: ", data);
        }
    });
    const handleCacelSubscription = () => {
        cancelSubscription();
    }
    return (
        <button onClick={handleCacelSubscription}>Cancel Subscription</button>
    )
};