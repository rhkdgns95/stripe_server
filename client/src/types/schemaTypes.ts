/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: MeQuery
// ====================================================

export interface MeQuery_me {
  __typename: "User";
  id: string;
  email: string;
  type: string;
  ccLast4: string | null;
}

export interface MeQuery {
  me: MeQuery_me | null;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CancelSubscription
// ====================================================

export interface CancelSubscription_cancelSubscription {
  __typename: "User";
  id: string;
  email: string;
  type: string;
  ccLast4: string | null;
}

export interface CancelSubscription {
  cancelSubscription: CancelSubscription_cancelSubscription | null;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: ChangeCreditCard
// ====================================================

export interface ChangeCreditCard_changeCreditCard {
  __typename: "User";
  id: string;
  email: string;
  type: string;
  ccLast4: string | null;
}

export interface ChangeCreditCard {
  changeCreditCard: ChangeCreditCard_changeCreditCard | null;
}

export interface ChangeCreditCardVariables {
  source: string;
  ccLast4: string;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CreateSubscription
// ====================================================

export interface CreateSubscription_createSubscription {
  __typename: "User";
  id: string;
  email: string;
  type: string;
  ccLast4: string | null;
}

export interface CreateSubscription {
  createSubscription: CreateSubscription_createSubscription | null;
}

export interface CreateSubscriptionVariables {
  source: string;
  ccLast4: string;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: LoginMutation
// ====================================================

export interface LoginMutation_login {
  __typename: "User";
  id: string;
  email: string;
  type: string;
  ccLast4: string | null;
}

export interface LoginMutation {
  login: LoginMutation_login | null;
}

export interface LoginMutationVariables {
  email: string;
  password: string;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: registerMutation
// ====================================================

export interface registerMutation {
  register: boolean;
}

export interface registerMutationVariables {
  email: string;
  password: string;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: UserInfo
// ====================================================

export interface UserInfo {
  __typename: "User";
  id: string;
  email: string;
  type: string;
  ccLast4: string | null;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

//==============================================================
// END Enums and Input Objects
//==============================================================
