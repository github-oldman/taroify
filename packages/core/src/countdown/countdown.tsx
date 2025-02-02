import { View } from "@tarojs/components"
import { ViewProps } from "@tarojs/components/types/View"
import classNames from "classnames"
import { isFunction } from "lodash"
import * as React from "react"
import { forwardRef, ReactNode, useImperativeHandle, useMemo } from "react"
import { prefixClassname } from "../styles"
import { CountdownInstance, CurrentTime, parseFormat } from "./countdown.shared"
import useCountdown, { UseCountdownOptions } from "./use-countdown"

interface CountdownProps extends ViewProps, UseCountdownOptions {
  format?: string
  children?: (current: CurrentTime) => ReactNode
}

const Countdown = forwardRef<CountdownInstance, CountdownProps>((props, ref) => {
  const {
    className,
    value = 0,
    autostart = true,
    interval,
    format = "HH:mm:ss",
    onChange,
    onComplete,
    children,
    ...restProps
  } = props

  const { current, pause, reset, restart, start, stop } = useCountdown({
    value,
    autostart,
    interval,
    onChange,
    onComplete,
  })

  useImperativeHandle(
    ref,
    (): CountdownInstance => ({
      pause,
      reset,
      restart,
      start,
      stop,
    }),
    [pause, reset, restart, start, stop],
  )

  const childrenRender = useMemo(
    () => (children ?? isFunction(children) ? children(current) : parseFormat(format, current)),
    [children, current, format],
  )

  return (
    <View
      className={classNames(prefixClassname("countdown"), className)}
      children={childrenRender}
      {...restProps}
    />
  )
})

export default Countdown
