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
    summary: 'A wealthy Sumerian city on the Euphrates with a great stepped temple (ziggurat) to the moon god. God called Abraham to leave it for a land he would be shown. Its ziggurat still stands.',
    passages: [p('Genesis', '11'), p('Genesis', '15')], books: ['genesis', 'nehemiah'], coords: [30.9626, 46.1031],
    image: 'Ziggurat of Ur',
  },
  {
    slug: 'haran', name: 'Haran', era: 'patriarchs', today: 'Harran, southeastern Turkey',
    tagline: 'The family’s halfway stop',
    summary: 'Abraham’s family settled here on the way to Canaan, and his father Terah died here. Jacob later fled to Haran, worked fourteen years for Rachel, and returned with a large family.',
    passages: [p('Genesis', '12'), p('Genesis', '29')], books: ['genesis'], coords: [36.8667, 39.0333],
    image: 'Harran beehive houses',
  },
  {
    slug: 'hebron', name: 'Hebron', era: 'patriarchs', today: 'Hebron, West Bank',
    tagline: 'Burial place of the patriarchs',
    summary: 'Abraham pitched his tent by the oaks of Mamre near Hebron and bought the cave of Machpelah as a family tomb; Sarah, Abraham, Isaac, Rebekah, Jacob, and Leah were buried there. Centuries later David was first crowned king in Hebron.',
    passages: [p('Genesis', '23'), p('2 Samuel', '2')], books: ['genesis', '2-samuel'], coords: [31.5247, 35.1107],
    image: 'Cave of the Patriarchs Hebron',
  },
  {
    slug: 'bethel', name: 'Bethel', era: 'patriarchs', today: 'Near Beitin, West Bank',
    tagline: '"House of God"',
    summary: 'Jacob slept here with a stone for a pillow and dreamed of a stairway to heaven; he named the place Bethel, "house of God". Sadly, King Jeroboam later set up a golden calf here, and the prophets condemned its worship.',
    passages: [p('Genesis', '28'), p('1 Kings', '12'), p('Amos', '7')], books: ['genesis', '1-kings', 'amos'], coords: [31.9294, 35.2378],
    image: 'Gustave Doré Jacob’s dream ladder',
  },

  // ---------- Exodus ----------
  {
    slug: 'egypt', name: 'Egypt', era: 'exodus', today: 'Egypt, the Nile valley and delta',
    tagline: 'Refuge, then slavery',
    summary: 'Joseph rose to power here and his family came for food during a famine. Four centuries later their descendants were slaves making bricks for Pharaoh until God brought them out with plagues and a parted sea. Egypt reappears throughout the Bible as the place not to run back to.',
    passages: [p('Genesis', '47'), p('Exodus', '1'), p('Exodus', '12')], books: ['genesis', 'exodus', 'matthew'], coords: [30.0444, 31.2357],
    image: 'Pyramids of Giza',
  },
  {
    slug: 'mount-sinai', name: 'Mount Sinai', era: 'exodus', today: 'Traditionally Jebel Musa, Sinai Peninsula',
    tagline: 'Where the Law was given',
    summary: 'Three months after leaving Egypt, Israel camped at this mountain for almost a year. God descended in fire and smoke, gave the Ten Commandments and the covenant, and had the tabernacle built. Moses spoke with God here; so did Elijah, centuries later.',
    passages: [p('Exodus', '19'), p('Exodus', '20'), p('1 Kings', '19')], books: ['exodus', 'leviticus', 'deuteronomy'], coords: [28.5395, 33.9751],
    image: 'Mount Sinai Jebel Musa',
  },
  {
    slug: 'jordan-river', name: 'The Jordan River', era: 'exodus', today: 'Border of Israel, the West Bank and Jordan',
    tagline: 'The crossing place',
    summary: 'Israel entered the promised land by crossing the Jordan on dry ground. Elijah and Elisha parted it, Naaman washed in it and was healed, and John baptized Jesus in it. Crossing the Jordan became a picture of entering God’s promises.',
    passages: [p('Joshua', '3'), p('2 Kings', '5'), p('Matthew', '3')], books: ['joshua', '2-kings', 'matthew'], coords: [31.8375, 35.5511],
    image: 'Jordan River Qasr el Yahud',
  },
  {
    slug: 'jericho', name: 'Jericho', era: 'exodus', today: 'Jericho, West Bank',
    tagline: 'The walls came down',
    summary: 'One of the oldest cities on earth, Jericho was the first city Israel faced in Canaan. Its walls fell after seven days of marching, and Rahab and her family were spared. In Jesus’ day he healed blind Bartimaeus here and had dinner with Zacchaeus.',
    passages: [p('Joshua', '6'), p('Luke', '19')], books: ['joshua', 'luke', 'hebrews'], coords: [31.8711, 35.4444],
    image: 'Tell es-Sultan Jericho',
  },
  {
    slug: 'shiloh', name: 'Shiloh', era: 'exodus', today: 'Khirbet Seilun, West Bank',
    tagline: 'First home of the tabernacle',
    summary: 'For about three centuries the tabernacle and the ark stood at Shiloh, the center of Israel’s worship. Hannah prayed for a son here, and young Samuel heard God’s voice here. Its destruction by the Philistines became a warning Jeremiah used against Jerusalem.',
    passages: [p('Joshua', '18'), p('1 Samuel', '1'), p('1 Samuel', '3')], books: ['joshua', 'judges', '1-samuel', 'jeremiah'], coords: [32.0556, 35.2894],
    image: 'Tel Shiloh',
  },

  // ---------- Kingdom ----------
  {
    slug: 'bethlehem', name: 'Bethlehem', era: 'kingdom', today: 'Bethlehem, West Bank',
    tagline: 'City of David, birthplace of Jesus',
    summary: 'A small town six miles south of Jerusalem where Ruth gleaned in Boaz’s field, where Samuel anointed David, and where Micah said the ruler of Israel would be born. Jesus was born here in the days of Herod.',
    passages: [p('Ruth', '2'), p('1 Samuel', '16'), p('Micah', '5'), p('Luke', '2')], books: ['ruth', '1-samuel', 'micah', 'luke', 'matthew'], coords: [31.7054, 35.2024],
    image: 'Bethlehem Church of the Nativity',
  },
  {
    slug: 'jerusalem', name: 'Jerusalem', era: 'kingdom', today: 'Jerusalem',
    tagline: 'The city of the great King',
    summary: 'David captured this hill fortress from the Jebusites and made it his capital; Solomon built the temple here. Destroyed by Babylon in 586 BC and rebuilt, it was the city where Jesus taught, died, and rose, and where the church began. The Bible ends with a new Jerusalem coming down from heaven.',
    passages: [p('2 Samuel', '5'), p('Psalms', '122'), p('Luke', '19'), p('Revelation', '21')], books: ['2-samuel', '1-kings', 'psalms', 'luke', 'acts', 'revelation'], coords: [31.7767, 35.2345],
    image: 'Jerusalem Old City Temple Mount panorama',
  },
  {
    slug: 'the-temple', name: 'The Temple', era: 'kingdom', today: 'The Temple Mount, Jerusalem',
    tagline: 'Where heaven touched earth',
    summary: 'Solomon’s temple stood on Mount Moriah for nearly 400 years until Babylon burned it. A smaller second temple was finished in 516 BC and lavishly rebuilt by Herod; Jesus taught in its courts and called it his Father’s house. Rome destroyed it in AD 70. Only the Western Wall of Herod’s platform remains.',
    passages: [p('1 Kings', '8'), p('Ezra', '6'), p('John', '2')], books: ['1-kings', '2-chronicles', 'ezra', 'haggai', 'john', 'hebrews'], coords: [31.778, 35.2354],
    image: 'Western Wall Jerusalem',
  },
  {
    slug: 'mount-carmel', name: 'Mount Carmel', era: 'kingdom', today: 'The Carmel ridge near Haifa, Israel',
    tagline: 'Elijah’s showdown',
    summary: 'A green mountain ridge above the Mediterranean where Elijah challenged 450 prophets of Baal: two altars, one God who answers by fire. Fire fell on Elijah’s soaked sacrifice, and the drought ended with rain from the sea.',
    passages: [p('1 Kings', '18')], books: ['1-kings'], coords: [32.7167, 35.05],
    image: 'Mount Carmel Muhraqa',
  },
  {
    slug: 'samaria', name: 'Samaria', era: 'kingdom', today: 'Sebastia, West Bank',
    tagline: 'Capital of the northern kingdom',
    summary: 'King Omri built Samaria as the capital of the breakaway northern kingdom; Ahab and Jezebel ruled here and the prophets condemned its luxury. Assyria captured it in 722 BC and resettled the region, which is how the Samaritans of Jesus’ day came to be.',
    passages: [p('1 Kings', '16'), p('2 Kings', '17'), p('John', '4')], books: ['1-kings', '2-kings', 'amos', 'john'], coords: [32.2764, 35.19],
    image: 'Sebastia ruins Samaria',
  },
  {
    slug: 'nineveh', name: 'Nineveh', era: 'kingdom', today: 'Across the river from Mosul, Iraq',
    tagline: 'The great city that repented, then fell',
    summary: 'Capital of the Assyrian empire, the superpower that swallowed northern Israel. Jonah was sent here and the city repented; a century later Nahum announced its fall, and it was destroyed in 612 BC so completely that its location was forgotten until the 1800s.',
    passages: [p('Jonah', '3'), p('Nahum', '3')], books: ['jonah', 'nahum'], coords: [36.3594, 43.1528],
    image: 'Nineveh Mashki Gate',
  },

  // ---------- Exile ----------
  {
    slug: 'babylon', name: 'Babylon', era: 'exile', today: 'Near Hillah, Iraq',
    tagline: 'The city of exile',
    summary: 'Nebuchadnezzar’s magnificent capital on the Euphrates, with its Ishtar Gate and hanging gardens, destroyed Jerusalem and carried Judah into exile. Daniel served in its court and Ezekiel prophesied near it. In Revelation "Babylon" becomes the name for every proud, godless empire.',
    passages: [p('2 Kings', '25'), p('Psalms', '137'), p('Daniel', '5')], books: ['2-kings', 'daniel', 'jeremiah', 'revelation'], coords: [32.5422, 44.4211],
    image: 'Ishtar Gate Pergamon Museum',
  },
  {
    slug: 'susa', name: 'Susa', era: 'exile', today: 'Shush, southwestern Iran',
    tagline: 'Esther’s palace city',
    summary: 'A winter capital of the Persian kings. The whole book of Esther takes place in its palace, and Nehemiah was serving the king here when news of Jerusalem’s broken walls reached him. Daniel also had a vision "in the citadel of Susa".',
    passages: [p('Esther', '1'), p('Nehemiah', '1'), p('Daniel', '8')], books: ['esther', 'nehemiah', 'daniel'], coords: [32.1894, 48.2578],
    image: 'Susa Apadana ruins',
  },

  // ---------- Jesus ----------
  {
    slug: 'nazareth', name: 'Nazareth', era: 'jesus', today: 'Nazareth, Galilee, Israel',
    tagline: 'Where Jesus grew up',
    summary: 'A small hill village in Galilee, never mentioned in the Old Testament, where the angel appeared to Mary and where Jesus grew up in a carpenter’s home. "Can anything good come from Nazareth?" His own townspeople tried to throw him off a cliff.',
    passages: [p('Luke', '1'), p('Luke', '4'), p('John', '1')], books: ['luke', 'matthew', 'john'], coords: [32.7021, 35.2978],
    image: 'Nazareth Basilica of the Annunciation',
  },
  {
    slug: 'sea-of-galilee', name: 'The Sea of Galilee', era: 'jesus', today: 'Lake Kinneret, northern Israel',
    tagline: 'The lake at the center of Jesus’ ministry',
    summary: 'A freshwater lake about 13 miles long, ringed by fishing villages. Jesus called fishermen here, taught from a boat, calmed a storm, walked on the water, and cooked breakfast on its shore after the resurrection.',
    passages: [p('Mark', '1'), p('Mark', '4'), p('John', '21')], books: ['matthew', 'mark', 'luke', 'john'], coords: [32.8228, 35.5892],
    image: 'Sea of Galilee',
  },
  {
    slug: 'capernaum', name: 'Capernaum', era: 'jesus', today: 'Kfar Nahum, on the northern shore of Galilee',
    tagline: 'Jesus’ home base',
    summary: 'A fishing town on the lake where Jesus lived during his Galilean ministry, taught in the synagogue, healed Peter’s mother-in-law and the paralyzed man lowered through a roof. The ruins of a synagogue and of a house venerated as Peter’s can still be visited.',
    passages: [p('Mark', '2'), p('Matthew', '4'), p('John', '6')], books: ['matthew', 'mark', 'luke', 'john'], coords: [32.8806, 35.5731],
    image: 'Capernaum synagogue ruins',
  },
  {
    slug: 'samaria-sychar', name: 'Sychar and Jacob’s well', era: 'jesus', today: 'Near Nablus, West Bank',
    tagline: 'The woman at the well',
    summary: 'Near ancient Shechem, where Abraham first built an altar and Jacob bought land, Jesus sat tired by Jacob’s well and asked a Samaritan woman for a drink. Their conversation about living water led her whole town to believe.',
    passages: [p('John', '4'), p('Genesis', '33')], books: ['john', 'genesis'], coords: [32.2094, 35.285],
    image: 'Jacob’s Well Nablus',
  },
  {
    slug: 'mount-of-olives', name: 'The Mount of Olives', era: 'jesus', today: 'East of the Old City, Jerusalem',
    tagline: 'Gethsemane and the ascension',
    summary: 'The ridge facing Jerusalem across the Kidron valley. Jesus wept over the city from here, rode down it on Palm Sunday, taught about the end on its slope, prayed in the garden of Gethsemane at its foot, and ascended to heaven from it.',
    passages: [p('Luke', '19'), p('Matthew', '26'), p('Acts', '1')], books: ['matthew', 'luke', 'acts', 'zechariah'], coords: [31.7784, 35.2455],
    image: 'Mount of Olives Gethsemane olive trees',
  },
  {
    slug: 'golgotha', name: 'Golgotha and the tomb', era: 'jesus', today: 'Church of the Holy Sepulchre, Jerusalem',
    tagline: 'The cross and the empty tomb',
    summary: 'Just outside Jerusalem’s wall, at "the place of the skull", Jesus was crucified between two criminals and buried in a nearby garden tomb. On the third day the tomb was empty. Since the 300s the Church of the Holy Sepulchre has marked the traditional site.',
    passages: [p('John', '19'), p('John', '20'), p('Luke', '24')], books: ['matthew', 'mark', 'luke', 'john'], coords: [31.7785, 35.2298],
    image: 'Church of the Holy Sepulchre',
  },

  // ---------- Church ----------
  {
    slug: 'damascus', name: 'Damascus', era: 'church', today: 'Damascus, Syria',
    tagline: 'Where Saul met Jesus',
    summary: 'One of the oldest continuously inhabited cities in the world, capital of Israel’s old enemy Aram. Saul was on the road here to arrest Christians when a light from heaven knocked him down; he was baptized on "the street called Straight" and later escaped over the wall in a basket.',
    passages: [p('Acts', '9'), p('2 Corinthians', '11')], books: ['acts', '2-kings', 'galatians'], coords: [33.5138, 36.2765],
    image: 'Damascus Straight Street',
  },
  {
    slug: 'antioch', name: 'Antioch', era: 'church', today: 'Antakya, southern Turkey',
    tagline: 'First called Christians',
    summary: 'The third city of the Roman empire, where Greek-speaking believers first preached to non-Jews and the disciples were first called "Christians". Barnabas brought Saul here to teach, and the church sent them out on the first missionary journey.',
    passages: [p('Acts', '11'), p('Acts', '13')], books: ['acts', 'galatians'], coords: [36.2, 36.1603],
    image: 'Antioch Saint Peter cave church Antakya',
  },
  {
    slug: 'philippi', name: 'Philippi', era: 'church', today: 'Ruins near Kavala, Greece',
    tagline: 'First church in Europe',
    summary: 'A Roman colony in Macedonia where Paul met Lydia by the river, was jailed with Silas after an earthquake-shaking prayer meeting, and saw the jailer’s whole household baptized. The church here later sent him gifts in prison, and he wrote them his most joyful letter.',
    passages: [p('Acts', '16'), p('Philippians', '1')], books: ['acts', 'philippians'], coords: [41.0128, 24.2861],
    image: 'Philippi archaeological site',
  },
  {
    slug: 'athens', name: 'Athens', era: 'church', today: 'Athens, Greece',
    tagline: 'Paul at the Areopagus',
    summary: 'The intellectual capital of the ancient world, full of temples and philosophers. Paul, distressed by its idols, preached about "an unknown god" on Mars Hill beneath the Acropolis. A few believed, including Dionysius, a member of the council.',
    passages: [p('Acts', '17')], books: ['acts'], coords: [37.9722, 23.7239],
    image: 'Areopagus Athens Acropolis',
  },
  {
    slug: 'corinth', name: 'Corinth', era: 'church', today: 'Ancient Corinth, Greece',
    tagline: 'Wealthy port, troubled church',
    summary: 'A busy commercial city on the narrow isthmus between two seas, famous for wealth and immorality. Paul spent eighteen months here making tents with Priscilla and Aquila, and later wrote two long letters to its gifted but divided church.',
    passages: [p('Acts', '18'), p('1 Corinthians', '1')], books: ['acts', '1-corinthians', '2-corinthians', 'romans'], coords: [37.9058, 22.8794],
    image: 'Ancient Corinth Temple of Apollo',
  },
  {
    slug: 'ephesus', name: 'Ephesus', era: 'church', today: 'Ruins near Selçuk, western Turkey',
    tagline: 'Temple of Artemis, church of Paul and John',
    summary: 'A great port city and home of the temple of Artemis, one of the seven wonders of the ancient world. Paul taught here for three years, a riot filled its theater, believers burned their magic books, and later John and Timothy led the church. Its marble streets are among the best-preserved anywhere.',
    passages: [p('Acts', '19'), p('Ephesians', '1'), p('Revelation', '2')], books: ['acts', 'ephesians', '1-timothy', 'revelation'], coords: [37.9411, 27.3419],
    image: 'Ephesus Library of Celsus',
  },
  {
    slug: 'rome', name: 'Rome', era: 'church', today: 'Rome, Italy',
    tagline: 'Capital of the empire',
    summary: 'The center of the world that ruled Judea. Paul wrote his greatest letter to the church here before he had seen it, arrived as a prisoner, and taught for two years under house arrest. Tradition says both Peter and Paul were martyred here under Nero.',
    passages: [p('Acts', '28'), p('Romans', '1')], books: ['acts', 'romans', '2-timothy'], coords: [41.8902, 12.4922],
    image: 'Roman Forum Rome',
  },
  {
    slug: 'patmos', name: 'Patmos', era: 'church', today: 'Patmos, Greek islands',
    tagline: 'Where Revelation was written',
    summary: 'A small rocky island in the Aegean, used by Rome as a place of exile. John was here "because of the word of God" when, on the Lord’s Day, he saw the risen Christ and received the visions of Revelation for the seven churches.',
    passages: [p('Revelation', '1')], books: ['revelation'], coords: [37.3094, 26.5467],
    image: 'Patmos island cave of the Apocalypse',
  },
]

export const placeBySlug = (slug: string) => PLACES.find((x) => x.slug === slug)
