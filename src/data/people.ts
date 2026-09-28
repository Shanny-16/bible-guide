// Key people of the Bible in chronological order, grouped by era. Short by design.
// `image` is a Wikimedia Commons search hint used by scripts/fetch-images.mjs; the resolved file and
// credit live in src/data/images.json. First draft 2026-09-28; Sharon can edit freely.

import type { KeyPassage } from './books'

export interface Era {
  id: string
  name: string
  dates: string
}

export interface Person {
  slug: string
  name: string
  era: string
  dates: string
  tagline: string
  summary: string
  passages: KeyPassage[]
  books: string[]
  /** Search hint for a public-domain image (Gustave Doré engravings preferred). */
  image: string
}

const p = (book: string, spec: string): KeyPassage => ({ label: `${book} ${spec}`, ref: `${book} ${spec}` })

export const PEOPLE_ERAS: Era[] = [
  { id: 'beginnings', name: 'Beginnings', dates: 'Before recorded history' },
  { id: 'patriarchs', name: 'The patriarchs', dates: 'c. 2000-1700 BC' },
  { id: 'exodus', name: 'Exodus and wilderness', dates: 'c. 15th-13th century BC' },
  { id: 'judges', name: 'Judges and early Israel', dates: 'c. 1200-1050 BC' },
  { id: 'kingdom', name: 'The united kingdom', dates: 'c. 1050-930 BC' },
  { id: 'prophets', name: 'Divided kingdom and the prophets', dates: 'c. 930-586 BC' },
  { id: 'exile', name: 'Exile and return', dates: '586-430 BC' },
  { id: 'jesus', name: 'Jesus and the Gospels', dates: 'c. 5 BC-AD 33' },
  { id: 'church', name: 'The early church', dates: 'AD 30-100' },
]

export const PEOPLE: Person[] = [
  // ---------- Beginnings ----------
  {
    slug: 'adam-and-eve', name: 'Adam and Eve', era: 'beginnings', dates: 'Creation',
    tagline: 'The first humans',
    summary: "Made in God's image and placed in a garden, they chose their own way over God's word and lost Eden. Their story explains why the world is both beautiful and broken, and it contains the first promise of a rescuer (Genesis 3:15).",
    passages: [p('Genesis', '2'), p('Genesis', '3')], books: ['genesis', 'romans'],
    image: 'Gustave Doré Adam and Eve driven out of Eden',
  },
  {
    slug: 'noah', name: 'Noah', era: 'beginnings', dates: 'Before Abraham',
    tagline: 'Built the ark',
    summary: 'A righteous man in a violent world, Noah obeyed God by building a huge boat long before the rain came. After the flood God made a covenant with him and every living creature, signed with a rainbow.',
    passages: [p('Genesis', '6'), p('Genesis', '8-9')], books: ['genesis', 'hebrews', '1-peter'],
    image: 'Gustave Doré The Deluge Noah ark',
  },

  // ---------- Patriarchs ----------
  {
    slug: 'abraham', name: 'Abraham', era: 'patriarchs', dates: 'c. 2000 BC',
    tagline: 'Father of the faithful',
    summary: 'Called to leave Ur and go to a land he had never seen, Abraham believed God’s promise of land, descendants, and blessing for all nations. He waited 25 years for a son and was even willing to give him back. Jews, Christians, and Muslims all look to him.',
    passages: [p('Genesis', '12'), p('Genesis', '15'), p('Genesis', '22')], books: ['genesis', 'romans', 'hebrews'],
    image: 'Gustave Doré Abraham',
  },
  {
    slug: 'sarah', name: 'Sarah', era: 'patriarchs', dates: 'c. 2000 BC',
    tagline: 'Laughed, then bore Isaac',
    summary: 'Beautiful, childless, and ninety years old, Sarah laughed when God said she would have a son. She named the boy Isaac, "he laughs". Peter and Hebrews hold her up as a woman of faith.',
    passages: [p('Genesis', '18'), p('Genesis', '21')], books: ['genesis', 'hebrews', '1-peter'],
    image: 'Gustave Doré Abraham and the three angels',
  },
  {
    slug: 'isaac', name: 'Isaac', era: 'patriarchs', dates: 'c. 1900 BC',
    tagline: 'The son of promise',
    summary: 'The long-awaited child, Isaac was bound on an altar on Mount Moriah before God provided a ram in his place. He married Rebekah, dug his father’s wells again, and passed the blessing to Jacob, though not the son he intended.',
    passages: [p('Genesis', '22'), p('Genesis', '24'), p('Genesis', '27')], books: ['genesis'],
    image: 'Gustave Doré The Trial of the Faith of Abraham Isaac',
  },
  {
    slug: 'rebekah', name: 'Rebekah', era: 'patriarchs', dates: 'c. 1900 BC',
    tagline: 'Isaac’s wife, mother of twins',
    summary: 'Found at a well watering a stranger’s camels, Rebekah left home to marry a man she had never met. Told before their birth that the older twin would serve the younger, she later engineered the blessing for Jacob.',
    passages: [p('Genesis', '24'), p('Genesis', '25')], books: ['genesis'],
    image: 'Gustave Doré Eliezer and Rebekah',
  },
  {
    slug: 'jacob', name: 'Jacob (Israel)', era: 'patriarchs', dates: 'c. 1850 BC',
    tagline: 'The wrestler renamed Israel',
    summary: 'A grasping younger twin who cheated his brother and was cheated by his uncle, Jacob met God at Bethel and wrestled with him at the Jabbok, coming away limping and renamed. His twelve sons became the tribes of Israel.',
    passages: [p('Genesis', '28'), p('Genesis', '32')], books: ['genesis', 'hosea'],
    image: 'Gustave Doré Jacob wrestling with the angel',
  },
  {
    slug: 'joseph', name: 'Joseph', era: 'patriarchs', dates: 'c. 1800 BC',
    tagline: 'From the pit to Pharaoh’s court',
    summary: 'Sold by his jealous brothers, falsely imprisoned, then raised to rule Egypt, Joseph saved the region from famine and forgave the brothers who had betrayed him. "You intended to harm me, but God intended it for good."',
    passages: [p('Genesis', '37'), p('Genesis', '45'), p('Genesis', '50')], books: ['genesis'],
    image: 'Gustave Doré Joseph makes himself known to his brethren',
  },
  {
    slug: 'job', name: 'Job', era: 'patriarchs', dates: 'Traditionally the patriarchal era',
    tagline: 'Suffered and still trusted',
    summary: 'A wealthy, upright man from the land of Uz who lost his children, his health, and his wealth in a single season. He argued with his friends and with God, and was finally answered from the storm. God restored him and called his honest speech true.',
    passages: [p('Job', '1'), p('Job', '19'), p('Job', '42')], books: ['job', 'james'],
    image: 'Gustave Doré Job and his friends',
  },

  // ---------- Exodus ----------
  {
    slug: 'moses', name: 'Moses', era: 'exodus', dates: 'c. 15th-13th century BC',
    tagline: 'Led Israel out of Egypt',
    summary: 'Rescued from the Nile as a baby and raised in Pharaoh’s palace, Moses fled to the desert for forty years before God called him from a burning bush. He confronted Pharaoh, led Israel through the sea, received the Law at Sinai, and spoke with God "face to face".',
    passages: [p('Exodus', '3'), p('Exodus', '14'), p('Deuteronomy', '34')], books: ['exodus', 'numbers', 'deuteronomy', 'hebrews'],
    image: 'Gustave Doré Moses breaking the tables of the law',
  },
  {
    slug: 'aaron', name: 'Aaron', era: 'exodus', dates: 'c. 15th-13th century BC',
    tagline: 'First high priest',
    summary: 'Moses’ older brother and spokesman, Aaron became Israel’s first high priest. He also made the golden calf while Moses was on the mountain, a reminder that even priests need atonement.',
    passages: [p('Exodus', '28'), p('Exodus', '32'), p('Numbers', '17')], books: ['exodus', 'leviticus', 'numbers'],
    image: 'Gustave Doré Aaron',
  },
  {
    slug: 'miriam', name: 'Miriam', era: 'exodus', dates: 'c. 15th-13th century BC',
    tagline: 'Prophetess who led the song',
    summary: 'As a girl she watched over her baby brother in the reeds; as a woman she led Israel in song after the sea parted. Micah names her alongside Moses and Aaron as a leader God sent.',
    passages: [p('Exodus', '2'), p('Exodus', '15'), p('Numbers', '12')], books: ['exodus', 'numbers'],
    image: 'Gustave Doré Miriam song of the Israelites',
  },
  {
    slug: 'joshua', name: 'Joshua', era: 'exodus', dates: 'c. 14th-12th century BC',
    tagline: 'Led Israel into the land',
    summary: 'Moses’ aide and one of the two faithful spies, Joshua took over after Moses died and led Israel across the Jordan and into Canaan. His farewell challenge still rings: "As for me and my household, we will serve the LORD."',
    passages: [p('Joshua', '1'), p('Joshua', '6'), p('Joshua', '24')], books: ['joshua', 'numbers'],
    image: 'Gustave Doré Joshua commanding the sun to stand still',
  },
  {
    slug: 'caleb', name: 'Caleb', era: 'exodus', dates: 'c. 14th-12th century BC',
    tagline: 'Wholehearted at 85',
    summary: 'One of the twelve spies, Caleb said "we can certainly do it" when ten others panicked. Forty-five years later he asked for the hill country full of giants and took it. The Bible says he "followed the LORD wholeheartedly".',
    passages: [p('Numbers', '13-14'), p('Joshua', '14')], books: ['numbers', 'joshua'],
    image: 'Gustave Doré The return of the spies from the land of promise',
  },

  // ---------- Judges ----------
  {
    slug: 'deborah', name: 'Deborah', era: 'judges', dates: 'c. 12th century BC',
    tagline: 'Prophetess and judge',
    summary: 'Israel came to Deborah under her palm tree for judgment. She summoned Barak to fight the Canaanite general Sisera, went with him when he would not go alone, and sang one of the oldest songs in the Bible.',
    passages: [p('Judges', '4'), p('Judges', '5')], books: ['judges'],
    image: 'Gustave Doré Deborah',
  },
  {
    slug: 'gideon', name: 'Gideon', era: 'judges', dates: 'c. 12th century BC',
    tagline: 'Mighty warrior, hiding in a winepress',
    summary: 'Threshing wheat in secret when an angel called him a mighty warrior, Gideon tested God with a fleece, then watched God cut his army from 32,000 to 300 so no one could boast. Trumpets, jars, and torches won the night.',
    passages: [p('Judges', '6'), p('Judges', '7')], books: ['judges', 'hebrews'],
    image: 'Gustave Doré Gideon',
  },
  {
    slug: 'ruth', name: 'Ruth', era: 'judges', dates: 'c. 1100 BC',
    tagline: 'Loyal foreigner, David’s great-grandmother',
    summary: 'A widow from Moab who refused to leave her mother-in-law Naomi, Ruth gleaned in a stranger’s field and found in Boaz a kinsman-redeemer. Her son Obed was the grandfather of King David.',
    passages: [p('Ruth', '1'), p('Ruth', '4')], books: ['ruth', 'matthew'],
    image: 'Gustave Doré Ruth and Boaz',
  },
  {
    slug: 'samson', name: 'Samson', era: 'judges', dates: 'c. 11th century BC',
    tagline: 'Strength without self-control',
    summary: 'Set apart from birth as a Nazirite, Samson had the strength to kill a lion bare-handed but not to resist Delilah. Blinded and chained in a Philistine temple, he prayed once more and brought the house down.',
    passages: [p('Judges', '13'), p('Judges', '16')], books: ['judges', 'hebrews'],
    image: 'Gustave Doré Samson destroys the temple',
  },
  {
    slug: 'samuel', name: 'Samuel', era: 'judges', dates: 'c. 1100-1010 BC',
    tagline: 'Last judge, first kingmaker',
    summary: 'Given to God by his mother Hannah before he was born, Samuel heard God’s voice as a boy in the tabernacle. He judged Israel for decades and anointed both Saul and David, warning the people what a king would cost them.',
    passages: [p('1 Samuel', '3'), p('1 Samuel', '8'), p('1 Samuel', '16')], books: ['1-samuel'],
    image: 'Gustave Doré Samuel',
  },

  // ---------- United kingdom ----------
  {
    slug: 'saul', name: 'Saul', era: 'kingdom', dates: 'c. 1050-1010 BC',
    tagline: 'Israel’s first king',
    summary: 'Tall, handsome, and reluctant, Saul started well and ended badly: impatient sacrifices, half-obedience, jealousy of David, and a night visit to a medium. He died on Mount Gilboa fighting the Philistines.',
    passages: [p('1 Samuel', '10'), p('1 Samuel', '15'), p('1 Samuel', '31')], books: ['1-samuel'],
    image: 'Gustave Doré Saul and the witch of Endor',
  },
  {
    slug: 'david', name: 'David', era: 'kingdom', dates: 'c. 1010-970 BC',
    tagline: 'Shepherd, poet, king',
    summary: 'The youngest son, anointed while tending sheep, David killed Goliath, survived years as a fugitive, and united Israel with Jerusalem as its capital. He wrote many psalms, sinned terribly with Bathsheba, and received God’s promise of an everlasting throne.',
    passages: [p('1 Samuel', '17'), p('2 Samuel', '7'), p('Psalms', '51')], books: ['1-samuel', '2-samuel', 'psalms', '1-chronicles'],
    image: 'Gustave Doré David and Goliath',
  },
  {
    slug: 'solomon', name: 'Solomon', era: 'kingdom', dates: 'c. 970-930 BC',
    tagline: 'Wisest king, divided heart',
    summary: 'David’s son asked God for wisdom and received wealth and fame too. He built the temple, wrote proverbs and songs, and hosted the Queen of Sheba. But his hundreds of foreign wives turned his heart, and the kingdom split after his death.',
    passages: [p('1 Kings', '3'), p('1 Kings', '8'), p('1 Kings', '11')], books: ['1-kings', 'proverbs', 'ecclesiastes', 'song-of-songs'],
    image: 'Gustave Doré The judgment of Solomon',
  },

  // ---------- Divided kingdom & prophets ----------
  {
    slug: 'elijah', name: 'Elijah', era: 'prophets', dates: 'c. 870-850 BC',
    tagline: 'Prophet of fire',
    summary: 'Elijah announced a drought to King Ahab, was fed by ravens, raised a widow’s son, and called down fire on Mount Carmel. Exhausted, he heard God in a gentle whisper, and at the end he was carried to heaven in a whirlwind.',
    passages: [p('1 Kings', '17'), p('1 Kings', '18'), p('1 Kings', '19')], books: ['1-kings', '2-kings', 'james'],
    image: 'Gustave Doré Elijah',
  },
  {
    slug: 'elisha', name: 'Elisha', era: 'prophets', dates: 'c. 850-800 BC',
    tagline: 'Elijah’s successor',
    summary: 'Asking for a double portion of Elijah’s spirit, Elisha spent fifty years working quiet miracles: oil that would not run out, a healed Syrian general, an iron axe head that floated, a boy raised from death.',
    passages: [p('2 Kings', '2'), p('2 Kings', '4'), p('2 Kings', '5')], books: ['2-kings'],
    image: 'Gustave Doré Elisha',
  },
  {
    slug: 'jonah', name: 'Jonah', era: 'prophets', dates: 'c. 780 BC',
    tagline: 'Ran from God, then sulked',
    summary: 'Sent to Nineveh, capital of Israel’s enemy Assyria, Jonah sailed the opposite way, was thrown overboard, and spent three days inside a great fish. Nineveh repented and Jonah was furious. Jesus pointed to him as a sign.',
    passages: [p('Jonah', '1'), p('Jonah', '4')], books: ['jonah', 'matthew'],
    image: 'Gustave Doré Jonah cast forth by the whale',
  },
  {
    slug: 'amos', name: 'Amos', era: 'prophets', dates: 'c. 760 BC',
    tagline: 'Shepherd who preached justice',
    summary: 'A herdsman from the south, Amos went north to wealthy Israel and told them their worship was noise while the poor were sold for sandals. "Let justice roll on like a river."',
    passages: [p('Amos', '5'), p('Amos', '7')], books: ['amos'],
    image: 'Gustave Doré Amos',
  },
  {
    slug: 'hosea', name: 'Hosea', era: 'prophets', dates: 'c. 750-715 BC',
    tagline: 'Married an unfaithful wife',
    summary: 'God told Hosea to marry Gomer, who left him, and then to buy her back. His broken marriage became a picture of God’s love for an unfaithful Israel: judgment, and then "I will heal their waywardness and love them freely."',
    passages: [p('Hosea', '1'), p('Hosea', '3'), p('Hosea', '11')], books: ['hosea'],
    image: 'Gustave Doré Hosea',
  },
  {
    slug: 'isaiah', name: 'Isaiah', era: 'prophets', dates: 'c. 740-680 BC',
    tagline: 'Saw the Lord, spoke of the Servant',
    summary: 'Called in the year King Uzziah died, Isaiah advised kings through the Assyrian crisis and gave the Bible some of its greatest promises: a child called Immanuel, a suffering servant, a new heaven and earth.',
    passages: [p('Isaiah', '6'), p('Isaiah', '9'), p('Isaiah', '53')], books: ['isaiah', '2-kings'],
    image: 'Gustave Doré Isaiah',
  },
  {
    slug: 'hezekiah', name: 'Hezekiah', era: 'prophets', dates: 'c. 715-686 BC',
    tagline: 'Prayed and Jerusalem was spared',
    summary: 'A reforming king of Judah who tore down idols and trusted God when Assyria surrounded Jerusalem. He spread the enemy’s letter before the LORD in the temple, and 185,000 soldiers died in a night. His tunnel still carries water in Jerusalem.',
    passages: [p('2 Kings', '19'), p('2 Kings', '20')], books: ['2-kings', '2-chronicles', 'isaiah'],
    image: 'Gustave Doré Hezekiah',
  },
  {
    slug: 'josiah', name: 'Josiah', era: 'prophets', dates: '640-609 BC',
    tagline: 'The boy king who found the Law',
    summary: 'King at eight, Josiah began seeking God as a teenager. When the Book of the Law was found during temple repairs, he tore his robes, gathered the nation, and renewed the covenant. He died young in battle at Megiddo.',
    passages: [p('2 Kings', '22'), p('2 Kings', '23')], books: ['2-kings', '2-chronicles', 'zephaniah'],
    image: 'Gustave Doré Josiah',
  },
  {
    slug: 'jeremiah', name: 'Jeremiah', era: 'prophets', dates: 'c. 627-580 BC',
    tagline: 'The weeping prophet',
    summary: 'Called as a youth, Jeremiah preached for forty years to a Jerusalem that would not listen, was beaten, imprisoned, and dropped into a cistern, and watched the city burn. He also promised a new covenant written on hearts.',
    passages: [p('Jeremiah', '1'), p('Jeremiah', '29'), p('Jeremiah', '31')], books: ['jeremiah', 'lamentations'],
    image: 'Gustave Doré Jeremiah',
  },

  // ---------- Exile & return ----------
  {
    slug: 'ezekiel', name: 'Ezekiel', era: 'exile', dates: 'c. 593-571 BC',
    tagline: 'Prophet among the exiles',
    summary: 'Deported to Babylon, the priest Ezekiel saw God’s throne on wheels by the Kebar River and acted out strange sermons for his fellow exiles. His vision of dry bones coming to life is one of the Bible’s great pictures of hope.',
    passages: [p('Ezekiel', '1'), p('Ezekiel', '37')], books: ['ezekiel'],
    image: 'Gustave Doré The vision of the valley of dry bones',
  },
  {
    slug: 'daniel', name: 'Daniel', era: 'exile', dates: 'c. 605-535 BC',
    tagline: 'Faithful in Babylon',
    summary: 'Taken to Babylon as a teenager, Daniel refused the king’s food, interpreted dreams, survived the lions’ den, and served four kings without compromising. His visions look ahead to kingdoms rising and falling and a Son of Man receiving an everlasting one.',
    passages: [p('Daniel', '1'), p('Daniel', '6'), p('Daniel', '7')], books: ['daniel'],
    image: 'Gustave Doré Daniel in the den of lions',
  },
  {
    slug: 'esther', name: 'Esther', era: 'exile', dates: 'c. 480 BC',
    tagline: 'Queen for such a time as this',
    summary: 'A Jewish orphan who became queen of Persia, Esther risked her life by going to the king uninvited to expose Haman’s plot against her people. The festival of Purim still celebrates the reversal.',
    passages: [p('Esther', '4'), p('Esther', '7')], books: ['esther'],
    image: 'Gustave Doré Esther before the king',
  },
  {
    slug: 'ezra', name: 'Ezra', era: 'exile', dates: 'c. 458 BC',
    tagline: 'Scribe devoted to the Law',
    summary: 'A priest and scholar who led a second group of exiles home, Ezra "devoted himself to the study and observance of the Law of the LORD, and to teaching it". He read the Law aloud to the whole city and called the people back to faithfulness.',
    passages: [p('Ezra', '7'), p('Nehemiah', '8')], books: ['ezra', 'nehemiah'],
    image: 'Gustave Doré Ezra reads the law',
  },
  {
    slug: 'nehemiah', name: 'Nehemiah', era: 'exile', dates: 'c. 445 BC',
    tagline: 'Rebuilt the walls in 52 days',
    summary: 'The Persian king’s cupbearer wept over Jerusalem’s broken walls, prayed for months, and asked leave to rebuild them. Facing mockery and threats, he organized the whole city to build with a trowel in one hand and a sword in the other.',
    passages: [p('Nehemiah', '1'), p('Nehemiah', '4'), p('Nehemiah', '6')], books: ['nehemiah'],
    image: 'Gustave Doré Nehemiah rebuilding walls of Jerusalem',
  },

  // ---------- Jesus & the Gospels ----------
  {
    slug: 'mary', name: 'Mary, mother of Jesus', era: 'jesus', dates: 'c. 5 BC-AD 33',
    tagline: '"May it be to me as you have said"',
    summary: 'A young woman from Nazareth who said yes to the angel, sang the Magnificat, gave birth in Bethlehem, and stood at the foot of the cross. She was with the disciples praying when the Spirit came at Pentecost.',
    passages: [p('Luke', '1'), p('Luke', '2'), p('John', '19')], books: ['luke', 'matthew', 'john', 'acts'],
    image: 'Gustave Doré The Annunciation',
  },
  {
    slug: 'john-the-baptist', name: 'John the Baptist', era: 'jesus', dates: 'c. AD 27-29',
    tagline: 'Prepared the way',
    summary: 'A wilderness preacher in camel hair who called Israel to repent and baptized in the Jordan, John pointed to Jesus as "the Lamb of God". Herod beheaded him for speaking the truth. Jesus said no one born of women was greater.',
    passages: [p('Matthew', '3'), p('John', '1'), p('Mark', '6')], books: ['matthew', 'mark', 'luke', 'john'],
    image: 'Gustave Doré John the Baptist preaching in the wilderness',
  },
  {
    slug: 'jesus', name: 'Jesus', era: 'jesus', dates: 'c. 5 BC-AD 30/33',
    tagline: 'The Messiah, Son of God',
    summary: 'Born in Bethlehem, raised in Nazareth, Jesus taught, healed, and welcomed outsiders for about three years, was crucified in Jerusalem under Pontius Pilate, and rose on the third day. The whole Bible points to him; the New Testament tells his story and what it means.',
    passages: [p('John', '1'), p('Mark', '8'), p('Luke', '24')], books: ['matthew', 'mark', 'luke', 'john', 'hebrews'],
    image: 'Gustave Doré Jesus sermon on the mount',
  },
  {
    slug: 'peter', name: 'Peter', era: 'jesus', dates: 'd. c. AD 64-68',
    tagline: 'Fisherman, rock, denier, shepherd',
    summary: 'Simon the fisherman was renamed "Rock" by Jesus, walked on water briefly, confessed Jesus as Messiah, and denied him three times in one night. Restored by the lake, he preached at Pentecost and led the church in Jerusalem. Tradition says he died in Rome.',
    passages: [p('Matthew', '16'), p('John', '21'), p('Acts', '2')], books: ['matthew', 'john', 'acts', '1-peter', '2-peter'],
    image: 'Gustave Doré Peter walking on water',
  },
  {
    slug: 'john', name: 'John', era: 'jesus', dates: 'd. c. AD 100',
    tagline: 'The disciple Jesus loved',
    summary: 'A fisherman and one of the inner three with Peter and James, John stood at the cross and took Mary into his home. Tradition credits him with the fourth Gospel, three letters, and Revelation, written as an old man on Patmos.',
    passages: [p('John', '13'), p('John', '19'), p('Revelation', '1')], books: ['john', '1-john', '2-john', '3-john', 'revelation'],
    image: 'Gustave Doré Saint John on Patmos',
  },
  {
    slug: 'mary-magdalene', name: 'Mary Magdalene', era: 'jesus', dates: 'c. AD 30',
    tagline: 'First to see the risen Jesus',
    summary: 'Freed by Jesus from seven demons, Mary from Magdala supported his ministry, stayed at the cross when most had fled, and came to the tomb early on Sunday. Jesus spoke her name, and she became the first to announce the resurrection.',
    passages: [p('Luke', '8'), p('John', '20')], books: ['luke', 'john', 'mark'],
    image: 'Gustave Doré Mary Magdalene',
  },

  // ---------- Early church ----------
  {
    slug: 'stephen', name: 'Stephen', era: 'church', dates: 'c. AD 34',
    tagline: 'First Christian martyr',
    summary: 'Chosen to serve tables, Stephen was "full of grace and power". Accused before the council, he retold Israel’s history and saw Jesus standing at God’s right hand. He was stoned while a young man named Saul held the coats.',
    passages: [p('Acts', '6'), p('Acts', '7')], books: ['acts'],
    image: 'Gustave Doré The martyrdom of Saint Stephen',
  },
  {
    slug: 'paul', name: 'Paul', era: 'church', dates: 'c. AD 5-67',
    tagline: 'Persecutor turned apostle',
    summary: 'A Pharisee from Tarsus who hunted Christians until Jesus stopped him on the Damascus road. Paul planted churches across the Roman world, wrote thirteen letters of the New Testament, and, by tradition, was beheaded in Rome under Nero.',
    passages: [p('Acts', '9'), p('Philippians', '3'), p('2 Timothy', '4')], books: ['acts', 'romans', 'galatians', 'philippians', '2-timothy'],
    image: 'Gustave Doré The conversion of Saint Paul',
  },
  {
    slug: 'barnabas', name: 'Barnabas', era: 'church', dates: 'c. AD 35-50',
    tagline: 'Son of encouragement',
    summary: 'A generous Levite from Cyprus who sold a field for the church, vouched for the newly converted Saul when everyone else was afraid, and fetched him to Antioch. He and Paul made the first missionary journey together.',
    passages: [p('Acts', '4'), p('Acts', '11'), p('Acts', '13')], books: ['acts', 'galatians'],
    image: 'Paul and Barnabas at Lystra',
  },
  {
    slug: 'timothy', name: 'Timothy', era: 'church', dates: 'c. AD 50-65',
    tagline: 'Paul’s true son in the faith',
    summary: 'Raised on the Scriptures by his mother Eunice and grandmother Lois, Timothy joined Paul as a young man and became his most trusted coworker, later leading the church in Ephesus. Two of Paul’s letters are addressed to him.',
    passages: [p('Acts', '16'), p('2 Timothy', '1'), p('1 Timothy', '4')], books: ['1-timothy', '2-timothy', 'acts', 'philippians'],
    image: 'Saint Timothy',
  },
  {
    slug: 'luke', name: 'Luke', era: 'church', dates: 'c. AD 50-80',
    tagline: 'Doctor, historian, travel companion',
    summary: 'A physician who traveled with Paul (the "we" passages in Acts) and stayed with him to the end. He researched carefully and wrote a two-volume history, Luke and Acts, which together make up about a quarter of the New Testament.',
    passages: [p('Luke', '1'), p('Acts', '16'), p('2 Timothy', '4')], books: ['luke', 'acts', 'colossians'],
    image: 'Saint Luke the Evangelist',
  },
  {
    slug: 'james', name: 'James, brother of Jesus', era: 'church', dates: 'd. c. AD 62',
    tagline: 'Leader of the Jerusalem church',
    summary: 'Jesus’ brother did not believe during his ministry, but the risen Jesus appeared to him and he became the steady leader of the Jerusalem church and author of the letter of James. Tradition says he prayed so much his knees were like a camel’s.',
    passages: [p('Acts', '15'), p('James', '1'), p('1 Corinthians', '15')], books: ['james', 'acts', 'galatians'],
    image: 'James the Just',
  },
]

export const peopleBySlug = (slug: string) => PEOPLE.find((x) => x.slug === slug)
