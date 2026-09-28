// Key places of the Bible in the order they enter the story, grouped by era. Short by design.
// `image` is a Wikimedia Commons search hint used by scripts/fetch-images.mjs; the resolved file and
// credit live in src/data/images.json. `coords` = [latitude, longitude] for the "See on map" link.
// First draft 2026-09-28; Sharon can edit freely.

import type { KeyPassage } from './books'
import type { Era } from './people'

export interface Place {
  slug: string
  name: string
  era: string
  today: string
  tagline: string
  summary: string
  passages: KeyPassage[]
  books: string[]
  coords?: [number, number]
  /** Search hint for a freely licensed photo or public-domain artwork. */
  image: string
}

const p = (book: string, spec: string): KeyPassage => ({ label: `${book} ${spec}`, ref: `${book} ${spec}` })

export const PLACE_ERAS: Era[] = [
  { id: 'patriarchs', name: 'Beginnings and the patriarchs', dates: 'c. 2000-1700 BC' },
  { id: 'exodus', name: 'Egypt, Sinai and the conquest', dates: 'c. 15th-12th century BC' },
  { id: 'kingdom', name: 'The kingdom years', dates: 'c. 1050-586 BC' },
  { id: 'exile', name: 'Exile and return', dates: '586-430 BC' },
  { id: 'jesus', name: 'The world of Jesus', dates: 'c. 5 BC-AD 33' },
  { id: 'church', name: 'The spread of the church', dates: 'AD 30-100' },
]

export const PLACES: Place[] = [
  // ---------- Patriarchs ----------
  {
    slug: 'ur', name: 'Ur', era: 'patriarchs', today: 'Tell el-Muqayyar, southern Iraq',
    tagline: 'Where Abraham’s journey began',
    summary: "Ur was one of the great cities of ancient Sumer, on the Euphrates near the head of the Persian Gulf, when Abraham's family lived there around 2000 BC. It had schools, law codes, a busy river trade, and a towering stepped temple (ziggurat) to the moon god Nanna, whose brick core still stands today. Archaeologists in the 1920s uncovered royal tombs there filled with gold, lyres, and jewelry, a glimpse of the sophisticated world Abraham was asked to leave behind. Genesis says God called him out of \"Ur of the Chaldeans\" to a land he would only be shown later, and Nehemiah remembers that call as the beginning of Israel's story. Leaving Ur meant leaving comfort and certainty for a promise.",
    passages: [p('Genesis', '11'), p('Genesis', '15')], books: ['genesis', 'nehemiah'], coords: [30.9626, 46.1031],
    image: 'Ziggurat of Ur',
  },
  {
    slug: 'haran', name: 'Haran', era: 'patriarchs', today: 'Harran, southeastern Turkey',
    tagline: 'The family’s halfway stop',
    summary: "Haran sits on the Balikh River in what is now southeastern Turkey, on the old caravan road between Mesopotamia and the Mediterranean. Like Ur it was a center of moon worship, and Abraham's family stopped here on the way to Canaan; his father Terah died in Haran, and Abraham was 75 when he moved on. Decades later Abraham sent a servant back to Haran to find a wife for Isaac, and it was here that Rebekah watered his camels. Jacob fled to Haran to escape Esau, worked seven years for Rachel and was tricked into marrying Leah first, and stayed twenty years before returning home with two wives, eleven sons, and large flocks. Today the town is famous for its beehive-shaped mud houses.",
    passages: [p('Genesis', '12'), p('Genesis', '29')], books: ['genesis'], coords: [36.8667, 39.0333],
    image: 'Harran beehive houses',
  },
  {
    slug: 'hebron', name: 'Hebron', era: 'patriarchs', today: 'Hebron, West Bank',
    tagline: 'Burial place of the patriarchs',
    summary: "Hebron lies in the hill country about 19 miles south of Jerusalem, one of the highest towns in the land. Abraham settled near the oaks of Mamre outside it, welcomed three visitors who turned out to be the LORD and two angels, and pleaded there for Sodom. When Sarah died he bought the cave of Machpelah from a Hittite for 400 shekels of silver, the first piece of the promised land the family ever owned. Abraham, Isaac, Rebekah, Jacob, and Leah were buried there too, and a massive stone enclosure built by Herod the Great still marks the site. Caleb claimed Hebron at 85 and drove out the giants. David ruled here for seven years before taking Jerusalem, and his son Absalom launched his rebellion from Hebron.",
    passages: [p('Genesis', '23'), p('2 Samuel', '2')], books: ['genesis', '2-samuel'], coords: [31.5247, 35.1107],
    image: 'Cave of the Patriarchs Hebron',
  },
  {
    slug: 'bethel', name: 'Bethel', era: 'patriarchs', today: 'Near Beitin, West Bank',
    tagline: '"House of God"',
    summary: "Bethel stood about 11 miles north of Jerusalem on the main north-south road through the hills. Abraham camped and built an altar between Bethel and Ai. Jacob, fleeing from Esau with nothing but a staff, slept here with a stone for a pillow and dreamed of a stairway with angels going up and down; he woke and said, \"Surely the LORD is in this place,\" and named it Bethel, \"house of God.\" For a time the ark of the covenant was kept here in the days of the judges. But after the kingdom split, Jeroboam set up a golden calf at Bethel so his people would not go to Jerusalem to worship, and Amos was thrown out of town for preaching against it. Josiah finally tore the shrine down. A place of real encounter with God became a place of convenient religion.",
    passages: [p('Genesis', '28'), p('1 Kings', '12'), p('Amos', '7')], books: ['genesis', '1-kings', 'amos'], coords: [31.9294, 35.2378],
    image: 'Gustave Doré Jacob’s dream ladder',
  },

  // ---------- Exodus ----------
  {
    slug: 'egypt', name: 'Egypt', era: 'exodus', today: 'Egypt, the Nile valley and delta',
    tagline: 'Refuge, then slavery',
    summary: "Egypt was the superpower of the ancient world, a narrow ribbon of green along the Nile hemmed in by desert, ruled by pharaohs who claimed to be gods. When famine struck, Abraham went down to Egypt, and later Joseph was sold there as a slave and rose to govern it. His whole family followed for food and stayed four centuries, until a pharaoh \"who did not know Joseph\" enslaved them. God brought them out through ten plagues and a parted sea, and \"out of Egypt\" became the Bible's shorthand for rescue. Yet the prophets kept warning kings of Judah not to trust Egyptian help, and Jeremiah died there among refugees. Mary and Joseph fled to Egypt with the infant Jesus, so that Matthew could write, \"Out of Egypt I called my son.\"",
    passages: [p('Genesis', '47'), p('Exodus', '1'), p('Exodus', '12')], books: ['genesis', 'exodus', 'matthew'], coords: [30.0444, 31.2357],
    image: 'Pyramids of Giza',
  },
  {
    slug: 'mount-sinai', name: 'Mount Sinai', era: 'exodus', today: 'Traditionally Jebel Musa, Sinai Peninsula',
    tagline: 'Where the Law was given',
    summary: "Mount Sinai, also called Horeb, is the mountain in the desert south of Canaan where Israel camped for almost a year after leaving Egypt. Moses had first met God here at the burning bush while keeping his father-in-law's sheep. Now the whole nation stood at its foot while the mountain shook with thunder, fire, and trumpet blast, and God spoke the Ten Commandments. Moses climbed it repeatedly, spent forty days on top, received the plans for the tabernacle, and came down to find the people dancing around a golden calf. Centuries later Elijah fled here in despair and heard God not in wind, earthquake, or fire but in a gentle whisper. Tradition places it at Jebel Musa, where a monastery has stood since the 500s; the exact location is debated.",
    passages: [p('Exodus', '19'), p('Exodus', '20'), p('1 Kings', '19')], books: ['exodus', 'leviticus', 'deuteronomy'], coords: [28.5395, 33.9751],
    image: 'Mount Sinai Jebel Musa',
  },
  {
    slug: 'jordan-river', name: 'The Jordan River', era: 'exodus', today: 'Border of Israel, the West Bank and Jordan',
    tagline: 'The crossing place',
    summary: "The Jordan runs about 150 miles from the foot of Mount Hermon through the Sea of Galilee down to the Dead Sea, the lowest point on earth, dropping steeply the whole way, which is what \"Jordan\" (the descender) means. It was the boundary Israel had to cross to enter the land, and the water stopped flowing while the priests stood with the ark in the riverbed. Elijah and Elisha each parted it with a rolled-up cloak. Naaman, the Syrian general, thought its muddy water was beneath him until he dipped seven times and was healed of leprosy. John the Baptist baptized crowds in the Jordan, and Jesus came to be baptized there too, the moment the Spirit descended like a dove. In hymns and spirituals, crossing the Jordan became a picture of entering God's rest.",
    passages: [p('Joshua', '3'), p('2 Kings', '5'), p('Matthew', '3')], books: ['joshua', '2-kings', 'matthew'], coords: [31.8375, 35.5511],
    image: 'Jordan River Qasr el Yahud',
  },
  {
    slug: 'jericho', name: 'Jericho', era: 'exodus', today: 'Jericho, West Bank',
    tagline: 'The walls came down',
    summary: "Jericho lies in the Jordan valley about 850 feet below sea level, a green oasis fed by a strong spring, and one of the oldest continuously settled places on earth. It was the first city Israel faced in Canaan. Rahab, an innkeeper on the wall, hid two spies and hung a scarlet cord from her window; after Israel marched around the city for seven days the walls collapsed and her family alone was spared. Joshua cursed anyone who rebuilt it, and it stayed largely abandoned for centuries until a man named Hiel rebuilt it in Ahab's day at the cost of his sons. Elisha sweetened its spring with salt. In Jesus' time Herod built a winter palace nearby, and it was on the road up from Jericho that Jesus healed blind Bartimaeus and called Zacchaeus down from his tree.",
    passages: [p('Joshua', '6'), p('Luke', '19')], books: ['joshua', 'luke', 'hebrews'], coords: [31.8711, 35.4444],
    image: 'Tell es-Sultan Jericho',
  },
  {
    slug: 'shiloh', name: 'Shiloh', era: 'exodus', today: 'Khirbet Seilun, West Bank',
    tagline: 'First home of the tabernacle',
    summary: "Shiloh was a hill town in the territory of Ephraim, about 20 miles north of Jerusalem, and for roughly 300 years it was Israel's religious capital. Joshua set up the tabernacle here after the conquest and cast lots to divide the land among the tribes. Families came up every year for the festivals. Hannah wept and prayed here for a son, was mistaken for a drunk by the priest Eli, and later brought young Samuel back to serve in the sanctuary, where God first spoke to him. But Eli's sons treated the offerings with contempt, and when they carried the ark into battle against the Philistines it was captured and Shiloh was destroyed. Jeremiah later pointed to the ruins as a warning: God had abandoned Shiloh, and the temple in Jerusalem would be no safer if the people did not repent.",
    passages: [p('Joshua', '18'), p('1 Samuel', '1'), p('1 Samuel', '3')], books: ['joshua', 'judges', '1-samuel', 'jeremiah'], coords: [32.0556, 35.2894],
    image: 'Tel Shiloh',
  },

  // ---------- Kingdom ----------
  {
    slug: 'bethlehem', name: 'Bethlehem', era: 'kingdom', today: 'Bethlehem, West Bank',
    tagline: 'City of David, birthplace of Jesus',
    summary: "Bethlehem, \"house of bread,\" is a small town on a ridge about six miles south of Jerusalem, surrounded by terraced fields and grazing land. Rachel was buried on the road nearby. Ruth gleaned barley in the fields of Boaz here, and their great-grandson David was a shepherd boy in these hills when Samuel came to anoint him, which is why the town is called the city of David. Three of David's soldiers once broke through Philistine lines just to bring him a drink from Bethlehem's well. Micah promised that Israel's ruler would come from \"Bethlehem Ephrathah, small among the clans of Judah,\" and 700 years later Joseph and Mary arrived for a census and Jesus was born there, greeted by shepherds. The Church of the Nativity, first built in the 300s, still marks the traditional site of the manger.",
    passages: [p('Ruth', '2'), p('1 Samuel', '16'), p('Micah', '5'), p('Luke', '2')], books: ['ruth', '1-samuel', 'micah', 'luke', 'matthew'], coords: [31.7054, 35.2024],
    image: 'Bethlehem Church of the Nativity',
  },
  {
    slug: 'jerusalem', name: 'Jerusalem', era: 'kingdom', today: 'Jerusalem',
    tagline: 'The city of the great King',
    summary: "Jerusalem sits on a limestone ridge in the Judean hills, about 2,500 feet above sea level, with steep valleys on three sides. It was a Jebusite fortress until David captured it around 1000 BC and made it the capital of the united tribes, then brought the ark there. Solomon built the temple on the hill just north of David's city. For four centuries prophets warned the city and kings reformed or corrupted it, until Babylon burned it in 586 BC. The exiles returned to rebuild the temple and walls, Herod rebuilt the temple in marble and gold, and Jesus wept over the city, drove traders from its courts, was crucified outside its walls, and rose from a tomb nearby. The church was born here at Pentecost. Rome destroyed it in AD 70. The Bible ends with a new Jerusalem coming down from heaven, where God lives with his people.",
    passages: [p('2 Samuel', '5'), p('Psalms', '122'), p('Luke', '19'), p('Revelation', '21')], books: ['2-samuel', '1-kings', 'psalms', 'luke', 'acts', 'revelation'], coords: [31.7767, 35.2345],
    image: 'Jerusalem Old City Temple Mount panorama',
  },
  {
    slug: 'the-temple', name: 'The Temple', era: 'kingdom', today: 'The Temple Mount, Jerusalem',
    tagline: 'Where heaven touched earth',
    summary: "The temple stood on Mount Moriah in Jerusalem, where Abraham had once bound Isaac and David had bought Araunah's threshing floor. Solomon built the first temple around 960 BC, cedar-paneled and overlaid with gold, and at its dedication the glory of God filled it like a cloud. It was the only place sacrifices could be offered, and three times a year pilgrims came up to it singing psalms. Babylon burned it in 586 BC. The returned exiles built a modest second temple, finished in 516 BC, which Herod the Great later expanded into one of the wonders of the Roman world. Jesus was presented there as a baby, taught in its courts, overturned the money changers' tables, and said he would rebuild the temple in three days, speaking of his body. Rome destroyed it in AD 70, leaving only the great platform whose Western Wall is still a place of prayer.",
    passages: [p('1 Kings', '8'), p('Ezra', '6'), p('John', '2')], books: ['1-kings', '2-chronicles', 'ezra', 'haggai', 'john', 'hebrews'], coords: [31.778, 35.2354],
    image: 'Western Wall Jerusalem',
  },
  {
    slug: 'mount-carmel', name: 'Mount Carmel', era: 'kingdom', today: 'The Carmel ridge near Haifa, Israel',
    tagline: 'Elijah’s showdown',
    summary: "Mount Carmel is a long, green ridge rising nearly 1,800 feet above the Mediterranean near modern Haifa, its name meaning \"garden\" or \"vineyard of God.\" Its lushness made it a byword for beauty in the prophets and the Song of Songs. Here Elijah staged the showdown of 1 Kings 18 after three years of drought: 450 prophets of Baal danced and cut themselves all day beside a silent altar, then Elijah soaked his sacrifice with twelve jars of water, prayed a short prayer, and fire fell from heaven and consumed everything. The people fell down crying, \"The LORD, he is God!\" Elijah then climbed to the summit, prayed with his face between his knees, and a cloud the size of a man's hand grew into the rain that ended the drought. A monastery at el-Muhraqa, \"the place of burning,\" marks the traditional spot.",
    passages: [p('1 Kings', '18')], books: ['1-kings'], coords: [32.7167, 35.05],
    image: 'Mount Carmel Muhraqa',
  },
  {
    slug: 'samaria', name: 'Samaria', era: 'kingdom', today: 'Sebastia, West Bank',
    tagline: 'Capital of the northern kingdom',
    summary: "Samaria was built by King Omri around 880 BC on a hill he bought for two talents of silver, and it served as the capital of the northern kingdom of Israel for 150 years. Ahab and Jezebel ruled here and built a temple to Baal; carved ivories found in the ruins match the prophets' complaints about \"houses adorned with ivory.\" Elijah and Elisha both confronted its kings, and Elisha once led a blinded Syrian army into the middle of the city. Amos and Hosea condemned its luxury and idolatry. The Assyrians besieged Samaria for three years and took it in 722 BC, deporting the population and settling foreigners in their place; the mixed people who resulted became the Samaritans, whom Jews in Jesus' day despised. Philip preached in Samaria and the Spirit fell there in Acts 8, fulfilling Jesus' words that his witnesses would reach Samaria.",
    passages: [p('1 Kings', '16'), p('2 Kings', '17'), p('John', '4')], books: ['1-kings', '2-kings', 'amos', 'john'], coords: [32.2764, 35.19],
    image: 'Sebastia ruins Samaria',
  },
  {
    slug: 'nineveh', name: 'Nineveh', era: 'kingdom', today: 'Across the river from Mosul, Iraq',
    tagline: 'The great city that repented, then fell',
    summary: "Nineveh, on the east bank of the Tigris across from modern Mosul, was the last and greatest capital of the Assyrian empire, the most feared military power of the Old Testament era. Its kings boasted of flaying rebels and stacking heads at city gates, and it was Assyria that wiped out northern Israel in 722 BC. So when God sent Jonah to Nineveh, Jonah ran the other way; when the city repented at his preaching, he sulked. Sennacherib made Nineveh magnificent, with a \"palace without rival,\" massive walls, and a library of 30,000 clay tablets that scholars still read today, including the Assyrian account of his siege of Jerusalem. About a century after Jonah, Nahum announced the city's fall, and in 612 BC the Babylonians and Medes destroyed it so thoroughly that its location was forgotten until archaeologists found it in the 1840s.",
    passages: [p('Jonah', '3'), p('Nahum', '3')], books: ['jonah', 'nahum'], coords: [36.3594, 43.1528],
    image: 'Nineveh Mashki Gate',
  },

  // ---------- Exile ----------
  {
    slug: 'babylon', name: 'Babylon', era: 'exile', today: 'Near Hillah, Iraq',
    tagline: 'The city of exile',
    summary: "Babylon stood on the Euphrates about 55 miles south of modern Baghdad, and under Nebuchadnezzar II (605-562 BC) it became the largest city in the world, with double walls, the blue-tiled Ishtar Gate lined with dragons and bulls, a towering ziggurat, and gardens the Greeks counted among the wonders of the world. Nebuchadnezzar destroyed Jerusalem in 586 BC and carried Judah's people here in exile. Daniel and his friends served in its court and faced its furnace and lions; Ezekiel prophesied to exiles settled along its canals; Psalm 137 remembers weeping by its rivers. The city fell to the Persians in a single night in 539 BC while Belshazzar feasted, just as Daniel read from the writing on the wall, and Cyrus soon let the exiles go home. In Revelation \"Babylon the great\" becomes the name for every proud, seductive, God-defying empire.",
    passages: [p('2 Kings', '25'), p('Psalms', '137'), p('Daniel', '5')], books: ['2-kings', 'daniel', 'jeremiah', 'revelation'], coords: [32.5422, 44.4211],
    image: 'Ishtar Gate Pergamon Museum',
  },
  {
    slug: 'susa', name: 'Susa', era: 'exile', today: 'Shush, southwestern Iran',
    tagline: 'Esther’s palace city',
    summary: "Susa, called Shushan in older Bibles, lay in southwestern Iran at the edge of the Zagros mountains and served as a winter capital of the Persian kings. Darius I built a vast palace there with a columned audience hall, and its glazed-brick friezes of royal archers can be seen in museums today. The book of Esther takes place entirely in this palace: the six-month feast of Xerxes, the beauty contest that made a Jewish orphan queen, Haman's plot, and the reversal celebrated at Purim. Nehemiah was serving Artaxerxes as cupbearer in the citadel of Susa when news of Jerusalem's broken walls reduced him to tears and prayer. Daniel also records a vision \"in the citadel of Susa,\" and a tomb traditionally called Daniel's is venerated in the modern town of Shush.",
    passages: [p('Esther', '1'), p('Nehemiah', '1'), p('Daniel', '8')], books: ['esther', 'nehemiah', 'daniel'], coords: [32.1894, 48.2578],
    image: 'Susa Apadana ruins',
  },

  // ---------- Jesus ----------
  {
    slug: 'nazareth', name: 'Nazareth', era: 'jesus', today: 'Nazareth, Galilee, Israel',
    tagline: 'Where Jesus grew up',
    summary: "Nazareth was a small farming village of perhaps a few hundred people, tucked in a hollow in the hills of lower Galilee, never mentioned in the Old Testament or by any writer before the Gospels. Here the angel Gabriel appeared to a young woman named Mary, and here Jesus grew up in the home of Joseph the carpenter, learning the trade and attending the synagogue every Sabbath. When Nathanael heard where the Messiah came from he asked, \"Can anything good come from Nazareth?\" When Jesus returned to preach in his hometown synagogue, reading Isaiah 61 and announcing that it was fulfilled, his neighbors were so offended that they tried to throw him off a cliff. The sign on his cross read \"Jesus of Nazareth,\" and his followers were first called Nazarenes. Today it is the largest Arab city in Israel, with the huge Basilica of the Annunciation at its heart.",
    passages: [p('Luke', '1'), p('Luke', '4'), p('John', '1')], books: ['luke', 'matthew', 'john'], coords: [32.7021, 35.2978],
    image: 'Nazareth Basilica of the Annunciation',
  },
  {
    slug: 'sea-of-galilee', name: 'The Sea of Galilee', era: 'jesus', today: 'Lake Kinneret, northern Israel',
    tagline: 'The lake at the center of Jesus’ ministry',
    summary: "The Sea of Galilee is a freshwater lake about 13 miles long and 8 miles wide, nearly 700 feet below sea level, ringed by hills and prone to sudden violent storms when wind funnels down from the heights. In Jesus' day its shores were dotted with fishing villages, and a thriving industry salted fish for export. Most of his ministry happened around this lake: he called Peter, Andrew, James, and John from their nets, taught crowds from a boat pushed out from shore, calmed a storm with a word, walked across the water at night, fed five thousand on a hillside above it, and sent demons into a herd of pigs on the far side. After his resurrection he stood on its beach at dawn, cooked breakfast for his disciples, and restored Peter with three questions. A first-century fishing boat found in its mud in 1986 is now on display nearby.",
    passages: [p('Mark', '1'), p('Mark', '4'), p('John', '21')], books: ['matthew', 'mark', 'luke', 'john'], coords: [32.8228, 35.5892],
    image: 'Sea of Galilee',
  },
  {
    slug: 'capernaum', name: 'Capernaum', era: 'jesus', today: 'Kfar Nahum, on the northern shore of Galilee',
    tagline: 'Jesus’ home base',
    summary: "Capernaum was a fishing and farming town on the northwest shore of the Sea of Galilee, on the road that ran from Damascus to the coast, with a customs post and a small Roman garrison. After Nazareth rejected him Jesus made it his base; Matthew calls it \"his own town.\" He taught in its synagogue, built by a friendly centurion, healed Peter's mother-in-law in her house, cast out a demon on the Sabbath, healed the paralyzed man whose friends dug through the roof, called Matthew from his tax booth, and raised the daughter of Jairus, the synagogue ruler. In its synagogue he gave the hard teaching about the bread of life that cost him many followers. Yet he later warned that Capernaum, which had seen so much, would fare worse than Sodom in the judgment. Excavations have uncovered a fourth-century synagogue built over the earlier one, and a house venerated as Peter's since the first century.",
    passages: [p('Mark', '2'), p('Matthew', '4'), p('John', '6')], books: ['matthew', 'mark', 'luke', 'john'], coords: [32.8806, 35.5731],
    image: 'Capernaum synagogue ruins',
  },
  {
    slug: 'samaria-sychar', name: 'Sychar and Jacob’s well', era: 'jesus', today: 'Near Nablus, West Bank',
    tagline: 'The woman at the well',
    summary: "Sychar was a Samaritan village in the valley between Mount Ebal and Mount Gerizim, near the ancient city of Shechem, where Abraham first built an altar in the land and Jacob bought a field and dug a well. Joshua gathered all Israel here to renew the covenant, and Joseph's bones were buried nearby. On the summit of Gerizim the Samaritans had built their own temple, which is why the woman Jesus met said, \"Our ancestors worshiped on this mountain.\" Jesus, tired from walking, sat by Jacob's well at noon and asked her for a drink, breaking every social rule, and led her from a conversation about water to the truth about her life and about himself. She ran back to town and her testimony brought the whole village out to hear him. Jacob's well is still there, more than 100 feet deep, under a church in the modern city of Nablus.",
    passages: [p('John', '4'), p('Genesis', '33')], books: ['john', 'genesis'], coords: [32.2094, 35.285],
    image: 'Jacob’s Well Nablus',
  },
  {
    slug: 'mount-of-olives', name: 'The Mount of Olives', era: 'jesus', today: 'East of the Old City, Jerusalem',
    tagline: 'Gethsemane and the ascension',
    summary: "The Mount of Olives is a ridge running north to south just east of Jerusalem, separated from the temple mount by the Kidron valley, and rising about 300 feet higher than the city, so that it offers the classic view of Jerusalem. David climbed it weeping when he fled from Absalom. Jesus crossed it every time he came in from Bethany, where he stayed with Mary, Martha, and Lazarus. He rode down its slope on a donkey on Palm Sunday while crowds waved branches, wept over the city from it, delivered his great discourse about the end of the age on it, and prayed in the garden of Gethsemane at its foot on the night he was arrested. Forty days after his resurrection he ascended to heaven from here, and Zechariah prophesied that his feet will stand on it when he returns. Its slopes hold ancient olive trees and the oldest Jewish cemetery in the world.",
    passages: [p('Luke', '19'), p('Matthew', '26'), p('Acts', '1')], books: ['matthew', 'luke', 'acts', 'zechariah'], coords: [31.7784, 35.2455],
    image: 'Mount of Olives Gethsemane olive trees',
  },
  {
    slug: 'golgotha', name: 'Golgotha and the tomb', era: 'jesus', today: 'Church of the Holy Sepulchre, Jerusalem',
    tagline: 'The cross and the empty tomb',
    summary: "Golgotha, Aramaic for \"skull,\" was a place of execution just outside Jerusalem's walls near a busy road, so that passersby could read the charge above the cross. Its Latin name, Calvary, means the same thing. Here, on a Friday in about AD 30 or 33, Jesus was crucified between two criminals under a sign reading \"King of the Jews,\" while soldiers gambled for his clothes, his mother and John stood by, and darkness fell at noon. A wealthy council member, Joseph of Arimathea, laid his body in his own new tomb cut into the rock in a garden nearby. On Sunday morning the women found the stone rolled away. In the 320s the emperor Constantine's mother identified the site and a church was built over both the rock of Calvary and the tomb; the Church of the Holy Sepulchre, rebuilt by the Crusaders, still encloses them today and is shared by six Christian communities.",
    passages: [p('John', '19'), p('John', '20'), p('Luke', '24')], books: ['matthew', 'mark', 'luke', 'john'], coords: [31.7785, 35.2298],
    image: 'Church of the Holy Sepulchre',
  },

  // ---------- Church ----------
  {
    slug: 'damascus', name: 'Damascus', era: 'church', today: 'Damascus, Syria',
    tagline: 'Where Saul met Jesus',
    summary: "Damascus, in an oasis east of the Anti-Lebanon mountains, claims to be the oldest continuously inhabited city on earth and was already ancient in Abraham's day; his servant Eliezer came from there. In the time of the kings it was the capital of Aram (Syria), Israel's frequent enemy; Naaman its general was healed of leprosy in the Jordan, and Elisha wept as he foretold the cruelty of its future king Hazael. Isaiah and Amos pronounced judgment on it. In the New Testament Damascus was a Roman city with a large Jewish community, and Saul of Tarsus was riding there with arrest warrants for Christians when a blinding light and a voice asking \"Why do you persecute me?\" changed his life. He was led into the city, healed and baptized by Ananias in a house on \"the street called Straight,\" and later escaped his enemies by being lowered over the wall in a basket.",
    passages: [p('Acts', '9'), p('2 Corinthians', '11')], books: ['acts', '2-kings', 'galatians'], coords: [33.5138, 36.2765],
    image: 'Damascus Straight Street',
  },
  {
    slug: 'antioch', name: 'Antioch', era: 'church', today: 'Antakya, southern Turkey',
    tagline: 'First called Christians',
    summary: "Antioch on the Orontes, near the northeastern corner of the Mediterranean, was the third largest city of the Roman empire after Rome and Alexandria, a cosmopolitan crossroads with a large Jewish population. When persecution scattered the Jerusalem church, believers who came here began preaching to Greeks as well as Jews, and the church that grew was the first to cross that line in a big way. Barnabas was sent to check on it, saw grace at work, and went to Tarsus to fetch Saul; the two taught in Antioch for a year, and it was here that the disciples were first called \"Christians.\" The Antioch church sent famine relief to Jerusalem, then commissioned Barnabas and Saul for the first missionary journey. Paul returned here after each journey, and here he confronted Peter for withdrawing from Gentile meals. A cave church on the mountainside is said to be where early believers met.",
    passages: [p('Acts', '11'), p('Acts', '13')], books: ['acts', 'galatians'], coords: [36.2, 36.1603],
    image: 'Antioch Saint Peter cave church Antakya',
  },
  {
    slug: 'philippi', name: 'Philippi', era: 'church', today: 'Ruins near Kavala, Greece',
    tagline: 'First church in Europe',
    summary: "Philippi lay in eastern Macedonia on the Via Egnatia, the great Roman road from the Adriatic to Byzantium. Named for Philip of Macedon, Alexander's father, it became a Roman colony after the battle fought there in 42 BC, and retired legionaries settled in it, proud of their Roman citizenship. Paul arrived around AD 50 after a vision of a man from Macedonia calling for help. There was no synagogue, so he found a group of women praying by the river; Lydia, a dealer in purple cloth, believed and opened her home. After Paul freed a slave girl from a fortune-telling spirit, her owners had him and Silas beaten and jailed; at midnight they were singing hymns when an earthquake broke the doors, and the jailer and his household were baptized before dawn. The church here later supported Paul financially more than any other, and he wrote them his most affectionate letter from prison. Extensive ruins remain near modern Kavala.",
    passages: [p('Acts', '16'), p('Philippians', '1')], books: ['acts', 'philippians'], coords: [41.0128, 24.2861],
    image: 'Philippi archaeological site',
  },
  {
    slug: 'athens', name: 'Athens', era: 'church', today: 'Athens, Greece',
    tagline: 'Paul at the Areopagus',
    summary: "Athens was the intellectual capital of the ancient world, home of Socrates, Plato, and Aristotle, and though its political power had faded under Rome it remained a university city crowded with temples, statues, and philosophers. Paul arrived alone around AD 50, waiting for Silas and Timothy, and was distressed to see the city full of idols. He argued in the synagogue and the marketplace until Epicurean and Stoic philosophers brought him to the Areopagus, the council that met on Mars Hill below the Acropolis, to explain this \"new teaching.\" His speech there, starting from an altar inscribed \"To an unknown god\" and quoting Greek poets, is the New Testament's model for speaking to people with no Bible background. Most mocked when he mentioned the resurrection, but some believed, including Dionysius, a member of the council, and a woman named Damaris.",
    passages: [p('Acts', '17')], books: ['acts'], coords: [37.9722, 23.7239],
    image: 'Areopagus Athens Acropolis',
  },
  {
    slug: 'corinth', name: 'Corinth', era: 'church', today: 'Ancient Corinth, Greece',
    tagline: 'Wealthy port, troubled church',
    summary: "Corinth controlled the narrow isthmus joining southern Greece to the mainland, with a port on each side, so that goods and travelers from east and west passed through it and made it rich. Destroyed by Rome in 146 BC and refounded by Julius Caesar as a colony a century later, it was a new, brash, commercial city of freedmen, merchants, and sailors, famous for luxury and immorality; a temple of Aphrodite stood on the acropolis above it. Paul came in about AD 50, met Priscilla and Aquila and worked with them making tents, preached in the synagogue and then next door to it, and stayed eighteen months, longer than anywhere except Ephesus. The church he founded was gifted, divided, and troubled, and he wrote it at least four letters, two of which survive. Ruins of the marketplace, the temple of Apollo, and the judgment seat where Paul stood before Gallio can still be seen.",
    passages: [p('Acts', '18'), p('1 Corinthians', '1')], books: ['acts', '1-corinthians', '2-corinthians', 'romans'], coords: [37.9058, 22.8794],
    image: 'Ancient Corinth Temple of Apollo',
  },
  {
    slug: 'ephesus', name: 'Ephesus', era: 'church', today: 'Ruins near Selçuk, western Turkey',
    tagline: 'Temple of Artemis, church of Paul and John',
    summary: "Ephesus was the leading city of the Roman province of Asia, a harbor city of perhaps 200,000 people on the west coast of what is now Turkey. Its temple of Artemis, four times the size of the Parthenon, was one of the seven wonders of the world and drew pilgrims and silversmiths selling shrines. Paul made Ephesus his base for about three years, teaching daily in a lecture hall until \"all who lived in Asia heard the word of the Lord.\" New believers publicly burned magic scrolls worth 50,000 silver coins, and the silversmith Demetrius started a riot in the 25,000-seat theater with the chant \"Great is Artemis of the Ephesians!\" Paul wrote the church a letter, left Timothy to lead it, and tradition says the apostle John spent his last years here with Mary. Revelation's first letter is addressed to Ephesus. Its marble streets, library, and theater are among the best-preserved Roman ruins anywhere.",
    passages: [p('Acts', '19'), p('Ephesians', '1'), p('Revelation', '2')], books: ['acts', 'ephesians', '1-timothy', 'revelation'], coords: [37.9411, 27.3419],
    image: 'Ephesus Library of Celsus',
  },
  {
    slug: 'rome', name: 'Rome', era: 'church', today: 'Rome, Italy',
    tagline: 'Capital of the empire',
    summary: "Rome, on the Tiber in central Italy, ruled the entire Mediterranean world in New Testament times, a city of about a million people with the emperor at its head, Judea as one of its provinces, and Pontius Pilate as one of its governors. Jews had lived there since the second century BC, and visitors from Rome were present at Pentecost, so a church existed in the capital before any apostle arrived. Paul wrote his greatest letter to that church around AD 57, hoping to visit on his way to Spain. He arrived instead as a prisoner in about AD 60, after a shipwreck, and spent two years under house arrest welcoming all who came, writing several letters, and preaching \"without hindrance.\" Tradition holds that both Peter and Paul were martyred in Rome under Nero after the fire of AD 64, Peter crucified and Paul beheaded, and that their tombs lie beneath the basilicas that bear their names.",
    passages: [p('Acts', '28'), p('Romans', '1')], books: ['acts', 'romans', '2-timothy'], coords: [41.8902, 12.4922],
    image: 'Roman Forum Rome',
  },
  {
    slug: 'patmos', name: 'Patmos', era: 'church', today: 'Patmos, Greek islands',
    tagline: 'Where Revelation was written',
    summary: "Patmos is a small, rocky, crescent-shaped island in the Aegean Sea about 35 miles off the coast of Asia Minor, roughly 13 square miles, with a good harbor at Skala. Rome used such islands as places of banishment, and John writes that he was on Patmos \"because of the word of God and the testimony of Jesus,\" most likely exiled there under Domitian in the mid-90s AD. On the Lord's Day, \"in the Spirit,\" he heard a voice like a trumpet and turned to see the risen Christ among seven golden lampstands, and was told to write what he saw to the seven churches of Asia, all within a few days' sail. The result was the book of Revelation. Since 1088 a fortress-like monastery of Saint John has crowned the island, and a cave halfway down the hill, the Cave of the Apocalypse, is venerated as the place where he received the visions.",
    passages: [p('Revelation', '1')], books: ['revelation'], coords: [37.3094, 26.5467],
    image: 'Patmos island cave of the Apocalypse',
  },
]

export const placeBySlug = (slug: string) => PLACES.find((x) => x.slug === slug)
