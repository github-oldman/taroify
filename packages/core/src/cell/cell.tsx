import { ViewProps } from "@tarojs/components/types/View"
import * as React from "react"
import { ReactNode } from "react"
import BaseCell from "./base-cell"
import { CellAlign, CellSize } from "./cell.shared"

export interface CellProps extends ViewProps {
  size?: CellSize
  align?: CellAlign
  title?: ReactNode
  brief?: ReactNode
  icon?: ReactNode
  rightIcon?: ReactNode
  bordered?: boolean
  clickable?: boolean
  children?: ReactNode
}

function Cell(props: CellProps) {
  return <BaseCell {...props} />
}

export default Cell
