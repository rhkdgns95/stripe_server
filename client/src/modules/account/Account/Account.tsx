import React from "react";
import { gql } from "apollo-boost";
import { useQuery } from "react-apollo";
import { Link, Redirect } from "react-router-dom";
import { Me } from "../../../types/schemaTypes";
import SubscribeUser from "../SubscribeUser";

const meQuery = gql`
    query Me {
        me {
            id
            email
            type
            stripeId
        }
    }
`;

export default () => {
    const { data, loading } = useQuery<Me, any>(meQuery, {
        fetchPolicy: "network-only",
        onCompleted: data => {
            console.log("Success, data");
        }
    });  

    return (
        <>
            {/* { !data || !data.me && <Link to={"/login"}>please Login </Link>} */}
            { (!data || !data.me) && !loading && <Redirect to={"/login"} /> }
            { data?.me?.type === "free-trial" && <SubscribeUser /> }
            { data?.me?.type === "paid" && <Redirect to={"/paid-users"}/>}
        </>
    );
};