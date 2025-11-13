import Telegram from '../assets/SocialData/TelegramICO.png'
import VK from '../assets/SocialData/VK.png'
import Gmail from '../assets/SocialData/Gmail.png'

export const navigationLinks = [
    {
        name: 'Главная страница',
        link: '/',
    },
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

])

export const navigationLinksUnlogined = navigationLinks.concat([
    {
        name: 'Авторизоваться',
        link: '/login',
    }
])
