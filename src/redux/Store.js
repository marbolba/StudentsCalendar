import {createStore} from "redux"

import reducer from "./reducers"

let initialGlobalState = {}

export default createStore(reducer, initialGlobalState)