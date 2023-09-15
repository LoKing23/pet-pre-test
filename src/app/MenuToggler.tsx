'use client'

import { IconButton, IconButtonProps } from "@chakra-ui/react";
import { AiOutlineMenuUnfold, AiOutlineMenuFold } from "react-icons/ai";

type MenuTogglerProps = {
    isOpen: boolean
    onClick: () => void,
    ariaLabel?: string
}

type OmitAriaLabelIconButtonProps = Omit<IconButtonProps, 'aria-label'>

const toggleIcons: {
    open: React.ReactElement,
    close: React.ReactElement
} = {
    open: <AiOutlineMenuFold />,
    close: <AiOutlineMenuUnfold />
}

const MenuToggler = ({
    ariaLabel = 'Toggle Menu',
    isOpen,
    onClick,
    ...props
}: MenuTogglerProps & OmitAriaLabelIconButtonProps)  => {
    const icon = toggleIcons[isOpen ? 'open' : 'close']

    return (
        <IconButton
            aria-label={ariaLabel}
            icon={icon}
            onClick={onClick}
            rounded={0}
            {...props}
        />
    )
}

export default MenuToggler