import type { ForwardRefExoticComponent, RefAttributes } from 'react'
import _Avatar, { AvatarProps } from './Avatar'

export type { AvatarProps } from './Avatar'

type CompoundedComponent = ForwardRefExoticComponent<
    AvatarProps & RefAttributes<HTMLSpanElement>
> 

const Avatar = _Avatar as CompoundedComponent

export { Avatar }

export default Avatar
