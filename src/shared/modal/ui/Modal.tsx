import React, {forwardRef, PropsWithChildren} from 'react';
import * as styles from './Modal.module.scss'
export const Modal = forwardRef<HTMLDivElement, PropsWithChildren<{ isOpen: boolean }>>(
    ({children, isOpen}, ref) => {
        return (
            <div className={isOpen ? styles.modalOverlay_open : styles.modalOverlay}>
                    <div className={isOpen ? styles.modalContent_open : styles.modalContent} ref={ref}
                         onClick={(e) => e.stopPropagation()}>
                        {children}
                    </div>
            </div>
        );
    }
);
