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
    summary: "Adam and Eve were the first humans, made in God's image and placed in a garden in Eden to work it and enjoy it, with every tree but one open to them. They were given each other, a task, and a walk with God in the cool of the day. Tempted by the serpent to doubt God's goodness, they ate from the one forbidden tree, hid, blamed, and were sent out of the garden into a world of thorns, pain, and death. Yet even the sentence carried a promise: the woman's offspring would one day crush the serpent's head. Their story explains why the world is both beautiful and broken, and Paul calls Jesus the \"last Adam\" who undoes what the first one did.",
    passages: [p('Genesis', '2'), p('Genesis', '3')], books: ['genesis', 'romans'],
    image: 'Gustave Doré Adam and Eve driven out of Eden',
  },
  {
    slug: 'noah', name: 'Noah', era: 'beginnings', dates: 'Before Abraham',
    tagline: 'Built the ark',
    summary: "Noah lived in a world so violent that God decided to wash it clean, and he was the one man who \"walked faithfully with God.\" Told to build a boat about 450 feet long on dry land, he did exactly as commanded and spent years at it while, as Peter says, he preached to neighbors who did not listen. He and his family and the animals rode out the flood for a year. When the dove came back with an olive leaf and the waters receded, Noah's first act was to build an altar, and God made a covenant with every living creature, promising never again to destroy the earth with a flood and hanging his bow in the clouds as the sign. Noah's later drunkenness shows that even the flood did not wash sin out of the human heart.",
    passages: [p('Genesis', '6'), p('Genesis', '8-9')], books: ['genesis', 'hebrews', '1-peter'],
    image: 'Gustave Doré The Deluge Noah ark',
  },

  // ---------- Patriarchs ----------
  {
    slug: 'abraham', name: 'Abraham', era: 'patriarchs', dates: 'c. 2000 BC',
    tagline: 'Father of the faithful',
    summary: "Abraham was born Abram in the wealthy city of Ur and was 75, childless, and living in Haran when God told him to leave everything for a land he would be shown, promising to make him a great nation and to bless all peoples through him. He went. For 25 years he waited for the promised son, sometimes trusting (God \"credited it to him as righteousness\"), sometimes scheming, as with Hagar. He rescued Lot, bargained with God for Sodom, and welcomed three strangers who turned out to be the LORD. When Isaac finally came, God asked Abraham to give him back on Mount Moriah, and he was willing; a ram was provided instead. He died at 175, owning only a burial cave in the land he was promised. Jews, Christians, and Muslims all call him father, and the New Testament holds him up as the model of faith.",
    passages: [p('Genesis', '12'), p('Genesis', '15'), p('Genesis', '22')], books: ['genesis', 'romans', 'hebrews'],
    image: 'Gustave Doré Abraham',
  },
  {
    slug: 'sarah', name: 'Sarah', era: 'patriarchs', dates: 'c. 2000 BC',
    tagline: 'Laughed, then bore Isaac',
    summary: "Sarah, originally Sarai, was Abraham's wife and half-sister, beautiful enough that he twice passed her off as only his sister to save his own skin, and twice God intervened to protect her. She left Ur and Haran with him and shared decades of waiting for the promised child. In frustration she gave her servant Hagar to Abraham, then resented the result. When she overheard the visitors say she would have a son within the year, she laughed at the idea of a ninety-year-old having a baby, and was caught. But God did what he said; she named the boy Isaac, \"he laughs,\" and said, \"God has brought me laughter.\" She died at 127 and was buried in the cave at Hebron. Peter praises her as a woman who trusted God, and Hebrews lists her among the heroes of faith.",
    passages: [p('Genesis', '18'), p('Genesis', '21')], books: ['genesis', 'hebrews', '1-peter'],
    image: 'Gustave Doré Abraham and the three angels',
  },
  {
    slug: 'isaac', name: 'Isaac', era: 'patriarchs', dates: 'c. 1900 BC',
    tagline: 'The son of promise',
    summary: "Isaac was the long-promised son, born when Abraham was 100 and Sarah 90, whose name means \"he laughs.\" As a boy he carried the wood up Mount Moriah and asked where the lamb was, and was bound on the altar before God stopped his father's hand. Abraham's servant found him a wife, Rebekah, at a well in Haran, and Genesis says he loved her and was comforted after his mother's death. He was a quieter man than his father or his sons: he dug again the wells Abraham had dug, moved on when the Philistines quarreled over them, and prayed twenty years for children before the twins came. In old age, blind, he was tricked into giving the blessing to Jacob instead of Esau, and trembled when he realized it, yet let it stand. He lived to 180.",
    passages: [p('Genesis', '22'), p('Genesis', '24'), p('Genesis', '27')], books: ['genesis'],
    image: 'Gustave Doré The Trial of the Faith of Abraham Isaac',
  },
  {
    slug: 'rebekah', name: 'Rebekah', era: 'patriarchs', dates: 'c. 1900 BC',
    tagline: 'Isaac’s wife, mother of twins',
    summary: "Rebekah was drawing water at the well outside Haran when Abraham's servant arrived praying for a sign; she offered to water his ten camels too, and that decided it. She left her family the next day to marry a man she had never met, and Isaac loved her. After twenty years of barrenness she conceived twins who struggled in her womb, and God told her the older would serve the younger. She favored Jacob, and when Isaac prepared to bless Esau she engineered the deception, dressing Jacob in Esau's clothes and goatskins. Then she had to send Jacob away to her brother Laban to escape Esau's anger, and never saw him again. She was buried beside Isaac in the cave at Hebron. Her story mixes real faith with a willingness to help God's plan along by her own means.",
    passages: [p('Genesis', '24'), p('Genesis', '25')], books: ['genesis'],
    image: 'Gustave Doré Eliezer and Rebekah',
  },
  {
    slug: 'jacob', name: 'Jacob (Israel)', era: 'patriarchs', dates: 'c. 1850 BC',
    tagline: 'The wrestler renamed Israel',
    summary: "Jacob was born gripping his twin brother's heel, and his name means something like \"heel-grabber\" or \"deceiver.\" He bought Esau's birthright for a bowl of stew and stole his blessing by disguise, then fled to Haran, where his uncle Laban out-cheated him for twenty years. On the way God met him in a dream at Bethel with a stairway to heaven and repeated Abraham's promise to a man who had done nothing to deserve it. Returning home with two wives, two concubines, eleven sons, and great flocks, he wrestled all night with a mysterious man at the Jabbok river, refused to let go without a blessing, and walked away limping and renamed Israel, \"he struggles with God.\" His twelve sons became the twelve tribes. He ended his life in Egypt, blessing his grandsons and asking to be buried in Canaan.",
    passages: [p('Genesis', '28'), p('Genesis', '32')], books: ['genesis', 'hosea'],
    image: 'Gustave Doré Jacob wrestling with the angel',
  },
  {
    slug: 'joseph', name: 'Joseph', era: 'patriarchs', dates: 'c. 1800 BC',
    tagline: 'From the pit to Pharaoh’s court',
    summary: "Joseph was Jacob's favorite, the son of his old age and of his beloved Rachel, and his brothers hated him for the special robe and the dreams in which they bowed to him. They sold him to traders for twenty shekels and told their father he was dead. In Egypt he ran Potiphar's household, was falsely accused by Potiphar's wife, and spent years in prison, where he interpreted dreams for two of Pharaoh's officials. When Pharaoh himself had a dream, Joseph was brought from the dungeon, explained the coming famine, and was made second in the kingdom at thirty. His brothers came to buy grain and did not recognize him; after testing them he wept and revealed himself. He fed his whole family in Egypt and told them, \"You intended to harm me, but God intended it for good.\" His bones were carried out at the exodus and buried at Shechem.",
    passages: [p('Genesis', '37'), p('Genesis', '45'), p('Genesis', '50')], books: ['genesis'],
    image: 'Gustave Doré Joseph makes himself known to his brethren',
  },
  {
    slug: 'job', name: 'Job', era: 'patriarchs', dates: 'Traditionally the patriarchal era',
    tagline: 'Suffered and still trusted',
    summary: "Job was a wealthy, respected man in the land of Uz, with ten children, thousands of animals, and a habit of sacrificing for his family just in case. In a single day raiders and storms took everything, and then his health went too. His wife told him to curse God and die; three friends came to comfort him and, after seven silent days, spent thirty chapters arguing that he must have deserved it. Job insisted he had not, demanded a hearing with God, and in the middle of his agony cried, \"I know that my redeemer lives.\" God finally answered from a storm, not with explanations but with questions about the sea, the stars, and the wild animals. Job put his hand over his mouth. God rebuked the friends for not speaking the truth about him \"as my servant Job has,\" and gave Job twice what he had lost. James points to his perseverance.",
    passages: [p('Job', '1'), p('Job', '19'), p('Job', '42')], books: ['job', 'james'],
    image: 'Gustave Doré Job and his friends',
  },

  // ---------- Exodus ----------
  {
    slug: 'moses', name: 'Moses', era: 'exodus', dates: 'c. 15th-13th century BC',
    tagline: 'Led Israel out of Egypt',
    summary: "Moses was born to Hebrew slaves in Egypt under a death sentence for baby boys, hidden in a basket in the Nile, and raised by Pharaoh's daughter in the palace. At forty he killed an Egyptian who was beating a Hebrew and fled to Midian, where he kept sheep for forty more years. At eighty God spoke to him from a burning bush and sent him back to confront Pharaoh. Through ten plagues, the Passover, and the parting of the sea, he led Israel out, then up to Sinai where he received the Law and the pattern for the tabernacle, and spoke with God \"as one speaks to a friend.\" For forty years he put up with a complaining nation, interceded when God threatened to destroy it, and struck a rock in anger, which cost him entry to the land. He died on Mount Nebo looking across at it, and God buried him. Deuteronomy calls him the prophet no one else has equaled.",
    passages: [p('Exodus', '3'), p('Exodus', '14'), p('Deuteronomy', '34')], books: ['exodus', 'numbers', 'deuteronomy', 'hebrews'],
    image: 'Gustave Doré Moses breaking the tables of the law',
  },
  {
    slug: 'aaron', name: 'Aaron', era: 'exodus', dates: 'c. 15th-13th century BC',
    tagline: 'First high priest',
    summary: "Aaron was Moses' older brother by three years, a gifted speaker whom God appointed to be Moses' mouthpiece before Pharaoh. His staff became a snake and swallowed the magicians' snakes, and it later budded with almond blossoms to settle who God had chosen as priest. He was Israel's first high priest, consecrated in elaborate robes with a breastplate of twelve stones, and only he could enter the Most Holy Place, once a year, on the Day of Atonement. Yet while Moses was on the mountain Aaron made the golden calf and then made excuses for it, and he later joined Miriam in grumbling against Moses. Two of his sons died for offering unauthorized fire. He died on Mount Hor at 123, and the priesthood passed to his son Eleazar. Hebrews contrasts his repeated sacrifices with the once-for-all sacrifice of Jesus.",
    passages: [p('Exodus', '28'), p('Exodus', '32'), p('Numbers', '17')], books: ['exodus', 'leviticus', 'numbers'],
    image: 'Gustave Doré Aaron',
  },
  {
    slug: 'miriam', name: 'Miriam', era: 'exodus', dates: 'c. 15th-13th century BC',
    tagline: 'Prophetess who led the song',
    summary: "Miriam was the older sister of Aaron and Moses. As a girl she stood watch when their mother set baby Moses adrift in the Nile, and when Pharaoh's daughter found him, Miriam stepped forward and cleverly arranged for his own mother to be paid to nurse him. After the crossing of the sea she took a tambourine and led the women in dancing and singing the earliest song in the Bible: \"Sing to the LORD, for he is highly exalted.\" Exodus calls her a prophet, and Micah lists her with Moses and Aaron as the leaders God sent ahead of Israel. Later, jealous of Moses' unique role and critical of his foreign wife, she spoke against him and was struck with leprosy for seven days, and the whole camp waited until she was restored. She died in the wilderness at Kadesh before the people entered the land.",
    passages: [p('Exodus', '2'), p('Exodus', '15'), p('Numbers', '12')], books: ['exodus', 'numbers'],
    image: 'Gustave Doré Miriam song of the Israelites',
  },
  {
    slug: 'joshua', name: 'Joshua', era: 'exodus', dates: 'c. 14th-12th century BC',
    tagline: 'Led Israel into the land',
    summary: "Joshua was Moses' aide from his youth, the commander who fought Amalek while Moses held up his hands, and the one who waited on the mountain while Moses met God. Of the twelve spies sent into Canaan only he and Caleb urged the people to go in and trust God; the other ten spread fear, and the whole generation died in the wilderness. Forty years later God told Joshua three times to be strong and courageous and led him across the Jordan on dry ground. He circled Jericho, was tricked by the Gibeonites, saw the sun stand still at Gibeon, and divided the land among the tribes. Old and near death, he gathered Israel at Shechem and set them a choice: \"As for me and my household, we will serve the LORD.\" His name is the Hebrew form of Jesus, and both mean \"the LORD saves.\"",
    passages: [p('Joshua', '1'), p('Joshua', '6'), p('Joshua', '24')], books: ['joshua', 'numbers'],
    image: 'Gustave Doré Joshua commanding the sun to stand still',
  },
  {
    slug: 'caleb', name: 'Caleb', era: 'exodus', dates: 'c. 14th-12th century BC',
    tagline: 'Wholehearted at 85',
    summary: "Caleb, from the tribe of Judah, was one of the twelve men Moses sent to scout Canaan. He saw the same walled cities and giants as the others but came back saying, \"We should go up and take possession of the land, for we can certainly do it.\" The people nearly stoned him. God said Caleb had \"a different spirit\" and followed him wholeheartedly, and promised he would enter the land when all his generation had died. Forty-five years later, at eighty-five, Caleb stood before Joshua and said he was as strong as the day Moses sent him, and asked for the hill country of Hebron, giants and all. He took it, drove out the three sons of Anak, and gave his daughter Achsah springs of water when she asked. He is the Bible's picture of faith that does not fade with age.",
    passages: [p('Numbers', '13-14'), p('Joshua', '14')], books: ['numbers', 'joshua'],
    image: 'Gustave Doré The return of the spies from the land of promise',
  },

  // ---------- Judges ----------
  {
    slug: 'deborah', name: 'Deborah', era: 'judges', dates: 'c. 12th century BC',
    tagline: 'Prophetess and judge',
    summary: "Deborah was a prophet and the only woman among the judges, holding court under a palm tree in the hills between Ramah and Bethel where Israelites came to her for decisions. In her day the Canaanite king Jabin and his general Sisera, with 900 iron chariots, had oppressed Israel for twenty years. She summoned Barak and gave him God's command to gather ten thousand men on Mount Tabor; he agreed only if she came too, and she did, though she told him the honor of the victory would go to a woman. A sudden storm turned the Kishon valley to mud, the chariots bogged down, and Sisera fled on foot to the tent of Jael, who drove a tent peg through his head while he slept. Deborah's victory song in Judges 5 is one of the oldest passages in the Bible, and she calls herself \"a mother in Israel.\"",
    passages: [p('Judges', '4'), p('Judges', '5')], books: ['judges'],
    image: 'Gustave Doré Deborah',
  },
  {
    slug: 'gideon', name: 'Gideon', era: 'judges', dates: 'c. 12th century BC',
    tagline: 'Mighty warrior, hiding in a winepress',
    summary: "Gideon was threshing wheat in a winepress, hiding from Midianite raiders who stole every harvest, when the angel of the LORD greeted him as a \"mighty warrior.\" He objected that his clan was the weakest and he the least. He asked for a sign, then another, then laid out a fleece two nights running, and God patiently gave every sign. He tore down his father's Baal altar by night. Then God cut his army from 32,000 to 300 so that Israel could not boast, and with trumpets, empty jars, and torches Gideon's men surrounded the Midianite camp and watched the enemy destroy itself in panic. Gideon refused to be king, saying the LORD would rule, yet made a golden ephod that became a snare. He had seventy sons, and after his death his son Abimelech murdered them all. Hebrews still lists him among the faithful.",
    passages: [p('Judges', '6'), p('Judges', '7')], books: ['judges', 'hebrews'],
    image: 'Gustave Doré Gideon',
  },
  {
    slug: 'ruth', name: 'Ruth', era: 'judges', dates: 'c. 1100 BC',
    tagline: 'Loyal foreigner, David’s great-grandmother',
    summary: "Ruth was a young widow from Moab, a nation Israel had been told to keep at a distance, married into an Israelite family that had fled to Moab during a famine. When her husband, his brother, and their father all died, her mother-in-law Naomi set out for Bethlehem and urged both daughters-in-law to go home. Orpah went. Ruth would not: \"Where you go I will go... your people will be my people and your God my God.\" In Bethlehem she went out to glean grain behind the harvesters and happened into the field of Boaz, a relative of Naomi, who noticed her kindness and protected her. Naomi coached her to ask Boaz to act as kinsman-redeemer, and he did, marrying her. Their son Obed was the grandfather of King David, and Matthew lists Ruth, the foreigner, in the family tree of Jesus.",
    passages: [p('Ruth', '1'), p('Ruth', '4')], books: ['ruth', 'matthew'],
    image: 'Gustave Doré Ruth and Boaz',
  },
  {
    slug: 'samson', name: 'Samson', era: 'judges', dates: 'c. 11th century BC',
    tagline: 'Strength without self-control',
    summary: "Samson was promised to a childless couple by an angel and set apart from birth as a Nazirite, never to cut his hair, drink wine, or touch a dead body. The Spirit gave him staggering strength: he tore apart a lion with his hands, killed a thousand Philistines with a donkey's jawbone, and carried off the gates of Gaza. But he broke every vow, chased Philistine women, and treated his gift as a toy. Delilah wheedled his secret out of him for 1,100 shekels of silver from each Philistine ruler, shaved his head while he slept, and the Philistines blinded him and set him to grinding grain in prison. At a festival of their god Dagon they brought him out to mock him; he prayed once more, pushed the pillars apart, and killed more in his death than in his life. He judged Israel twenty years and is named in Hebrews 11 among the faithful.",
    passages: [p('Judges', '13'), p('Judges', '16')], books: ['judges', 'hebrews'],
    image: 'Gustave Doré Samson destroys the temple',
  },
  {
    slug: 'samuel', name: 'Samuel', era: 'judges', dates: 'c. 1100-1010 BC',
    tagline: 'Last judge, first kingmaker',
    summary: "Samuel was the answer to his mother Hannah's tearful prayer at Shiloh, and she gave him back to God as soon as he was weaned to serve under the priest Eli. As a boy he heard God calling his name in the night and answered, \"Speak, for your servant is listening,\" and his first message was judgment on Eli's house. He grew up to be a prophet whom \"all Israel\" recognized, the last of the judges, and the man who led the nation back to God at Mizpah. When the elders demanded a king like other nations, Samuel warned them what a king would cost, then anointed Saul, and later had to tell Saul that God had rejected him for disobedience. Grieving, he was sent to Bethlehem to anoint the shepherd boy David. Even after his death, Saul tried to consult his ghost. Psalm 99 ranks him with Moses and Aaron.",
    passages: [p('1 Samuel', '3'), p('1 Samuel', '8'), p('1 Samuel', '16')], books: ['1-samuel'],
    image: 'Gustave Doré Samuel',
  },

  // ---------- United kingdom ----------
  {
    slug: 'saul', name: 'Saul', era: 'kingdom', dates: 'c. 1050-1010 BC',
    tagline: 'Israel’s first king',
    summary: "Saul, a Benjamite who stood a head taller than anyone in Israel, was out looking for his father's lost donkeys when Samuel anointed him as the nation's first king. He began well: modest, filled with the Spirit, victorious over the Ammonites. But he offered a sacrifice he had no right to offer rather than wait for Samuel, spared the Amalekite king and livestock God had told him to destroy, and heard Samuel say that to obey is better than sacrifice and that the kingdom was torn from him. The Spirit left him and an evil spirit tormented him; David's harp soothed him, and then David's success enraged him. He spent years hunting David through the wilderness, massacred the priests of Nob, and on the eve of his last battle consulted a medium at Endor. Wounded on Mount Gilboa, he fell on his own sword. David mourned him in one of the Bible's great laments.",
    passages: [p('1 Samuel', '10'), p('1 Samuel', '15'), p('1 Samuel', '31')], books: ['1-samuel'],
    image: 'Gustave Doré Saul and the witch of Endor',
  },
  {
    slug: 'david', name: 'David', era: 'kingdom', dates: 'c. 1010-970 BC',
    tagline: 'Shepherd, poet, king',
    summary: "David was the youngest of eight sons, the one left out watching sheep when Samuel came to Bethlehem, yet God said, \"The LORD looks at the heart.\" As a teenager he killed Goliath with a sling; as a young man he became Saul's musician, Jonathan's closest friend, and Saul's target, and spent years hiding in caves, twice sparing Saul's life. Crowned at thirty, he united the tribes, took Jerusalem, brought the ark there dancing, and received God's promise that his throne would last forever. Then he stayed home from war, took Bathsheba, and had her husband killed; Nathan confronted him, and Psalm 51 is his repentance. His later years were full of family tragedy, including Absalom's rebellion. He wrote about half the Psalms, gathered materials for the temple, and died after forty years as king. The Gospels open by calling Jesus the son of David.",
    passages: [p('1 Samuel', '17'), p('2 Samuel', '7'), p('Psalms', '51')], books: ['1-samuel', '2-samuel', 'psalms', '1-chronicles'],
    image: 'Gustave Doré David and Goliath',
  },
  {
    slug: 'solomon', name: 'Solomon', era: 'kingdom', dates: 'c. 970-930 BC',
    tagline: 'Wisest king, divided heart',
    summary: "Solomon, son of David and Bathsheba, became king as a young man and, when God offered him anything, asked for a discerning heart to govern well; God gave him wisdom, and riches and honor besides. His judgment between two mothers claiming one baby became famous, and the Queen of Sheba traveled from Arabia to test him and left breathless. He built the temple in seven years, dedicating it with a prayer that still shapes how we think about God's presence, and he wrote or collected thousands of proverbs and songs. But he also built a palace that took thirteen years, taxed and conscripted the people heavily, and married 700 wives and 300 concubines, many of them foreign princesses whose gods he eventually worshiped. God told him the kingdom would be torn away, and after his death it split in two. Ecclesiastes reads like his verdict on a life of everything.",
    passages: [p('1 Kings', '3'), p('1 Kings', '8'), p('1 Kings', '11')], books: ['1-kings', 'proverbs', 'ecclesiastes', 'song-of-songs'],
    image: 'Gustave Doré The judgment of Solomon',
  },

  // ---------- Divided kingdom & prophets ----------
  {
    slug: 'elijah', name: 'Elijah', era: 'prophets', dates: 'c. 870-850 BC',
    tagline: 'Prophet of fire',
    summary: "Elijah appears out of nowhere, a rough man from Gilead in a hairy cloak, to tell King Ahab there would be no rain until he said so. He hid by a brook where ravens fed him, then with a widow in Sidon whose flour never ran out and whose dead son he raised. After three years he challenged 450 prophets of Baal on Mount Carmel and fire fell on his water-soaked altar. Then Jezebel threatened his life and he ran into the desert asking to die; God fed him, sent him forty days to Sinai, and spoke not in wind or earthquake or fire but in a gentle whisper, and gave him work to do. He confronted Ahab over Naboth's stolen vineyard and called fire on soldiers sent to arrest him. He did not die but was taken up in a whirlwind with chariots of fire. Malachi promised his return, and he appeared with Moses at Jesus' transfiguration.",
    passages: [p('1 Kings', '17'), p('1 Kings', '18'), p('1 Kings', '19')], books: ['1-kings', '2-kings', 'james'],
    image: 'Gustave Doré Elijah',
  },
  {
    slug: 'elisha', name: 'Elisha', era: 'prophets', dates: 'c. 850-800 BC',
    tagline: 'Elijah’s successor',
    summary: "Elisha was plowing with twelve pairs of oxen when Elijah threw his cloak over him; he slaughtered the oxen, fed the people, and followed. When Elijah was taken up, Elisha asked for a double portion of his spirit and picked up the fallen cloak. For about fifty years he was God's prophet in the northern kingdom, and his ministry was full of practical mercy: a widow's oil that filled every borrowed jar, a Shunammite woman's son raised from death, poisoned stew made safe, a hundred men fed with twenty loaves, an axe head that floated, the Syrian general Naaman cured of leprosy by bathing in the Jordan, a blinded army led into Samaria and then fed and sent home. Kings sought him out, and Jesus pointed to Naaman's healing to show God's love for outsiders. Even Elisha's bones brought a dead man to life.",
    passages: [p('2 Kings', '2'), p('2 Kings', '4'), p('2 Kings', '5')], books: ['2-kings'],
    image: 'Gustave Doré Elisha',
  },
  {
    slug: 'jonah', name: 'Jonah', era: 'prophets', dates: 'c. 780 BC',
    tagline: 'Ran from God, then sulked',
    summary: "Jonah son of Amittai was a prophet from Galilee who had once delivered good news to Israel's king. Then God sent him to Nineveh, the capital of Assyria, the cruelest empire of the day and Israel's deadly enemy, to warn it of judgment. Jonah bought a ticket for Tarshish, the opposite end of the known world. A storm nearly sank the ship, the pagan sailors reluctantly threw him overboard at his own request, and a great fish swallowed him; from inside it he prayed a psalm of thanks and was spat onto dry land. He then walked through Nineveh preaching one sentence, and the whole city, king included, repented in sackcloth. Jonah was furious that God had shown mercy. God grew a plant to shade him, then killed it, and asked whether Jonah cared more about a plant than about 120,000 people. Jesus called his three days in the fish a sign of his own death and resurrection.",
    passages: [p('Jonah', '1'), p('Jonah', '4')], books: ['jonah', 'matthew'],
    image: 'Gustave Doré Jonah cast forth by the whale',
  },
  {
    slug: 'amos', name: 'Amos', era: 'prophets', dates: 'c. 760 BC',
    tagline: 'Shepherd who preached justice',
    summary: "Amos was a shepherd and a tender of sycamore-fig trees from Tekoa, a village south of Bethlehem in Judah, with no training as a prophet and no wish to be one: \"I was neither a prophet nor the son of a prophet.\" Around 760 BC God sent him north to Israel at the height of its prosperity under Jeroboam II. He began by condemning the surrounding nations, and his hearers must have cheered, until he turned on Israel itself: the wealthy lounging on ivory beds while selling the needy for a pair of sandals, the courts taking bribes, the crowded shrine at Bethel where God said, \"I hate, I despise your religious festivals.\" Amaziah the priest told him to go home and prophesy in Judah. Amos saw visions of locusts, fire, a plumb line, and a basket of ripe fruit, and warned that the day of the LORD would be darkness. His book ends with a promise of restoration that James quotes in Acts 15.",
    passages: [p('Amos', '5'), p('Amos', '7')], books: ['amos'],
    image: 'Gustave Doré Amos',
  },
  {
    slug: 'hosea', name: 'Hosea', era: 'prophets', dates: 'c. 750-715 BC',
    tagline: 'Married an unfaithful wife',
    summary: "Hosea prophesied in the northern kingdom during its last chaotic decades before Assyria destroyed it in 722 BC, a period of coups, assassinations, and frantic alliances. God gave him the strangest of assignments: to marry Gomer, a woman who would be unfaithful, and to name their children Jezreel, \"Not loved,\" and \"Not my people.\" When Gomer left him and ended up for sale, God told Hosea to go and buy her back and love her again. His marriage became his sermon: Israel was the wife who chased other lovers, Baal and foreign kings, and God was the husband whose anger and love wrestled within him. \"How can I give you up, Ephraim?\" Hosea's book is full of that tenderness alongside the judgment. Jesus quoted his line \"I desire mercy, not sacrifice\" twice, and Paul used his promise that \"Not my people\" would become \"my people.\"",
    passages: [p('Hosea', '1'), p('Hosea', '3'), p('Hosea', '11')], books: ['hosea'],
    image: 'Gustave Doré Hosea',
  },
  {
    slug: 'isaiah', name: 'Isaiah', era: 'prophets', dates: 'c. 740-680 BC',
    tagline: 'Saw the Lord, spoke of the Servant',
    summary: "Isaiah was a prophet in Jerusalem for about forty years, from the death of King Uzziah around 740 BC through the reigns of Ahaz and Hezekiah, apparently a man of standing with access to kings. In the temple he saw the LORD on a throne, high and exalted, heard seraphim crying \"Holy, holy, holy,\" confessed his unclean lips, and volunteered: \"Here am I. Send me!\" He told the faithless Ahaz that a virgin would conceive a son called Immanuel, walked barefoot for three years as a sign against trusting Egypt, and assured Hezekiah that Assyria would not take Jerusalem. His book contains the Bible's richest pictures of the coming king and suffering servant, of a wolf living with the lamb and swords beaten into plowshares, and of new heavens and a new earth. Jewish tradition says King Manasseh had him sawn in two, a fate Hebrews 11 may allude to.",
    passages: [p('Isaiah', '6'), p('Isaiah', '9'), p('Isaiah', '53')], books: ['isaiah', '2-kings'],
    image: 'Gustave Doré Isaiah',
  },
  {
    slug: 'hezekiah', name: 'Hezekiah', era: 'prophets', dates: 'c. 715-686 BC',
    tagline: 'Prayed and Jerusalem was spared',
    summary: "Hezekiah became king of Judah at 25, in a kingdom that had drifted into idolatry under his father Ahaz, and set about a sweeping reform: he smashed the idols, even the bronze snake Moses had made, reopened the temple, and invited the whole nation, north and south, to a Passover such as had not been seen since Solomon. He also dug a 1,750-foot tunnel through solid rock to bring water inside Jerusalem's walls, which tourists still wade through. When Sennacherib of Assyria invaded and his officers stood outside the wall mocking the LORD, Hezekiah spread their letter before God in the temple and prayed, and Isaiah promised deliverance; that night the Assyrian army was struck down. Later, deathly ill, he prayed and was given fifteen more years, but he foolishly showed all his treasures to envoys from Babylon, and Isaiah told him where they would one day go.",
    passages: [p('2 Kings', '19'), p('2 Kings', '20')], books: ['2-kings', '2-chronicles', 'isaiah'],
    image: 'Gustave Doré Hezekiah',
  },
  {
    slug: 'josiah', name: 'Josiah', era: 'prophets', dates: '640-609 BC',
    tagline: 'The boy king who found the Law',
    summary: "Josiah became king of Judah at eight years old after his father was assassinated, following fifty-five years of idolatry under his grandfather Manasseh. At sixteen he began to seek God, at twenty he began purging idols from Judah, and at twenty-six, during repairs to the temple, the high priest found the long-neglected Book of the Law. When it was read to Josiah he tore his robes in grief, sent to the prophetess Huldah, and then gathered the whole nation to hear the book read and to renew the covenant. He demolished the shrine at Bethel, fulfilling a prophecy made three centuries earlier, and celebrated a Passover unlike any since the days of the judges. Jeremiah and Zephaniah preached during his reign. He died at thirty-nine, needlessly riding out to battle Pharaoh Necho at Megiddo, and Jeremiah wrote laments for him. The Bible says no king before or after turned to God as he did.",
    passages: [p('2 Kings', '22'), p('2 Kings', '23')], books: ['2-kings', '2-chronicles', 'zephaniah'],
    image: 'Gustave Doré Josiah',
  },
  {
    slug: 'jeremiah', name: 'Jeremiah', era: 'prophets', dates: 'c. 627-580 BC',
    tagline: 'The weeping prophet',
    summary: "Jeremiah was a priest's son from Anathoth, called as a young man around 627 BC and told that God had known him before he was formed in the womb. He protested that he could not speak. For forty years he preached to Jerusalem through the reigns of its last five kings, warning that Babylon would take the city unless the people repented, and that trusting the temple to save them was a lie. He was mocked, beaten, put in stocks, tried for treason, dropped into a muddy cistern, and forbidden to marry as a sign of coming disaster. He wept over his people while they refused him, and his honest complaints to God are some of the rawest prayers in Scripture. Yet he also bought a field while Babylon besieged the city to show that life would return, wrote the exiles to settle down and pray for Babylon, and promised a new covenant written on hearts. After the fall he was dragged to Egypt, where tradition says he died.",
    passages: [p('Jeremiah', '1'), p('Jeremiah', '29'), p('Jeremiah', '31')], books: ['jeremiah', 'lamentations'],
    image: 'Gustave Doré Jeremiah',
  },

  // ---------- Exile & return ----------
  {
    slug: 'ezekiel', name: 'Ezekiel', era: 'exile', dates: 'c. 593-571 BC',
    tagline: 'Prophet among the exiles',
    summary: "Ezekiel was a young priest carried off to Babylon in 597 BC, ten years before Jerusalem fell, and settled with other exiles by the Kebar canal. There, at thirty, when he should have begun temple service, he saw instead a whirlwind, four living creatures, wheels within wheels, and a throne with a figure like a man on it, God's glory on the move, not confined to the ruined temple. He was made a watchman for his people and delivered his messages in startling ways: lying on his side for over a year, eating bread baked over dung, shaving his head with a sword, refusing to mourn when his wife died. He saw God's glory leave the temple, and later saw a valley of dry bones rattle back to life and a river flowing from a restored temple. His promise of a new heart and a new spirit prepares the way for the New Testament. He is called \"son of man\" over ninety times.",
    passages: [p('Ezekiel', '1'), p('Ezekiel', '37')], books: ['ezekiel'],
    image: 'Gustave Doré The vision of the valley of dry bones',
  },
  {
    slug: 'daniel', name: 'Daniel', era: 'exile', dates: 'c. 605-535 BC',
    tagline: 'Faithful in Babylon',
    summary: "Daniel was a teenager of noble family when Nebuchadnezzar carried him from Jerusalem to Babylon in 605 BC to be trained for royal service. He and three friends refused the king's rich food and thrived on vegetables, and God gave Daniel understanding of dreams. He interpreted the king's dream of a statue of gold, silver, bronze, iron, and clay, and later the dream that foretold Nebuchadnezzar's seven years of madness. Under Belshazzar he read the writing on the wall the night Babylon fell, and under Darius the Mede jealous officials trapped him with a law against prayer; he kept praying at his open window and spent a night among lions unharmed. He served four kings over about seventy years without compromise. His visions of four beasts, a Son of Man coming on the clouds, and seventy \"sevens\" shaped Jewish hopes for the Messiah, and Jesus took the title \"Son of Man\" from Daniel 7.",
    passages: [p('Daniel', '1'), p('Daniel', '6'), p('Daniel', '7')], books: ['daniel'],
    image: 'Gustave Doré Daniel in the den of lions',
  },
  {
    slug: 'esther', name: 'Esther', era: 'exile', dates: 'c. 480 BC',
    tagline: 'Queen for such a time as this',
    summary: "Esther, whose Hebrew name was Hadassah, was a Jewish orphan raised by her cousin Mordecai in the Persian capital Susa. When King Xerxes deposed Queen Vashti, Esther was among the young women gathered for a year of beauty treatments, and the king chose her, not knowing she was Jewish. Meanwhile Haman, the king's chief official, enraged that Mordecai would not bow to him, obtained a decree to kill every Jew in the empire on a single day. Mordecai sent word to Esther: \"Who knows but that you have come to your royal position for such a time as this?\" To enter the king's presence uninvited could mean death; she fasted three days and went. At a second banquet she exposed Haman, who was hanged on the gallows he had built for Mordecai, and the Jews were allowed to defend themselves. The festival of Purim still celebrates it. God is never named in her book, but his hand is everywhere.",
    passages: [p('Esther', '4'), p('Esther', '7')], books: ['esther'],
    image: 'Gustave Doré Esther before the king',
  },
  {
    slug: 'ezra', name: 'Ezra', era: 'exile', dates: 'c. 458 BC',
    tagline: 'Scribe devoted to the Law',
    summary: "Ezra was a priest descended from Aaron and \"a teacher well versed in the Law of Moses,\" living in Babylon about eighty years after the first exiles had returned. In 458 BC King Artaxerxes sent him to Jerusalem with a letter of authority, silver and gold for the temple, and a group of several thousand returnees. He refused a military escort, having told the king that God protects those who seek him, and fasted and prayed instead. Ezra had \"devoted himself to the study and observance of the Law of the LORD, and to teaching its decrees.\" Arriving to find that many, including priests, had married into the surrounding idolatrous peoples, he tore his clothes and prayed a wrenching public confession, and led the community through a painful reform. Later, with Nehemiah, he stood on a wooden platform and read the Law aloud from dawn till noon while the Levites explained it and the people wept, then rejoiced. Jewish tradition credits him with collecting the Scriptures.",
    passages: [p('Ezra', '7'), p('Nehemiah', '8')], books: ['ezra', 'nehemiah'],
    image: 'Gustave Doré Ezra reads the law',
  },
  {
    slug: 'nehemiah', name: 'Nehemiah', era: 'exile', dates: 'c. 445 BC',
    tagline: 'Rebuilt the walls in 52 days',
    summary: "Nehemiah held one of the most trusted posts in the Persian empire, cupbearer to King Artaxerxes in Susa, when his brother brought news that Jerusalem's walls still lay in ruins ninety years after the first return. He wept, fasted, and prayed for four months, and when the king noticed his sadness he asked to be sent to rebuild the city. Arriving in 445 BC he rode around the walls by night, then rallied the people: \"Come, let us rebuild.\" Neighboring governors, Sanballat, Tobiah, and Geshem, mocked, threatened, and plotted, so half the workers stood guard while the other half built with swords strapped on. The wall was finished in fifty-two days. Nehemiah then tackled the exploitation of the poor, refused the governor's food allowance, and with Ezra led the people to hear the Law and renew the covenant. On a second visit he threw Tobiah's furniture out of the temple and enforced the Sabbath. His memoir is full of short prayers: \"Remember me, my God.\"",
    passages: [p('Nehemiah', '1'), p('Nehemiah', '4'), p('Nehemiah', '6')], books: ['nehemiah'],
    image: 'Gustave Doré Nehemiah rebuilding walls of Jerusalem',
  },

  // ---------- Jesus & the Gospels ----------
  {
    slug: 'mary', name: 'Mary, mother of Jesus', era: 'jesus', dates: 'c. 5 BC-AD 33',
    tagline: '"May it be to me as you have said"',
    summary: "Mary was a young woman, probably a teenager, engaged to a carpenter in the small Galilean village of Nazareth when the angel Gabriel told her she would bear the Son of God. Her answer, \"May it be to me as you have said,\" and her song, the Magnificat, show a heart steeped in Scripture and ready to trust. She gave birth in Bethlehem, received shepherds and wise men, fled to Egypt, and raised Jesus in Nazareth, treasuring things in her heart she did not yet understand. She prompted his first miracle at Cana, once came with his brothers to bring him home, and stood at the foot of the cross, where Jesus entrusted her to John. She was with the disciples in the upper room praying when the Spirit came at Pentecost. Luke's careful account of Jesus' birth may rest on her memories. Elizabeth called her \"blessed among women,\" and every generation since has.",
    passages: [p('Luke', '1'), p('Luke', '2'), p('John', '19')], books: ['luke', 'matthew', 'john', 'acts'],
    image: 'Gustave Doré The Annunciation',
  },
  {
    slug: 'john-the-baptist', name: 'John the Baptist', era: 'jesus', dates: 'c. AD 27-29',
    tagline: 'Prepared the way',
    summary: "John was born to an elderly priest, Zechariah, and his wife Elizabeth, Mary's relative, after an angel announced him in the temple; he leaped in the womb when the pregnant Mary visited. He grew up in the wilderness, dressed in camel hair, ate locusts and wild honey, and around AD 27 began preaching by the Jordan that the kingdom was near and everyone must repent and be baptized. Crowds came from Jerusalem. He told soldiers not to extort, tax collectors not to overcharge, and Pharisees that they were a brood of vipers. When Jesus came to be baptized John hesitated, then obeyed, and pointed his own disciples to Jesus as \"the Lamb of God.\" He said, \"He must become greater; I must become less.\" For denouncing Herod Antipas's marriage he was imprisoned, and Herodias's daughter secured his beheading at a birthday feast. Jesus said no one born of women was greater than John.",
    passages: [p('Matthew', '3'), p('John', '1'), p('Mark', '6')], books: ['matthew', 'mark', 'luke', 'john'],
    image: 'Gustave Doré John the Baptist preaching in the wilderness',
  },
  {
    slug: 'jesus', name: 'Jesus', era: 'jesus', dates: 'c. 5 BC-AD 30/33',
    tagline: 'The Messiah, Son of God',
    summary: "Jesus was born in Bethlehem around 5 BC to Mary, a virgin, and raised in Nazareth as the son of Joseph the carpenter. At about thirty he was baptized by John, tested in the wilderness, and began announcing that the kingdom of God had come near. For about three years he taught in parables, healed the sick, cast out demons, calmed storms, fed crowds, ate with tax collectors and sinners, and welcomed children, women, Samaritans, and lepers, while clashing with religious leaders over the Sabbath, purity, and his claims to forgive sins and to be one with the Father. He chose twelve disciples and taught them that he must suffer, die, and rise. In Jerusalem at Passover he was betrayed by Judas, condemned by the council, crucified under Pontius Pilate, and buried. On the third day his tomb was empty, and he appeared to many over forty days before ascending. The New Testament calls him Messiah, Lord, Son of God, and the Word made flesh.",
    passages: [p('John', '1'), p('Mark', '8'), p('Luke', '24')], books: ['matthew', 'mark', 'luke', 'john', 'hebrews'],
    image: 'Gustave Doré Jesus sermon on the mount',
  },
  {
    slug: 'peter', name: 'Peter', era: 'jesus', dates: 'd. c. AD 64-68',
    tagline: 'Fisherman, rock, denier, shepherd',
    summary: "Simon was a fisherman from Bethsaida working out of Capernaum with his brother Andrew when Jesus called them to fish for people. Jesus renamed him Peter, \"rock,\" and he became the natural leader of the Twelve: first to confess Jesus as the Messiah, first to step out of the boat onto the water, first to object when Jesus spoke of the cross and be told, \"Get behind me, Satan.\" He swore he would die before denying Jesus, then denied him three times before the rooster crowed, and wept. After the resurrection Jesus met him by the lake and three times asked, \"Do you love me?\" and told him to feed his sheep. Peter preached at Pentecost and three thousand believed; he healed a lame man at the temple gate, faced the council, was freed from prison by an angel, and opened the door to Gentiles at Cornelius's house. He wrote two letters and, by early tradition, was crucified in Rome under Nero.",
    passages: [p('Matthew', '16'), p('John', '21'), p('Acts', '2')], books: ['matthew', 'john', 'acts', '1-peter', '2-peter'],
    image: 'Gustave Doré Peter walking on water',
  },
  {
    slug: 'john', name: 'John', era: 'jesus', dates: 'd. c. AD 100',
    tagline: 'The disciple Jesus loved',
    summary: "John and his brother James were fishermen, sons of Zebedee, partners with Peter, whom Jesus nicknamed \"sons of thunder,\" and who once wanted to call fire down on a Samaritan village and asked for the best seats in the kingdom. With Peter and James he saw Jairus's daughter raised, the transfiguration, and the agony in Gethsemane. The fourth Gospel calls him \"the disciple whom Jesus loved\": he leaned on Jesus at the Last Supper, was the only one of the Twelve at the cross, took Mary into his home, outran Peter to the empty tomb, and recognized the risen Lord on the beach. He was a pillar of the Jerusalem church with Peter. Tradition says he moved to Ephesus, wrote the Gospel and three letters that stress love and truth, was exiled to Patmos where he received Revelation, and died of old age around AD 100, the last of the apostles.",
    passages: [p('John', '13'), p('John', '19'), p('Revelation', '1')], books: ['john', '1-john', '2-john', '3-john', 'revelation'],
    image: 'Gustave Doré Saint John on Patmos',
  },
  {
    slug: 'mary-magdalene', name: 'Mary Magdalene', era: 'jesus', dates: 'c. AD 30',
    tagline: 'First to see the risen Jesus',
    summary: "Mary came from Magdala, a fishing town on the Sea of Galilee, and Jesus had freed her from seven demons. She joined the women who traveled with him and supported his ministry from their own means, and she is named first in every list of them. She stayed at the cross when nearly all the men had fled, watched where Joseph laid the body, and came to the tomb before dawn on Sunday with spices. Finding the stone rolled away she ran for Peter and John, then stood outside weeping, and mistook the risen Jesus for the gardener until he said her name. She was the first person to see him alive and the first sent to tell others: \"I have seen the Lord!\" Early Christians called her \"the apostle to the apostles.\" The later idea that she was a prostitute has no basis in the Gospels; she was a healed woman who became a faithful witness.",
    passages: [p('Luke', '8'), p('John', '20')], books: ['luke', 'john', 'mark'],
    image: 'Gustave Doré Mary Magdalene',
  },

  // ---------- Early church ----------
  {
    slug: 'stephen', name: 'Stephen', era: 'church', dates: 'c. AD 34',
    tagline: 'First Christian martyr',
    summary: "Stephen was one of seven men the Jerusalem church chose to oversee the daily distribution of food to widows, so that the apostles could focus on prayer and teaching; he was \"full of faith and of the Holy Spirit.\" He did more than serve tables, working wonders and debating so powerfully in the Greek-speaking synagogues that his opponents could not answer him and resorted to false witnesses. Before the Sanhedrin, with a face like an angel's, he retold Israel's story from Abraham to Solomon, showing that God had never been confined to one land or one building and that the people had always resisted his messengers, ending, \"You have betrayed and murdered the Righteous One.\" As the council raged he looked up and saw Jesus standing at God's right hand. They dragged him out and stoned him while he prayed for their forgiveness, and a young man named Saul guarded the coats. The persecution that followed scattered the church, and the gospel spread.",
    passages: [p('Acts', '6'), p('Acts', '7')], books: ['acts'],
    image: 'Gustave Doré The martyrdom of Saint Stephen',
  },
  {
    slug: 'paul', name: 'Paul', era: 'church', dates: 'c. AD 5-67',
    tagline: 'Persecutor turned apostle',
    summary: "Paul was born Saul in Tarsus, a Roman citizen and a Pharisee trained under Gamaliel in Jerusalem, so zealous for the law that he approved Stephen's stoning and hunted Christians from house to house. On the road to Damascus a blinding light knocked him down and the risen Jesus asked, \"Why do you persecute me?\" Three days later he was baptized, and he spent the rest of his life preaching the faith he had tried to destroy. In three missionary journeys he crossed Asia Minor and Greece, planting churches in Galatia, Philippi, Thessalonica, Corinth, and Ephesus, and was beaten, stoned, shipwrecked, and imprisoned repeatedly. He argued that Gentiles are saved by faith in Christ, not by keeping the law, and wrote thirteen letters that make up a large part of the New Testament. Arrested in Jerusalem, he appealed to Caesar and was taken to Rome. Tradition says Nero had him beheaded around AD 67. He called himself the least of the apostles and the worst of sinners.",
    passages: [p('Acts', '9'), p('Philippians', '3'), p('2 Timothy', '4')], books: ['acts', 'romans', 'galatians', 'philippians', '2-timothy'],
    image: 'Gustave Doré The conversion of Saint Paul',
  },
  {
    slug: 'barnabas', name: 'Barnabas', era: 'church', dates: 'c. AD 35-50',
    tagline: 'Son of encouragement',
    summary: "Barnabas was a Levite from Cyprus named Joseph, whom the apostles nicknamed \"son of encouragement,\" and he earned it. He sold a field and laid the money at the apostles' feet. When the converted Saul came to Jerusalem and every believer was afraid of him, Barnabas took him to the apostles and vouched for him. Sent to inspect the surprising new church in Antioch, he \"saw the grace of God and was glad,\" then went to Tarsus to find Saul and brought him back to teach. The two carried famine relief to Jerusalem and were sent out together on the first missionary journey, where they were taken for Zeus and Hermes at Lystra and then stoned. Barnabas stood with Paul at the Jerusalem council for Gentile freedom. When Paul refused to take John Mark, who had deserted them earlier, Barnabas gave Mark a second chance and sailed for Cyprus with him; Mark later wrote a Gospel.",
    passages: [p('Acts', '4'), p('Acts', '11'), p('Acts', '13')], books: ['acts', 'galatians'],
    image: 'Paul and Barnabas at Lystra',
  },
  {
    slug: 'timothy', name: 'Timothy', era: 'church', dates: 'c. AD 50-65',
    tagline: 'Paul’s true son in the faith',
    summary: "Timothy came from Lystra in Galatia, the son of a Greek father and a Jewish mother, Eunice, and had been taught the Scriptures from infancy by her and by his grandmother Lois. He probably came to faith on Paul's first visit, and on the second Paul chose the young man, well spoken of by the believers, to join him. For the rest of Paul's life Timothy was his most trusted companion, sent on delicate missions to Thessalonica, Corinth, and Philippi, and named as co-sender of six letters. Paul said no one else so genuinely cared for the churches. He was timid, often ill, and young enough to be looked down on, and Paul wrote him two letters urging him to fan his gift into flame, guard the gospel, and preach the word in season and out. He led the church in Ephesus. Hebrews mentions his release from prison. Tradition says he was martyred there in old age.",
    passages: [p('Acts', '16'), p('2 Timothy', '1'), p('1 Timothy', '4')], books: ['1-timothy', '2-timothy', 'acts', 'philippians'],
    image: 'Saint Timothy',
  },
  {
    slug: 'luke', name: 'Luke', era: 'church', dates: 'c. AD 50-80',
    tagline: 'Doctor, historian, travel companion',
    summary: "Luke was a Gentile physician, \"the dear doctor\" in Paul's words, who joined Paul at Troas on the second missionary journey; from that point Acts sometimes says \"we.\" He stayed in Philippi for some years, rejoined Paul on his last trip to Jerusalem, sailed with him through the shipwreck to Rome, and was the only one still with him at the end, when Paul wrote, \"Only Luke is with me.\" He opens his Gospel by explaining that he investigated everything carefully from eyewitnesses to write an orderly account for Theophilus, and his two volumes, Luke and Acts, are the longest contribution to the New Testament by a single author. He gives us the Christmas story, the Good Samaritan, the prodigal son, the road to Emmaus, and the whole story of the church's first thirty years, with special attention to women, the poor, outsiders, prayer, and joy. Tradition says he died in Greece in old age.",
    passages: [p('Luke', '1'), p('Acts', '16'), p('2 Timothy', '4')], books: ['luke', 'acts', 'colossians'],
    image: 'Saint Luke the Evangelist',
  },
  {
    slug: 'james', name: 'James, brother of Jesus', era: 'church', dates: 'd. c. AD 62',
    tagline: 'Leader of the Jerusalem church',
    summary: "James was one of the four brothers of Jesus named in the Gospels, and during Jesus' ministry he and his brothers did not believe; they once tried to take Jesus home, thinking he was out of his mind. Paul records that the risen Jesus appeared to James personally, and by Pentecost the brothers were praying with the disciples. Within a few years James was the recognized leader of the Jerusalem church: Peter sent word to him after escaping prison, Paul consulted him, and at the Jerusalem council it was James who gave the deciding judgment welcoming Gentiles without circumcision. He wrote the letter of James, the New Testament's most practical book, on trials, the tongue, favoritism, and faith that acts. Early writers called him \"the Just\" and said he prayed so much his knees were calloused like a camel's. The historian Josephus records that the high priest had him stoned in AD 62.",
    passages: [p('Acts', '15'), p('James', '1'), p('1 Corinthians', '15')], books: ['james', 'acts', 'galatians'],
    image: 'James the Just',
  },
]

export const peopleBySlug = (slug: string) => PEOPLE.find((x) => x.slug === slug)
