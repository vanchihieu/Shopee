import {
    useFloating,
    autoUpdate,
    offset,
    flip,
    shift,
    useHover,
    useFocus,
    useDismiss,
    useRole,
    useInteractions,
    arrow,
    FloatingArrow,
} from "@floating-ui/react";
import { AnimatePresence } from "framer-motion";
import React, { ElementType, useRef, useState } from "react";
import { motion } from "framer-motion";

interface Props {
    children: React.ReactNode;
    renderPopover: React.ReactNode;
    className?: string;
    as?: ElementType;
    initialOpen?: boolean
}

export default function Popover({
    children,
    className,
    renderPopover,
    as: Element = "div",
    initialOpen
}: Props) {
    const arrowRef = useRef(null);
    const [isOpen, setIsOpen] = useState(initialOpen || false);
    const { refs, floatingStyles, context } = useFloating({
        open: isOpen,
        onOpenChange: setIsOpen,
        placement: "top",
        // Make sure the tooltip stays on the screen
        whileElementsMounted: autoUpdate,
        middleware: [
            offset(3),
            flip({
                fallbackAxisSideDirection: "start",
            }),
            shift(),
            arrow({
                element: arrowRef,
            }),
        ],
    });
    const hover = useHover(context, { move: false });
    const focus = useFocus(context);
    const dismiss = useDismiss(context);
    // Role props for screen readers
    const role = useRole(context, { role: "tooltip" });

    // Merge all the interactions into prop getters
    const { getReferenceProps, getFloatingProps } = useInteractions([
        hover,
        focus,
        dismiss,
        role,
    ]);
    return (
        <Element
            // className="flex items-center py-1 hover:text-gray-300 cursor-pointer"
            className={className}
            ref={refs.setReference}
            {...getReferenceProps()}
        >
            {children}

            <>
                <AnimatePresence>
                    {isOpen && (
                        <>
                            <div
                                ref={refs.setFloating}
                                style={floatingStyles}
                                {...getFloatingProps()}
                            >
                                <motion.div
                                    className="bg-white relative shadow-md rounded-sm border border-gray-200 text-black"
                                    initial={{
                                        opacity: 0,
                                        transform: "scale(0)",
                                    }}
                                    animate={{
                                        opacity: 1,
                                        transform: "scale(1)",
                                    }}
                                    exit={{
                                        opacity: 0,
                                        transform: "scale(0)",
                                    }}
                                    transition={{ duration: 0.2 }}
                                >
                                    {renderPopover}
                                    <FloatingArrow
                                        ref={arrowRef}
                                        context={context}
                                        fill="white"
                                        width={20}
                                        height={10}
                                    />
                                </motion.div>
                            </div>
                        </>
                    )}
                </AnimatePresence>
            </>
        </Element>
    );
}
