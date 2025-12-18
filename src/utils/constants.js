const navLinks = [
  { id: 1, name: 'Home', targetId: "home" },
  { id: 2, name: 'About', targetId: "about" },
  { id: 3, name: 'Services', targetId: "services" },
  { id: 4, name: 'Contact', targetId: "contact" },
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
  {id:1, text: "Baraka Institute is a modern educational center that offers a wide range of courses and trainings for students and professionals. Our goal is to help everyone enhance their knowledge and skills."},
  {id:2, img: "about-us-header.jpg"},
  {id:3, img: "our-mission-about.jpg"},
  {id:4, text: "Our mission is to make quality education accessible and affordable for everyone. We support advanced technologies and innovative learning methods and help our students develop practical skills."},
]

const teamMembers = [
  {
    id: 1,
    name: "Tom Smith",
    role: "Founder & CEO",
    img: "example-1.jpg",
    linkedin: "https://linkedin.com/in/tomsmith",
    instagram: "https://instagram.com/tomsmith",
    bio: "John founded the company in 2015 with a vision to revolutionize the industry. He has over 15 years of experience in leadership and innovation.",
  },
  {
    id: 2,
    name: "Ali Veli",
    role: "Frontend Developer",
    img: "example-2.jpg",
    linkedin: "https://linkedin.com/in/aliveli",
    instagram: "https://instagram.com/aliveli",
     bio: "Ali is a skilled frontend developer with a passion for creating intuitive user interfaces. He has been with the company since 2018.",
  },
  {
    id: 3,
    name: "Sara Ahmed",
    role: "Backend Developer",
    img: "example-3.jpg",
    linkedin: "https://linkedin.com/in/saraahmed",
    instagram: "https://instagram.com/saraahmed",
    bio: "Sara specializes in backend development and database management. She joined the team in 2019 and has been instrumental in building robust systems.",
  },
  {
    id: 4,
    name: "John Doe",
    role: "UI/UX Designer",
    img: "example-4.jpg",
    linkedin: "https://linkedin.com/in/johndoe",
    instagram: "https://instagram.com/johndoe",
    bio: "John is a creative UI/UX designer with a keen eye for detail. He has been designing user-centric experiences since 2017.",
  },
  
];


 const services = {
  intro: {
    title: "Our Services",
    text1:
      "We provide professional business analysis services for companies. Our experienced specialists help optimize your business processes, identify requirements, and implement effective solutions.",
    text2:
      "Our aim is to help your business achieve long-term success by boosting competitiveness and increasing efficiency.",
    img:
      "services-1.jpg",
  },

  hiring: {
    title: "Hire Business Analysts for Companies",
    description:
      "We select and place experienced business analysts for your company. Our specialists help manage your projects, gather requirements, and develop effective solutions.",
    features: [
      "Temporary or permanent hiring",
      "Qualification screening of specialists",
      "End-to-end project support",
    ],
    img:
      "services-2.jpg",
  },

  consulting: {
    title: "Consulting Services",
    description:
      "We provide professional consulting on business process analysis, strategy development, and optimization.",
    features: [
      "Business process audits",
      "Competitive analysis and strategy",
      "Integration of IT solutions",
    ],
    img:
      "services-3.avif",
  },

  education: {
    title: "Educational Video Courses for Business Analysts",
    description:
      "We offer specialized educational video courses and trainings for beginners and professionals in business analysis.",
    features: [
      "BPMN, UML and other models",
      "Requirements gathering techniques",
      "Hands-on practice on real projects",
    ],
    img:
      "services-4.webp",
  },

  modeling: {
    title: "Business Process Modeling",
    description:
      "Visual modeling and optimization of processes based on BPMN and other standards.",
    img:
      "services-5.png",
  },

  workshops: {
    title: "Requirements Gathering Workshops",
    description:
      "Collect clear and complete requirements through stakeholder interviews, workshops, and brainstorming.",
    img:
      "services-6.avif",
  },
};

const contact = {
  hero: {
    title: "Contact",
    subtitle: "Have questions? Contact us — we're ready to help!",
    bgImage: "contact.jpg",
  },

  info: {
    phone: "+998 99 123 45 67",
    email: "info@example.uz",
    address: "Tashkent city, Mirzo Ulug'bek district, Buyuk Ipak Yo'li street, House 123",
  },

  form: {
    namePlaceholder: "Your name",
    emailPlaceholder: "Your email",
    phonePlaceholder: "Your phone number",
    messagePlaceholder: "Write your message...",
    submitButton: "Send Message",
  },

  mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2996.367631148498!2d69.287963315432!3d41.3110819792705!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38ae8b50a3f2f2a5%3A0x4f5c1b8e3d3e3e3e!2sTashkent%2C%20Uzbekistan!5e0!3m2!1sen!2sus!4v1734270000000", // Replace with your exact location
};

 const testimonials = [
  {
    name: "Azizbek Karimov",
    role: "IT Director, UzAuto Motors",
    quote:
      "This team completely optimized our business processes. Thanks to their professional approach to requirements gathering and modeling, our project was completed ahead of schedule.",
    img: "https://media.istockphoto.com/id/2004891062/photo/happy-mid-aged-business-woman-manager-handshaking-greeting-client-in-office.jpg?s=612x612&w=0&k=20&c=kP6DSKhIVMO-m27l4nCmvpwzaKvzV8ncPT9elotc4QI=",
  },
  {
    name: "Dilnoza Salimova",
    role: "Project Manager, Kapitalbank",
    quote:
      "The consulting services and educational courses took our internal analysts' team to a new level. Now we can successfully manage complex projects ourselves.",
    img: "https://media.istockphoto.com/id/1591572504/photo/cheerful-businesswomen-shaking-hands-in-meeting-room.jpg?s=612x612&w=0&k=20&c=mo5VjVyA-t4ydS6ZjJVxaUSi0v9KVbJV_Go5EOF_B8M=",
  },
  {
    name: "Rustam Toshpulatov",
    role: "CEO, TechSolutions LLC",
    quote:
      "Through the business analyst hiring service, we found an excellent specialist. Within a month, they increased our company's efficiency by 30%. Thank you!",
    img: "https://media.istockphoto.com/id/1824279555/photo/happy-insurance-agent-talking-to-her-customers-in-the-office.jpg?s=612x612&w=0&k=20&c=yc0_-ofn4XzXpfRFyGYlUgvqigBPBV4nq8I9eIjTHOI=",
  },
];

export { navLinks, navIcons, socialLinks, footerLinks, aboutUs, teamMembers, services, contact, testimonials };