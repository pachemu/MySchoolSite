import Telegram from '../assets/SocialData/TelegramICO.png'
import VK from '../assets/SocialData/VK.png'
import Gmail from '../assets/SocialData/Gmail.png'

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
        link: '/quiz',
    },
]
export const navigationLinksTeacher = navigationLinks.concat([
    {
        name: "Создать тест",
        link: '/create/quiz',
    }
])

export const navigationLinksUnlogined = navigationLinks.concat([
    {
        name: 'Логин',
        link: '/login',
    }
])

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