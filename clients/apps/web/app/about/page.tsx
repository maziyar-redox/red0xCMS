import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { config } from "@/config/build-config";
import { signOgImageUrl } from "@/lib/og-image";
import Markdown from "react-markdown";

const content = `
# About me

![Samantha](https://raw.githubusercontent.com/maziyar-redox/my-blog-posts/refs/heads/main/img/123407.jpg)

# Hello, world!

This is my very first blog post!
I'm excited to share a bit about myself, and if you're new to me, I encourage you to read on.
For those of you who already know me,
feel free to reach out if you have any questions.
Here are a few ways to get in touch:

* [Email](mailto:r6.acc.051@gmail.com)
* [Telegram](https://t.me/maziyar_red0x)
* [Anonymous Chat](https://t.me/maziyar_red0x_bot)

## Who Am  i?

My name is Mazyiar, which has a rich history.  It originates from Middle Persian
*Mazyar (Middle Persian: Māh-Izād; Mazandarani/Persian: مازیار, romanized: Māzyār) was an Iranian prince from the Qarinvand dynasty,
who was the ruler (ispahbadh) of the mountainous region of Tabaristan from 825/6 to 839.
For his resistance to the Abbasid Caliphate, Mazyar is considered one of the national heroes of Iran by twentieth-century Iranian nationalist historiography.
His name means "protected by the yazata of the moon".*[Source](https://en.wikipedia.org/wiki/Mazyar).\
Currently, I'm a 20-year-old software engineering student.
While I was born in Isfahan, my family relocated to [Sari](https://en.wikipedia.org/wiki/Sari,_Iran) sometime after.

## My Areas of Interest

As mentioned, I'm currently pursuing a Bachelor's degree in Software Engineering at the Islamic Azad University, Sari branch
(you can find more information on their website: [Islamic Azad University sari branch](https://sari.iau.ir/)).
My journey in computer science began in 2018 with a focus on cybersecurity, particularly web application penetration testing.
However, I soon discovered a passion for programming as well.
This led me to delve deeper into programming concepts, algorithms, and advanced topics.

Within the software engineering field, I've explored a wide range of technologies,
including various database types (NoSQL and SQL) and specific databases like MongoDB, PostgreSQL, and MySQL.
Additionally, I've gained proficiency in version control systems like Git and frameworks like React, Next.js, Nest.js, and Express.js.
On the programming language front, I've mastered JavaScript, Java, Python, C, and C++.
Looking ahead, I'm eager to learn Go and delve deeper into the world of networking.

**Note**: I'll be sharing my research findings and book recommendations on [my Telegram channel](https://t.me/sys_127) for easy access.

## My Aspirations

My future goals center around the fascinating fields of quantum computing and mechatronics.
I plan to continue my research and studies in these areas.
Understanding advanced mathematics is crucial for navigating these complex disciplines,
and I'm actively working on strengthening my mathematical foundation.

Ultimately, my wish is to contribute positively to the world through my writing and research.
Feel free to share any feedback you have on my posts or writing style – I'm always learning and striving to improve.

**NOTE**: Please don't hesitate to let me know if you notice any problems in my writing!

[My Github](https://github.com/maziyar-redox) if you want to see my projects.`;

export async function generateMetadata() {
    return {
        title: "About Me",
        description: "Wellcome to my first blog post!",
        openGraph: {
            title: "About Me",
            description: "Wellcome to my first blog post!",
            images: [
                signOgImageUrl({
                    title: "MrRed0x",
                    label: "About Me",
                    brand: config.blog.name,
                }),
            ],
        },
    };
};

export default async function Page() {
    return (
        <div className="container mx-auto px-5">
            <Header />
            <div className="prose lg:prose-lg dark:prose-invert m-auto mt-20 mb-10 blog-content">
                <Markdown>{content}</Markdown>
            </div>
            <Footer />
        </div>
    );
};