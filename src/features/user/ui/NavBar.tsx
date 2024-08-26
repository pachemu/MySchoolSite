import React, {useRef, useState} from "react";
import {Link} from "react-router-dom";
import BookIMG from '../assets/iconBtn.png'
import * as styles from './Navbar.module.scss'
import {useOnClickOutside, Modal} from "../../../shared/modal/model";
export const NavBar = ({navigationLinks, contactsData}) => {
    const modalRef = useRef(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const closeModal = () => {
        setIsModalOpen(false);
    };
    useOnClickOutside(modalRef, closeModal);
    return (
        <div className={styles.modal}>
            <div id='myDropdown' className={''}>
                {!isModalOpen && (
                    <button className={''} onClick={() => setIsModalOpen(true)}>
                        <img alt={'BTN'} src={BookIMG} className={styles.modal__buttonImg} />
                    </button>
                )}
                {isModalOpen && (<Modal isOpen={isModalOpen} ref={modalRef}>
                    <div className={styles.modal__content}>
                        <ul className={styles.modal__content__menu}>
                            <ul className={styles.modal__content__menu}>
                                {navigationLinks.map((link) =>
                                    <li className={styles.modal__content__menu_item} key={link.name}>
                                        <Link className={styles.link} to={link.link}>{link.name}</Link>
                                    </li>)}
                            </ul>
                        </ul>
                        <ul className={styles.footer}>
                            {contactsData.map((contact) =>
                            <li key={contact.name}>
                                <a href={contact.url} key={contact.url} className={styles.modal__content__menu_href}>
                                    <img alt={contact.name} src={contact.ico}/>
                                </a>
                            </li>)}
                        </ul>
                    </div>
                </Modal>)}
            </div>
        </div>
    )
}