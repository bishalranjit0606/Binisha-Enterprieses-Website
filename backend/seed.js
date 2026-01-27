const db = require('./models');

const seed = async () => {
    try {
        await db.sequelize.sync({ force: true });
        console.log('Database synced (force: true)');

        // 1. Translations
        const translations = {
            nav_home: { en: "Home", ne: "गृहपृष्ठ" },
            nav_services: { en: "Services", ne: "सेवाहरू" },
            nav_why_us: { en: "Why Us?", ne: "हामीलाई किन?" },
            nav_gallery: { en: "Our Gallery", ne: "हाम्रो ग्यालरी" },
            nav_news: { en: "Latest News", ne: "ताजा समाचार" },
            nav_contact: { en: "Contact Us", ne: "सम्पर्क गर्नुहोस्" },
            hero_title: { en: "Your Trusted Local <span class=\"red-text\">Digital and Financial Service Provider </span>", ne: "तपाईंको विश्वसनीय स्थानीय <span class=\"red-text\">डिजिटल र वित्तीय सेवा प्रदायक</span>" },
            hero_desc: { en: "Welcome to Binisha Enterprises, your reliable local service shop in Pathalaiya, Bara, Nepal. We support our community by providing essential daily financial and digital services.", ne: "बिनिशा इन्टरप्राइजेजमा स्वागत छ, पथलैया, बारा, नेपालमा तपाईंको भरपर्दो स्थानीय सेवा पसल। हामी आवश्यक दैनिक वित्तीय र डिजिटल सेवाहरू प्रदान गरेर हाम्रो समुदायलाई सहयोग गर्छौं।" },
            btn_explore: { en: "Explore Services", ne: "सेवाहरू अन्वेषण गर्नुहोस्" },
            btn_contact: { en: "Get In Touch", ne: "सम्पर्कमा रहनुहोस्" },
            float_experience: { en: "20+ Years Experience", ne: "२०+ वर्षको अनुभव" },
            float_customers: { en: "Trusted by 1000+ Customers", ne: "१०००+ ग्राहकहरूद्वारा विश्वसनीय" },
            scroll_down: { en: "Scroll Down", ne: "तल स्क्रोल गर्नुहोस्" },
            services_subtitle: { en: "What We Offer", ne: "हामी के प्रदान गर्छौं" },
            services_title: { en: "Our <span class=\"red-text\">Services</span>", ne: "हाम्रा <span class=\"red-text\">सेवाहरू</span>" },
            svc_insurance_title: { en: "Insurance Services", ne: "बीमा सेवाहरू" },
            svc_insurance_desc: { en: "We are agents for life, health, and vehicle insurance and also provide premium payment services.", ne: "हामी जीवन, स्वास्थ्य र सवारी साधन बीमाका एजेन्ट हौं र प्रीमियम भुक्तानी सेवाहरू पनि प्रदान गर्छौं।" },
            svc_remittance_title: { en: "Remittance / Money Transfer", ne: "रेमिट्यान्स / पैसा स्थानान्तरण" },
            svc_remittance_desc: { en: "Quick and reliable money transfer to both local and international locations.", ne: "स्थानीय र अन्तर्राष्ट्रिय दुवै स्थानहरूमा छिटो र भरपर्दो पैसा स्थानान्तरण।" },
            svc_ticket_title: { en: "Air Ticket Booking", ne: "हवाई टिकट बुकिङ" },
            svc_ticket_desc: { en: "Domestic and international flight ticket booking with confirmation assistance.", ne: "पुष्टिकरण सहायताको साथ आन्तरिक र अन्तर्राष्ट्रिय उडान टिकट बुकिङ।" },
            svc_recharge_title: { en: "Mobile and DTH Recharge", ne: "मोबाइल र DTH रिचार्ज" },
            svc_recharge_desc: { en: "Recharge your mobile phone balance and DTH subscriptions easily.", ne: "आफ्नो मोबाइल फोन ब्यालेन्स र DTH सदस्यता सजिलै रिचार्ज गर्नुहोस्।" },
            svc_bill_title: { en: "Bill Payment Service", ne: "बिल भुक्तानी सेवा" },
            svc_bill_desc: { en: "Pay all local utility bills including electricity, internet, and water bills in one place.", ne: "एकै ठाउँमा बिजुली, इन्टरनेट र पानीको बिल सहित सबै स्थानीय उपयोगिता बिलहरू तिर्नुहोस्।" },
            about_subtitle: { en: "Why Choose Us?", ne: "हामीलाई किन छान्ने?" },
            about_title: { en: "Your Trusted <span class=\"red-text\">Digital Partner</span>", ne: "तपाईंको विश्वसनीय <span class=\"red-text\">डिजिटल साझेदार</span>" },
            about_text_1: { en: "With over 20 years of dedicated service in Pathlaiya, Binisha Enterprises has become the go-to destination for all digital and financial needs. We pride ourselves on delivering reliable, efficient, and customer-focused solutions that bridge the gap between traditional services and modern technology.", ne: "पथलैयामा २० वर्षभन्दा बढी समर्पित सेवाको साथ, बिनिशा इन्टरप्राइजेज सबै डिजिटल र वित्तीय आवश्यकताहरूको लागि मुख्य गन्तव्य भएको छ। हामी परम्परागत सेवा र आधुनिक प्रविधि बीचको खाडल पूर्ति गर्ने भरपर्दो, कुशल र ग्राहक-केन्द्रित समाधानहरू प्रदान गर्नमा गर्व गर्छौं।" },
            about_text_2: { en: "Our team of experienced professionals is committed to providing personalized service, ensuring that every customer receives the attention and support they deserve. From internet connectivity to financial transactions, we make digital services accessible to everyone in our community.", ne: "हाम्रो अनुभवी पेशेवरहरूको टोली व्यक्तिगत सेवा प्रदान गर्न प्रतिबद्ध छ, यो सुनिश्चित गर्दै कि प्रत्येक ग्राहकले उनीहरूले योग्य ध्यान र समर्थन प्राप्त गर्दछ। इन्टरनेट जडान देखि वित्तीय लेनदेन सम्म, हामी हाम्रो समुदायका सबैलाई डिजिटल सेवाहरू पहुँचयोग्य बनाउँछौं।" },
            about_signature: { en: "Serving Katari with Pride,", ne: "गर्वका साथ कटारी सेवा गर्दै," },
            about_agent: { en: "Binisha Enterprises", ne: "बिनिशा इन्टरप्राइजेज" },
            cred_years_num: { en: "20+", ne: "२०+" },
            cred_years_label: { en: "Years of Service", ne: "सेवाका वर्षहरू" },
            cred_customers_num: { en: "100000+", ne: "१०००००+" },
            cred_customers_label: { en: "Happy Customers", ne: "खुसी ग्राहकहरू" },
            cred_rank_num: { en: "#1", ne: "#१" },
            cred_rank_label: { en: "In Pathlaiya", ne: "पथलैयामा" },
            gallery_subtitle: { en: "Make Memories", ne: "सम्झनाहरू बनाउनुहोस्" },
            gallery_title: { en: "Our <span class=\"red-text\">Gallery</span>", ne: "हाम्रो <span class=\"red-text\">ग्यालरी</span>" },
            news_subtitle: { en: "Latest Updates", ne: "नवीनतम अपडेटहरू" },
            news_title: { en: "Recent <span class=\"red-text\">News</span>", ne: "हालैका <span class=\"red-text\">समाचारहरू</span>" },
            news1_title: { en: "New Insurance Partners Added", ne: "नयाँ बीमा साझेदारहरू थपिए" },
            news1_desc: { en: "We're excited to announce partnerships with 5 new insurance companies, offering you more choices and better rates.", ne: "हामी ५ नयाँ बीमा कम्पनीहरूसँग साझेदारी घोषणा गर्न पाउँदा खुसी छौं, तपाईंलाई थप विकल्पहरू र राम्रो दरहरू प्रदान गर्दै।" },
            news2_title: { en: "Extended Service Hours", ne: "विस्तारित सेवा समय" },
            news2_desc: { en: "We're now open until 8 PM on weekdays to serve you better. Visit us anytime that's convenient for you.", ne: "हामी अब तपाईंलाई राम्रो सेवा दिन साँझ ८ बजे सम्म खुला छौं। तपाईंलाई सुविधाजनक कुनै पनि समयमा हामीलाई भेट्नुहोस्।" },
            news3_title: { en: "Mobile App Coming Soon", ne: "मोबाइल एप छिटै आउँदैछ" },
            news3_desc: { en: "Soon you'll be able to access all our services through our new mobile app. Stay tuned for the launch!", ne: "छिटै तपाईं हाम्रो नयाँ मोबाइल एपमार्फत हाम्रा सबै सेवाहरू पहुँच गर्न सक्नुहुनेछ। लन्चको लागि पर्खिरहनुहोस्!" },
            contact_subtitle: { en: "Get in Touch", ne: "सम्पर्कमा रहनुहोस्" },
            contact_title: { en: "Contact <span class=\"red-text\">Us</span>", ne: "सम्पर्क <span class=\"red-text\">गर्नुहोस्</span>" },
            contact_info_title: { en: "Binisha Enterprises", ne: "बिनिशा इन्टरप्राइजेज" },
            contact_info_desc: { en: "Your trusted partner for digital and financial services in Pathlaiya. Visit us or get in touch for any assistance.", ne: "पथलैयामा डिजिटल र वित्तीय सेवाहरूको लागि तपाईंको विश्वस्त साझेदार। कुनै पनि सहायताको लागि हामीलाई भेट्नुहोस् वा सम्पर्क गर्नुहोस्।" },
            contact_phone_title: { en: "Phone", ne: "फोन" },
            contact_address_title: { en: "Address", ne: "ठेगाना" },
            contact_address_val: { en: "Pathalaiya Bazar, Bara, Nepal", ne: "पथलैया बजार, बारा, नेपाल" },
            load_more: { en: "Load More News", ne: "थप समाचार लोड गर्नुहोस्" }
        };

        const translationData = Object.entries(translations).map(([key, val]) => ({
            key,
            en: val.en,
            ne: val.ne
        }));

        await db.Translation.bulkCreate(translationData);
        console.log('Translations seeded');

        // 2. SiteSettings
        const settings = [
            { key: 'phone_1', value: '+977 9855029952' },
            { key: 'phone_2', value: '+977 9705252952' },
            { key: 'whatsapp', value: '+977 9855029952' },
            { key: 'email', value: 'pathlaiya123@gmail.com' },
            { key: 'address', value: 'Pathalaiya Bazar, Bara, Nepal' },
            { key: 'map_url', value: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3548.6595571453227!2d84.97543207890651!3d27.198434887125277!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb5375a0f99cc1%3A0x9b87c3c9eed38a0f!2sRanjit%20Enterprises!5e0!3m2!1sen!2sus!4v1768883364798!5m2!1sen!2sus' },
            { key: 'hero_image', value: 'images/1.png' },
            { key: 'why_us_image', value: 'images/1.jpg' }
        ];
        await db.SiteSetting.bulkCreate(settings);
        console.log('SiteSettings seeded');

        // 3. Services & Companies
        const services = [
            {
                icon: "fas fa-heartbeat",
                title_en: "Insurance Services",
                title_ne: "बीमा सेवाहरू",
                desc_en: "We are agents for life, health, and vehicle insurance and also provide premium payment services.",
                desc_ne: "हामी जीवन, स्वास्थ्य र सवारी साधन बीमाका एजेन्ट हौं र प्रीमियम भुक्तानी सेवाहरू पनि प्रदान गर्छौं।",
                whatsapp_msg: "Hello, I would like to know more about your Insurance Services.",
                companies: ["Nepal Life Insurance", "LIC Nepal", "National Life Insurance", "Asian Life Insurance", "Surya Jyoti Life Insurance", "Reliable Nepal Life Insurance", "Citizen Life Insurance", "Sun Nepal Life Insurance", "Sanima Reliance Life Insurance", "Himalayan Life Insurance", "Prabhu Mahalaxmi Life Insurance", "Siddhartha Premier Insurance", "Sagarmatha Lumbini Insurance", "IGI Prudential Insurance", "Shikhar Insurance", "Neco Insurance", "United Ajod Insurance", "Sanima GIC Insurance", "NLG Insurance", "Salpa Insurance"]
            },
            {
                icon: "fas fa-hand-holding-usd",
                title_en: "Remittance / Money Transfer",
                title_ne: "रेमिट्यान्स / पैसा स्थानान्तरण",
                desc_en: "Quick and reliable money transfer to both local and international locations.",
                desc_ne: "स्थानीय र अन्तर्राष्ट्रिय दुवै स्थानहरूमा छिटो र भरपर्दो पैसा स्थानान्तरण।",
                whatsapp_msg: "Hello, I need to send/receive money. Please assist.",
                companies: ["IME", "Prabhu Money Transfer", "Himal Remit", "City Express", "Western Union", "Esewa Money Transfer", "Khalti"]
            },
            {
                icon: "fas fa-plane",
                title_en: "Air Ticket Booking",
                title_ne: "हवाई टिकट बुकिङ",
                desc_en: "Domestic and international flight ticket booking with confirmation assistance.",
                desc_ne: "पुष्टिकरण सहायताको साथ आन्तरिक र अन्तर्राष्ट्रिय उडान टिकट बुकिङ।",
                whatsapp_msg: "Hello, I want to book a flight ticket.",
                companies: ["Buddha Air", "Yeti Airlines", "Shree Airlines", "Saurya Airlines", "Nepal Airlines", "Himalaya Airlines", "Qatar Airways", "Fly Dubai", "Air Arabia"]
            },
            {
                icon: "fas fa-mobile-alt",
                title_en: "Mobile and DTH Recharge",
                title_ne: "मोबाइल र DTH रिचार्ज",
                desc_en: "Recharge your mobile phone balance and DTH subscriptions easily.",
                desc_ne: "आफ्नो मोबाइल फोन ब्यालेन्स र DTH सदस्यता सजिलै रिचार्ज गर्नुहोस्।",
                whatsapp_msg: "Hello, I need a mobile/DTH recharge.",
                companies: ["NTC (Namaste)", "Ncell", "Smart Cell", "Dish Home", "Mero TV", "Net TV", "Sim TV"]
            },
            {
                icon: "fas fa-file-invoice-dollar",
                title_en: "Bill Payment Service",
                title_ne: "बिल भुक्तानी सेवा",
                desc_en: "Pay all local utility bills including electricity, internet, and water bills in one place.",
                desc_ne: "एकै ठाउँमा बिजुली, इन्टरनेट र पानीको बिल सहित सबै स्थानीय उपयोगिता बिलहरू तिर्नुहोस्।",
                whatsapp_msg: "Hello, I want to pay my utility bills.",
                companies: ["Nepal Electricity Authority", "Khanepani (Water)", "Worldlink", "Vianet", "Classic Tech", "Subisu"]
            }
        ];

        for (const [idx, s] of services.entries()) {
            const service = await db.Service.create({
                icon: s.icon,
                title_en: s.title_en,
                title_ne: s.title_ne,
                desc_en: s.desc_en,
                desc_ne: s.desc_ne,
                whatsapp_msg: s.whatsapp_msg,
                order: idx
            });

            for (const [cIdx, c] of s.companies.entries()) {
                await db.ServiceCompany.create({
                    name: c,
                    order: cIdx,
                    serviceId: service.id
                });
            }
        }
        console.log('Services seeded');

        // 4. Gallery
        const galleryImages = [
            "images/3.jpg",
            "images/4.jpg",
            "images/5.jpg",
            "images/6.jpg",
            "images/7.jpg",
            "images/8.jpg",
            "images/9.jpg",
            "images/10.jpg"
        ];

        for (const [idx, img] of galleryImages.entries()) {
            await db.Gallery.create({
                image_url: img,
                alt: `Gallery Image ${idx + 1}`,
                order: idx
            });
        }
        console.log('Gallery seeded');

        // 5. News
        const newsItems = [
            {
                image_url: "images/2.jpg",
                date: "2026-01-15",
                title_en: "New Insurance Partners Added",
                title_ne: "नयाँ बीमा साझेदारहरू थपिए",
                excerpt_en: "We're excited to announce partnerships with 5 new insurance companies, offering you more choices and better rates.",
                excerpt_ne: "हामी ५ नयाँ बीमा कम्पनीहरूसँग साझेदारी घोषणा गर्न पाउँदा खुसी छौं, तपाईंलाई थप विकल्पहरू र राम्रो दरहरू प्रदान गर्दै।"
            },
            {
                image_url: "images/3.jpg",
                date: "2026-01-10",
                title_en: "Extended Service Hours",
                title_ne: "विस्तारित सेवा समय",
                excerpt_en: "We're now open until 8 PM on weekdays to serve you better. Visit us anytime that's convenient for you.",
                excerpt_ne: "हामी अब तपाईंलाई राम्रो सेवा दिन साँझ ८ बजे सम्म खुला छौं। तपाईंलाई सुविधाजनक कुनै पनि समयमा हामीलाई भेट्नुहोस्।"
            },
            {
                image_url: "images/4.jpg",
                date: "2026-01-05",
                title_en: "Mobile App Coming Soon",
                title_ne: "मोबाइल एप छिटै आउँदैछ",
                excerpt_en: "Soon you'll be able to access all our services through our new mobile app. Stay tuned for the launch!",
                excerpt_ne: "छिटै तपाईं हाम्रो नयाँ मोबाइल एपमार्फत हाम्रा सबै सेवाहरू पहुँच गर्न सक्नुहुनेछ। लन्चको लागि पर्खिरहनुहोस्!"
            }
        ];

        await db.News.bulkCreate(newsItems);
        console.log('News seeded');

        // 6. Credentials
        const credentials = [
            { icon: "fas fa-calendar-check", value: "20+", label_en: "Years of Service", label_ne: "सेवाका वर्षहरू", order: 0 },
            { icon: "fas fa-users", value: "100000+", label_en: "Happy Customers", label_ne: "खुसी ग्राहकहरू", order: 1 },
            { icon: "fas fa-map-marker-alt", value: "#1", label_en: "In Pathlaiya", label_ne: "पथलैयामा", order: 2 }
        ];
        await db.Credential.bulkCreate(credentials);
        console.log('Credentials seeded');

        // 7. Floating Boxes
        const floatingBoxes = [
            { icon: "fas fa-award", text_en: "20+ Years Experience", text_ne: "२०+ वर्षको अनुभव", position_class: "floating-box-1", order: 0 },
            { icon: "fas fa-users", text_en: "Trusted by 1000+ Customers", text_ne: "१०००+ ग्राहकहरूद्वारा विश्वसनीय", position_class: "floating-box-3", order: 1 }
        ];
        await db.FloatingBox.bulkCreate(floatingBoxes);
        console.log('FloatingBoxes seeded');

        console.log('All data seeded successfully!');
        process.exit(0);

    } catch (err) {
        console.error('Seeding failed:', err);
        process.exit(1);
    }
};

seed();
