import Telegram from '../../features/user/assets/SocialData/TelegramICO.png'
import VK from '../../features/user/assets/SocialData/VK.png'
import Gmail from '../../features/user/assets/SocialData/Gmail.png'

export const navigationLinks = [
    {
        name: "Конспекты",
        link: '/conspects',
    },
    {
        name: "Конструктор",
        link: '/game',
    },
    {
        name: "Тест",
        link: 'examination',
    },
    {
        name: "Мы",
        link: '/nah',
    }
]

export const contactsData = [
    {
        name: "Telegram",
        url: "https://t.me/deb4ic",
        ico: Telegram,
    },
    {
        name: 'Vkontakte',
        url: "https://vk.com/deb4ick",
        ico: VK,
    },
    {
        name: "Gmail",
        url: "mailto:ooshkan9@gmail.com?subject=Hello&body=I would like to discuss something.",
        ico: Gmail,
    }
]