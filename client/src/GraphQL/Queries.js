import { gql } from '@apollo/client'

export const LOAD_LOGS = gql` { Log } `
export const LOAD_LOGS_CLICK = gql` { Log_Click } `
export const LOAD_LOGS_DOWNLOAD = gql` { Log_Download } `
export const LOAD_LOGS_MOUSEMOVE = gql` { Log_MouseMove } `
export const LOAD_LOGS_QUERY = gql` { Log_Query } `