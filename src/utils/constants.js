const navLinks = [
    { id: 1, name: 'Bosh Sahifa', targetId: "home" },
    { id: 2, name: 'Haqida', targetId: "about" },
    { id: 3, name: 'Xizmatlar', targetId: "services" },
    { id: 4, name: 'Aloqa', targetId: "contact" },
    { id: 5, name: ''},
    
]

const navIcons = [
    {id:1, icon: 'fa-solid fa-house'},
    {id:2, icon: 'fa-solid fa-user'},
    {id:3, icon: 'fa-solid fa-briefcase'},
    {id:4, icon: 'fa-solid fa-envelope'},
 
]

const footerLinks = [
    { id: 1, name: 'Privacy Policy' },
    { id: 2, name: 'Terms of Service' },
    { id: 3, name: 'Contact Us' },
 
]
const socialLinks = [
  { id: 1, name: "Telegram", icon: "fa-brands fa-telegram", url: "https://twitter.com" },
  { id: 2, name: "LinkedIn", icon: "fa-brands fa-linkedin", url: "https://linkedin.com" },
  { id: 3, name: "GitHub", icon: "fa-brands fa-github", url: "https://github.com" },
];

const aboutUs = [
    {id:1, text: "Baraka Institute - bu zamonaviy ta'lim markazi bo'lib, unda talabalar va mutaxassislar uchun keng ko'lamli kurslar va treninglar taqdim etiladi. Bizning maqsadimiz - har bir insonning bilim va ko'nikmalarini oshirishga yordam berishdir."},
    {id:2, img: "about-us-header.jpg"},
    {id:3, img: "our-mission-about.jpg"},
    {id:4, text: "Bizning missiyamiz - sifatli ta'limni har bir inson uchun qulay va arzon qilishdir. Biz ilg'or texnologiyalar va innovatsion o'quv metodlarini qo'llab-quvvatlaymiz, shuningdek, talabalarimizga amaliy ko'nikmalarni rivojlantirishga yordam beramiz."},
]

const teamMembers = [
  {
    id: 1,
    name: "Tom Smith",
    role: "Founder & CEO",
    img: "example-1.jpg",
    linkedin: "https://linkedin.com/in/tomsmith",
    instagram: "https://instagram.com/tomsmith",
  },
  {
    id: 2,
    name: "Ali Veli",
    role: "Frontend Developer",
    img: "example-2.jpg",
    linkedin: "https://linkedin.com/in/aliveli",
    instagram: "https://instagram.com/aliveli",
  },
  {
    id: 3,
    name: "Sara Ahmed",
    role: "Backend Developer",
    img: "example-3.jpg",
    linkedin: "https://linkedin.com/in/saraahmed",
    instagram: "https://instagram.com/saraahmed",
  },
  {
    id: 4,
    name: "John Doe",
    role: "UI/UX Designer",
    img: "example-4.jpg",
    linkedin: "https://linkedin.com/in/johndoe",
    instagram: "https://instagram.com/johndoe",
  },
  
];

export { navLinks, navIcons, socialLinks, footerLinks, aboutUs, teamMembers };