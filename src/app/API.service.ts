/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.
import { Injectable } from "@angular/core";
import API, { graphqlOperation } from "@aws-amplify/api";
import { GraphQLResult } from "@aws-amplify/api/lib/types";
import { Observable } from "zen-observable-ts";

export type CreateCustomerInput = {
  id?: string | null;
  name: string;
  address?: string | null;
  siret?: string | null;
};

export type ModelCustomerConditionInput = {
  name?: ModelStringInput | null;
  address?: ModelStringInput | null;
  siret?: ModelStringInput | null;
  and?: Array<ModelCustomerConditionInput | null> | null;
  or?: Array<ModelCustomerConditionInput | null> | null;
  not?: ModelCustomerConditionInput | null;
};

export type ModelStringInput = {
  ne?: string | null;
  eq?: string | null;
  le?: string | null;
  lt?: string | null;
  ge?: string | null;
  gt?: string | null;
  contains?: string | null;
  notContains?: string | null;
  between?: Array<string | null> | null;
  beginsWith?: string | null;
  attributeExists?: boolean | null;
  attributeType?: ModelAttributeTypes | null;
  size?: ModelSizeInput | null;
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null"
}

export type ModelSizeInput = {
  ne?: number | null;
  eq?: number | null;
  le?: number | null;
  lt?: number | null;
  ge?: number | null;
  gt?: number | null;
  between?: Array<number | null> | null;
};

export type UpdateCustomerInput = {
  id: string;
  name?: string | null;
  address?: string | null;
  siret?: string | null;
};

export type DeleteCustomerInput = {
  id?: string | null;
};

export type CreateLineInput = {
  id?: string | null;
  billID: string;
  title: string;
  quantity: number;
  cost: number;
};

export type ModelLineConditionInput = {
  billID?: ModelIDInput | null;
  title?: ModelStringInput | null;
  quantity?: ModelIntInput | null;
  cost?: ModelFloatInput | null;
  and?: Array<ModelLineConditionInput | null> | null;
  or?: Array<ModelLineConditionInput | null> | null;
  not?: ModelLineConditionInput | null;
};

export type ModelIDInput = {
  ne?: string | null;
  eq?: string | null;
  le?: string | null;
  lt?: string | null;
  ge?: string | null;
  gt?: string | null;
  contains?: string | null;
  notContains?: string | null;
  between?: Array<string | null> | null;
  beginsWith?: string | null;
  attributeExists?: boolean | null;
  attributeType?: ModelAttributeTypes | null;
  size?: ModelSizeInput | null;
};

export type ModelIntInput = {
  ne?: number | null;
  eq?: number | null;
  le?: number | null;
  lt?: number | null;
  ge?: number | null;
  gt?: number | null;
  between?: Array<number | null> | null;
  attributeExists?: boolean | null;
  attributeType?: ModelAttributeTypes | null;
};

export type ModelFloatInput = {
  ne?: number | null;
  eq?: number | null;
  le?: number | null;
  lt?: number | null;
  ge?: number | null;
  gt?: number | null;
  between?: Array<number | null> | null;
  attributeExists?: boolean | null;
  attributeType?: ModelAttributeTypes | null;
};

export type UpdateLineInput = {
  id: string;
  billID?: string | null;
  title?: string | null;
  quantity?: number | null;
  cost?: number | null;
};

export type DeleteLineInput = {
  id?: string | null;
};

export type CreateUserInput = {
  id?: string | null;
  firstname?: string | null;
  lastname?: string | null;
  address?: string | null;
  phone?: string | null;
  email?: string | null;
  siret?: string | null;
};

export type ModelUserConditionInput = {
  firstname?: ModelStringInput | null;
  lastname?: ModelStringInput | null;
  address?: ModelStringInput | null;
  phone?: ModelStringInput | null;
  email?: ModelStringInput | null;
  siret?: ModelStringInput | null;
  and?: Array<ModelUserConditionInput | null> | null;
  or?: Array<ModelUserConditionInput | null> | null;
  not?: ModelUserConditionInput | null;
};

export type UpdateUserInput = {
  id: string;
  firstname?: string | null;
  lastname?: string | null;
  address?: string | null;
  phone?: string | null;
  email?: string | null;
  siret?: string | null;
};

export type DeleteUserInput = {
  id?: string | null;
};

export type CreateBillInput = {
  id?: string | null;
  serialnum?: string | null;
  title: string;
  customerID: string;
  createdAt?: string | null;
  owner?: string | null;
  pleasePrint?: boolean | null;
  pdfUrl?: string | null;
};

export type ModelBillConditionInput = {
  serialnum?: ModelStringInput | null;
  title?: ModelStringInput | null;
  customerID?: ModelIDInput | null;
  createdAt?: ModelStringInput | null;
  pleasePrint?: ModelBooleanInput | null;
  pdfUrl?: ModelStringInput | null;
  and?: Array<ModelBillConditionInput | null> | null;
  or?: Array<ModelBillConditionInput | null> | null;
  not?: ModelBillConditionInput | null;
};

export type ModelBooleanInput = {
  ne?: boolean | null;
  eq?: boolean | null;
  attributeExists?: boolean | null;
  attributeType?: ModelAttributeTypes | null;
};

export type UpdateBillInput = {
  id: string;
  serialnum?: string | null;
  title?: string | null;
  customerID?: string | null;
  createdAt?: string | null;
  owner?: string | null;
  pleasePrint?: boolean | null;
  pdfUrl?: string | null;
};

export type DeleteBillInput = {
  id?: string | null;
};

export type ModelCustomerFilterInput = {
  id?: ModelIDInput | null;
  name?: ModelStringInput | null;
  address?: ModelStringInput | null;
  siret?: ModelStringInput | null;
  and?: Array<ModelCustomerFilterInput | null> | null;
  or?: Array<ModelCustomerFilterInput | null> | null;
  not?: ModelCustomerFilterInput | null;
};

export type ModelLineFilterInput = {
  id?: ModelIDInput | null;
  billID?: ModelIDInput | null;
  title?: ModelStringInput | null;
  quantity?: ModelIntInput | null;
  cost?: ModelFloatInput | null;
  and?: Array<ModelLineFilterInput | null> | null;
  or?: Array<ModelLineFilterInput | null> | null;
  not?: ModelLineFilterInput | null;
};

export type ModelUserFilterInput = {
  id?: ModelIDInput | null;
  firstname?: ModelStringInput | null;
  lastname?: ModelStringInput | null;
  address?: ModelStringInput | null;
  phone?: ModelStringInput | null;
  email?: ModelStringInput | null;
  siret?: ModelStringInput | null;
  and?: Array<ModelUserFilterInput | null> | null;
  or?: Array<ModelUserFilterInput | null> | null;
  not?: ModelUserFilterInput | null;
};

export type ModelBillFilterInput = {
  id?: ModelIDInput | null;
  serialnum?: ModelStringInput | null;
  title?: ModelStringInput | null;
  customerID?: ModelIDInput | null;
  createdAt?: ModelStringInput | null;
  owner?: ModelStringInput | null;
  pleasePrint?: ModelBooleanInput | null;
  pdfUrl?: ModelStringInput | null;
  and?: Array<ModelBillFilterInput | null> | null;
  or?: Array<ModelBillFilterInput | null> | null;
  not?: ModelBillFilterInput | null;
};

export type CreateCustomerMutation = {
  __typename: "Customer";
  id: string;
  name: string;
  address: string | null;
  siret: string | null;
  createdAt: string;
  updatedAt: string;
  owner: string | null;
  bills: {
    __typename: "ModelBillConnection";
    items: Array<{
      __typename: "Bill";
      id: string;
      serialnum: string | null;
      title: string;
      customerID: string;
      createdAt: string;
      owner: string | null;
      pleasePrint: boolean | null;
      pdfUrl: string | null;
      updatedAt: string;
    } | null> | null;
    nextToken: string | null;
  } | null;
};

export type UpdateCustomerMutation = {
  __typename: "Customer";
  id: string;
  name: string;
  address: string | null;
  siret: string | null;
  createdAt: string;
  updatedAt: string;
  owner: string | null;
  bills: {
    __typename: "ModelBillConnection";
    items: Array<{
      __typename: "Bill";
      id: string;
      serialnum: string | null;
      title: string;
      customerID: string;
      createdAt: string;
      owner: string | null;
      pleasePrint: boolean | null;
      pdfUrl: string | null;
      updatedAt: string;
    } | null> | null;
    nextToken: string | null;
  } | null;
};

export type DeleteCustomerMutation = {
  __typename: "Customer";
  id: string;
  name: string;
  address: string | null;
  siret: string | null;
  createdAt: string;
  updatedAt: string;
  owner: string | null;
  bills: {
    __typename: "ModelBillConnection";
    items: Array<{
      __typename: "Bill";
      id: string;
      serialnum: string | null;
      title: string;
      customerID: string;
      createdAt: string;
      owner: string | null;
      pleasePrint: boolean | null;
      pdfUrl: string | null;
      updatedAt: string;
    } | null> | null;
    nextToken: string | null;
  } | null;
};

export type CreateLineMutation = {
  __typename: "Line";
  id: string;
  billID: string;
  title: string;
  quantity: number;
  cost: number;
  createdAt: string;
  updatedAt: string;
  bill: {
    __typename: "Bill";
    id: string;
    serialnum: string | null;
    title: string;
    customerID: string;
    customer: {
      __typename: "Customer";
      id: string;
      name: string;
      address: string | null;
      siret: string | null;
      createdAt: string;
      updatedAt: string;
      owner: string | null;
    } | null;
    lines: {
      __typename: "ModelLineConnection";
      nextToken: string | null;
    } | null;
    createdAt: string;
    owner: string | null;
    pleasePrint: boolean | null;
    pdfUrl: string | null;
    updatedAt: string;
  } | null;
  owner: string | null;
};

export type UpdateLineMutation = {
  __typename: "Line";
  id: string;
  billID: string;
  title: string;
  quantity: number;
  cost: number;
  createdAt: string;
  updatedAt: string;
  bill: {
    __typename: "Bill";
    id: string;
    serialnum: string | null;
    title: string;
    customerID: string;
    customer: {
      __typename: "Customer";
      id: string;
      name: string;
      address: string | null;
      siret: string | null;
      createdAt: string;
      updatedAt: string;
      owner: string | null;
    } | null;
    lines: {
      __typename: "ModelLineConnection";
      nextToken: string | null;
    } | null;
    createdAt: string;
    owner: string | null;
    pleasePrint: boolean | null;
    pdfUrl: string | null;
    updatedAt: string;
  } | null;
  owner: string | null;
};

export type DeleteLineMutation = {
  __typename: "Line";
  id: string;
  billID: string;
  title: string;
  quantity: number;
  cost: number;
  createdAt: string;
  updatedAt: string;
  bill: {
    __typename: "Bill";
    id: string;
    serialnum: string | null;
    title: string;
    customerID: string;
    customer: {
      __typename: "Customer";
      id: string;
      name: string;
      address: string | null;
      siret: string | null;
      createdAt: string;
      updatedAt: string;
      owner: string | null;
    } | null;
    lines: {
      __typename: "ModelLineConnection";
      nextToken: string | null;
    } | null;
    createdAt: string;
    owner: string | null;
    pleasePrint: boolean | null;
    pdfUrl: string | null;
    updatedAt: string;
  } | null;
  owner: string | null;
};

export type CreateUserMutation = {
  __typename: "User";
  id: string;
  firstname: string | null;
  lastname: string | null;
  address: string | null;
  phone: string | null;
  email: string | null;
  siret: string | null;
  createdAt: string;
  updatedAt: string;
  owner: string | null;
};

export type UpdateUserMutation = {
  __typename: "User";
  id: string;
  firstname: string | null;
  lastname: string | null;
  address: string | null;
  phone: string | null;
  email: string | null;
  siret: string | null;
  createdAt: string;
  updatedAt: string;
  owner: string | null;
};

export type DeleteUserMutation = {
  __typename: "User";
  id: string;
  firstname: string | null;
  lastname: string | null;
  address: string | null;
  phone: string | null;
  email: string | null;
  siret: string | null;
  createdAt: string;
  updatedAt: string;
  owner: string | null;
};

export type CreateBillMutation = {
  __typename: "Bill";
  id: string;
  serialnum: string | null;
  title: string;
  customerID: string;
  customer: {
    __typename: "Customer";
    id: string;
    name: string;
    address: string | null;
    siret: string | null;
    createdAt: string;
    updatedAt: string;
    owner: string | null;
    bills: {
      __typename: "ModelBillConnection";
      nextToken: string | null;
    } | null;
  } | null;
  lines: {
    __typename: "ModelLineConnection";
    items: Array<{
      __typename: "Line";
      id: string;
      billID: string;
      title: string;
      quantity: number;
      cost: number;
      createdAt: string;
      updatedAt: string;
      owner: string | null;
    } | null> | null;
    nextToken: string | null;
  } | null;
  createdAt: string;
  owner: string | null;
  pleasePrint: boolean | null;
  pdfUrl: string | null;
  updatedAt: string;
};

export type UpdateBillMutation = {
  __typename: "Bill";
  id: string;
  serialnum: string | null;
  title: string;
  customerID: string;
  customer: {
    __typename: "Customer";
    id: string;
    name: string;
    address: string | null;
    siret: string | null;
    createdAt: string;
    updatedAt: string;
    owner: string | null;
    bills: {
      __typename: "ModelBillConnection";
      nextToken: string | null;
    } | null;
  } | null;
  lines: {
    __typename: "ModelLineConnection";
    items: Array<{
      __typename: "Line";
      id: string;
      billID: string;
      title: string;
      quantity: number;
      cost: number;
      createdAt: string;
      updatedAt: string;
      owner: string | null;
    } | null> | null;
    nextToken: string | null;
  } | null;
  createdAt: string;
  owner: string | null;
  pleasePrint: boolean | null;
  pdfUrl: string | null;
  updatedAt: string;
};

export type DeleteBillMutation = {
  __typename: "Bill";
  id: string;
  serialnum: string | null;
  title: string;
  customerID: string;
  customer: {
    __typename: "Customer";
    id: string;
    name: string;
    address: string | null;
    siret: string | null;
    createdAt: string;
    updatedAt: string;
    owner: string | null;
    bills: {
      __typename: "ModelBillConnection";
      nextToken: string | null;
    } | null;
  } | null;
  lines: {
    __typename: "ModelLineConnection";
    items: Array<{
      __typename: "Line";
      id: string;
      billID: string;
      title: string;
      quantity: number;
      cost: number;
      createdAt: string;
      updatedAt: string;
      owner: string | null;
    } | null> | null;
    nextToken: string | null;
  } | null;
  createdAt: string;
  owner: string | null;
  pleasePrint: boolean | null;
  pdfUrl: string | null;
  updatedAt: string;
};

export type GetCustomerQuery = {
  __typename: "Customer";
  id: string;
  name: string;
  address: string | null;
  siret: string | null;
  createdAt: string;
  updatedAt: string;
  owner: string | null;
  bills: {
    __typename: "ModelBillConnection";
    items: Array<{
      __typename: "Bill";
      id: string;
      serialnum: string | null;
      title: string;
      customerID: string;
      createdAt: string;
      owner: string | null;
      pleasePrint: boolean | null;
      pdfUrl: string | null;
      updatedAt: string;
    } | null> | null;
    nextToken: string | null;
  } | null;
};

export type ListCustomersQuery = {
  __typename: "ModelCustomerConnection";
  items: Array<{
    __typename: "Customer";
    id: string;
    name: string;
    address: string | null;
    siret: string | null;
    createdAt: string;
    updatedAt: string;
    owner: string | null;
    bills: {
      __typename: "ModelBillConnection";
      nextToken: string | null;
    } | null;
  } | null> | null;
  nextToken: string | null;
};

export type GetLineQuery = {
  __typename: "Line";
  id: string;
  billID: string;
  title: string;
  quantity: number;
  cost: number;
  createdAt: string;
  updatedAt: string;
  bill: {
    __typename: "Bill";
    id: string;
    serialnum: string | null;
    title: string;
    customerID: string;
    customer: {
      __typename: "Customer";
      id: string;
      name: string;
      address: string | null;
      siret: string | null;
      createdAt: string;
      updatedAt: string;
      owner: string | null;
    } | null;
    lines: {
      __typename: "ModelLineConnection";
      nextToken: string | null;
    } | null;
    createdAt: string;
    owner: string | null;
    pleasePrint: boolean | null;
    pdfUrl: string | null;
    updatedAt: string;
  } | null;
  owner: string | null;
};

export type ListLinesQuery = {
  __typename: "ModelLineConnection";
  items: Array<{
    __typename: "Line";
    id: string;
    billID: string;
    title: string;
    quantity: number;
    cost: number;
    createdAt: string;
    updatedAt: string;
    bill: {
      __typename: "Bill";
      id: string;
      serialnum: string | null;
      title: string;
      customerID: string;
      createdAt: string;
      owner: string | null;
      pleasePrint: boolean | null;
      pdfUrl: string | null;
      updatedAt: string;
    } | null;
    owner: string | null;
  } | null> | null;
  nextToken: string | null;
};

export type GetUserQuery = {
  __typename: "User";
  id: string;
  firstname: string | null;
  lastname: string | null;
  address: string | null;
  phone: string | null;
  email: string | null;
  siret: string | null;
  createdAt: string;
  updatedAt: string;
  owner: string | null;
};

export type ListUsersQuery = {
  __typename: "ModelUserConnection";
  items: Array<{
    __typename: "User";
    id: string;
    firstname: string | null;
    lastname: string | null;
    address: string | null;
    phone: string | null;
    email: string | null;
    siret: string | null;
    createdAt: string;
    updatedAt: string;
    owner: string | null;
  } | null> | null;
  nextToken: string | null;
};

export type ListBillsQuery = {
  __typename: "ModelBillConnection";
  items: Array<{
    __typename: "Bill";
    id: string;
    serialnum: string | null;
    title: string;
    customerID: string;
    customer: {
      __typename: "Customer";
      id: string;
      name: string;
      address: string | null;
      siret: string | null;
      createdAt: string;
      updatedAt: string;
      owner: string | null;
    } | null;
    lines: {
      __typename: "ModelLineConnection";
      nextToken: string | null;
    } | null;
    createdAt: string;
    owner: string | null;
    pleasePrint: boolean | null;
    pdfUrl: string | null;
    updatedAt: string;
  } | null> | null;
  nextToken: string | null;
};

export type GetBillQuery = {
  __typename: "Bill";
  id: string;
  serialnum: string | null;
  title: string;
  customerID: string;
  customer: {
    __typename: "Customer";
    id: string;
    name: string;
    address: string | null;
    siret: string | null;
    createdAt: string;
    updatedAt: string;
    owner: string | null;
    bills: {
      __typename: "ModelBillConnection";
      nextToken: string | null;
    } | null;
  } | null;
  lines: {
    __typename: "ModelLineConnection";
    items: Array<{
      __typename: "Line";
      id: string;
      billID: string;
      title: string;
      quantity: number;
      cost: number;
      createdAt: string;
      updatedAt: string;
      owner: string | null;
    } | null> | null;
    nextToken: string | null;
  } | null;
  createdAt: string;
  owner: string | null;
  pleasePrint: boolean | null;
  pdfUrl: string | null;
  updatedAt: string;
};

export type OnCreateCustomerSubscription = {
  __typename: "Customer";
  id: string;
  name: string;
  address: string | null;
  siret: string | null;
  createdAt: string;
  updatedAt: string;
  owner: string | null;
  bills: {
    __typename: "ModelBillConnection";
    items: Array<{
      __typename: "Bill";
      id: string;
      serialnum: string | null;
      title: string;
      customerID: string;
      createdAt: string;
      owner: string | null;
      pleasePrint: boolean | null;
      pdfUrl: string | null;
      updatedAt: string;
    } | null> | null;
    nextToken: string | null;
  } | null;
};

export type OnUpdateCustomerSubscription = {
  __typename: "Customer";
  id: string;
  name: string;
  address: string | null;
  siret: string | null;
  createdAt: string;
  updatedAt: string;
  owner: string | null;
  bills: {
    __typename: "ModelBillConnection";
    items: Array<{
      __typename: "Bill";
      id: string;
      serialnum: string | null;
      title: string;
      customerID: string;
      createdAt: string;
      owner: string | null;
      pleasePrint: boolean | null;
      pdfUrl: string | null;
      updatedAt: string;
    } | null> | null;
    nextToken: string | null;
  } | null;
};

export type OnDeleteCustomerSubscription = {
  __typename: "Customer";
  id: string;
  name: string;
  address: string | null;
  siret: string | null;
  createdAt: string;
  updatedAt: string;
  owner: string | null;
  bills: {
    __typename: "ModelBillConnection";
    items: Array<{
      __typename: "Bill";
      id: string;
      serialnum: string | null;
      title: string;
      customerID: string;
      createdAt: string;
      owner: string | null;
      pleasePrint: boolean | null;
      pdfUrl: string | null;
      updatedAt: string;
    } | null> | null;
    nextToken: string | null;
  } | null;
};

export type OnCreateLineSubscription = {
  __typename: "Line";
  id: string;
  billID: string;
  title: string;
  quantity: number;
  cost: number;
  createdAt: string;
  updatedAt: string;
  bill: {
    __typename: "Bill";
    id: string;
    serialnum: string | null;
    title: string;
    customerID: string;
    customer: {
      __typename: "Customer";
      id: string;
      name: string;
      address: string | null;
      siret: string | null;
      createdAt: string;
      updatedAt: string;
      owner: string | null;
    } | null;
    lines: {
      __typename: "ModelLineConnection";
      nextToken: string | null;
    } | null;
    createdAt: string;
    owner: string | null;
    pleasePrint: boolean | null;
    pdfUrl: string | null;
    updatedAt: string;
  } | null;
  owner: string | null;
};

export type OnUpdateLineSubscription = {
  __typename: "Line";
  id: string;
  billID: string;
  title: string;
  quantity: number;
  cost: number;
  createdAt: string;
  updatedAt: string;
  bill: {
    __typename: "Bill";
    id: string;
    serialnum: string | null;
    title: string;
    customerID: string;
    customer: {
      __typename: "Customer";
      id: string;
      name: string;
      address: string | null;
      siret: string | null;
      createdAt: string;
      updatedAt: string;
      owner: string | null;
    } | null;
    lines: {
      __typename: "ModelLineConnection";
      nextToken: string | null;
    } | null;
    createdAt: string;
    owner: string | null;
    pleasePrint: boolean | null;
    pdfUrl: string | null;
    updatedAt: string;
  } | null;
  owner: string | null;
};

export type OnDeleteLineSubscription = {
  __typename: "Line";
  id: string;
  billID: string;
  title: string;
  quantity: number;
  cost: number;
  createdAt: string;
  updatedAt: string;
  bill: {
    __typename: "Bill";
    id: string;
    serialnum: string | null;
    title: string;
    customerID: string;
    customer: {
      __typename: "Customer";
      id: string;
      name: string;
      address: string | null;
      siret: string | null;
      createdAt: string;
      updatedAt: string;
      owner: string | null;
    } | null;
    lines: {
      __typename: "ModelLineConnection";
      nextToken: string | null;
    } | null;
    createdAt: string;
    owner: string | null;
    pleasePrint: boolean | null;
    pdfUrl: string | null;
    updatedAt: string;
  } | null;
  owner: string | null;
};

export type OnCreateUserSubscription = {
  __typename: "User";
  id: string;
  firstname: string | null;
  lastname: string | null;
  address: string | null;
  phone: string | null;
  email: string | null;
  siret: string | null;
  createdAt: string;
  updatedAt: string;
  owner: string | null;
};

export type OnUpdateUserSubscription = {
  __typename: "User";
  id: string;
  firstname: string | null;
  lastname: string | null;
  address: string | null;
  phone: string | null;
  email: string | null;
  siret: string | null;
  createdAt: string;
  updatedAt: string;
  owner: string | null;
};

export type OnDeleteUserSubscription = {
  __typename: "User";
  id: string;
  firstname: string | null;
  lastname: string | null;
  address: string | null;
  phone: string | null;
  email: string | null;
  siret: string | null;
  createdAt: string;
  updatedAt: string;
  owner: string | null;
};

export type OnCreateBillSubscription = {
  __typename: "Bill";
  id: string;
  serialnum: string | null;
  title: string;
  customerID: string;
  customer: {
    __typename: "Customer";
    id: string;
    name: string;
    address: string | null;
    siret: string | null;
    createdAt: string;
    updatedAt: string;
    owner: string | null;
    bills: {
      __typename: "ModelBillConnection";
      nextToken: string | null;
    } | null;
  } | null;
  lines: {
    __typename: "ModelLineConnection";
    items: Array<{
      __typename: "Line";
      id: string;
      billID: string;
      title: string;
      quantity: number;
      cost: number;
      createdAt: string;
      updatedAt: string;
      owner: string | null;
    } | null> | null;
    nextToken: string | null;
  } | null;
  createdAt: string;
  owner: string | null;
  pleasePrint: boolean | null;
  pdfUrl: string | null;
  updatedAt: string;
};

export type OnUpdateBillSubscription = {
  __typename: "Bill";
  id: string;
  serialnum: string | null;
  title: string;
  customerID: string;
  customer: {
    __typename: "Customer";
    id: string;
    name: string;
    address: string | null;
    siret: string | null;
    createdAt: string;
    updatedAt: string;
    owner: string | null;
    bills: {
      __typename: "ModelBillConnection";
      nextToken: string | null;
    } | null;
  } | null;
  lines: {
    __typename: "ModelLineConnection";
    items: Array<{
      __typename: "Line";
      id: string;
      billID: string;
      title: string;
      quantity: number;
      cost: number;
      createdAt: string;
      updatedAt: string;
      owner: string | null;
    } | null> | null;
    nextToken: string | null;
  } | null;
  createdAt: string;
  owner: string | null;
  pleasePrint: boolean | null;
  pdfUrl: string | null;
  updatedAt: string;
};

export type OnDeleteBillSubscription = {
  __typename: "Bill";
  id: string;
  serialnum: string | null;
  title: string;
  customerID: string;
  customer: {
    __typename: "Customer";
    id: string;
    name: string;
    address: string | null;
    siret: string | null;
    createdAt: string;
    updatedAt: string;
    owner: string | null;
    bills: {
      __typename: "ModelBillConnection";
      nextToken: string | null;
    } | null;
  } | null;
  lines: {
    __typename: "ModelLineConnection";
    items: Array<{
      __typename: "Line";
      id: string;
      billID: string;
      title: string;
      quantity: number;
      cost: number;
      createdAt: string;
      updatedAt: string;
      owner: string | null;
    } | null> | null;
    nextToken: string | null;
  } | null;
  createdAt: string;
  owner: string | null;
  pleasePrint: boolean | null;
  pdfUrl: string | null;
  updatedAt: string;
};

@Injectable({
  providedIn: "root"
})
export class APIService {
  async CreateCustomer(
    input: CreateCustomerInput,
    condition?: ModelCustomerConditionInput
  ): Promise<CreateCustomerMutation> {
    const statement = `mutation CreateCustomer($input: CreateCustomerInput!, $condition: ModelCustomerConditionInput) {
        createCustomer(input: $input, condition: $condition) {
          __typename
          id
          name
          address
          siret
          createdAt
          updatedAt
          owner
          bills {
            __typename
            items {
              __typename
              id
              serialnum
              title
              customerID
              createdAt
              owner
              pleasePrint
              pdfUrl
              updatedAt
            }
            nextToken
          }
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <CreateCustomerMutation>response.data.createCustomer;
  }
  async UpdateCustomer(
    input: UpdateCustomerInput,
    condition?: ModelCustomerConditionInput
  ): Promise<UpdateCustomerMutation> {
    const statement = `mutation UpdateCustomer($input: UpdateCustomerInput!, $condition: ModelCustomerConditionInput) {
        updateCustomer(input: $input, condition: $condition) {
          __typename
          id
          name
          address
          siret
          createdAt
          updatedAt
          owner
          bills {
            __typename
            items {
              __typename
              id
              serialnum
              title
              customerID
              createdAt
              owner
              pleasePrint
              pdfUrl
              updatedAt
            }
            nextToken
          }
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <UpdateCustomerMutation>response.data.updateCustomer;
  }
  async DeleteCustomer(
    input: DeleteCustomerInput,
    condition?: ModelCustomerConditionInput
  ): Promise<DeleteCustomerMutation> {
    const statement = `mutation DeleteCustomer($input: DeleteCustomerInput!, $condition: ModelCustomerConditionInput) {
        deleteCustomer(input: $input, condition: $condition) {
          __typename
          id
          name
          address
          siret
          createdAt
          updatedAt
          owner
          bills {
            __typename
            items {
              __typename
              id
              serialnum
              title
              customerID
              createdAt
              owner
              pleasePrint
              pdfUrl
              updatedAt
            }
            nextToken
          }
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <DeleteCustomerMutation>response.data.deleteCustomer;
  }
  async CreateLine(
    input: CreateLineInput,
    condition?: ModelLineConditionInput
  ): Promise<CreateLineMutation> {
    const statement = `mutation CreateLine($input: CreateLineInput!, $condition: ModelLineConditionInput) {
        createLine(input: $input, condition: $condition) {
          __typename
          id
          billID
          title
          quantity
          cost
          createdAt
          updatedAt
          bill {
            __typename
            id
            serialnum
            title
            customerID
            customer {
              __typename
              id
              name
              address
              siret
              createdAt
              updatedAt
              owner
            }
            lines {
              __typename
              nextToken
            }
            createdAt
            owner
            pleasePrint
            pdfUrl
            updatedAt
          }
          owner
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <CreateLineMutation>response.data.createLine;
  }
  async UpdateLine(
    input: UpdateLineInput,
    condition?: ModelLineConditionInput
  ): Promise<UpdateLineMutation> {
    const statement = `mutation UpdateLine($input: UpdateLineInput!, $condition: ModelLineConditionInput) {
        updateLine(input: $input, condition: $condition) {
          __typename
          id
          billID
          title
          quantity
          cost
          createdAt
          updatedAt
          bill {
            __typename
            id
            serialnum
            title
            customerID
            customer {
              __typename
              id
              name
              address
              siret
              createdAt
              updatedAt
              owner
            }
            lines {
              __typename
              nextToken
            }
            createdAt
            owner
            pleasePrint
            pdfUrl
            updatedAt
          }
          owner
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <UpdateLineMutation>response.data.updateLine;
  }
  async DeleteLine(
    input: DeleteLineInput,
    condition?: ModelLineConditionInput
  ): Promise<DeleteLineMutation> {
    const statement = `mutation DeleteLine($input: DeleteLineInput!, $condition: ModelLineConditionInput) {
        deleteLine(input: $input, condition: $condition) {
          __typename
          id
          billID
          title
          quantity
          cost
          createdAt
          updatedAt
          bill {
            __typename
            id
            serialnum
            title
            customerID
            customer {
              __typename
              id
              name
              address
              siret
              createdAt
              updatedAt
              owner
            }
            lines {
              __typename
              nextToken
            }
            createdAt
            owner
            pleasePrint
            pdfUrl
            updatedAt
          }
          owner
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <DeleteLineMutation>response.data.deleteLine;
  }
  async CreateUser(
    input: CreateUserInput,
    condition?: ModelUserConditionInput
  ): Promise<CreateUserMutation> {
    const statement = `mutation CreateUser($input: CreateUserInput!, $condition: ModelUserConditionInput) {
        createUser(input: $input, condition: $condition) {
          __typename
          id
          firstname
          lastname
          address
          phone
          email
          siret
          createdAt
          updatedAt
          owner
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <CreateUserMutation>response.data.createUser;
  }
  async UpdateUser(
    input: UpdateUserInput,
    condition?: ModelUserConditionInput
  ): Promise<UpdateUserMutation> {
    const statement = `mutation UpdateUser($input: UpdateUserInput!, $condition: ModelUserConditionInput) {
        updateUser(input: $input, condition: $condition) {
          __typename
          id
          firstname
          lastname
          address
          phone
          email
          siret
          createdAt
          updatedAt
          owner
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <UpdateUserMutation>response.data.updateUser;
  }
  async DeleteUser(
    input: DeleteUserInput,
    condition?: ModelUserConditionInput
  ): Promise<DeleteUserMutation> {
    const statement = `mutation DeleteUser($input: DeleteUserInput!, $condition: ModelUserConditionInput) {
        deleteUser(input: $input, condition: $condition) {
          __typename
          id
          firstname
          lastname
          address
          phone
          email
          siret
          createdAt
          updatedAt
          owner
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <DeleteUserMutation>response.data.deleteUser;
  }
  async CreateBill(
    input: CreateBillInput,
    condition?: ModelBillConditionInput
  ): Promise<CreateBillMutation> {
    const statement = `mutation CreateBill($input: CreateBillInput!, $condition: ModelBillConditionInput) {
        createBill(input: $input, condition: $condition) {
          __typename
          id
          serialnum
          title
          customerID
          customer {
            __typename
            id
            name
            address
            siret
            createdAt
            updatedAt
            owner
            bills {
              __typename
              nextToken
            }
          }
          lines {
            __typename
            items {
              __typename
              id
              billID
              title
              quantity
              cost
              createdAt
              updatedAt
              owner
            }
            nextToken
          }
          createdAt
          owner
          pleasePrint
          pdfUrl
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <CreateBillMutation>response.data.createBill;
  }
  async UpdateBill(
    input: UpdateBillInput,
    condition?: ModelBillConditionInput
  ): Promise<UpdateBillMutation> {
    const statement = `mutation UpdateBill($input: UpdateBillInput!, $condition: ModelBillConditionInput) {
        updateBill(input: $input, condition: $condition) {
          __typename
          id
          serialnum
          title
          customerID
          customer {
            __typename
            id
            name
            address
            siret
            createdAt
            updatedAt
            owner
            bills {
              __typename
              nextToken
            }
          }
          lines {
            __typename
            items {
              __typename
              id
              billID
              title
              quantity
              cost
              createdAt
              updatedAt
              owner
            }
            nextToken
          }
          createdAt
          owner
          pleasePrint
          pdfUrl
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <UpdateBillMutation>response.data.updateBill;
  }
  async DeleteBill(
    input: DeleteBillInput,
    condition?: ModelBillConditionInput
  ): Promise<DeleteBillMutation> {
    const statement = `mutation DeleteBill($input: DeleteBillInput!, $condition: ModelBillConditionInput) {
        deleteBill(input: $input, condition: $condition) {
          __typename
          id
          serialnum
          title
          customerID
          customer {
            __typename
            id
            name
            address
            siret
            createdAt
            updatedAt
            owner
            bills {
              __typename
              nextToken
            }
          }
          lines {
            __typename
            items {
              __typename
              id
              billID
              title
              quantity
              cost
              createdAt
              updatedAt
              owner
            }
            nextToken
          }
          createdAt
          owner
          pleasePrint
          pdfUrl
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <DeleteBillMutation>response.data.deleteBill;
  }
  async GetCustomer(id: string): Promise<GetCustomerQuery> {
    const statement = `query GetCustomer($id: ID!) {
        getCustomer(id: $id) {
          __typename
          id
          name
          address
          siret
          createdAt
          updatedAt
          owner
          bills {
            __typename
            items {
              __typename
              id
              serialnum
              title
              customerID
              createdAt
              owner
              pleasePrint
              pdfUrl
              updatedAt
            }
            nextToken
          }
        }
      }`;
    const gqlAPIServiceArguments: any = {
      id
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <GetCustomerQuery>response.data.getCustomer;
  }
  async ListCustomers(
    filter?: ModelCustomerFilterInput,
    limit?: number,
    nextToken?: string
  ): Promise<ListCustomersQuery> {
    const statement = `query ListCustomers($filter: ModelCustomerFilterInput, $limit: Int, $nextToken: String) {
        listCustomers(filter: $filter, limit: $limit, nextToken: $nextToken) {
          __typename
          items {
            __typename
            id
            name
            address
            siret
            createdAt
            updatedAt
            owner
            bills {
              __typename
              nextToken
            }
          }
          nextToken
        }
      }`;
    const gqlAPIServiceArguments: any = {};
    if (filter) {
      gqlAPIServiceArguments.filter = filter;
    }
    if (limit) {
      gqlAPIServiceArguments.limit = limit;
    }
    if (nextToken) {
      gqlAPIServiceArguments.nextToken = nextToken;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <ListCustomersQuery>response.data.listCustomers;
  }
  async GetLine(id: string): Promise<GetLineQuery> {
    const statement = `query GetLine($id: ID!) {
        getLine(id: $id) {
          __typename
          id
          billID
          title
          quantity
          cost
          createdAt
          updatedAt
          bill {
            __typename
            id
            serialnum
            title
            customerID
            customer {
              __typename
              id
              name
              address
              siret
              createdAt
              updatedAt
              owner
            }
            lines {
              __typename
              nextToken
            }
            createdAt
            owner
            pleasePrint
            pdfUrl
            updatedAt
          }
          owner
        }
      }`;
    const gqlAPIServiceArguments: any = {
      id
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <GetLineQuery>response.data.getLine;
  }
  async ListLines(
    filter?: ModelLineFilterInput,
    limit?: number,
    nextToken?: string
  ): Promise<ListLinesQuery> {
    const statement = `query ListLines($filter: ModelLineFilterInput, $limit: Int, $nextToken: String) {
        listLines(filter: $filter, limit: $limit, nextToken: $nextToken) {
          __typename
          items {
            __typename
            id
            billID
            title
            quantity
            cost
            createdAt
            updatedAt
            bill {
              __typename
              id
              serialnum
              title
              customerID
              createdAt
              owner
              pleasePrint
              pdfUrl
              updatedAt
            }
            owner
          }
          nextToken
        }
      }`;
    const gqlAPIServiceArguments: any = {};
    if (filter) {
      gqlAPIServiceArguments.filter = filter;
    }
    if (limit) {
      gqlAPIServiceArguments.limit = limit;
    }
    if (nextToken) {
      gqlAPIServiceArguments.nextToken = nextToken;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <ListLinesQuery>response.data.listLines;
  }
  async GetUser(id: string): Promise<GetUserQuery> {
    const statement = `query GetUser($id: ID!) {
        getUser(id: $id) {
          __typename
          id
          firstname
          lastname
          address
          phone
          email
          siret
          createdAt
          updatedAt
          owner
        }
      }`;
    const gqlAPIServiceArguments: any = {
      id
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <GetUserQuery>response.data.getUser;
  }
  async ListUsers(
    filter?: ModelUserFilterInput,
    limit?: number,
    nextToken?: string
  ): Promise<ListUsersQuery> {
    const statement = `query ListUsers($filter: ModelUserFilterInput, $limit: Int, $nextToken: String) {
        listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
          __typename
          items {
            __typename
            id
            firstname
            lastname
            address
            phone
            email
            siret
            createdAt
            updatedAt
            owner
          }
          nextToken
        }
      }`;
    const gqlAPIServiceArguments: any = {};
    if (filter) {
      gqlAPIServiceArguments.filter = filter;
    }
    if (limit) {
      gqlAPIServiceArguments.limit = limit;
    }
    if (nextToken) {
      gqlAPIServiceArguments.nextToken = nextToken;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <ListUsersQuery>response.data.listUsers;
  }
  async ListBills(
    filter?: ModelBillFilterInput,
    limit?: number,
    nextToken?: string
  ): Promise<ListBillsQuery> {
    const statement = `query ListBills($filter: ModelBillFilterInput, $limit: Int, $nextToken: String) {
        listBills(filter: $filter, limit: $limit, nextToken: $nextToken) {
          __typename
          items {
            __typename
            id
            serialnum
            title
            customerID
            customer {
              __typename
              id
              name
              address
              siret
              createdAt
              updatedAt
              owner
            }
            lines {
              __typename
              nextToken
            }
            createdAt
            owner
            pleasePrint
            pdfUrl
            updatedAt
          }
          nextToken
        }
      }`;
    const gqlAPIServiceArguments: any = {};
    if (filter) {
      gqlAPIServiceArguments.filter = filter;
    }
    if (limit) {
      gqlAPIServiceArguments.limit = limit;
    }
    if (nextToken) {
      gqlAPIServiceArguments.nextToken = nextToken;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <ListBillsQuery>response.data.listBills;
  }
  async GetBill(id: string): Promise<GetBillQuery> {
    const statement = `query GetBill($id: ID!) {
        getBill(id: $id) {
          __typename
          id
          serialnum
          title
          customerID
          customer {
            __typename
            id
            name
            address
            siret
            createdAt
            updatedAt
            owner
            bills {
              __typename
              nextToken
            }
          }
          lines {
            __typename
            items {
              __typename
              id
              billID
              title
              quantity
              cost
              createdAt
              updatedAt
              owner
            }
            nextToken
          }
          createdAt
          owner
          pleasePrint
          pdfUrl
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      id
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <GetBillQuery>response.data.getBill;
  }
  OnCreateCustomerListener: Observable<
    OnCreateCustomerSubscription
  > = API.graphql(
    graphqlOperation(
      `subscription OnCreateCustomer($owner: String!) {
        onCreateCustomer(owner: $owner) {
          __typename
          id
          name
          address
          siret
          createdAt
          updatedAt
          owner
          bills {
            __typename
            items {
              __typename
              id
              serialnum
              title
              customerID
              createdAt
              owner
              pleasePrint
              pdfUrl
              updatedAt
            }
            nextToken
          }
        }
      }`
    )
  ) as Observable<OnCreateCustomerSubscription>;

  OnUpdateCustomerListener: Observable<
    OnUpdateCustomerSubscription
  > = API.graphql(
    graphqlOperation(
      `subscription OnUpdateCustomer($owner: String!) {
        onUpdateCustomer(owner: $owner) {
          __typename
          id
          name
          address
          siret
          createdAt
          updatedAt
          owner
          bills {
            __typename
            items {
              __typename
              id
              serialnum
              title
              customerID
              createdAt
              owner
              pleasePrint
              pdfUrl
              updatedAt
            }
            nextToken
          }
        }
      }`
    )
  ) as Observable<OnUpdateCustomerSubscription>;

  OnDeleteCustomerListener: Observable<
    OnDeleteCustomerSubscription
  > = API.graphql(
    graphqlOperation(
      `subscription OnDeleteCustomer($owner: String!) {
        onDeleteCustomer(owner: $owner) {
          __typename
          id
          name
          address
          siret
          createdAt
          updatedAt
          owner
          bills {
            __typename
            items {
              __typename
              id
              serialnum
              title
              customerID
              createdAt
              owner
              pleasePrint
              pdfUrl
              updatedAt
            }
            nextToken
          }
        }
      }`
    )
  ) as Observable<OnDeleteCustomerSubscription>;

  OnCreateLineListener: Observable<OnCreateLineSubscription> = API.graphql(
    graphqlOperation(
      `subscription OnCreateLine($owner: String!) {
        onCreateLine(owner: $owner) {
          __typename
          id
          billID
          title
          quantity
          cost
          createdAt
          updatedAt
          bill {
            __typename
            id
            serialnum
            title
            customerID
            customer {
              __typename
              id
              name
              address
              siret
              createdAt
              updatedAt
              owner
            }
            lines {
              __typename
              nextToken
            }
            createdAt
            owner
            pleasePrint
            pdfUrl
            updatedAt
          }
          owner
        }
      }`
    )
  ) as Observable<OnCreateLineSubscription>;

  OnUpdateLineListener: Observable<OnUpdateLineSubscription> = API.graphql(
    graphqlOperation(
      `subscription OnUpdateLine($owner: String!) {
        onUpdateLine(owner: $owner) {
          __typename
          id
          billID
          title
          quantity
          cost
          createdAt
          updatedAt
          bill {
            __typename
            id
            serialnum
            title
            customerID
            customer {
              __typename
              id
              name
              address
              siret
              createdAt
              updatedAt
              owner
            }
            lines {
              __typename
              nextToken
            }
            createdAt
            owner
            pleasePrint
            pdfUrl
            updatedAt
          }
          owner
        }
      }`
    )
  ) as Observable<OnUpdateLineSubscription>;

  OnDeleteLineListener: Observable<OnDeleteLineSubscription> = API.graphql(
    graphqlOperation(
      `subscription OnDeleteLine($owner: String!) {
        onDeleteLine(owner: $owner) {
          __typename
          id
          billID
          title
          quantity
          cost
          createdAt
          updatedAt
          bill {
            __typename
            id
            serialnum
            title
            customerID
            customer {
              __typename
              id
              name
              address
              siret
              createdAt
              updatedAt
              owner
            }
            lines {
              __typename
              nextToken
            }
            createdAt
            owner
            pleasePrint
            pdfUrl
            updatedAt
          }
          owner
        }
      }`
    )
  ) as Observable<OnDeleteLineSubscription>;

  OnCreateUserListener: Observable<OnCreateUserSubscription> = API.graphql(
    graphqlOperation(
      `subscription OnCreateUser($owner: String!) {
        onCreateUser(owner: $owner) {
          __typename
          id
          firstname
          lastname
          address
          phone
          email
          siret
          createdAt
          updatedAt
          owner
        }
      }`
    )
  ) as Observable<OnCreateUserSubscription>;

  OnUpdateUserListener: Observable<OnUpdateUserSubscription> = API.graphql(
    graphqlOperation(
      `subscription OnUpdateUser($owner: String!) {
        onUpdateUser(owner: $owner) {
          __typename
          id
          firstname
          lastname
          address
          phone
          email
          siret
          createdAt
          updatedAt
          owner
        }
      }`
    )
  ) as Observable<OnUpdateUserSubscription>;

  OnDeleteUserListener: Observable<OnDeleteUserSubscription> = API.graphql(
    graphqlOperation(
      `subscription OnDeleteUser($owner: String!) {
        onDeleteUser(owner: $owner) {
          __typename
          id
          firstname
          lastname
          address
          phone
          email
          siret
          createdAt
          updatedAt
          owner
        }
      }`
    )
  ) as Observable<OnDeleteUserSubscription>;

  OnCreateBillListener: Observable<OnCreateBillSubscription> = API.graphql(
    graphqlOperation(
      `subscription OnCreateBill($owner: String!) {
        onCreateBill(owner: $owner) {
          __typename
          id
          serialnum
          title
          customerID
          customer {
            __typename
            id
            name
            address
            siret
            createdAt
            updatedAt
            owner
            bills {
              __typename
              nextToken
            }
          }
          lines {
            __typename
            items {
              __typename
              id
              billID
              title
              quantity
              cost
              createdAt
              updatedAt
              owner
            }
            nextToken
          }
          createdAt
          owner
          pleasePrint
          pdfUrl
          updatedAt
        }
      }`
    )
  ) as Observable<OnCreateBillSubscription>;

  OnUpdateBillListener: Observable<OnUpdateBillSubscription> = API.graphql(
    graphqlOperation(
      `subscription OnUpdateBill($owner: String!) {
        onUpdateBill(owner: $owner) {
          __typename
          id
          serialnum
          title
          customerID
          customer {
            __typename
            id
            name
            address
            siret
            createdAt
            updatedAt
            owner
            bills {
              __typename
              nextToken
            }
          }
          lines {
            __typename
            items {
              __typename
              id
              billID
              title
              quantity
              cost
              createdAt
              updatedAt
              owner
            }
            nextToken
          }
          createdAt
          owner
          pleasePrint
          pdfUrl
          updatedAt
        }
      }`
    )
  ) as Observable<OnUpdateBillSubscription>;

  OnDeleteBillListener: Observable<OnDeleteBillSubscription> = API.graphql(
    graphqlOperation(
      `subscription OnDeleteBill($owner: String!) {
        onDeleteBill(owner: $owner) {
          __typename
          id
          serialnum
          title
          customerID
          customer {
            __typename
            id
            name
            address
            siret
            createdAt
            updatedAt
            owner
            bills {
              __typename
              nextToken
            }
          }
          lines {
            __typename
            items {
              __typename
              id
              billID
              title
              quantity
              cost
              createdAt
              updatedAt
              owner
            }
            nextToken
          }
          createdAt
          owner
          pleasePrint
          pdfUrl
          updatedAt
        }
      }`
    )
  ) as Observable<OnDeleteBillSubscription>;
}
