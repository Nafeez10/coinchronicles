import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../app/store";

type initialStateType = {
    timeline : '24h' | '7d' | '30d' | '1y' | '3m' | '3y' | '5y'
}

const initialState:initialStateType = {
    timeline: "7d"
}

const chartTimeLineSlice = createSlice({
    name:"chartTimeline",
    initialState,
    reducers:{
        changechartTimeline:(state, action) => {
            state.timeline = action.payload
        }
    }
})

export const getChartTimelineState = (state:RootState) => state.chartTimeline.timeline;

export const { changechartTimeline } = chartTimeLineSlice.actions

export default chartTimeLineSlice;