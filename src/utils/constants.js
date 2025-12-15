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


 const services = {
  intro: {
    title: "Bizning Xizmatlarimiz",
    text1:
      "Biz kompaniyalarga professional biznes tahlilchi xizmatlarini taqdim etamiz. Tajribali mutaxassislarimiz sizning biznes jarayonlaringizni optimallashtirish, talablarni aniqlash va samarali yechimlarni joriy qilishda yordam beradi.",
    text2:
      "Bizning maqsadimiz — sizning biznesingizni raqobatbardosh qilish va samaradorlikni oshirish orqali uzoq muddatli muvaffaqiyatga erishishga yordam berish.",
    img:
      "https://media.istockphoto.com/id/1947499362/photo/happy-group-of-business-people-discussing-strategy-during-team-meeting-at-the-office-desk.jpg?s=612x612&w=0&k=20&c=UXPrlQx09d8EP4_kTdAa-vC2LxD_ppY1tiG7eTPGVbE=",
  },

  hiring: {
    title: "Kompaniyalar uchun Biznes Tahlilchi Yollash",
    description:
      "Biz sizning kompaniyangiz uchun tajribali biznes tahlilchilarni tanlab beramiz va ishga joylashtiramiz. Mutaxassislarimiz loyihalaringizni boshqarish, talablarni aniqlash va samarali yechimlarni ishlab chiqishda yordam beradi.",
    features: [
      "Vaqtinchalik yoki doimiy yollash",
      "Mutaxassislarning malakasini tekshirish",
      "Loyiha boshidan oxirigacha qo'llab-quvvatlash",
    ],
    img:
      "https://www.ey.com/content/dam/ey-unified-site/ey-com/en-us/campaigns/cro-risk/images/ey-diverse-professionals-in-a-productive-business-meeting.jpg",
  },

  consulting: {
    title: "Maslahat va Konsalting Xizmatlari",
    description:
      "Biznes jarayonlarini tahlil qilish, strategiya ishlab chiqish va optimallashtirish bo'yicha professional maslahatlar beramiz.",
    features: [
      "Biznes jarayonlarini audit qilish",
      "Raqobat tahlili va strategiya",
      "IT yechimlarni integratsiya qilish",
    ],
    img:
      "https://images.klipfolio.com/website/public/bf9c6fbb-06bf-4f1d-88a7-d02b70902bd1/data-dashboard.png",
  },

  education: {
    title: "Biznes Tahlilchilar uchun Ta'limiy Video Kurslar",
    description:
      "Biznes tahlil sohasida yangi boshlovchilar va professionalar uchun maxsus ta'limiy video kurslar va treninglar taklif etamiz.",
    features: [
      "BPMN, UML va boshqa modellar",
      "Talablar yig'ish texnikalari",
      "Real loyihalarda amaliyot",
    ],
    img:
      "https://precollege.usc.edu/wp-content/uploads/2025/10/usc-precollege-online-course-analytics-1920x1080.jpg",
  },

  modeling: {
    title: "Biznes Jarayonlarni Modellashtirish",
    description:
      "BPMN va boshqa standartlar asosida jarayonlarni vizual modellashtirish va optimallashtirish xizmatlari.",
    img:
      "https://images.ctfassets.net/w6r2i5d8q73s/FwGqnbnP8U9KabW4BSIsb/9f07e9401f3b8f8e9d8146009b3e78f0/bpmn_diagram_header_image_EN_standard_4_3.png",
  },

  workshops: {
    title: "Talablar Yig'ish Workshop'lari",
    description:
      "Stakeholder'lar bilan intervyu, workshop va brainstorming orqali aniq va to'liq talablarni yig'ish.",
    img:
      "https://res.cloudinary.com/delib/images/w_2560,h_1708,c_scale/w_1400,c_limit/f_auto,q_auto:good/v1734714783/newsroom/pexels-fauxels-3183150/pexels-fauxels-3183150.jpg?_i=AA",
  },
};

const contact = {
  hero: {
    title: "Bog'lanish",
    subtitle: "Savollaringiz bormi? Biz bilan bog'laning – sizga yordam berishga tayyormiz!",
    bgImage: "https://thumbs.dreamstime.com/b/abstract-background-shows-emerald-green-gold-wave-digital-illustration-futuristic-vibe-perfect-tech-science-themes-design-411204303.jpg", // Elegant emerald wave background
  },

  info: {
    phone: "+998 99 123 45 67",
    email: "info@example.uz",
    address: "Toshkent shahri, Mirzo Ulug'bek tumani, Buyuk Ipak Yo'li ko'chasi, 123-uy",
  },

  form: {
    namePlaceholder: "Ismingiz",
    emailPlaceholder: "Email manzilingiz",
    phonePlaceholder: "Telefon raqamingiz",
    messagePlaceholder: "Xabaringizni yozing...",
    submitButton: "Xabar yuborish",
  },

  mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2996.367631148498!2d69.287963315432!3d41.3110819792705!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38ae8b50a3f2f2a5%3A0x4f5c1b8e3d3e3e3e!2sTashkent%2C%20Uzbekistan!5e0!3m2!1sen!2sus!4v1734270000000", // Replace with your exact location
};

export { navLinks, navIcons, socialLinks, footerLinks, aboutUs, teamMembers, services, contact };