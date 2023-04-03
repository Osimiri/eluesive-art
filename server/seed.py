#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc


# Remote library imports
from faker import Faker
from faker.providers import  person, profile, isbn, internet   
# Local imports
from app import app
from models import Author, Genre, User, UserBook, Book, db

fake = Faker()
fake.add_provider(profile)
fake.add_provider(isbn)
fake.add_provider(internet)


def make_genre():
    
    Genre.query.delete()

    genres = ['Drama', 'Fable', 'Fiction', 'Folklore', 'Historical Fiction', 'Horror', 'Mystery',
    'Poetry', 'Science Fiction', 'Non-Fiction', 'Biography', 'Autobiography', 'Art','Romance', 
    'Travel', 'Classics', 'Cookbook', 'Fantasy']

    genre_obj = []

    for i in range(len(genres)):
    # for i in range(10):
        genre = Genre(
            genre = genres[i]         
        )

        genre_obj.append(genre)
    
    db.session.add_all(genre_obj)
    db.session.commit()

def make_author():

    Author.query.delete()
    
    authors = [
        Author(full_name="Brandon Sanderson", biography="Brandon Sanderson was born in 1975 in Lincoln, Nebraska. As a child, Brandon enjoyed reading, but he lost interest in the types of titles often suggested to him, and by junior high, he never cracked a book if he could help it. This changed when an eighth-grade teacher gave him Dragonsbane by Barbara Hambly.", author_image= "https://i.guim.co.uk/img/media/8979b844a46ec5a1632e51e67e3323abbe01ca94/0_26_787_472/master/787.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=ed09c99e3de5039f38264c2f060bf772"),
        Author(full_name="James Patterson", biography=" James Patterson is the worlds bestselling author. Among his creations are Alex Cross, the Womens Murder Club, Michael Bennett, and Maximum Ride. His #1 bestselling nonfiction includes Walk in My Combat Boots, Filthy Rich, and his autobiography, James Patterson by James Patterson. He has collaborated on novels with Bill Clinton and Dolly Parton and has won an Edgar Award, nine Emmy Awards, and the National Humanities Medal.", author_image= "https://cdn.britannica.com/99/220799-050-8E06F837/American-author-James-Patterson.jpg"),
        Author(full_name="Ruth Benedict", biography="Ruth Fulton Benedict (June 5, 1887 - September 17, 1948) was an American anthropologist and folklorist. She was born in New York City, attended Vassar College, and graduated in 1909. She entered graduate studies at Columbia University in 1919, where she studied under Franz Boas. She received her Ph.D and joined the faculty in 1923. Margaret Mead, with whom she may have shared a romantic relationship, and Marvin Opler were among her students and colleagues.", author_image= "https://cdn.britannica.com/14/194614-050-A54D1CE1/Ruth-Benedict-American-1937.jpg"),
        Author(full_name="bell Hooks", biography="bell hooks (born Gloria Jean Watkins) was an African-American author, feminist, and social activist. Her writing focused on the interconnectivity of race, class, and gender and their ability to produce and perpetuate systems of oppression and domination. She published over thirty books and numerous scholarly and mainstream articles, appeared in several documentary films, and participated in various public perspective, she addressed race, class, and gender in education, art, history, sexuality, mass media and feminism. ", author_image= "https://media.npr.org/assets/img/2021/12/15/gettyimages-1319519403_custom-63531e72c27086fab2c5c6b8f99fdc58d6751371-s1100-c50.jpg"),
        Author(full_name="Laura Purcell", biography="Laura Purcell is a former bookseller and lives in Colchester with her husband and pet guinea pigs. Her first novel for Raven Books THE SILENT COMPANIONS won the WHSmith Thumping Good Read Award 2018 and featured in both the Zoe Ball and Radio 2 Book Clubs. Other Gothic novels include THE CORSET (THE POISON THREAD in USA), BONE CHINA and THE SHAPE OF DARKNESS (2020). Laura’s historical fiction about the Hanoverian monarchs, QUEEN OF BEDLAM and MISTRESS OF THE COURT, was published by Myrmidon.", author_image= "https://images.squarespace-cdn.com/content/v1/5807a5666b8f5ba082451a2f/1508682212943-LOYG808Y7FG9ORFOZ61M/LB+-+Image+-+Horror+Lounge+-+Laura+Purcell+photo.jpg"),
        Author(full_name="Action Bronson", biography="Ariyan Arslani, better known by the stage name Action Bronson, is an American rapper, reality television star, author, and talk show host. In August 2012, he signed to Warner Bros. Records, but was later moved to Atlantic Records' imprint, Vice Records. ", author_image= "https://static01.nyt.com/images/2021/03/29/dining/29action1/merlin_178161414_a13ace2e-1c95-46f9-bc86-f7207b017430-articleLarge.jpg?quality=75&auto=webp&disable=upscale"),
        Author(full_name="Mark Twain", biography=" Samuel Langhorne Clemens, better known by his pen name Mark Twain, was an American author and humorist. He is noted for his novels Adventures of Huckleberry Finn (1885), called the Great American Novel, and The Adventures of Tom Sawyer (1876).Twain grew up in Hannibal, Missouri, which would later provide the setting for Huckleberry Finn and Tom Sawyer. He apprenticed with a printer. He also worked as a typesetter and contributed articles to his older brother Orion's newspaper. After toiling as a printer in various cities, he became a master riverboat pilot on the Mississippi River, before heading west to join Orion. He was a failure at gold mining, so he next turned to journalism.", author_image= "https://upload.wikimedia.org/wikipedia/commons/0/0c/Mark_Twain_by_AF_Bradley.jpg"),
        Author(full_name="Brent Weeks", biography=" In a small-town Montana school at age 12, Brent Weeks met the two great loves of his life. Edgar Allan Poe introduced him to the power of literature to transcend time and death and loneliness. Fate introduced him to The Girl, Kristi Barnes. He began his pursuit of each immediately. The novel was a failure. The Girl shot him down. Since then–skipping the boring parts–Brent has written eight best-selling novels with the Night Angel Trilogy and the Lightbringer Series, won several industry awards, and sold a few million books. Brent and his wife Kristi live in Oregon with their two daughters. (Yeah, he married The Girl.)", author_image= "https://www.brentweeks.com/wp-content/uploads/2016/11/WeeksHeadshotFinal2019.jpg"),
        Author(full_name="Andrew Loomis", biography="William Andrew Loomis was an American illustrator, author, and art instructor.", author_image= "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQXKOOOqbOOUzPU7SQUjKaIK-Cz5faXkpD2bx-St7NHaayYVfq"),
        Author(full_name="Colleen Hoover", biography="Colleen Hoover is an American author who primarily writes novels in the romance and young adult fiction genres. She is best known for her 2016 romance novel, It Ends with Us. Many of her works were self-published, before being picked up by a publishing house.", author_image= "https://www.gannett-cdn.com/presto/2022/08/03/USAT/313e6423-5851-4b3c-9f52-963ae3707746-Colleen_Hoover_author_photo_credit_Chad_Griffith.jpg?crop=2000,1846,x0,y0"),
        Author(full_name="Chris Bohjalian", biography="Chris Bohjalian is the #1 New York Times bestselling author of 24 books. His work has been translated into 35 languages and become three movies and an Emmy-nominated TV series.His new novel, THE LIONESS, roars May 10, and is already in development for a limited TV series. A luxurious African safari turns deadly for a Hollywood star and her entourage in this riveting historical thriller, about which the New York Times wrote in its spring preview", author_image= "https://wehco.media.clients.ellingtoncms.com/img/photos/2019/05/12/191845946_Bohjalian_ORIG_t800.jpg?90232451fbcadccc64a17de7521d859a8f88077d"),
        Author(full_name="Chuck Tingle", biography="Dr. Chuck Tingle is an erotic author and Tae Kwon Do grandmaster (almost black belt) from Billings, Montana. After receiving his PhD at DeVry University in holistic massage, Chuck found himself fascinated by all things sensual, leading to his creation of the `tingler`, a story so blissfully erotic that it cannot be experienced without eliciting a sharp tingle down the spine.", author_image= " https://images.gr-assets.com/authors/1670440575p5/10788353.jpg"),
        Author(full_name="Blanka Lipińska", biography="Blanka Lipińska is a Polish author best known for her erotic trilogy beginning with 365 Dni. The first and second novels were adapted into the 2020 and 2022 films for which she co-wrote the screenplay and in which she has a cameo.", author_image= "https://www.thebigthrill.org/wp-content/uploads/2021/11/blanka-feat.jpg"),
        Author(full_name="Khaled Hosseini", biography="Hosseini was born in Kabul, Afghanistan, in 1965. In 1970 Hosseini and his family moved to Iran where his father worked for the Embassy of Afghanistan in Tehran. In 1973 Hosseini's family returned to Kabul, and Hosseini's youngest brother was born in July of that year. In 1976, when Hosseini was 11 years old, Hosseini's father obtained a job in Paris, France, and moved the family there. They were unable to return to Afghanistan because of the Saur Revolution in which the PDPA communist party seized power through a bloody coup in April 1978. Instead, a year after the Soviet invasion of Afghanistan, in 1980 they sought political asylum in the United States and made their residence in San Jose, California.", author_image= "https://cdn.britannica.com/08/110308-050-0ABA9091/Khaled-Hosseini.jpg"),
        Author(full_name="Chimamanda Ngozi Adichie", biography="Chimamanda Ngozi Adichie grew up in Nigeria.Her work has been translated into over thirty languages and has appeared in various publications, including The New Yorker, Granta, The O. Henry Prize Stories, the Financial Times, and Zoetrope. She is the author of the novels Purple Hibiscus, which won the Commonwealth Writers’ Prize and the Hurston/Wright Legacy Award; Half of a Yellow Sun, which won the Orange Prize and was a National Book Critics Circle Award Finalist and a New York Times Notable Book; and Americanah, which won the National Book Critics Circle Award and was named one of The New York Times Top Ten Best Books of 2013. Ms. Adichie is also the author of the story collection The Thing Around Your Neck.", author_image= "https://www.chimamanda.com/wp-content/uploads/2021/10/CNA-01.jpg"),
        Author(full_name="Fonda Lee", biography="Fonda Lee is the World Fantasy Award-winning author of the epic Green Bone Saga, beginning with Jade City and continuing in Jade War and Jade Legacy. She is also the author of the acclaimed science fiction novels Zeroboxer, Exo and Cross Fire.Fonda is as a three-time winner of the Aurora Award (Canada’s national science fiction and fantasy award), and a multiple finalist for the Nebula Award, the Locus Award, and the Oregon Book Award. Her novels have garnered multiple starred reviews, been included on numerous state reading lists, named Junior Library Guild selections, and appeared on Best of Year lists from NPR, Barnes & Noble, Syfy Wire, and others.", author_image= "https://m.media-amazon.com/images/W/IMAGERENDERING_521856-T1/images/S/amzn-author-media-prod/lq8dv5csjr16gejfml6abafcsb._SX2400_CR0%2C0%2C2400%2C2400_.jpg"),
        Author(full_name="Lucy Maud Montgomery", biography="Lucy Maud Montgomery was a Canadian author, best known for a series of novels beginning with Anne of Green Gables, published in 1908.Montgomery was born at Clifton, Prince Edward Island, Nov. 30, 1874. She came to live at Leaskdale, north of Uxbridge Ontario, after her wedding with Rev. Ewen Macdonald on July 11, 1911. She had three children and wrote close to a dozen books while she was living in the Leaskdale Manse before the family moved to Norval, Ontario in 1926. She died in Toronto April 24, 1942 and was buried at Cavendish, Prince Edward Island.", author_image= "https://images.gr-assets.com/authors/1188896723p5/5350.jpg"),
        Author(full_name="Hanya Yanagihara", biography="Hanya Yanagihara is an American novelist, editor, and travel writer. She grew up in Hawaii. She is best known for her bestselling novel A Little Life, which was shortlisted for the 2015 Booker Prize, and for being the editor-in-chief of T Magazine.", author_image= "https://i.guim.co.uk/img/media/4d64161775dc471011c2af56c54e20f7584ff67f/0_1317_2400_1440/master/2400.jpg?width=1200&height=900&quality=85&auto=format&fit=crop&s=8832828d88461b36c8712d2bc3fce065"),
        Author(full_name="Toshikazu Kawaguchi", biography="Toshikazu Kawaguchi  was born in Osaka, Japan, in 1971. He formerly produced, directed and wrote for the theatrical group Sonic Snail. As a playwright, his works include COUPLE, Sunset Song, and Family Time. The novel Before the Coffee Gets Cold is adapted from a 1110 Productions play by Kawaguchi, which won the 10th Suginami Drama Festival grand prize.", author_image= "https://cdn-japantimes.com/wp-content/uploads/2019/09/p18-gattig-coldcoffee-a-20190929-e1569651883696.jpg"),
        Author(full_name="Susan Hill", biography="Susan Hill was born in Scarborough, North Yorkshire in 1942. Her hometown was later referred to in her novel A Change for the Better (1969) and some short stories especially Cockles and Mussels .She attended Scarborough Convent School, where she became interested in theatre and literature. Her family left Scarborough in 1958 and moved to Coventry where her father worked in car and aircraft factories. Hill states that she attended a girls grammar school, Barr's Hill. Her fellow pupils included Jennifer Page, the first Chief Executive of the Millennium Dome. At Barrs Hill she took A levels in English, French, History and Latin, proceeding to an English degree at King's College London.", author_image= "https://www.thetimes.co.uk/imageserver/image/%2Fmethode%2Fsundaytimes%2Fprod%2Fweb%2Fbin%2F556f5220-9fbd-11e7-8312-24090aeb6a2c.jpg?crop=2250%2C1500%2C0%2C0"),
        Author(full_name="Agatha Christie", biography="Dame Agatha Mary Clarissa Christie is the best-selling author of all time. She wrote 66 crime novels and story collections, fourteen plays, and six novels under a pseudonym in Romance. Her books have sold over a billion copies in the English language and a billion in translation. According to Index Translationum, she remains the most-translated individual author, having been translated into at least 103 languages.", author_image= "https://img2-azrcdn.newser.com/image/1464413-17-20230327054105-potentially-offensive-language-removed-agatha-christie-novels.jpeg"),
        Author(full_name="Mary Shelley", biography=" Mary Wollstonecraft Shelley was an English novelist who wrote the Gothic novel Frankenstein; or, The Modern Prometheus, which is considered an early example of science fiction and one of her best-known works. She also edited and promoted the works of her husband, the Romantic poet and philosopher Percy Bysshe Shelley.", author_image= " https://images.csmonitor.com/csm/2014/01/mshelley.jpg?alias=standard_900x600 "),
        Author(full_name="Neal Stephenson", biography="Neal Stephenson is the author of Reamde, Anathem, and the three-volume historical epic the Baroque Cycle (Quicksilver, The Confusion, and The System of the World), as well as Cryptonomicon, The Diamond Age, Snow Crash, and Zodiac. He lives in Seattle, Washington.", author_image= "https://media.vanityfair.com/photos/5943ff3ee9423741a1f17778/master/w_1440,h_960,c_limit/NealStephenson%20ap_credit%20Brady%20Hall.jpg"),

        Author(full_name="Sandle Brandleman", biography="Sandle Brandleman was born in a small town in rural Kansas, but always dreamed of bigger things. After studying English at university, she moved to New York City and began her career as a writer. Her debut novel, a sweeping family drama set in the American Midwest, was a critically acclaimed bestseller.", author_image= "https://i.guim.co.uk/img/static/sys-images/Observer/Pix/pictures/2012/4/6/1333729976221/michael-sandel-008.jpg?width=465&quality=85&dpr=1&s=none")

        ] 
    # authors = [
    #     Author(full_name="Brandon Sanderson", biography="Brandon Sanderson was born in 1975 in Lincoln, Nebraska. As a child, Brandon enjoyed reading, but he lost interest in the types of titles often suggested to him, and by junior high, he never cracked a book if he could help it. This changed when an eighth-grade teacher gave him Dragonsbane by Barbara Hambly.", author_image= " https://images.gr-assets.com/authors/1394044556p5/38550.jpg"),
    #     Author(full_name="James Patterson", biography=" James Patterson is the worlds bestselling author. Among his creations are Alex Cross, the Womens Murder Club, Michael Bennett, and Maximum Ride. His #1 bestselling nonfiction includes Walk in My Combat Boots, Filthy Rich, and his autobiography, James Patterson by James Patterson. He has collaborated on novels with Bill Clinton and Dolly Parton and has won an Edgar Award, nine Emmy Awards, and the National Humanities Medal.", author_image= "https://images.gr-assets.com/authors/1468347205p5/3780.jpg"),
    #     Author(full_name="Ruth Benedict", biography="Ruth Fulton Benedict (June 5, 1887 - September 17, 1948) was an American anthropologist and folklorist. She was born in New York City, attended Vassar College, and graduated in 1909. She entered graduate studies at Columbia University in 1919, where she studied under Franz Boas. She received her Ph.D and joined the faculty in 1923. Margaret Mead, with whom she may have shared a romantic relationship, and Marvin Opler were among her students and colleagues.", author_image= " https://images.gr-assets.com/authors/1416068684p5/59866.jpg"),
    #     Author(full_name="bell Hooks", biography="bell hooks (born Gloria Jean Watkins) was an African-American author, feminist, and social activist. Her writing focused on the interconnectivity of race, class, and gender and their ability to produce and perpetuate systems of oppression and domination. She published over thirty books and numerous scholarly and mainstream articles, appeared in several documentary films, and participated in various public perspective, she addressed race, class, and gender in education, art, history, sexuality, mass media and feminism. ", author_image= "https://images.gr-assets.com/authors/1661989440p5/10697.jpg"),
    #     Author(full_name="Laura Purcell", biography="Laura Purcell is a former bookseller and lives in Colchester with her husband and pet guinea pigs. Her first novel for Raven Books THE SILENT COMPANIONS won the WHSmith Thumping Good Read Award 2018 and featured in both the Zoe Ball and Radio 2 Book Clubs. Other Gothic novels include THE CORSET (THE POISON THREAD in USA), BONE CHINA and THE SHAPE OF DARKNESS (2020). Laura’s historical fiction about the Hanoverian monarchs, QUEEN OF BEDLAM and MISTRESS OF THE COURT, was published by Myrmidon.", author_image= "https://images.gr-assets.com/authors/1559646503p5/6550658.jpg"),
    #     Author(full_name="Action Bronson", biography="Ariyan Arslani, better known by the stage name Action Bronson, is an American rapper, reality television star, author, and talk show host. In August 2012, he signed to Warner Bros. Records, but was later moved to Atlantic Records' imprint, Vice Records. ", author_image= "https://images.gr-assets.com/authors/1619038754p5/16430298.jpg "),
    #     Author(full_name="Mark Twain", biography=" Samuel Langhorne Clemens, better known by his pen name Mark Twain, was an American author and humorist. He is noted for his novels Adventures of Huckleberry Finn (1885), called the Great American Novel, and The Adventures of Tom Sawyer (1876).Twain grew up in Hannibal, Missouri, which would later provide the setting for Huckleberry Finn and Tom Sawyer. He apprenticed with a printer. He also worked as a typesetter and contributed articles to his older brother Orion's newspaper. After toiling as a printer in various cities, he became a master riverboat pilot on the Mississippi River, before heading west to join Orion. He was a failure at gold mining, so he next turned to journalism.", author_image= "https://images.gr-assets.com/authors/1322103868p5/1244.jpg"),
    #     Author(full_name="Brent Weeks", biography=" In a small-town Montana school at age 12, Brent Weeks met the two great loves of his life. Edgar Allan Poe introduced him to the power of literature to transcend time and death and loneliness. Fate introduced him to The Girl, Kristi Barnes. He began his pursuit of each immediately. The novel was a failure. The Girl shot him down. Since then–skipping the boring parts–Brent has written eight best-selling novels with the Night Angel Trilogy and the Lightbringer Series, won several industry awards, and sold a few million books. Brent and his wife Kristi live in Oregon with their two daughters. (Yeah, he married The Girl.)", author_image= "https://images.gr-assets.com/authors/1583875279p5/1370283.jpg"),
    #     Author(full_name="Andrew Loomis", biography="William Andrew Loomis was an American illustrator, author, and art instructor.", author_image= "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQXKOOOqbOOUzPU7SQUjKaIK-Cz5faXkpD2bx-St7NHaayYVfq"),
    #     Author(full_name="Colleen Hoover", biography="Colleen Hoover is an American author who primarily writes novels in the romance and young adult fiction genres. She is best known for her 2016 romance novel, It Ends with Us. Many of her works were self-published, before being picked up by a publishing house.", author_image= "https://images.gr-assets.com/authors/1464032240p5/5430144.jpg"),
    #     Author(full_name="Chris Bohjalian", biography="Chris Bohjalian is the #1 New York Times bestselling author of 24 books. His work has been translated into 35 languages and become three movies and an Emmy-nominated TV series.His new novel, THE LIONESS, roars May 10, and is already in development for a limited TV series. A luxurious African safari turns deadly for a Hollywood star and her entourage in this riveting historical thriller, about which the New York Times wrote in its spring preview", author_image= "https://images.gr-assets.com/authors/1628721308p5/19992417.jpg"),
    #     Author(full_name="Chuck Tingle", biography="Dr. Chuck Tingle is an erotic author and Tae Kwon Do grandmaster (almost black belt) from Billings, Montana. After receiving his PhD at DeVry University in holistic massage, Chuck found himself fascinated by all things sensual, leading to his creation of the `tingler`, a story so blissfully erotic that it cannot be experienced without eliciting a sharp tingle down the spine.", author_image= " https://images.gr-assets.com/authors/1670440575p5/10788353.jpg"),
    #     Author(full_name="Blanka Lipińska", biography="Blanka Lipińska is a Polish author best known for her erotic trilogy beginning with 365 Dni. The first and second novels were adapted into the 2020 and 2022 films for which she co-wrote the screenplay and in which she has a cameo.", author_image= "https://www.thebigthrill.org/wp-content/uploads/2021/11/blanka-feat.jpg"),
    #     Author(full_name="Khaled Hosseini", biography="Hosseini was born in Kabul, Afghanistan, in 1965. In 1970 Hosseini and his family moved to Iran where his father worked for the Embassy of Afghanistan in Tehran. In 1973 Hosseini's family returned to Kabul, and Hosseini's youngest brother was born in July of that year. In 1976, when Hosseini was 11 years old, Hosseini's father obtained a job in Paris, France, and moved the family there. They were unable to return to Afghanistan because of the Saur Revolution in which the PDPA communist party seized power through a bloody coup in April 1978. Instead, a year after the Soviet invasion of Afghanistan, in 1980 they sought political asylum in the United States and made their residence in San Jose, California.", author_image= " https://images.gr-assets.com/authors/1359753468p5/569.jpg"),
    #     Author(full_name="Chimamanda Ngozi Adichie", biography="Chimamanda Ngozi Adichie grew up in Nigeria.Her work has been translated into over thirty languages and has appeared in various publications, including The New Yorker, Granta, The O. Henry Prize Stories, the Financial Times, and Zoetrope. She is the author of the novels Purple Hibiscus, which won the Commonwealth Writers’ Prize and the Hurston/Wright Legacy Award; Half of a Yellow Sun, which won the Orange Prize and was a National Book Critics Circle Award Finalist and a New York Times Notable Book; and Americanah, which won the National Book Critics Circle Award and was named one of The New York Times Top Ten Best Books of 2013. Ms. Adichie is also the author of the story collection The Thing Around Your Neck.", author_image= "https://images.gr-assets.com/authors/1628721308p5/19992417.jpg"),
    #     Author(full_name="Lucy Maud Montgomery", biography="Lucy Maud Montgomery was a Canadian author, best known for a series of novels beginning with Anne of Green Gables, published in 1908.Montgomery was born at Clifton, Prince Edward Island, Nov. 30, 1874. She came to live at Leaskdale, north of Uxbridge Ontario, after her wedding with Rev. Ewen Macdonald on July 11, 1911. She had three children and wrote close to a dozen books while she was living in the Leaskdale Manse before the family moved to Norval, Ontario in 1926. She died in Toronto April 24, 1942 and was buried at Cavendish, Prince Edward Island.", author_image= "https://images.gr-assets.com/authors/1188896723p5/5350.jpg"),
    #     Author(full_name="Hanya Yanagihara", biography="Hanya Yanagihara is an American novelist, editor, and travel writer. She grew up in Hawaii. She is best known for her bestselling novel A Little Life, which was shortlisted for the 2015 Booker Prize, and for being the editor-in-chief of T Magazine.", author_image= "https://images.gr-assets.com/authors/1421881815p5/6571447.jpg"),
    #     Author(full_name="Toshikazu Kawaguchi", biography="Toshikazu Kawaguchi  was born in Osaka, Japan, in 1971. He formerly produced, directed and wrote for the theatrical group Sonic Snail. As a playwright, his works include COUPLE, Sunset Song, and Family Time. The novel Before the Coffee Gets Cold is adapted from a 1110 Productions play by Kawaguchi, which won the 10th Suginami Drama Festival grand prize.", author_image= "https://cdn-japantimes.com/wp-content/uploads/2019/09/p18-gattig-coldcoffee-a-20190929-e1569651883696.jpg"),
    #     Author(full_name="Susan Hill", biography="Susan Hill was born in Scarborough, North Yorkshire in 1942. Her hometown was later referred to in her novel A Change for the Better (1969) and some short stories especially Cockles and Mussels .She attended Scarborough Convent School, where she became interested in theatre and literature. Her family left Scarborough in 1958 and moved to Coventry where her father worked in car and aircraft factories. Hill states that she attended a girls’ grammar school, Barr's Hill. Her fellow pupils included Jennifer Page, the first Chief Executive of the Millennium Dome. At Barrs Hill she took A levels in English, French, History and Latin, proceeding to an English degree at King's College London.", author_image= "https://images.gr-assets.com/authors/1337917448p5/18874.jpg"),
    #     Author(full_name="Agatha Christie", biography="Dame Agatha Mary Clarissa Christie is the best-selling author of all time. She wrote 66 crime novels and story collections, fourteen plays, and six novels under a pseudonym in Romance. Her books have sold over a billion copies in the English language and a billion in translation. According to Index Translationum, she remains the most-translated individual author, having been translated into at least 103 languages.", author_image= "https://hips.hearstapps.com/hmg-prod/images/gettyimages-517399194.jpg"),
    #     Author(full_name="Mary Shelley", biography=" Mary Wollstonecraft Shelley was an English novelist who wrote the Gothic novel Frankenstein; or, The Modern Prometheus, which is considered an early example of science fiction and one of her best-known works. She also edited and promoted the works of her husband, the Romantic poet and philosopher Percy Bysshe Shelley.", author_image= " https://images.csmonitor.com/csm/2014/01/mshelley.jpg?alias=standard_900x600 "),
    #     Author(full_name="Neal Stephenson", biography="Neal Stephenson is the author of Reamde, Anathem, and the three-volume historical epic the Baroque Cycle (Quicksilver, The Confusion, and The System of the World), as well as Cryptonomicon, The Diamond Age, Snow Crash, and Zodiac. He lives in Seattle, Washington.", author_image= "https://media.vanityfair.com/photos/5943ff3ee9423741a1f17778/master/w_1440,h_960,c_limit/NealStephenson%20ap_credit%20Brady%20Hall.jpg"),
    #     Author(full_name="Sandle Brandleman", biography="Sandle Brandleman was born in a small town in rural Kansas, but always dreamed of bigger things. After studying English at university, she moved to New York City and began her career as a writer. Her debut novel, a sweeping family drama set in the American Midwest, was a critically acclaimed bestseller.", author_image= "https://i.guim.co.uk/img/static/sys-images/Observer/Pix/pictures/2012/4/6/1333729976221/michael-sandel-008.jpg?width=465&quality=85&dpr=1&s=none")

    #     ]   


    # author_obj = [4]

    # for i in range(len(authors)):
    # # for i in range(10):
    
    #     author = Author(
    #         full_name= authors[i],
    #         biography= fake.text()
    #     )

    #     author_obj.append(author)


    
    db.session.add_all(authors)
    db.session.commit()


#author id= 
#biography= 

def make_book():
    
    Book.query.delete()
    # Book.query.filter_by(id=).first()
    # len(Book.query.get(1).liked_books), author_id="1"
    # Book(title="", price="", isbn="", likes="0", author_id="", genre_id="", image = "" )
    
    books_obj = [
        Book(title="The Way of Kings", price="8.88", isbn="9780765365279", likes="0", author_id="1", genre_id="9", image = "https://d3525k1ryd2155.cloudfront.net/h/014/102/1299102014.0.x.jpg"),
        Book(title="The Angel Experiment: A Maximum Ride Novel", price="4.05", isbn="9780316067959", likes="0", author_id="2", genre_id="3", image = "https://m.media-amazon.com/images/W/IMAGERENDERING_521856-T1/images/I/91Td2ZvUGzL._AC_UF1000,1000_QL80_.jpg"),
        Book(title="Ruth Benedict: Patterns of a Life", price="4.39", isbn="9780812211757", likes="0", author_id="3", genre_id="11", image = "https://m.media-amazon.com/images/W/IMAGERENDERING_521856-T1/images/I/41xRR-i323L._AC_UF1000,1000_QL80_.jpg"),
        Book(title="All About Love: New Visions", price="13.12", isbn="9780060959470", likes="0", author_id="4", genre_id="10", image = "https://m.media-amazon.com/images/W/IMAGERENDERING_521856-T1/images/I/71xEY+ZI8kL._AC_UF1000,1000_QL80_.jpg" ),
        Book(title="The House of Whispers: A Novel", price="5.05", isbn="9780143135531", likes="0", author_id="5", genre_id="5", image = "https://m.media-amazon.com/images/I/41XosKSpLSL.jpg"),
        Book(title="Fuck, That's Delicious", price="19.32", isbn="9781419726552", likes="0", author_id="6", genre_id="15", image = "http://cdn.shopify.com/s/files/1/0876/5316/products/201d8c4ef5adcc80b1d246ac33eac78e_1200x1200.jpg?v=1650720145"),
        Book(title="The Adventures of Huckleberry Finn", price="4.47", isbn="9780553210798", likes="0", author_id="7", genre_id="3", image = "https://www.freedomtoread.ca/wp-content/uploads/twain-adventures-of-huckleberry-finn.jpg"),
        Book(title="The Black Prism (Lightbringer, 1)", price="5.77", isbn="", likes="0", author_id="8", genre_id="16", image = "https://i5.walmartimages.com/asr/b6cde832-24cd-4d03-a285-670d2488950e.c6adfef5a67afcd107951faf4e52a8ef.jpeg"),
        Book(title="Fun With A Pencil: How Everybody Can Easily Learn to Draw", price="13.47", isbn="9781805472698", likes="0", author_id="9", genre_id="", image = "https://m.media-amazon.com/images/W/IMAGERENDERING_521856-T1/images/I/61Gmw2eIXYL._AC_UF1000,1000_QL80_.jpg"),
        Book(title="Verity", price="3.19", isbn="9781538724736", likes="0", author_id="10", genre_id="14", image = "https://www.colleenhoover.com/wp-content/uploads/2023/01/Screen-Shot-2023-01-25-at-1.49.58-PM.png"),
        Book(title="Miss Marple: The Complete Short Stories", price="5.19", isbn="9780425094860", likes="0", author_id="21", genre_id="7", image = "https://pictures.abebooks.com/isbn/9780399150128-us.jpg"),
        Book(title="Midwives (Oprah's Book Club)", price="3.46", isbn="9780375706776", likes="0", author_id="11", genre_id="3", image ="https://sdi2.chrislands.com/sdi/978/03/75/7/9780375706776.jpg"),
        Book(title="Space Raptor Butt Invasion", price="0.74", isbn="", likes="0", author_id="12", genre_id="9", image = "https://m.media-amazon.com/images/I/51XR3M4I5UL.jpg"),
        Book(title="365 Days", price="12.21", isbn="9781982174309", likes="0", author_id="13", genre_id="16", image = "https://d28hgpri8am2if.cloudfront.net/book_images/onix/cvr9781797124032/365-days-9781797124032_hr.jpg"),
        Book(title="A Thousand Splendid Suns", price="4.04", isbn="9781594489501", likes="0", author_id="14", genre_id="3", image= "https://pictures.abebooks.com/isbn/9781594489501-us-300.jpg"),
        Book(title="Americanah", price="4.62", isbn="9780307455925", likes="0", author_id="15", genre_id="10", image = "https://pictures.abebooks.com/isbn/9780307455925-us-300.jpg"),
        Book(title="Exo", price="3.46", isbn="9781338232035", likes="0", author_id="16", genre_id="9", image = "https://pictures.abebooks.com/isbn/9781338232035-us-300.jpg"),
        Book(title="Anne of Green Gables", price="4.38", isbn="9781613822265", likes="0", author_id="17", genre_id="3", image ="https://th.bing.com/th/id/R.0095b42e01d8ce30f8988799f6c3c56a?rik=4v9GY6Vq7GUmlw&pid=ImgRaw&r=0"),
        Book(title="A Little Life", price="12.32", isbn="9780804172707", likes="0", author_id="18", genre_id="1", image = "https://img.lareviewofbooks.org/unsafe/1280x0/filters:format(jpeg)/https%3A%2F%2Fdev.lareviewofbooks.org%2Fwp-content%2Fuploads%2F2015%2F12%2FLittle-Life.png"), 
        Book(title="Before the Coffee Gets Cold", price="7.99", isbn="9781529029581", likes="0", author_id="19", genre_id="3", image = "https://www.westonpubliclibrary.org/main/wp-content/uploads/before-coffee-gets-cold-1351x2048.jpg" ),
        Book(title="The Woman in Black: A Ghost Story", price="4.92", isbn="9780307745316", likes="0", author_id="20", genre_id="6", image = "https://pictures.abebooks.com/isbn/9780307745316-us.jpg" ),
        Book(title="The ABC Murders", price="10.86", isbn="9780007527533", likes="0", author_id="21", genre_id="7", image = "https://th.bing.com/th/id/OIP.ouY5xWd5NVtERCJHQOnnnAHaL9?w=115&h=180&c=7&r=0&o=5&dpr=2&pid=1.7"),
        Book(title="Frankenstein", price="5.99", isbn="9780486282114", likes="0", author_id="22", genre_id="9", image = "https://th.bing.com/th/id/OIP.iktnpmieggzfcHUS9zfpewHaL_?w=194&h=315&c=7&r=0&o=5&dpr=2&pid=1.7"),
        Book(title="Snow Crash", price="14.19", isbn="0553380958", likes="0", author_id="23", genre_id="9", image = "https://th.bing.com/th/id/OIP.aFTzG9X5pVYRHvJfr47Z7QHaLF?w=194&h=290&c=7&r=0&o=5&dpr=2&pid=1.7"),
        Book(title="Elden Rings: What Should Have Been", price="79.99", isbn="9780420282169", likes="0", author_id="24", genre_id="4", image = "https://media.wired.com/photos/6418c4b05842f211652a9fbf/master/pass/Sanderson-DSCF2575.jpg")
    ]

    
    # can we add the img src to the []
    
    # books_obj = []

    # for i in range(23):
    # # for i in range(10):
    
    #     book = Book(
    #         title= fake.name(),
    #         price= randint(0,999),
    #         # isbn= fake.isbn(),
    #         likes= randint(1,69),        
    #         genre_id= randint(1,9),
    #         # author_id= randint(1,23)
    #         author_id= i
    #     )

        # books_obj.append(book)
    
    db.session.add_all(books_obj)
    db.session.commit()

def make_user():
    
    User.query.delete()

    users_obj = []

    for i in range(23):
    # for i in range(10):
    
        user = User(
            password= randint(1,23) ,
            username= fake.email(),
            full_name= fake.name(),   
        )

        users_obj.append(user)
    
    db.session.add_all(users_obj)
    db.session.commit()

def make_users_books():
    
    UserBook.query.delete()

    users_books_obj = []

    for i in range(23):
    # for i in range(10):
    
        user_books = UserBook(
            # user_id = randint(1,23),
            user_id = i,
            book_id = randint(1,23)  
        )

        users_books_obj.append(user_books)
    
    db.session.add_all(users_books_obj)
    db.session.commit()

    for book in Book.query.all():
        book.likes = len(book.liked_books)
        
        db.session.add(book)
        db.session.commit()


if __name__ == '__main__':
    fake = Faker()
    with app.app_context():
        print("Starting seed...")
        # Seed code goes here!
        make_author()
        make_book()
        make_user()
        make_genre()
        make_users_books()
        book = db.session.get(Book,1)
        print(book)
        print(len(book.liked_books))
        # print(len(Book.query.get(1).liked_books))

